import ready from "../../js/utils/documentReady.js";

ready(function () {
  let tabs = document.querySelectorAll(".tabs__label");
  let panes = document.querySelectorAll(".tabs__pane");
  let tabsLoader = document.querySelector(".tabs__loader");

  tabs.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      let clickedTab = e.target.getAttribute("data-href");

      e.preventDefault();

      tabsLoader.classList.remove("loader--hidden");

      tabs.forEach((label) => {
        label.classList.remove("tabs__label--active");
      });

      panes.forEach((pane) => {
        pane.classList.remove("tabs__pane--active");
      });

      e.target.classList.add("tabs__label--active");

      setTimeout(() => {
        document.querySelector(clickedTab).classList.add("tabs__pane--active");
        tabsLoader.classList.add("loader--hidden");
      }, 1700);
    });
  });
});
