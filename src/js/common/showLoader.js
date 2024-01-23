function showLoader(element, fn) {
  element.classList.remove("loader--hidden");

  if (fn) {
    setTimeout(() => {
      fn();
    }, 300);
  }
}

export default showLoader;