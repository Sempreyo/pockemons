import showLoader from "./showLoader";
import hideLoader from "./hideLoader";
import renderBlocks from "./renderBlocks";

async function renderPagination(cardsData) {
  const pagination = document.querySelector(".pagination");
  const paginationFirst = pagination.querySelector(".pagination__link--first");
  const paginationLast = pagination.querySelector(".pagination__link--last");
  const paginationNum = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last):not(.pagination__filler--first):not(.pagination__filler--last)",
  );
  const loader = document.querySelector(".cards__loader");

  const hideCardsLoader = () => {
    hideLoader(loader);
  };

  /* Клик на кнопку "First" */
  paginationFirst.addEventListener("click", () => {
    showLoader(loader, async () => {
      await renderBlocks("", "", true);
    });

    hideCardsLoader();
  });

  /* Клик на кнопку "Last" */
  paginationLast.addEventListener("click", () => {
    showLoader(loader, async () => {
      await renderBlocks(cardsData.totalPages, "", "", true);
    });

    hideCardsLoader();
  });

  paginationNum.forEach((num) => {
    num.addEventListener("click", (e) => {
      /* Показываем сначала лоадер, потом отрисованный блок */
      showLoader(loader, async () => {
        const curPage = e.target.textContent;

        await renderBlocks(curPage);
      });

      hideCardsLoader();
    });
  });
}

export default renderPagination;
