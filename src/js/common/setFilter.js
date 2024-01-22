import setActive from "./setActive";
import PocketBase from "pocketbase";
import renderPagination from "./renderPagination";
import renderCards from "./renderCards";

async function setFilter(container) {
  const typeNum = document.querySelectorAll(".type__num");
  const pb = new PocketBase("http://127.0.0.1:8090");
  const dataFull = await pb.collection("pockemon").getFullList();
  const dataTypes = await pb.collection("types").getList();
  const INITIAL_PAGE = 1;
  const ELEMENTS_PER_PAGE = 6;

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

      container.innerHTML = "";
      setActive(e.target, "type--active");
      renderCards(filteredList.items);
      renderPagination(filteredList);
    });
  }
}

export default setFilter;
