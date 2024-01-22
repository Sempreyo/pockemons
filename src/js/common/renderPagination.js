import getPaginationState from "./getPaginationState";
import PocketBase from "pocketbase";
import renderCards from "./renderCards";

async function renderPagination(data) {
  const container = document.querySelector(".cards__grid");
  const pagination = document.querySelector(".pagination");
  const paginationFirst = pagination.querySelector(".pagination__link--first");
  const paginationLast = pagination.querySelector(".pagination__link--last");
  const paginationLinks = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last)",
  );
  const ELEMENTS_PER_PAGE = 6;
  const PAGINATION_LENGTH = 5;
  const pb = new PocketBase("http://127.0.0.1:8090");

  /* Клик на кнопку "First" */
  paginationFirst.addEventListener("click", async () => {
    const data = await pb.collection("pockemon").getList(1, ELEMENTS_PER_PAGE, {
      filter: `type~"${
        document.querySelector(".type--active").dataset.name !== "All"
          ? document.querySelector(".type--active").dataset.name
          : ""
      }"`,
    });

    container.innerHTML = "";
    renderCards(data.items);
  });

  /* Клик на кнопку "Last" */
  paginationLast.addEventListener("click", async () => {
    const data = await pb.collection("pockemon").getList(data.totalPages, ELEMENTS_PER_PAGE, {
      filter: `type~"${
        document.querySelector(".type--active").dataset.name !== "All"
          ? document.querySelector(".type--active").dataset.name
          : ""
      }"`,
    });

    container.innerHTML = "";
    renderCards(data.items);
  });

  /* Очищаем списов всех ссылок с номером страницы */
  paginationLinks.forEach((link) => link.remove());

  /* Инициализируем начальное состояние */
  getPaginationState(1, data.totalPages, PAGINATION_LENGTH, paginationFirst, paginationLast);

  const paginationNum = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last):not(.pagination__filler--first):not(.pagination__filler--last)",
  );

  paginationNum.forEach((num) => {
    num.addEventListener("click", async (e) => {
      const curPage = e.target.textContent;

      const data = await pb.collection("pockemon").getList(curPage, ELEMENTS_PER_PAGE, {
        filter: `type~"${
          document.querySelector(".type--active").dataset.name !== "All"
            ? document.querySelector(".type--active").dataset.name
            : ""
        }"`,
      });

      /*paginationNum.forEach((item) => item.remove());

      getPaginationState(
        curPage,
        data.totalPages,
        PAGINATION_LENGTH,
        paginationFirst,
        paginationLast,
      );*/

      //setActive(e.target, "pagination__link--active");
      container.innerHTML = "";
      renderCards(data.items);
    });
  });
}

export default renderPagination;
