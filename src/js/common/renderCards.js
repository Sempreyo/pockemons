function renderCards(cards) {
  const container = document.querySelector(".cards__grid");

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

    const card = `<div class="card">
            <div class="card__top">
              <div class="card__image-wrapper">
                <div class="card__id">${
                  id.length < 3 ? id.padStart(3, "0") : id.length < 2 ? id.padStart(3, "0") : id
                }</div>
                <img class="card__image" src="http://127.0.0.1:8090/api/files/pockemon/${item.id}/${
      item.image
    }" alt="${item.name.english}">
              </div>
              <div class="card__group">
                <h2 class="card__title" title="Bulbasaur">${item.name.english}</h2>
                <div class="card__icons">
                  ${types}
                </div>
              </div>
            </div>
            <div class="card__bottom">
              <div class="card__characteristics">
                <div class="characteristic">
                  <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                      <use href="./img/svgSprite.svg#icon__health"></use>
                    </svg></div>
                  <div class="characteristic__num">${item.base.HP}</div>
                </div>
                <div class="characteristic">
                  <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                      <use href="./img/svgSprite.svg#icon__speed"></use>
                    </svg></div>
                  <div class="characteristic__num">${item.base.Speed}</div>
                </div>
                <div class="characteristic">
                  <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                      <use href="./img/svgSprite.svg#icon__attack"></use>
                    </svg></div>
                  <div class="characteristic__num"><span>${item.base.Attack}</span>/<span>${
      item.base["Sp. Attack"]
    }</span></div>
                </div>
                <div class="characteristic">
                  <div class="characteristic__icon-wrapper"><svg class="characteristic__icon">
                      <use href="./img/svgSprite.svg#icon__defence"></use>
                    </svg></div>
                  <div class="characteristic__num"><span>${item.base.Defense}</span>/<span>${
      item.base["Sp. Defense"]
    }</span></div>
                </div>
              </div>
            </div>
          </div>`;

    container.insertAdjacentHTML("beforeend", card);
  });
}

export default renderCards;
