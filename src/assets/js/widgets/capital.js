(function () {
  const widget = document.getElementById("widget-capital");
  if (!widget) return;

  // Each entry describes the tool added at that level (level = index + 1)
  const TOOLS = [
    { emoji: "🎣", label: "Caña",  dep: 1, gross: 9,  btnText: "Construir caña de pescar 🎣" },
    { emoji: "🪨", label: "Roca",  dep: 1, gross: 12, btnText: "Tallar una roca 🪨" },
    { emoji: "🪓", label: "Hacha", dep: 1, gross: 15, btnText: "Forjar un hacha 🪓" },
  ];

  let level = 0;

  function el(id) { return document.getElementById(id); }

  function render() {
    const chainEl = el("capital-chain");
    const statsEl = el("capital-stats");
    const btnEl   = el("btn-capital-next");
    const msgEl   = el("capital-message");

    const gross = level === 0 ? 3 : TOOLS[level - 1].gross;
    const dep   = TOOLS.slice(0, level).reduce((s, t) => s + t.dep, 0);
    const net   = gross - dep;

    // Build chain nodes: Person → [tools in higher-order-first order] → Output
    const parts = [];
    parts.push('<div class="cap-node cap-node--person"><span class="cap-emoji">🧑</span><span class="cap-label">Robinson</span></div>');

    // Tools added so far, reversed so higher-order (later-added) goes first
    TOOLS.slice(0, level).reverse().forEach(t => {
      parts.push('<span class="cap-arrow">→</span>');
      parts.push(
        '<div class="cap-node">' +
          '<span class="cap-emoji">' + t.emoji + '</span>' +
          '<span class="cap-label">' + t.label + '</span>' +
          '<span class="cap-dep">−' + t.dep + ' 🐟/día</span>' +
        '</div>'
      );
    });

    parts.push('<span class="cap-arrow">→</span>');
    parts.push(
      '<div class="cap-node cap-node--output">' +
        '<span class="cap-emoji">🐟</span>' +
        '<span class="cap-label">' + gross + '/día</span>' +
      '</div>'
    );

    chainEl.innerHTML = parts.join("");

    // Stats
    if (level === 0) {
      statsEl.innerHTML =
        '<span class="cap-stat">Producción: <strong>' + gross + ' 🐟/día</strong></span>' +
        '<span class="cap-stat">Sin capital · todo libre</span>';
    } else {
      statsEl.innerHTML =
        '<span class="cap-stat">Bruto: <strong>' + gross + ' 🐟/día</strong></span>' +
        '<span class="cap-stat cap-stat--dep">Comprometido: <strong>−' + dep + ' 🐟/día</strong></span>' +
        '<span class="cap-stat cap-stat--net">Libre: <strong>' + net + ' 🐟/día</strong></span>';
    }

    // Button + message
    if (level < TOOLS.length) {
      btnEl.disabled = false;
      btnEl.textContent = TOOLS[level].btnText;
      msgEl.textContent = "";
    } else {
      btnEl.disabled = true;
      btnEl.textContent = "Cadena completa";
      msgEl.textContent =
        "La cadena puede seguir alargándose: cada nueva herramienta requiere otra herramienta para fabricarla, " +
        "y así hacia atrás. Cuanto más larga la cadena, más productiva — pero también más capital comprometido " +
        "en mantenimiento. Eso es la estructura temporal del capital que describió Böhm-Bawerk.";
    }
  }

  el("btn-capital-next").addEventListener("click", () => {
    if (level < TOOLS.length) { level++; render(); }
  });
  el("btn-capital-reset").addEventListener("click", () => { level = 0; render(); });

  render();
})();
