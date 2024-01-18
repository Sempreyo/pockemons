import ready from "../../js/utils/documentReady.js";
import toggleState from "../../js/common/toggleState.js";

ready(function () {
  const filterButton = document.querySelector(".filter-button");
  const overlay = document.querySelector(".tabs__overlay");

  if (filterButton) {
    filterButton.addEventListener("click", () => {
      toggleState(document.body, "filter-menu");
    });

    overlay.addEventListener("click", () => {
      toggleState(document.body, "filter-menu");
    });
  }
});
