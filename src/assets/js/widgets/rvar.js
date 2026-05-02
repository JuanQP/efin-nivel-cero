(function () {
  const widget = document.getElementById("widget-rvar");
  if (!widget) return;

  const btns      = widget.querySelectorAll(".rvar-btn");
  const accActor  = document.getElementById("rvar-accionista");
  const accResult = document.getElementById("rvar-acc-result");
  const accNote   = document.getElementById("rvar-acc-note");
  const insight   = document.getElementById("rvar-insight");

  const scenarios = {
    good: {
      accVal:    "$200",
      accNote:   "Dividendo extraordinario — la empresa tuvo un año excepcional.",
      accClass:  "rvar-actor rvar-actor--good",
      insightText: "Año récord: el accionista recibe 4× más que el bonista. Es la recompensa por haber asumido riesgo real."
    },
    bad: {
      accVal:    "$20",
      accNote:   "Dividendo mínimo — la empresa apenas cubrió sus costos este año.",
      accClass:  "rvar-actor rvar-actor--bad",
      insightText: "Año difícil: el bonista sigue cobrando $50 pactados. El accionista recibe $20. El riesgo es real en ambas direcciones."
    }
  };

  function render(scenario) {
    var s = scenarios[scenario];
    accResult.textContent = s.accVal;
    accNote.textContent   = s.accNote;
    accActor.className    = s.accClass;
    insight.textContent   = s.insightText;
  }

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      render(btn.dataset.scenario);
    });
  });

  render("good");
})();
