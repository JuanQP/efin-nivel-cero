(function () {
  const widget = document.getElementById("widget-interes");
  if (!widget) return;

  const BASE = 3;   // fish/day by hand
  const COST = 5;   // fish saved to build rod
  const MAX  = 12;  // slider max (for bar scaling)

  const slider    = document.getElementById("interes-slider");
  const expEl     = document.getElementById("interes-expected");
  const barFish   = document.getElementById("interes-bar-fishing");
  const barValEl  = document.getElementById("interes-bar-val");
  const gainEl    = document.getElementById("interes-gain");
  const paybackEl = document.getElementById("interes-payback");
  const msgEl     = document.getElementById("interes-message");

  function update() {
    const x    = parseInt(slider.value, 10);
    const gain = x - BASE;
    const days = Math.ceil(COST / gain);

    expEl.textContent     = x;
    barFish.style.width   = (x / MAX * 100) + "%";
    barValEl.textContent  = x + " 🐟/día";
    gainEl.textContent    = "+" + gain + " 🐟/día";
    paybackEl.textContent = days + " día" + (days !== 1 ? "s" : "");

    if (gain === 1) {
      msgEl.textContent =
        "Con tan poco margen, Robinson necesita estar muy seguro de que la caña dura. " +
        "Cualquier accidente borra la ganancia.";
    } else if (gain <= 3) {
      msgEl.textContent =
        "Expectativa razonable. Recupera la inversión en " + days + " días " +
        "y a partir de ahí todo es ganancia neta.";
    } else if (gain <= 5) {
      msgEl.textContent =
        "Buen retorno. Si Robinson cree esto con cierta confianza, la decisión es clara.";
    } else {
      msgEl.textContent =
        "Retorno excepcional. Robinson no dudaría ni un segundo en sacrificar esos 5 peces.";
    }
  }

  slider.addEventListener("input", update);
  update();
})();
