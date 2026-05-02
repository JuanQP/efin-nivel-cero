(function () {
  const widget = document.getElementById("widget-comisiones");
  if (!widget) return;

  const slider   = document.getElementById("com-slider");
  const rateEl   = document.getElementById("com-rate-val");
  const svg      = document.getElementById("com-svg");
  const valNone  = document.getElementById("com-val-none");
  const valEtf   = document.getElementById("com-val-etf");
  const valFci   = document.getElementById("com-val-fci");
  const valLoss  = document.getElementById("com-val-loss");

  const CAPITAL = 10000;
  const YEARS   = 30;
  const W = 480, H = 200;
  const PAD = { t: 12, r: 20, b: 28, l: 52 };

  function fmt(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }

  function computeSeries(r) {
    var none = [], etf = [], fci = [];
    for (var y = 0; y <= YEARS; y++) {
      none.push(CAPITAL * Math.pow(1 + r / 100, y));
      etf.push(CAPITAL * Math.pow(1 + (r - 0.1) / 100, y));
      fci.push(CAPITAL * Math.pow(1 + (r - 1.5) / 100, y));
    }
    return { none: none, etf: etf, fci: fci };
  }

  function buildPath(series, maxVal) {
    var cw = W - PAD.l - PAD.r;
    var ch = H - PAD.t - PAD.b;
    return series.map(function (v, i) {
      var x = PAD.l + (i / YEARS) * cw;
      var y = PAD.t + ch - (v / maxVal) * ch;
      return (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
    }).join(" ");
  }

  function render() {
    var r = parseInt(slider.value, 10);
    rateEl.textContent = r;

    var s      = computeSeries(r);
    var maxVal = s.none[YEARS] * 1.08;
    var cw     = W - PAD.l - PAD.r;
    var ch     = H - PAD.t - PAD.b;

    var yTicks = [0, maxVal / 2, maxVal].map(function (v) {
      var y = (PAD.t + ch - (v / maxVal) * ch).toFixed(1);
      var label = v === 0 ? "$0" : "$" + Math.round(v / 1000) + "k";
      return (
        "<text x=\"" + (PAD.l - 5) + "\" y=\"" + y + "\" text-anchor=\"end\" dominant-baseline=\"middle\" class=\"com-axis-text\">" + label + "</text>" +
        "<line x1=\"" + PAD.l + "\" y1=\"" + y + "\" x2=\"" + (PAD.l + cw) + "\" y2=\"" + y + "\" class=\"com-grid-line\"/>"
      );
    }).join("");

    var xTicks = [0, 10, 20, 30].map(function (yr) {
      var x = (PAD.l + (yr / YEARS) * cw).toFixed(1);
      return "<text x=\"" + x + "\" y=\"" + (PAD.t + ch + 16) + "\" text-anchor=\"middle\" class=\"com-axis-text\">" + yr + "a</text>";
    }).join("");

    svg.innerHTML =
      "<g>" + yTicks + xTicks + "</g>" +
      "<line x1=\"" + PAD.l + "\" y1=\"" + PAD.t + "\" x2=\"" + PAD.l + "\" y2=\"" + (PAD.t + ch) + "\" class=\"com-axis-line\"/>" +
      "<line x1=\"" + PAD.l + "\" y1=\"" + (PAD.t + ch) + "\" x2=\"" + (PAD.l + cw) + "\" y2=\"" + (PAD.t + ch) + "\" class=\"com-axis-line\"/>" +
      "<path d=\"" + buildPath(s.none, maxVal) + "\" class=\"com-path com-path--none\"/>" +
      "<path d=\"" + buildPath(s.etf,  maxVal) + "\" class=\"com-path com-path--etf\"/>" +
      "<path d=\"" + buildPath(s.fci,  maxVal) + "\" class=\"com-path com-path--fci\"/>";

    valNone.textContent = fmt(s.none[YEARS]);
    valEtf.textContent  = fmt(s.etf[YEARS]);
    valFci.textContent  = fmt(s.fci[YEARS]);
    valLoss.textContent = fmt(s.none[YEARS] - s.fci[YEARS]);
  }

  slider.addEventListener("input", render);
  render();
})();
