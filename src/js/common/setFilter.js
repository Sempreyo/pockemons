import setActive from "./setActive";
import PocketBase from "pocketbase";
import showLoader from "./showLoader";
import hideLoader from "./hideLoader";
import renderBlocks from "./renderBlocks";

export default async function setFilter() {
  const typeNum = document.querySelectorAll(".type__num");
  const pb = new PocketBase("http://127.0.0.1:8090");
  const dataFull = await pb.collection("pockemon").getFullList();
  const dataTypes = await pb.collection("types").getList();
  const loader = document.querySelector(".cards__loader");

  /* Количество покемонов каждого типа */
  for (const num of typeNum) {
    dataTypes.items.forEach((type) => {
      if (num.parentElement.dataset.name === "All") {
        num.textContent = dataFull.length.toString();
      }

      if (num.parentElement.dataset.name === type.name.english) {
        num.textContent = type.amount;
      }
    });

    num.parentElement.addEventListener("click", (e) => {
      setActive(e.currentTarget, "type--active");

      showLoader(loader, async () => {
        await renderBlocks("", true);
      });

      hideLoader(loader);
    });
  }
}
