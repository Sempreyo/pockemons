import ready from "../../js/utils/documentReady.js";

ready(function () {
  const body = document.querySelector("body");
  const filterBtn = document.querySelector(".filter-btn");
  const sidebar = document.querySelector(".page__sidebar");
  const overlay = document.querySelector(".overlay");

  if (filterBtn && sidebar) {
    filterBtn.addEventListener("click", () => {
      if (!sidebar.classList.contains("page__sidebar--active")) {
        sidebar.classList.add("page__sidebar--active");
        overlay.removeAttribute("hidden");
        body.style.overflow = "hidden";
      } else {
        sidebar.classList.remove("page__sidebar--active");
        overlay.setAttribute("hidden", true);
        body.style.overflow = "unset";
      }
    });
  }

  document.addEventListener("click", (e) => {
    const targetSidebar = e.composedPath().includes(sidebar);
    const targetBtn = e.composedPath().includes(filterBtn);

    if (!targetSidebar && !targetBtn) {
      sidebar.classList.remove("page__sidebar--active");
      overlay.setAttribute("hidden", true);
      body.style.overflow = "unset";
    }
  });
});
