import renderBlocks from "./renderBlocks";

async function renderPagination(cardsData) {
  const pagination = document.querySelector(".pagination");
  const paginationFirst = pagination.querySelector(".pagination__link--first");
  const paginationLast = pagination.querySelector(".pagination__link--last");
  const paginationNum = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last):not(.pagination__filler--first):not(.pagination__filler--last)",
  );

  /* Клик на кнопку "First" */
  paginationFirst.addEventListener("click", () => {
    renderBlocks("", "", true);
  });

  /* Клик на кнопку "Last" */
  paginationLast.addEventListener("click", () => {
    renderBlocks(cardsData.totalPages, "", "", true);
  });

  paginationNum.forEach((num) => {
    num.addEventListener("click", (e) => {
      const curPage = e.target.textContent;

      renderBlocks(curPage);
    });
  });
}

export default renderPagination;
