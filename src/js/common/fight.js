export default function fight(pb) {
  const startButton = document.querySelector(".panel__button");
  const result = document.querySelector(".js-result");
  const winner = result.querySelector(".panel__winner");
  const draw = document.querySelector(".js-draw");

  startButton.addEventListener("click", async () => {
    const cards = document.querySelectorAll(".card-horyzontal");
    const getItem1 = await pb.collection("pockemon").getFullList({
      filter: `id="${cards[0].dataset.id}"`,
    });
    const getItem2 = await pb.collection("pockemon").getFullList({
      filter: `id="${cards[1].dataset.id}"`,
    });
    const name1 = getItem1[0].name.english;
    const name2 = getItem2[0].name.english;
    const types1 = getItem1[0].type;
    const types2 = getItem2[0].type;
    const weaknesses1 = getItem1[0].weakness;
    const weaknesses2 = getItem2[0].weakness;
    let points1 = 0;
    let points2 = 0;

    /* Считаем очки для первого покемона */
    weaknesses2.forEach((weakness) => {
      types1.forEach((type) => {
        if (weakness === type) {
          points1++;
        }
      });
    });

    /* Считаем очки для второго покемона */
    weaknesses1.forEach((weakness) => {
      types2.forEach((type) => {
        if (weakness === type) {
          points2++;
        }
      });
    });

    if (points1 > points2) {
      winner.innerHTML = name1;
      result.removeAttribute("hidden");
    } else if (points1 < points2) {
      winner.innerHTML = name2;
      result.removeAttribute("hidden");
    } else {
      draw.removeAttribute("hidden");
    }
  });
}
