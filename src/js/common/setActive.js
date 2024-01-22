function setActive(element, activeClass) {
  document.querySelector("." + activeClass).classList.remove(activeClass);
  element.classList.add(activeClass);
}

export default setActive;
