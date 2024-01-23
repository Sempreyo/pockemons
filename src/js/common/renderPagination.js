import getPaginationState from "./getPaginationState";
import PocketBase from "pocketbase";
import renderCards from "./renderCards";
import setActive from "./setActive";
import showLoader from "./showLoader";
import hideLoader from "./hideLoader";
import { PAGINATION_LENGTH } from "./vars";
import getElementsPerPage from "./getElementsPerPage";
import setUrlParams from "./setUrlParams";

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
    hideLoader(loader);
  };

  /* Клик на кнопку "First" */
  paginationFirst.addEventListener("click", () => {
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

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      paginationNum.forEach((item, index) => {
        if (index <= values[index]) {
          item.removeAttribute("hidden");
          item.innerHTML = values[index];
        } else {
          item.setAttribute("hidden", true);
        }

        if (index === 0) {
          setActive(item, "pagination__link--active");
        }
      });

      paginationFirst.setAttribute("hidden", true);
      startFiller.setAttribute("hidden", true);

      paginationLast.removeAttribute("hidden");
      lastFiller.removeAttribute("hidden");

      container.innerHTML = "";
      setTimeout(() => {
        renderCards(data.items);
      }, 1400);

      /* Задаем параметры в урле */
      setUrlParams();
    });

    hideCardsLoader();
  });

  /* Клик на кнопку "Last" */
  paginationLast.addEventListener("click", () => {
    showLoader(loader, async () => {
      const perPage = getElementsPerPage();
      const data = await pb.collection("pockemon").getList(cardsData.totalPages, perPage, {
        filter: `type~"${
          document.querySelector(".type--active").dataset.name !== "All"
            ? document.querySelector(".type--active").dataset.name
            : ""
        }"`,
      });

      const values = getPaginationState(data.totalPages, data.totalPages, PAGINATION_LENGTH);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      paginationNum.forEach((item, index) => {
        if (index <= values[index]) {
          item.removeAttribute("hidden");
          item.innerHTML = values[index];
        } else {
          item.setAttribute("hidden", true);
        }

        if (index === values.length - 1) {
          setActive(item, "pagination__link--active");
        }
      });

      paginationLast.setAttribute("hidden", true);
      lastFiller.setAttribute("hidden", true);

      paginationFirst.removeAttribute("hidden");
      startFiller.removeAttribute("hidden");

      container.innerHTML = "";
      setTimeout(() => {
        renderCards(data.items);
      }, 1400);

      /* Задаем параметры в урле */
      setUrlParams();
    });

    hideCardsLoader();
  });

  paginationNum.forEach((num) => {
    num.addEventListener("click", (e) => {
      /* Показываем сначала лоадер, потом отрисованный блок */
      showLoader(loader, async () => {
        const curPage = e.target.textContent;
        const perPage = getElementsPerPage();
        const data = await pb.collection("pockemon").getList(curPage, perPage, {
          filter: `type~"${
            document.querySelector(".type--active").dataset.name !== "All"
              ? document.querySelector(".type--active").dataset.name
              : ""
          }"`,
        });
        const values = getPaginationState(curPage, data.totalPages, PAGINATION_LENGTH);

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        paginationNum.forEach((item, index) => {
          if (index <= values[index]) {
            item.removeAttribute("hidden");
            item.innerHTML = values[index];
          } else {
            item.setAttribute("hidden", true);
          }
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

        container.innerHTML = "";
        setTimeout(() => {
          renderCards(data.items);
        }, 1400);

        /* Задаем параметры в урле */
        setUrlParams();
      });

      hideCardsLoader();
    });
  });
}

export default renderPagination;
