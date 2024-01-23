import setActive from "./setActive";
import PocketBase from "pocketbase";
import renderPagination from "./renderPagination";
import renderCards from "./renderCards";
import getPaginationState from "./getPaginationState";
import showLoader from "./showLoader";
import hideLoader from "./hideLoader";
import { INITIAL_PAGE, PAGINATION_LENGTH } from "./vars";
import getElementsPerPage from "./getElementsPerPage";

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

        /* Для предотвращения скачка при перерисовке задаем фиксированную высоту контейнеру */
        container.style.height = `${container.offsetHeight}px`;

        container.innerHTML = "";
        setActive(e.target, "type--active");
        renderCards(filteredList.items);
        renderPagination(filteredList);
      });

      hideLoader(loader, () => {
        /* Убираем фиксированную высоту контейнера */
        container.style.height = "auto";

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      });
    });
  }
}

export default setFilter;
