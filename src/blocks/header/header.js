import ready from "../../js/utils/documentReady.js";
import openNav from "../../js/common/openNav.js";

ready(function () {
  // mobile menu
  const menuTrigger = document.querySelector(".header__menu");
  menuTrigger.addEventListener("click", openNav);
});
