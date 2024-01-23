import ready from "../../js/utils/documentReady.js";
import PocketBase from "pocketbase";
import renderCards from "./renderCards";
import setFilter from "./setFilter";
import renderPagination from "./renderPagination";
import { ELEMENTS_PER_PAGE, INITIAL_PAGE } from "./vars";

ready(function () {
  const container = document.querySelector(".cards__grid");
  const pb = new PocketBase("http://127.0.0.1:8090");

  const getData = async (initPage, elementsPerPage) => {
    return await pb.collection("pockemon").getList(initPage, elementsPerPage);
  };

  const init = async () => {
    let data = await getData(INITIAL_PAGE, ELEMENTS_PER_PAGE);

    renderCards(data.items);
    renderPagination(data);
    setFilter(container);
  };

  init();
});
