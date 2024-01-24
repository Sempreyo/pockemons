import ready from "../../js/utils/documentReady.js";
import PocketBase from "pocketbase";
import showLoader from "../../js/common/showLoader";
import hideLoader from "../../js/common/hideLoader";

ready(function () {
  const combobox = document.querySelectorAll(".combobox");
  const pb = new PocketBase("http://127.0.0.1:8090");

  combobox.forEach((item) => {
    const input = item.querySelector("input");
    const dropdown = item.querySelector(".combobox__dropdown");
    const sprite = item.querySelector(".combobox__sprite");
    const loader = item.querySelector(".combobox__loader");

    input.addEventListener("focus", (e) => {
      e.target.value = "";
      sprite.setAttribute("hidden", "true");
    });

    input.addEventListener("input", async (e) => {
      const target = e.currentTarget;

      let filteredData = await pb.collection("pockemon").getFullList({
        filter: `name.english~"${target.value.length > 2 ? target.value : ""}"`,
      });

      if (filteredData.length === 0) {
        dropdown.setAttribute("hidden", "true");
      }

      if (target.value.length <= 2) {
        dropdown.innerHTML = "";
        dropdown.setAttribute("hidden", "true");
      }

      if (target.value.length > 2 && filteredData.length > 0) {
        showLoader(loader, async () => {
          dropdown.innerHTML = "";

          filteredData.forEach((data) => {
            const id = String(+data.id);
            const dropdownItem = `<div class="combobox__option">
            <img class="combobox__image" src="http://127.0.0.1:8090/api/files/pockemon/${data.id}/${
              data.sprite
            }" alt="${data.name.english}">
            <span class="combobox__title">${
              id.length < 3 ? id.padStart(3, "0") : id.length < 2 ? id.padStart(3, "0") : id
            } &mdash; ${data.name.english.replace(
              input.value,
              `<span style="color: #f2c94c;">${input.value}</span>`,
            )}</span>
          </div>`;

            dropdown.removeAttribute("hidden");

            dropdown.insertAdjacentHTML("beforeend", dropdownItem);
          });

          const options = dropdown.querySelectorAll(".combobox__option");

          if (options && options.length > 0) {
            options.forEach((option) => {
              option.addEventListener("click", () => {
                const value = option.querySelector(".combobox__title").innerText;
                const spriteSrc = option.querySelector(".combobox__image").getAttribute("src");
                const spriteAlt = option.querySelector(".combobox__image").getAttribute("alt");

                input.value = value;
                sprite.removeAttribute("hidden");
                sprite.setAttribute("src", spriteSrc);
                sprite.setAttribute("alt", spriteAlt);
                dropdown.setAttribute("hidden", "true");
              });
            });
          }
        });

        hideLoader(loader);
      }
    });

    document.addEventListener("click", (e) => {
      const target = e.composedPath().includes(item);

      if (!target) {
        dropdown.setAttribute("hidden", "true");
      }
    });
  });
});
