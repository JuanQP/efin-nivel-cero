(function () {
  const INITIAL = { vos: { blue: 6, pine: 0 }, nadia: { blue: 0, pine: 6 } };

  const state = {
    vos: { ...INITIAL.vos },
    nadia: { ...INITIAL.nadia },
  };

  function mv(q) {
    return Math.max(0, 5 - q);
  }

  function gainBP() {
    return mv(state.vos.pine) - mv(state.vos.blue - 1);
  }

  function hearts(value) {
    return "❤️".repeat(value) + "🤍".repeat(5 - value);
  }

  function stock(count, emoji) {
    return count > 0 ? emoji.repeat(count) : "—";
  }

  function el(id) {
    return document.getElementById(id);
  }

  const MAX_TOTAL = 48;

  function totalUtil(person) {
    let t = 0;
    for (let q = 0; q < person.blue; q++) t += mv(q);
    for (let q = 0; q < person.pine; q++) t += mv(q);
    return t;
  }

  function gainTag(g) {
    if (g > 0) return '<br><span class="btn-gain-pos">' + "▲".repeat(g) + "</span>";
    return '<br><span class="btn-gain-zero">—</span>';
  }

  function update() {
    const { vos, nadia } = state;

    el("vos-stock-blue").textContent   = stock(vos.blue,   "🫐");
    el("vos-stock-pine").textContent   = stock(vos.pine,   "🍍");
    el("nadia-stock-blue").textContent = stock(nadia.blue, "🫐");
    el("nadia-stock-pine").textContent = stock(nadia.pine, "🍍");

    el("vos-val-blue").innerHTML   = hearts(mv(vos.blue));
    el("vos-val-pine").innerHTML   = hearts(mv(vos.pine));
    el("nadia-val-blue").innerHTML = hearts(mv(nadia.blue));
    el("nadia-val-pine").innerHTML = hearts(mv(nadia.pine));

    const g    = gainBP();
    const can  = vos.blue > 0 && nadia.pine > 0 && g > 0;
    const btn  = el("btn-blue-pine");

    btn.disabled = !can;
    btn.innerHTML = "Cambiar 🫐 por 🍍" + (can ? gainTag(g) : "");

    const sysTotal = totalUtil(vos) + totalUtil(nadia);
    const pct      = (sysTotal / MAX_TOTAL) * 100;
    const isEq     = sysTotal === MAX_TOTAL;

    const bar = el("value-meter-bar");
    bar.style.width = pct + "%";
    bar.classList.toggle("at-max", isEq);

    const lbl = el("value-meter-label");
    lbl.innerHTML = isEq
      ? '<span class="vm-eq">Equilibrio — ningún intercambio puede mejorar a los dos a la vez</span>'
      : '<span class="vm-rising">Seguir intercambiando mejora a los dos</span>';
  }

  function trade() {
    state.vos.blue--;   state.vos.pine++;
    state.nadia.pine--; state.nadia.blue++;
    update();
  }

  const widget = document.getElementById("widget-valor-marginal");
  if (!widget) return;

  el("btn-blue-pine").addEventListener("click", trade);
  el("btn-reset").addEventListener("click", () => {
    Object.assign(state.vos,   INITIAL.vos);
    Object.assign(state.nadia, INITIAL.nadia);
    update();
  });

  update();
})();
