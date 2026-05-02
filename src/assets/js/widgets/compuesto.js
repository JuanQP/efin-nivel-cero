(function () {
  const widget = document.getElementById("widget-compuesto");
  if (!widget) return;

  const NS = "http://www.w3.org/2000/svg";
  const svg    = document.getElementById("comp-svg");
  const sli    = document.getElementById("comp-slider");
  const rateEl = document.getElementById("comp-rate");
  const rComp  = document.getElementById("comp-res-compound");
  const rSimp  = document.getElementById("comp-res-simple");

  const ML = 52, MT = 15, MR = 14, MB = 28;
  const W = 380, H = 195;
  const CW = W - ML - MR;
  const CH = H - MT - MB;
  const YEARS = 30;
  const P = 1000;

  function fmt(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }

  function mk(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  }

  function tx(y)       { return ML + (y / YEARS) * CW; }
  function ty(v, max)  { return MT + CH * (1 - v / max); }

  function render() {
    const r  = parseInt(sli.value, 10) / 100;
    const fC = P * Math.pow(1 + r, YEARS);
    const fS = P * (1 + r * YEARS);
    const max = fC * 1.1;

    rateEl.textContent = sli.value;
    svg.innerHTML = "";

    // X axis
    svg.appendChild(mk("line", { x1: ML, y1: MT+CH, x2: ML+CW, y2: MT+CH, stroke: "#d1d5db", "stroke-width": "1" }));

    // X ticks + labels
    [0, 10, 20, 30].forEach(yr => {
      const x = tx(yr);
      svg.appendChild(mk("line", { x1: x, y1: MT+CH, x2: x, y2: MT+CH+4, stroke: "#9ca3af", "stroke-width": "1" }));
      const t = mk("text", { x, y: MT+CH+14, "text-anchor": "middle", "font-size": "10", fill: "#9ca3af" });
      t.textContent = yr === 0 ? "Hoy" : yr === 30 ? "30 años" : yr;
      svg.appendChild(t);
    });

    // Flat line (colchón)
    const yFlat = ty(P, max);
    svg.appendChild(mk("line", { x1: ML, y1: yFlat, x2: ML+CW, y2: yFlat, stroke: "#d1d5db", "stroke-width": "1.5", "stroke-dasharray": "5 4" }));
    const lblFlat = mk("text", { x: ML-4, y: yFlat+4, "text-anchor": "end", "font-size": "10", fill: "#9ca3af" });
    lblFlat.textContent = "$1.000";
    svg.appendChild(lblFlat);

    // Simple interest line (linear)
    svg.appendChild(mk("line", {
      x1: ML,    y1: ty(P,  max),
      x2: ML+CW, y2: ty(fS, max),
      stroke: "#d97706", "stroke-width": "2",
    }));

    // Compound polyline
    const pts = Array.from({ length: YEARS + 1 }, (_, y) =>
      tx(y) + "," + ty(P * Math.pow(1 + r, y), max)
    ).join(" ");
    svg.appendChild(mk("polyline", {
      points: pts, fill: "none",
      stroke: "#b45309", "stroke-width": "2.5", "stroke-linejoin": "round",
    }));

    // End dot on compound line
    svg.appendChild(mk("circle", { cx: tx(30), cy: ty(fC, max), r: "4", fill: "#b45309" }));

    // Update result labels
    rComp.textContent = fmt(fC);
    rSimp.textContent = fmt(fS);
  }

  sli.addEventListener("input", render);
  render();
})();
