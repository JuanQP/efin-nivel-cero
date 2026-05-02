(function () {
  const widget = document.getElementById("widget-multiplicador");
  if (!widget) return;

  const slider   = document.getElementById("mult-slider");
  const rateEl   = document.getElementById("mult-rate-val");
  const cascade  = document.getElementById("mult-cascade");
  const totalEl  = document.getElementById("mult-total-val");
  const multEl   = document.getElementById("mult-multiplier");
  const newMonEl = document.getElementById("mult-new-money");

  const INITIAL = 1000;
  const ROWS    = 5;

  function fmt(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }

  function render() {
    const r = parseInt(slider.value, 10) / 100;
    rateEl.textContent = slider.value;

    cascade.innerHTML = "";
    let amount = INITIAL;

    for (let i = 0; i < ROWS; i++) {
      const keeps = amount * r;
      const lends = amount - keeps;

      const row = document.createElement("div");
      row.className = "mult-row";
      row.innerHTML =
        '<span class="mult-col-bank">Banco ' + (i + 1) + '</span>' +
        '<span class="mult-col-received">' + fmt(amount) + '</span>' +
        '<span class="mult-col-keep">'     + fmt(keeps)  + '</span>' +
        '<span class="mult-col-lend">'     + fmt(lends)  + '</span>';

      cascade.appendChild(row);
      amount = lends;
    }

    const multiplier = 1 / r;
    const total      = INITIAL * multiplier;
    const newMoney   = total - INITIAL;

    totalEl.textContent  = fmt(total);
    multEl.textContent   = multiplier.toFixed(1) + "×";
    newMonEl.textContent = fmt(newMoney);
  }

  slider.addEventListener("input", render);
  render();
})();
