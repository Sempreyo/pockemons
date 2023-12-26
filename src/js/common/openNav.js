function openNav() {
  let bodyState = document.body.getAttribute("data-state");
  bodyState === "mobile-menu"
    ? (document.body.dataset.state = "")
    : (document.body.dataset.state = "mobile-menu");
}

export default openNav;
