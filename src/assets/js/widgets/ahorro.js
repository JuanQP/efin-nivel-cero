(function () {
  const widget = document.getElementById("widget-ahorro");
  if (!widget) return;

  const SAVE_TARGET = 5;
  const MAX_DAY = 13;

  let day = 0;
  let reserve = 0;
  let phase = "saving"; // 'saving' | 'ready' | 'harvest'

  function el(id) { return document.getElementById(id); }

  function render() {
    const advBtn  = el("btn-ahorro-advance");
    const bldBtn  = el("btn-ahorro-build");
    const msgEl   = el("ahorro-message");
    const numEl   = el("con-num");
    const resEl   = el("con-reserve");
    const badgeEl = el("con-badge");
    const dayEl   = el("ahorro-day");

    dayEl.textContent = day === 0 ? "Inicio" : "Día " + day;
    resEl.textContent = reserve + " 🐟";
    numEl.className = "ahorro-num";

    if (phase === "saving") {
      numEl.textContent = "2";
      numEl.classList.add("ahorro-num--low");
      badgeEl.textContent = "Ahorrando…";
      badgeEl.className = "ahorro-badge ahorro-badge--saving";
      advBtn.disabled = false;
      bldBtn.disabled = true;
      msgEl.textContent = "";

    } else if (phase === "ready") {
      numEl.textContent = "2";
      numEl.classList.add("ahorro-num--low");
      badgeEl.textContent = "¡Reserva lista!";
      badgeEl.className = "ahorro-badge ahorro-badge--ready";
      advBtn.disabled = true;
      bldBtn.disabled = false;
      msgEl.textContent =
        "Guardaste " + SAVE_TARGET + " peces. Ahora podés tomarte un día para construir la caña.";

    } else {
      numEl.textContent = "9";
      numEl.classList.add("ahorro-num--harvest");
      badgeEl.textContent = "¡Cosechando!";
      badgeEl.className = "ahorro-badge ahorro-badge--harvest";
      const done = day >= MAX_DAY;
      advBtn.disabled = done;
      bldBtn.disabled = true;
      msgEl.textContent = done
        ? "Robinson sin ahorro: siempre 3 🐟 por día, reserva cero. " +
          "Robinson con ahorro: 9 🐟 por día, " + reserve + " 🐟 en reserva. " +
          "El sacrificio duró 6 días. La ganancia es permanente."
        : "";
    }
  }

  function advance() {
    day++;
    if (phase === "saving") {
      reserve++;
      if (reserve >= SAVE_TARGET) phase = "ready";
    } else if (phase === "harvest") {
      reserve += 6; // catches 9, eats 3
    }
    render();
  }

  function build() {
    day++;
    reserve--;  // eats 1 fish from reserve during the build day
    phase = "harvest";
    render();
  }

  function reset() {
    day = 0; reserve = 0; phase = "saving";
    render();
  }

  el("btn-ahorro-advance").addEventListener("click", advance);
  el("btn-ahorro-build").addEventListener("click", build);
  el("btn-ahorro-reset").addEventListener("click", reset);

  render();
})();
