import setActive from "./setActive";
import showLoader from "./showLoader";
import hideLoader from "./hideLoader";
import renderBlocks from "./renderBlocks";

export default function setPerPageButton() {
  const perPageButtons = document.querySelectorAll(".per-page__button");
  const loader = document.querySelector(".cards__loader");

  const hideCardsLoader = () => {
    hideLoader(loader);
  };

  perPageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActive(button, "per-page__button--active");

      /* Показываем сначала лоадер, потом отрисованный блок */
      showLoader(loader, async () => {
        await renderBlocks();
      });

      hideCardsLoader();
    });
  });
}
