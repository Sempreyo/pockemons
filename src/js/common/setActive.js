export default function setActive(element, activeClass) {
  document.querySelector("." + activeClass).classList.remove(activeClass);
  element.classList.add(activeClass);
}
