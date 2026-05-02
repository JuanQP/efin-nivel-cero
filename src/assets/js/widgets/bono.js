(function () {
  const widget = document.getElementById("widget-bono");
  if (!widget) return;

  const buttons    = widget.querySelectorAll(".bono-btn");
  const rateDisplay = document.getElementById("bono-rate-display");
  const bonoRows   = document.getElementById("bono-rows");
  const totalCpns  = document.getElementById("bono-total-coupons");
  const grandTotal = document.getElementById("bono-grand-total");
  const insight    = document.getElementById("bono-insight");

  const CAPITAL = 1000;
  const YEARS   = 5;

  function fmt(n) {
    return "$" + Math.round(n).toLocaleString("es-AR");
  }

  function render(rate) {
    const coupon = CAPITAL * rate / 100;
    rateDisplay.textContent = rate + "%";
    bonoRows.innerHTML = "";

    for (let y = 1; y <= YEARS; y++) {
      const isLast = y === YEARS;
      const devol  = isLast ? CAPITAL : 0;
      const total  = coupon + devol;
      const row    = document.createElement("div");
      row.className = "bono-row" + (isLast ? " bono-row--last" : "");
      row.innerHTML =
        "<span>Año " + y + "</span>" +
        "<span class=\"bono-coupon\">" + fmt(coupon) + "</span>" +
        "<span class=\"bono-devol\">"  + (devol ? fmt(devol) : "—") + "</span>" +
        "<span class=\"bono-year-total\">" + fmt(total) + "</span>";
      bonoRows.appendChild(row);
    }

    const totalCouponVal = coupon * YEARS;
    const grand = totalCouponVal + CAPITAL;
    totalCpns.textContent = fmt(totalCouponVal);
    grandTotal.textContent = fmt(grand);

    const gain = totalCouponVal;
    if (rate <= 2) {
      insight.textContent =
        "Ganás " + fmt(gain) + " en intereses sobre " + fmt(CAPITAL) + " prestados. " +
        "Tasa baja porque el emisor es muy confiable — el mercado no descuenta riesgo de impago.";
    } else if (rate <= 5) {
      insight.textContent =
        "Ganás " + fmt(gain) + " en intereses en 5 años. " +
        "Riesgo moderado, retorno moderado. El emisor tiene historial pero no es garantía absoluta.";
    } else {
      insight.textContent =
        "Ganás " + fmt(gain) + " en intereses — pero la tasa alta refleja riesgo real. " +
        "El mercado descuenta que este emisor puede no pagar. Mayor retorno potencial, mayor probabilidad de pérdida.";
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      render(parseInt(btn.dataset.rate, 10));
    });
  });

  render(2);
})();
