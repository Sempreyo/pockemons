import ready from "../../js/utils/documentReady.js";
import hideLoader from "./hideLoader";

ready(function () {
  const pageLoader = document.querySelector(".page__loader");

  hideLoader(pageLoader);
});
