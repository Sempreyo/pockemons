import renderCards from "./renderCards";
import getUrlParams from "./getUrlParams";
import setActive from "./setActive";
import renderPagination from "./renderPagination";
import getPaginationState from "./getPaginationState";
import { PAGINATION_LENGTH } from "./vars";

export default async function setInitialState(pb) {
  const pages = document.querySelectorAll(".pagination__link");
  const perPages = document.querySelectorAll(".per-page__button");
  const typeValues = document.querySelectorAll(".type");
  const paramPage = getUrlParams(true) ? getUrlParams(true) : "1";
  const paramPerPage = getUrlParams("", true) ? getUrlParams("", true) : "12";
  const paramType = getUrlParams("", "", true) ? getUrlParams("", "", true) : "All";
  let initialState = await pb.collection("pockemon").getList(paramPage, paramPerPage, {
    filter: `type~"${paramType !== "All" ? paramType : ""}"`,
  });
  const values = getPaginationState(paramPage, initialState.totalPages, PAGINATION_LENGTH);
  const pagination = document.querySelector(".pagination");
  const paginationFirst = pagination.querySelector(".pagination__link--first");
  const paginationLast = pagination.querySelector(".pagination__link--last");
  const startFiller = paginationFirst.nextElementSibling;
  const lastFiller = paginationLast.previousElementSibling;
  const paginationNum = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last):not(.pagination__filler--first):not(.pagination__filler--last)",
  );

  pages.forEach((item) => {
    if (item.textContent === paramPage) {
      setActive(item, "pagination__link--active");
    }
  });

  perPages.forEach((item) => {
    if (item.textContent === paramPerPage) {
      setActive(item, "per-page__button--active");
    }
  });

  typeValues.forEach((item) => {
    if (item.dataset.name === paramType) {
      setActive(item, "type--active");
    }
  });

  renderCards(initialState.items);
  await renderPagination(initialState);

  paginationNum.forEach((item, index) => {
    if (index <= values[index]) {
      item.removeAttribute("hidden");
      item.innerHTML = values[index];
    } else {
      item.setAttribute("hidden", "true");
    }
  });

  if (+startFiller.nextElementSibling.textContent === 1) {
    paginationFirst.setAttribute("hidden", "true");
    startFiller.setAttribute("hidden", "true");
  } else {
    paginationFirst.removeAttribute("hidden");
    startFiller.removeAttribute("hidden");
  }

  if (+lastFiller.previousElementSibling.textContent === initialState.totalPages) {
    paginationLast.setAttribute("hidden", "true");
    lastFiller.setAttribute("hidden", "true");
  } else {
    paginationLast.removeAttribute("hidden");
    lastFiller.removeAttribute("hidden");
  }
}
