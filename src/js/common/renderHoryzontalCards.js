export default function renderHoryzontalCards(container, cards) {
  cards.forEach((item) => {
    const id = String(+item.id);

    /* Иконки со всеми типами покемона */
    const types = item.type
      .map((type) => {
        return `<svg class="card__icon">
                <use href="./img/svgSprite.svg#icon__${type}"></use>
              </svg>`;
      })
      .join("");

    /* Иконки со всеми уязвимостями покемона */
    const weaknesses = item.weakness
      .map((weakness) => {
        return `<svg class="characteristic__icon">
                <use href="./img/svgSprite.svg#icon__${weakness}"></use>
              </svg>`;
      })
      .join("");

    /* Скилы покемона */
    const abilities = item.abilities
      .map((ability) => {
        return ability;
      })
      .join(", ");

    const card = `<div class="card-horyzontal" data-id="${item.id}">
      <div class="card-horyzontal__top">
        <div class="card-horyzontal__image-wrapper">
          <div class="card-horyzontal__id">${
            id.length < 3 ? id.padStart(3, "0") : id.length < 2 ? id.padStart(3, "0") : id
          }</div>
          <img class="card-horyzontal__image" src="http://127.0.0.1:8090/api/files/pockemon/${
            item.id
          }/${item.image}" alt="${item.name.english}">
        </div>
        <div class="card-horyzontal__group">
          <h2 class="card-horyzontal__title" title="${item.name.english}">${item.name.english}</h2>
          <div class="card-horyzontal__icons">
            ${types}
          </div>
        </div>
      </div>
      <div class="card-horyzontal__bottom">
        <div class="card-horyzontal__characteristics">
          <div class="characteristic characteristic--static">
            <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                <use href="./img/svgSprite.svg#icon__health"></use>
              </svg></div>
            <div class="characteristic__num">${item.base.HP}</div>
          </div>
          <div class="characteristic characteristic--static">
            <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                <use href="./img/svgSprite.svg#icon__attack"></use>
              </svg></div>
            <div class="characteristic__num"><span>${item.base.Attack}</span>/<span>${
      item.base["Sp. Attack"]
    }</span></div>
          </div>
          <div class="characteristic characteristic--static">
            <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                <use href="./img/svgSprite.svg#icon__speed"></use>
              </svg></div>
            <div class="characteristic__num">${item.base.Speed}</div>
          </div>
          <div class="characteristic characteristic--static">
            <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                <use href="./img/svgSprite.svg#icon__defence"></use>
              </svg></div>
            <div class="characteristic__num"><span>${item.base.Defense}</span>/<span>${
      item.base["Sp. Defense"]
    }</span></div>
          </div>
          <div class="characteristic characteristic--static">
            <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                <use href="./img/svgSprite.svg#icon__weight"></use>
              </svg></div>
            <div class="characteristic__num">${item.weight}</div>
          </div>
          <div class="characteristic characteristic--static">
            <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                <use href="./img/svgSprite.svg#icon__height"></use>
              </svg></div>
            <div class="characteristic__num">${item.height}</div>
          </div>
          <div class="characteristic characteristic--static characteristic--wide">
            <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                <use href="./img/svgSprite.svg#icon__weakness"></use>
              </svg>
            </div>
            <div class="characteristic__num">
              ${weaknesses}
            </div>
          </div>
          <div class="characteristic characteristic--static characteristic--wide">
            <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                <use href="./img/svgSprite.svg#icon__abilities"></use>
              </svg></div>
            <div class="characteristic__num">
              <div class="characteristic__num"><span>${abilities}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    container.innerHTML = card;
  });
}
