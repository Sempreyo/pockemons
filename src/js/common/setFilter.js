import setActive from "./setActive";
import PocketBase from "pocketbase";
import renderPagination from "./renderPagination";
import renderCards from "./renderCards";
import getPaginationState from "./getPaginationState";

async function setFilter(container) {
  const typeNum = document.querySelectorAll(".type__num");
  const pb = new PocketBase("http://127.0.0.1:8090");
  const dataFull = await pb.collection("pockemon").getFullList();
  const dataTypes = await pb.collection("types").getList();
  const pagination = document.querySelector(".pagination");
  const paginationFirst = pagination.querySelector(".pagination__link--first");
  const paginationLast = pagination.querySelector(".pagination__link--last");
  const startFiller = paginationFirst.nextElementSibling;
  const lastFiller = paginationLast.previousElementSibling;
  const paginationNum = pagination.querySelectorAll(
    ".pagination__link:not(.pagination__link--first):not(.pagination__link--last):not(.pagination__filler--first):not(.pagination__filler--last)",
  );
  const INITIAL_PAGE = 1;
  const ELEMENTS_PER_PAGE = 6;
  const PAGINATION_LENGTH = 5;

  /* Количество покемонов каждого типа */
  for (const num of typeNum) {
    dataTypes.items.forEach((type) => {
      if (num.parentElement.dataset.name === "All") {
        num.textContent = dataFull.length;
      }

      if (num.parentElement.dataset.name === type.name.english) {
        num.textContent = type.amount;
      }
    });

    num.parentElement.addEventListener("click", async (e) => {
      let filteredList = await pb.collection("pockemon").getList(INITIAL_PAGE, ELEMENTS_PER_PAGE, {
        filter: `type~"${
          e.currentTarget.dataset.name !== "All" ? e.currentTarget.dataset.name : ""
        }"`,
      });
      /* Инициализируем начальное состояние */
      const initValues = ["1", "2", "3", "4", "5"];
      getPaginationState(1, filteredList.totalPages, PAGINATION_LENGTH);

      paginationNum.forEach((item, index) => {
        item.innerHTML = initValues[index];

        if (index === 0) {
          setActive(item, "pagination__link--active");
        }
      });

      if (startFiller.nextElementSibling.textContent == 1) {
        paginationFirst.setAttribute("hidden", true);
        startFiller.setAttribute("hidden", true);
      } else {
        paginationFirst.removeAttribute("hidden");
        startFiller.removeAttribute("hidden");
      }

      if (lastFiller.previousElementSibling.textContent == filteredList.totalPages) {
        paginationLast.setAttribute("hidden", true);
        lastFiller.setAttribute("hidden", true);
      } else {
        paginationLast.removeAttribute("hidden");
        lastFiller.removeAttribute("hidden");
      }

      container.innerHTML = "";
      setActive(e.target, "type--active");
      renderCards(filteredList.items);
      renderPagination(filteredList);
    });
  }
}

export default setFilter;
