export default function getElementsPerPage() {
  return +document.querySelector(".per-page__button--active").innerHTML;
}
