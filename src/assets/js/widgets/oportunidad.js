(function () {
  const STATS = {
    "ver una serie": [
      { label: "Diversión",    value:  3 },
      { label: "Descanso",     value:  1 },
      { label: "Conocimiento", value: -1 },
    ],
    "leer un libro": [
      { label: "Diversión",    value:  1 },
      { label: "Descanso",     value: -1 },
      { label: "Conocimiento", value:  3 },
    ],
    "salir a cenar": [
      { label: "Diversión",    value:  3 },
      { label: "Ahorro",       value: -3 },
      { label: "Bienestar",    value:  1 },
    ],
    "comer en casa y ahorrar": [
      { label: "Diversión",    value:  1 },
      { label: "Ahorro",       value:  3 },
      { label: "Bienestar",    value: -1 },
    ],
  };

  function renderStats(stats) {
    return (
      '<div class="widget-stats">' +
      stats
        .map(({ label, value }) => {
          const positive = value > 0;
          const cls = positive ? "stat-pos" : "stat-neg";
          const sign = positive ? "+" : "−";
          const indicators = sign.repeat(Math.abs(value));
          return (
            `<div class="stat-row">` +
            `<span class="stat-label">${label}</span>` +
            `<span class="stat-value ${cls}">${indicators}</span>` +
            `</div>`
          );
        })
        .join("") +
      "</div>"
    );
  }

  const widget = document.getElementById("widget-oportunidad");
  if (!widget) return;

  widget.querySelectorAll(".widget-scenario").forEach((scenario) => {
    const buttons = scenario.querySelectorAll(".widget-btn");
    const result = scenario.querySelector(".widget-result");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = btn.dataset.chosen;
        const cost = btn.dataset.cost;
        const stats = STATS[chosen] || [];

        buttons.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");

        result.innerHTML =
          renderStats(stats) +
          `<p class="widget-result-text">` +
          `Elegiste <strong>${chosen}</strong>. ` +
          `Lo que resignás —tu costo de oportunidad— es <strong>${cost}</strong>.` +
          `</p>`;
        result.hidden = false;
      });
    });
  });
})();
