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
  });
  const values = getPaginationState(curPage, data.totalPages, PAGINATION_LENGTH);

  scrollToTop();

  paginationNum.forEach((item, index) => {
    if (index <= values[index]) {
      item.removeAttribute("hidden");
      item.innerHTML = values[index];
    } else {
      item.setAttribute("hidden", "true");
    }

    if (isResetPagination || (isFirstButton && index === 0)) {
      setActive(item, "pagination__link--active");
    }

    if (isLastButton && index === values.length - 1) {
      setActive(item, "pagination__link--active");
    }
  });

  if (+startFiller.nextElementSibling.textContent === 1) {
    paginationFirst.setAttribute("hidden", "true");
    startFiller.setAttribute("hidden", "true");
  } else {
    paginationFirst.removeAttribute("hidden");
    startFiller.removeAttribute("hidden");
  }

  if (+lastFiller.previousElementSibling.textContent === data.totalPages) {
    paginationLast.setAttribute("hidden", "true");
    lastFiller.setAttribute("hidden", "true");
  } else {
    paginationLast.removeAttribute("hidden");
    lastFiller.removeAttribute("hidden");
  }

  if (isFirstButton) {
    paginationFirst.setAttribute("hidden", "true");
    startFiller.setAttribute("hidden", "true");
    paginationLast.removeAttribute("hidden");
    lastFiller.removeAttribute("hidden");
  }

  if (isLastButton) {
    paginationFirst.removeAttribute("hidden");
    startFiller.removeAttribute("hidden");
    paginationLast.setAttribute("hidden", "true");
    lastFiller.setAttribute("hidden", "true");
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
