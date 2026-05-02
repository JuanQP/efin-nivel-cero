(function () {
  const widget = document.getElementById("widget-horizonte");
  if (!widget) return;

  const slider  = document.getElementById("hor-slider");
  const yearsEl = document.getElementById("hor-years-val");
  const svg     = document.getElementById("hor-svg");
  const finalEl = document.getElementById("hor-final");
  const gainEl  = document.getElementById("hor-gain");
  const insight = document.getElementById("hor-insight");

  const CAPITAL   = 1000;
  const RATE      = 0.10;
  const MAX_YEARS = 40;
  const W = 480, H = 180;
  const PAD = { t: 10, r: 20, b: 28, l: 60 };

  function fmt(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }

  function calc(y) {
    return CAPITAL * Math.pow(1 + RATE, y);
  }

  function buildPath(upTo) {
    var cw = W - PAD.l - PAD.r;
    var ch = H - PAD.t - PAD.b;
    var maxVal = calc(MAX_YEARS) * 1.08;
    var d = "";
    for (var y = 0; y <= upTo; y++) {
      var x = (PAD.l + (y / MAX_YEARS) * cw).toFixed(1);
      var yc = (PAD.t + ch - (calc(y) / maxVal) * ch).toFixed(1);
      d += (y === 0 ? "M" : " L") + x + "," + yc;
    }
    return d;
  }

  function render() {
    var years   = parseInt(slider.value, 10);
    var maxVal  = calc(MAX_YEARS) * 1.08;
    var cw      = W - PAD.l - PAD.r;
    var ch      = H - PAD.t - PAD.b;

    yearsEl.textContent = years;

    var finalVal = calc(years);
    var gain     = finalVal - CAPITAL;

    // Y-axis ticks at 0, calc(20), calc(40)
    var yTicks = [0, calc(20), calc(MAX_YEARS)].map(function (v) {
      var y     = (PAD.t + ch - (v / maxVal) * ch).toFixed(1);
      var label = v === 0 ? "$0" : "$" + Math.round(v / 1000) + "k";
      return (
        "<text x=\"" + (PAD.l - 5) + "\" y=\"" + y + "\" text-anchor=\"end\" dominant-baseline=\"middle\" class=\"com-axis-text\">" + label + "</text>" +
        "<line x1=\"" + PAD.l + "\" y1=\"" + y + "\" x2=\"" + (PAD.l + cw) + "\" y2=\"" + y + "\" class=\"com-grid-line\"/>"
      );
    }).join("");

    var xTicks = [0, 10, 20, 30, 40].map(function (yr) {
      var x = (PAD.l + (yr / MAX_YEARS) * cw).toFixed(1);
      return "<text x=\"" + x + "\" y=\"" + (PAD.t + ch + 16) + "\" text-anchor=\"middle\" class=\"com-axis-text\">" + yr + "a</text>";
    }).join("");

    var vlineX = (PAD.l + (years / MAX_YEARS) * cw).toFixed(1);
    var dotY   = (PAD.t + ch - (finalVal / maxVal) * ch).toFixed(1);

    svg.innerHTML =
      "<g>" + yTicks + xTicks + "</g>" +
      "<line x1=\"" + PAD.l + "\" y1=\"" + PAD.t + "\" x2=\"" + PAD.l + "\" y2=\"" + (PAD.t + ch) + "\" class=\"com-axis-line\"/>" +
      "<line x1=\"" + PAD.l + "\" y1=\"" + (PAD.t + ch) + "\" x2=\"" + (PAD.l + cw) + "\" y2=\"" + (PAD.t + ch) + "\" class=\"com-axis-line\"/>" +
      "<path d=\"" + buildPath(MAX_YEARS) + "\" class=\"hor-path hor-path--ghost\"/>" +
      "<path d=\"" + buildPath(years) + "\" class=\"hor-path hor-path--active\"/>" +
      "<line x1=\"" + vlineX + "\" y1=\"" + PAD.t + "\" x2=\"" + vlineX + "\" y2=\"" + (PAD.t + ch) + "\" class=\"hor-vline\"/>" +
      "<circle cx=\"" + vlineX + "\" cy=\"" + dotY + "\" r=\"5\" class=\"hor-dot\"/>";

    finalEl.textContent = fmt(finalVal);
    gainEl.textContent  = "+" + fmt(gain);

    if (years <= 10) {
      insight.textContent =
        "En " + years + " años, $1.000 crecen a " + fmt(finalVal) + ". " +
        "La curva todavía parece casi lineal. El interés compuesto apenas está calentando.";
    } else {
      var last10 = finalVal - calc(years - 10);
      var last10Pct = Math.round((last10 / gain) * 100);
      insight.textContent =
        "Los últimos 10 años de los " + years + " totales generaron " + fmt(last10) +
        " — el " + last10Pct + "% de toda la ganancia. " +
        "Cuanto más largo el horizonte, más agresiva la aceleración.";
    }
  }

  slider.addEventListener("input", render);
  render();
})();
