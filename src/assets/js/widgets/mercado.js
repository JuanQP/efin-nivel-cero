(function () {
  const widget = document.getElementById("widget-mercado");
  if (!widget) return;

  let broken = false;

  const btnEntera  = document.getElementById("btn-entera");
  const btnRota    = document.getElementById("btn-rota");
  const robsonEl   = document.getElementById("merc-robinson");
  const robFishEl  = document.getElementById("rob-fish");
  const robNoteEl  = document.getElementById("rob-note");
  const signalEl   = document.getElementById("merc-signal");
  const priceEl    = document.getElementById("merc-price");
  const vienFishEl = document.getElementById("vien-fish");
  const vienNoteEl = document.getElementById("vien-note");
  const insightEl  = document.getElementById("mercado-insight");

  function render() {
    btnEntera.classList.toggle("active", !broken);
    btnRota.classList.toggle("active", broken);
    robsonEl.classList.toggle("mercado-actor--broken", broken);
    signalEl.classList.toggle("mercado-signal--high", broken);
    insightEl.classList.toggle("mercado-insight--active", broken);

    if (!broken) {
      robFishEl.textContent  = "9";
      robNoteEl.textContent  = "La caña funciona. Produce bien.";
      priceEl.textContent    = "1 🥭";
      vienFishEl.textContent = "3";
      vienNoteEl.textContent = '"El precio es normal. Compro lo de siempre."';
      insightEl.textContent  =
        "Precio bajo → abundancia. El mercado está en equilibrio.";
    } else {
      robFishEl.textContent  = "3";
      robNoteEl.textContent  = "La caña se rompió. Solo Robinson lo sabe.";
      priceEl.textContent    = "3 🥭";
      vienFishEl.textContent = "1";
      vienNoteEl.innerHTML   =
        '"El precio subió. Compro menos." ' +
        '<em class="mercado-no-sabe">— No sabe nada de la caña.</em>';
      insightEl.textContent  =
        "El precio le transmitió a Viernes exactamente lo que necesitaba saber: " +
        "los peces escasean, hay que economizarlos. Sin que nadie tuviera que explicar nada, " +
        "el mercado racionó el recurso. Así funciona el sistema de precios.";
    }
  }

  btnEntera.addEventListener("click", () => { broken = false; render(); });
  btnRota.addEventListener("click",   () => { broken = true;  render(); });

  render();
})();
