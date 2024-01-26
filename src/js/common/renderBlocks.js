import getElementsPerPage from "./getElementsPerPage";
import getPaginationState from "./getPaginationState";
import { PAGINATION_LENGTH } from "./vars";
import scrollToTop from "./scrollToTop";
import setActive from "./setActive";
import renderCards from "./renderCards";
import setUrlParams from "./setUrlParams";
import PocketBase from "pocketbase";
import renderPagination from "./renderPagination";

export default async function renderBlocks(
  curPage,
  isResetPagination,
  isFirstButton,
  isLastButton,
) {
  curPage = curPage ? curPage : 1;
  const container = document.querySelector(".cards__grid");
  const pagination = document.querySelector(".pagination");
  const paginationFirst = pagination.querySelector(".pagination__link--first");
  const paginationLast = pagination.querySelector(".pagination__link--last");
  const startFiller = paginationFirst.nextElementSibling;
  const lastFiller = paginationLast.previousElementSibling;
  const paginationNum = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last):not(.pagination__filler--first):not(.pagination__filler--last)",
  );
  const pb = new PocketBase("http://127.0.0.1:8090");
  const perPage = getElementsPerPage();
  const data = await pb.collection("pockemon").getList(curPage, perPage, {
    filter: `type~"${
      document.querySelector(".type--active").dataset.name !== "All"
        ? document.querySelector(".type--active").dataset.name
        : ""
    }"`,
    sort: "+id",
  });
  const values = getPaginationState(curPage, data.totalPages, PAGINATION_LENGTH);

  const showStartNavigation = () => {
    paginationFirst.removeAttribute("hidden");
    startFiller.removeAttribute("hidden");
  };

  const hideStartNavigation = () => {
    paginationFirst.setAttribute("hidden", "true");
    startFiller.setAttribute("hidden", "true");
  };

  const showEndNavigation = () => {
    paginationLast.removeAttribute("hidden");
    lastFiller.removeAttribute("hidden");
  };

  const hideEndNavigation = () => {
    paginationLast.setAttribute("hidden", "true");
    lastFiller.setAttribute("hidden", "true");
  };

  scrollToTop();

  paginationNum.forEach((item, index) => {
    if (index <= values[index]) {
      item.removeAttribute("hidden");
      item.innerHTML = values[index];
    } else {
      item.setAttribute("hidden", "true");
    }

    /* При клике на фильтр с типом переходим на первую страницу */
    if (isResetPagination && index === 0) {
      setActive(item, "pagination__link--active");
    }

    if (isFirstButton && index === 0) {
      setActive(item, "pagination__link--active");
    }

    if (isLastButton && index === values.length - 1) {
      setActive(item, "pagination__link--active");
    }
  });

  if (+startFiller.nextElementSibling.textContent === 1) {
    hideStartNavigation();
  } else {
    showStartNavigation();
  }

  if (+lastFiller.previousElementSibling.textContent === data.totalPages) {
    hideEndNavigation();
  } else {
    showEndNavigation();
  }

  if (isFirstButton) {
    hideStartNavigation();
    showEndNavigation();
  }

  if (isLastButton) {
    hideEndNavigation();
    showStartNavigation();
  }

  /* Если количество страниц меньше или равно отрезку пагинации скрываем всю навигацию */
  if (data.totalPages <= PAGINATION_LENGTH) {
    hideStartNavigation();
    hideEndNavigation();
  }

  if (!isResetPagination && !isFirstButton && !isLastButton) {
    paginationNum.forEach((item) => {
      if (+curPage === +item.textContent) {
        setActive(item, "pagination__link--active");
      }
    });
  }

  container.innerHTML = "";
  setTimeout(() => {
    renderCards(data.items);
  }, 1400);

  if (isResetPagination) {
    await renderPagination(data);
  }

  /* Задаем параметры в урле */
  setUrlParams();
}
