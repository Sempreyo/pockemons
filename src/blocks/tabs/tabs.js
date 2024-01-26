import ready from "../../js/utils/documentReady.js";
import fight from "../../js/common/fight";
import PocketBase from "pocketbase";
import setCombobox from "../../js/common/setCombobox";

ready(function () {
  let tabs = document.querySelectorAll(".tabs__label");
  let panes = document.querySelectorAll(".tabs__pane");
  const pb = new PocketBase("http://127.0.0.1:8090");
  let isLoad = false;

  tabs.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      let clickedTab = e.target.getAttribute("data-href");
      const container = document.getElementById("tab2");

      e.preventDefault();

      tabs.forEach((label) => {
        label.classList.remove("tabs__label--active");
      });

      panes.forEach((pane) => {
        pane.classList.remove("tabs__pane--active");
      });

      e.target.classList.add("tabs__label--active");

      document.querySelector(clickedTab).classList.add("tabs__pane--active");

      /* Подгружать второй таб один раз */
      if (!isLoad) {
        if (e.target.getAttribute("data-href") === "#tab2") {
          const panel = `<div class="panel">
          <div class="panel__columns">
            <div class="panel__column">
              <div class="combobox">
                <div class="combobox__field"><img class="combobox__sprite" src="" alt="" hidden="hidden" />
                  <input class="combobox__input" type="text" placeholder="Choose fighter" />
                </div>
                <div class="combobox__dropdown" hidden="hidden"></div>
              </div>
              <div class="fight-tile">
                <div class="fight-tile__filler">Type name <br> of champion above</div>
              </div>
            </div>
            <div class="panel__middle">vs</div>
            <div class="panel__column">
              <div class="combobox">
                <div class="combobox__field"><img class="combobox__sprite" src="" alt="" hidden="hidden" />
                  <input class="combobox__input" type="text" placeholder="Choose fighter" />
                </div>
                <div class="combobox__dropdown" hidden="hidden"></div>
              </div>
              <div class="fight-tile">
                <div class="fight-tile__filler">Type name <br> of champion above</div>
              </div>
            </div>
          </div>
          <button class="button button--primary panel__button" id="button-id" name="button-name" disabled="disabled"><span class="button__title">FIGHT!</span></button>
          <div class="panel__result result result--red js-result" hidden="hidden"><span class="panel__winner"></span> &nbsp; is the winner!</div>
          <div class="panel__result result result--yellow js-draw" hidden="hidden">Round draw!</div>
        </div>`;
          const fightTemplate = document.getElementById("fight-template");

          container.append(fightTemplate.content.cloneNode(true));

          setTimeout(() => {
            container.innerHTML = "";
            container.insertAdjacentHTML("beforeend", panel);

            setCombobox();
            fight(pb);
          }, 1700);
        } else {
          container.innerHTML = "";
        }

        isLoad = true;
      }
    });
  });
});
