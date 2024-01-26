import setActive from "./setActive";
import PocketBase from "pocketbase";
import renderBlocks from "./renderBlocks";
import closeMobileMenu from "./closeMobileMenu";

export default async function setFilter() {
  const filter = document.querySelector(".filter");
  const filterTemplate = document.getElementById("filter-template");
  const pb = new PocketBase("http://127.0.0.1:8090");
  const dataFull = await pb.collection("pockemon").getFullList();
  const dataTypes = await pb.collection("types").getFullList({
    sort: "+name.english",
  });

  dataTypes.forEach(() => {
    filter.append(filterTemplate.content.cloneNode(true));
  });

  setTimeout(() => {
    filter.innerHTML = "";

    filter.innerHTML = `<li class="filter__item">
      <button class="type type--active" data-name="All">
        <div class="type__group"><svg class="type__icon">
            <use href="./img/svgSprite.svg#icon__All"></use>
          </svg>
          <div class="type__title">All</div>
        </div>
        <div class="type__num">${dataFull.length.toString()}</div>
      </button>
    </li>`;

    dataTypes.forEach((item) => {
      const type = `<li class="filter__item">
      <button class="type" data-name="${item.name.english}">
        <div class="type__group"><svg class="type__icon">
            <use href="./img/svgSprite.svg#icon__${item.name.english}"></use>
          </svg>
          <div class="type__title">${item.name.english}</div>
        </div>
        <div class="type__num">${item.amount}</div>
      </button>
    </li>`;

      filter.insertAdjacentHTML("beforeend", type);
    });

    const typeEl = filter.querySelectorAll(".filter__item .type");

    typeEl.forEach((item) => {
      if (item.dataset.name === "All") {
        item.querySelector(".type__num").textContent = dataFull.length.toString();
      }

      item.addEventListener("click", (e) => {
        setActive(e.currentTarget, "type--active");

        closeMobileMenu();

        renderBlocks("", true);
      });
    });
  }, 1700);
}
