(function () {
  const widget = document.getElementById("widget-trueque");
  if (!widget) return;

  const MAX_N = 7;
  let n = 2;

  const svg     = document.getElementById("barter-svg");
  const countEl = document.getElementById("barter-count");
  const msgEl   = document.getElementById("barter-message");
  const btnAdd  = document.getElementById("btn-add-person");
  const btnReset = document.getElementById("btn-barter-reset");

  const CX = 150, CY = 120, R = 85;
  const EMOJIS = ["🧑", "👩", "🧔", "👧", "👴", "👨", "👵"];

  function nodePos(i, total) {
    const angle = (2 * Math.PI * i / total) - Math.PI / 2;
    return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
  }

  function svgEl(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }

  function render() {
    svg.innerHTML = "";
    const connections = n * (n - 1) / 2;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = nodePos(i, n), b = nodePos(j, n);
        const line = svgEl("line");
        line.setAttribute("x1", a.x); line.setAttribute("y1", a.y);
        line.setAttribute("x2", b.x); line.setAttribute("y2", b.y);
        line.setAttribute("class", "barter-line");
        svg.appendChild(line);
      }
    }

    for (let i = 0; i < n; i++) {
      const pos = nodePos(i, n);
      const circle = svgEl("circle");
      circle.setAttribute("cx", pos.x); circle.setAttribute("cy", pos.y);
      circle.setAttribute("r", 22);
      circle.setAttribute("class", "barter-node");
      svg.appendChild(circle);

      const text = svgEl("text");
      text.setAttribute("x", pos.x); text.setAttribute("y", pos.y);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "central");
      text.setAttribute("class", "barter-emoji");
      text.textContent = EMOJIS[i];
      svg.appendChild(text);
    }

    countEl.innerHTML =
      "<strong>" + connections + "</strong> par" + (connections !== 1 ? "es" : "") +
      " posible" + (connections !== 1 ? "s" : "") + " de intercambio";

    btnAdd.disabled = n >= MAX_N;

    msgEl.textContent = n >= MAX_N
      ? "Con solo 7 personas ya hay 21 pares posibles. En una economía con miles de personas y cientos de bienes distintos, coordinar todo esto sin un intermediario es prácticamente imposible."
      : "";
  }

  btnAdd.addEventListener("click", () => { if (n < MAX_N) { n++; render(); } });
  btnReset.addEventListener("click", () => { n = 2; render(); });

  render();
})();
