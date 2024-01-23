function hideLoader(element) {
  setTimeout(() => {
    element.classList.add("loader--hidden");
  }, 1700);
}

export default hideLoader;
