(function () {
  const widget = document.getElementById("widget-emision");
  if (!widget) return;

  const slider    = document.getElementById("emision-slider");
  const moneyEl   = document.getElementById("emision-money-val");
  const priceEl   = document.getElementById("emision-price");
  const goodsEl   = document.getElementById("emision-goods");
  const lossEl    = document.getElementById("emision-loss");
  const insightEl = document.getElementById("emision-insight");

  const GOODS   = 100;
  const INITIAL = 1000;

  function fmt(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }

  function render() {
    const money   = parseInt(slider.value, 10);
    const price   = money / GOODS;
    const goods   = Math.round(INITIAL / price);
    const lossPct = Math.round((1 - INITIAL / money) * 100);
    const mult    = (money / INITIAL).toFixed(1);

    moneyEl.textContent = fmt(money);
    priceEl.textContent = fmt(price);
    goodsEl.textContent = goods + " bienes";
    lossEl.textContent  = lossPct + "%";
    lossEl.classList.toggle("emision-val--loss", lossPct > 0);

    if (lossPct === 0) {
      insightEl.textContent =
        "La cantidad de dinero no cambió. Los precios son estables y tus ahorros valen lo mismo.";
    } else if (lossPct < 50) {
      insightEl.textContent =
        "El gobierno emitió " + mult + "× más dinero. Los precios subieron en la misma proporción. " +
        "Tus $1.000 ahorrados perdieron " + lossPct + "% de su poder adquisitivo.";
    } else if (lossPct < 80) {
      insightEl.textContent =
        "Con " + mult + "× más dinero en circulación, más de la mitad del valor de tus ahorros " +
        "se transfirió silenciosamente al emisor. Este es el impuesto inflacionario.";
    } else {
      insightEl.textContent =
        "El dinero se multiplicó " + mult + "×. Tus $1.000 originales ahora compran solo " +
        goods + " bienes de los 100 que compraban antes. El " + lossPct + "% del valor fue confiscado vía emisión.";
    }
  }

  slider.addEventListener("input", render);
  render();
})();
