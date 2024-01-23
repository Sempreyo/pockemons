import getPaginationState from "./getPaginationState";
import PocketBase from "pocketbase";
import renderCards from "./renderCards";
import setActive from "./setActive";
import showLoader from "./showLoader";
import hideLoader from "./hideLoader";
import { ELEMENTS_PER_PAGE, PAGINATION_LENGTH } from "./vars";

async function renderPagination(cardsData) {
  const container = document.querySelector(".cards__grid");
  const pagination = document.querySelector(".pagination");
  const paginationFirst = pagination.querySelector(".pagination__link--first");
  const paginationLast = pagination.querySelector(".pagination__link--last");
  const startFiller = paginationFirst.nextElementSibling;
  const lastFiller = paginationLast.previousElementSibling;
  const pb = new PocketBase("http://127.0.0.1:8090");
  const paginationNum = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last):not(.pagination__filler--first):not(.pagination__filler--last)",
  );
  const loader = document.querySelector(".cards__loader");

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

  /* Клик на кнопку "First" */
  paginationFirst.addEventListener("click", () => {
    showLoader(loader, async () => {
      const data = await pb.collection("pockemon").getList(1, ELEMENTS_PER_PAGE, {
        filter: `type~"${
          document.querySelector(".type--active").dataset.name !== "All"
            ? document.querySelector(".type--active").dataset.name
            : ""
        }"`,
      });
      const values = getPaginationState(1, data.totalPages, PAGINATION_LENGTH);

      paginationNum.forEach((item, index) => {
        item.innerHTML = values[index];

        if (index === 0) {
          setActive(item, "pagination__link--active");
        }
      });

      paginationFirst.setAttribute("hidden", true);
      startFiller.setAttribute("hidden", true);

      paginationLast.removeAttribute("hidden");
      lastFiller.removeAttribute("hidden");

      /* Для предотвращения скачка при перерисовке задаем фиксированную высоту контейнеру */
      container.style.height = `${container.offsetHeight}px`;

      container.innerHTML = "";
      renderCards(data.items);
    });

    hideCardsLoader();
  });

  /* Клик на кнопку "Last" */
  paginationLast.addEventListener("click", () => {
    showLoader(loader, async () => {
      const data = await pb
        .collection("pockemon")
        .getList(cardsData.totalPages, ELEMENTS_PER_PAGE, {
          filter: `type~"${
            document.querySelector(".type--active").dataset.name !== "All"
              ? document.querySelector(".type--active").dataset.name
              : ""
          }"`,
        });

      const values = getPaginationState(data.totalPages, data.totalPages, PAGINATION_LENGTH);

      paginationNum.forEach((item, index) => {
        item.innerHTML = values[index];

        if (index === paginationNum.length - 1) {
          setActive(item, "pagination__link--active");
        }
      });

      paginationLast.setAttribute("hidden", true);
      lastFiller.setAttribute("hidden", true);

      paginationFirst.removeAttribute("hidden");
      startFiller.removeAttribute("hidden");

      /* Для предотвращения скачка при перерисовке задаем фиксированную высоту контейнеру */
      container.style.height = `${container.offsetHeight}px`;

      container.innerHTML = "";
      renderCards(data.items);
    });

    hideCardsLoader();
  });

  paginationNum.forEach((num) => {
    num.addEventListener("click", (e) => {
      /* Показываем сначала лоадер, потом отрисованный блок */
      showLoader(loader, async () => {
        const curPage = e.target.textContent;
        const data = await pb.collection("pockemon").getList(curPage, ELEMENTS_PER_PAGE, {
          filter: `type~"${
            document.querySelector(".type--active").dataset.name !== "All"
              ? document.querySelector(".type--active").dataset.name
              : ""
          }"`,
        });
        const values = getPaginationState(curPage, data.totalPages, PAGINATION_LENGTH);

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
          if (curPage == item.textContent) {
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

export default renderPagination;
