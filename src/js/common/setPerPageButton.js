import setActive from "./setActive";
import renderBlocks from "./renderBlocks";
import closeMobileMenu from "./closeMobileMenu";

export default function setPerPageButton() {
  const perPageButtons = document.querySelectorAll(".per-page__button");

  perPageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActive(button, "per-page__button--active");

      closeMobileMenu();

      renderBlocks();
    });
  });
}
