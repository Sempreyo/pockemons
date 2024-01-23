import getPaginationState from "./getPaginationState";
import PocketBase from "pocketbase";
import renderCards from "./renderCards";
import setActive from "./setActive";

async function renderPagination(cardsData) {
  const container = document.querySelector(".cards__grid");
  const pagination = document.querySelector(".pagination");
  const paginationFirst = pagination.querySelector(".pagination__link--first");
  const paginationLast = pagination.querySelector(".pagination__link--last");
  const startFiller = paginationFirst.nextElementSibling;
  const lastFiller = paginationLast.previousElementSibling;
  const ELEMENTS_PER_PAGE = 6;
  const PAGINATION_LENGTH = 5;
  const pb = new PocketBase("http://127.0.0.1:8090");
  const paginationNum = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last):not(.pagination__filler--first):not(.pagination__filler--last)",
  );

  /* Клик на кнопку "First" */
  paginationFirst.addEventListener("click", async () => {
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

    container.innerHTML = "";
    renderCards(data.items);
  });

  /* Клик на кнопку "Last" */
  paginationLast.addEventListener("click", async () => {
    const data = await pb.collection("pockemon").getList(cardsData.totalPages, ELEMENTS_PER_PAGE, {
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

    container.innerHTML = "";
    renderCards(data.items);
  });

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

      container.innerHTML = "";
      renderCards(data.items);
    });
  });
}

export default renderPagination;
