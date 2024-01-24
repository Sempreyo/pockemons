export default function toggleState(elem, state) {
  let bodyState = elem.getAttribute("data-state");
  bodyState === state ? (document.body.dataset.state = "") : (document.body.dataset.state = state);
}
