import ready from "../../js/utils/documentReady.js";
import PocketBase from "pocketbase";
import setFilter from "./setFilter";
import getElementsPerPage from "./getElementsPerPage";
import setPerPageButton from "./setPerPageButton";
import setInitialState from "./setInitialState";

ready(function () {
  const container = document.querySelector(".cards__grid");
  const pb = new PocketBase("http://127.0.0.1:8090");

  const init = async () => {
    setPerPageButton();
    await setInitialState(pb);
    await setFilter(container);
    getElementsPerPage();
  };

  init();
});
