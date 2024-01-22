function getPaginationState(current, total, length, firstButton, lastButton) {
  let start = Math.min(current - Math.floor(length / 2), total + 1 - length);
  const startFiller = firstButton.nextElementSibling;
  const lastFiller = lastButton.previousElementSibling;

  if (length > total) length = total;

  for (let i = 0; i < length; i++) {
    const value = (start < 1 ? 1 : start) + i;
    const paginationNum = `<button class="pagination__link">${value}</button>`;

    lastFiller.insertAdjacentHTML("beforebegin", paginationNum);

    if (startFiller.nextElementSibling.textContent == 1) {
      firstButton.setAttribute("hidden", true);
      startFiller.setAttribute("hidden", true);
    } else {
      firstButton.removeAttribute("hidden");
      startFiller.removeAttribute("hidden");
    }

    if (lastFiller.previousElementSibling.textContent == total) {
      lastButton.setAttribute("hidden", true);
      lastFiller.setAttribute("hidden", true);
    } else {
      lastButton.removeAttribute("hidden");
      lastFiller.removeAttribute("hidden");
    }
  }
}

export default getPaginationState;
