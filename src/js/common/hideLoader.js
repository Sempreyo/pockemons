export default function hideLoader(element) {
  setTimeout(() => {
    element.classList.add("loader--hidden");
  }, 1700);
}
