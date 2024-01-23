import setActive from "./setActive";
import showLoader from "./showLoader";
import getElementsPerPage from "./getElementsPerPage";
import getPaginationState from "./getPaginationState";
import { PAGINATION_LENGTH } from "./vars";
import renderCards from "./renderCards";
import hideLoader from "./hideLoader";
import PocketBase from "pocketbase";

function setPerPageButton() {
  const container = document.querySelector(".cards__grid");
  const perPageButtons = document.querySelectorAll(".per-page__button");
  const loader = document.querySelector(".cards__loader");
  const pagination = document.querySelector(".pagination");
  const paginationFirst = pagination.querySelector(".pagination__link--first");
  const paginationLast = pagination.querySelector(".pagination__link--last");
  const startFiller = paginationFirst.nextElementSibling;
  const lastFiller = paginationLast.previousElementSibling;
  const pb = new PocketBase("http://127.0.0.1:8090");
  const paginationNum = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last):not(.pagination__filler--first):not(.pagination__filler--last)",
  );

  const hideCardsLoader = () => {
    hideLoader(loader, () => {
      /* Убираем фиксированную высоту контейнера */
      container.style.height = "auto";

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  };

  perPageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActive(button, "per-page__button--active");

      /* Показываем сначала лоадер, потом отрисованный блок */
      showLoader(loader, async () => {
        const perPage = getElementsPerPage();
        const data = await pb.collection("pockemon").getList(1, perPage, {
          filter: `type~"${
            document.querySelector(".type--active").dataset.name !== "All"
              ? document.querySelector(".type--active").dataset.name
              : ""
          }"`,
        });
        const values = getPaginationState(1, data.totalPages, PAGINATION_LENGTH);

        paginationNum.forEach((item, index) => {
          item.innerHTML = values[index];
        });

        if (startFiller.nextElementSibling.textContent == 1) {
          paginationFirst.setAttribute("hidden", true);
          startFiller.setAttribute("hidden", true);
        } else {
          paginationFirst.removeAttribute("hidden");
          startFiller.removeAttribute("hidden");
        }

        if (lastFiller.previousElementSibling.textContent == data.totalPages) {
          paginationLast.setAttribute("hidden", true);
          lastFiller.setAttribute("hidden", true);
        } else {
          paginationLast.removeAttribute("hidden");
          lastFiller.removeAttribute("hidden");
        }

        paginationNum.forEach((item) => {
          if (1 == item.textContent) {
            setActive(item, "pagination__link--active");
          }
        });

        /* Для предотвращения скачка при перерисовке задаем фиксированную высоту контейнеру */
        container.style.height = `${container.offsetHeight}px`;

        container.innerHTML = "";
        renderCards(data.items);
      });

      hideCardsLoader();
    });
  });
}

export default setPerPageButton;
