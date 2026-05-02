(function () {
  const SELLERS = [
    { id: "pm-s0", label: "Vendedor 1", minPrice: 17, units: 10 },
    { id: "pm-s1", label: "Vendedor 2", minPrice: 19, units: 10 },
    { id: "pm-s2", label: "Vendedor 3", minPrice: 10, units: 10 },
    { id: "pm-s3", label: "Vendedor 4", minPrice: 30, units: 10 },
  ];
  const MAX_PRICE = 50;
  const TOTAL_UNITS = SELLERS.reduce((s, v) => s + v.units, 0);

  const widget = document.getElementById("widget-precio-maximo");
  if (!widget) return;

  const slider    = document.getElementById("pm-slider");
  const priceEl   = document.getElementById("pm-price");
  const priceTag  = document.querySelector("#widget-precio-maximo .pm-price-tag");
  const ceilEl    = document.getElementById("pm-ceiling");
  const statusEl  = document.getElementById("pm-status");

  // Position each dot once based on its seller's minimum price
  SELLERS.forEach((s) => {
    const dot = document.querySelector("#" + s.id + " .pm-dot");
    dot.style.bottom = (s.minPrice / MAX_PRICE * 100) + "%";
  });

  function update() {
    const price  = parseInt(slider.value, 10);
    const isFree = price === MAX_PRICE;

    priceEl.textContent          = price;
    priceTag.style.visibility    = isFree ? "hidden" : "visible";
    ceilEl.style.bottom          = (price / MAX_PRICE * 100) + "%";
    ceilEl.classList.toggle("pm-ceiling--free", isFree);

    let supply = 0;
    const rows = SELLERS.map((s) => {
      const active = price >= s.minPrice;
      document.getElementById(s.id).classList.toggle("pm-seller--off", !active);
      if (active) supply += s.units;
      return active
        ? `<span class="pm-row-on">😊 ${s.label}: vende 🍞 a $${s.minPrice}</span>`
        : `<span class="pm-row-off">😡 ${s.label}: no puede vender a ese precio</span>`;
    });

    let supplyMsg;
    if (supply === 0) {
      supplyMsg = '<span class="pm-msg-crisis">Sin oferta — nadie puede vender a ese precio.</span>';
    } else if (supply < TOTAL_UNITS) {
      const out = TOTAL_UNITS - supply;
      supplyMsg =
        `<span class="pm-msg-warn">Oferta de 🍞: <strong>${supply} unidades</strong>` +
        ` — ${out} unidad${out > 1 ? "es" : ""} retirada${out > 1 ? "s" : ""} del mercado</span>`;
    } else {
      supplyMsg = '<span class="pm-msg-ok">Oferta de 🍞: <strong>40 unidades</strong> — mercado libre, sin escasez</span>';
    }

    statusEl.innerHTML =
      `<div class="pm-rows">${rows.join("")}</div>` +
      `<div class="pm-supply">${supplyMsg}</div>`;
  }

  slider.addEventListener("input", update);
  update();
})();
