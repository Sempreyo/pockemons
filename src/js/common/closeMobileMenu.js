import toggleState from "./toggleState";

export default function closeMobileMenu() {
  /* На мобилках закрываем меню */
  const close = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      toggleState(document.body, "filter-menu");
    }
  };

  close();

  window.addEventListener("resize", close);
}
