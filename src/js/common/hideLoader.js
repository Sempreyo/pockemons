function hideLoader(element, fn) {
  setTimeout(() => {
    element.classList.add("loader--hidden");

    if (fn) {
      fn();
    }
  }, 1700);
}

export default hideLoader;
