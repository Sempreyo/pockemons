import ready from "../../js/utils/documentReady.js";
import toggleState from "../../js/common/toggleState.js";

ready(function () {
  const filterBtn = document.querySelector(".filter-btn");
  const overlay = document.querySelector(".page__overlay");

  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      toggleState(document.body, "mobile-menu");
    });

    overlay.addEventListener("click", () => {
      toggleState(document.body, "mobile-menu");
    });
  }
});
