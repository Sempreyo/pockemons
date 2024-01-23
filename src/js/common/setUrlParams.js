function setUrlParams() {
  let url = new URL(window.location.href);
  const pageValue = document.querySelector(".pagination__link--active").textContent;
  const perPageValue = document.querySelector(".per-page__button--active").textContent;
  const typeValue = document.querySelector(".type--active").dataset.name;

  url.searchParams.get("page");
  url.searchParams.get("per_page");
  url.searchParams.get("type");

  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    `?page=${pageValue}&per_page=${perPageValue}&type=${typeValue}`;
  window.history.pushState({ path: newurl }, "", newurl);
}

export default setUrlParams;
