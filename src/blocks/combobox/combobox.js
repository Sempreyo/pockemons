import ready from "../../js/utils/documentReady.js";
import PocketBase from "pocketbase";
import showLoader from "../../js/common/showLoader";
import hideLoader from "../../js/common/hideLoader";
import renderHoryzontalCards from "../../js/common/renderHoryzontalCards";

ready(function () {
  const combobox = document.querySelectorAll(".combobox");
  const pb = new PocketBase("http://127.0.0.1:8090");
  const startButton = document.querySelector(".panel__button");
  const results = document.querySelectorAll(".result");

  combobox.forEach((item) => {
    const input = item.querySelector("input");
    const dropdown = item.querySelector(".combobox__dropdown");
    const sprite = item.querySelector(".combobox__sprite");
    const loader = item.querySelector(".combobox__loader");
    const container = item.parentElement.querySelector(".fight-tile");

    input.addEventListener("focus", () => {
      input.value = "";
      sprite.setAttribute("hidden", "true");

      /* Скрываем предыдущие результаты в фокусе инпута */
      results.forEach((result) => {
        if (!result.hasAttribute("hidden")) {
          result.setAttribute("hidden", "true");
        }
      });
    });

    input.addEventListener("blur", async () => {
      const card = container.querySelector(".card-horyzontal");

      if (card) {
        let getItem = await pb.collection("pockemon").getFullList({
          filter: `id="${card.dataset.id}"`,
        });
        const id = String(+getItem[0].id);
        const value = `${
          id.length < 3 ? id.padStart(3, "0") : id.length < 2 ? id.padStart(3, "0") : id
        } — ${getItem[0].name.english}`;
        const spriteSrc = `http://127.0.0.1:8090/api/files/pockemon/${getItem[0].id}/${getItem[0].sprite}`;

        input.value = value;
        sprite.removeAttribute("hidden");
        sprite.setAttribute("src", spriteSrc);
        sprite.setAttribute("alt", value);
      }
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
            const startsWithUpper = input.value.charAt(0).toUpperCase() + input.value.slice(1);
            const dropdownItem = `<div class="combobox__option" data-id="${data.id}">
            <img class="combobox__image" src="http://127.0.0.1:8090/api/files/pockemon/${data.id}/${
              data.sprite
            }" alt="${data.name.english}">
            <span class="combobox__title">${
              id.length < 3 ? id.padStart(3, "0") : id.length < 2 ? id.padStart(3, "0") : id
            } &mdash; ${data.name.english.replace(
              `${data.name.english.startsWith(startsWithUpper) ? startsWithUpper : input.value}`,
              `<span style="color: #f2c94c;">${
                data.name.english.startsWith(startsWithUpper) ? startsWithUpper : input.value
              }</span>`,
            )}</span>
          </div>`;

            dropdown.removeAttribute("hidden");

            dropdown.insertAdjacentHTML("beforeend", dropdownItem);
          });

          const options = dropdown.querySelectorAll(".combobox__option");

          if (options && options.length > 0) {
            options.forEach((option) => {
              option.addEventListener("click", async () => {
                const tiles = document.querySelectorAll(".fight-tile");
                const value = option.querySelector(".combobox__title").innerText;
                const spriteSrc = option.querySelector(".combobox__image").getAttribute("src");
                const spriteAlt = option.querySelector(".combobox__image").getAttribute("alt");
                const id = option.dataset.id;
                let isReady = true;

                input.value = value;
                sprite.removeAttribute("hidden");
                sprite.setAttribute("src", spriteSrc);
                sprite.setAttribute("alt", spriteAlt);
                dropdown.setAttribute("hidden", "true");

                let getItem = await pb.collection("pockemon").getFullList({
                  filter: `id="${id}"`,
                });

                renderHoryzontalCards(container, getItem);

                /* Проверяем все ли карточки заполнены, и если да, разблокируем кнопку */
                tiles.forEach((tile) => {
                  if (!tile.querySelector(".card-horyzontal")) {
                    isReady = false;
                  }
                });

                isReady
                  ? startButton.removeAttribute("disabled")
                  : startButton.setAttribute("disabled", "true");
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
