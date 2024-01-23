import setActive from "./setActive";
import PocketBase from "pocketbase";
import renderPagination from "./renderPagination";
import renderCards from "./renderCards";
import getPaginationState from "./getPaginationState";
import showLoader from "./showLoader";
import hideLoader from "./hideLoader";
import { INITIAL_PAGE, PAGINATION_LENGTH } from "./vars";
import getElementsPerPage from "./getElementsPerPage";
import setUrlParams from "./setUrlParams";

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
  const loader = document.querySelector(".cards__loader");

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

    num.parentElement.addEventListener("click", (e) => {
      const target = e.currentTarget;

      showLoader(loader, async () => {
        const perPage = getElementsPerPage();
        let filteredList = await pb.collection("pockemon").getList(INITIAL_PAGE, perPage, {
          filter: `type~"${target.dataset.name !== "All" ? target.dataset.name : ""}"`,
        });
        /* Инициализируем начальное состояние */
        const initValues = getPaginationState(1, filteredList.totalPages, PAGINATION_LENGTH);
        getPaginationState(1, filteredList.totalPages, PAGINATION_LENGTH);

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        paginationNum.forEach((item, index) => {
          if (index <= initValues[index]) {
            item.removeAttribute("hidden");
            item.innerHTML = initValues[index];
          } else {
            item.setAttribute("hidden", true);
          }

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
        setActive(target, "type--active");
        setTimeout(() => {
          renderCards(filteredList.items);
        }, 1400);
        renderPagination(filteredList);

        /* Задаем параметры в урле */
        setUrlParams();
      });

      hideLoader(loader);
    });
  }
}

export default setFilter;
