class Memory {
  init(cards) {
    shuffleCards(cards);
    this.setup(cards);
    this.setEventListener(cards);
  }

  setup(cards) {
    let html = this.getMemoryHtml();
    this.buildCardsHtml(cards, html.playground);
  }

  getMemoryHtml() {
    const playground = document.getElementById("playground");
    const cards = document.getElementsByClassName("card");

    return {
      playground: playground,
      cards: cards,
    };
  }

  buildCardsHtml(cards, playground) {
    let cardHtml = "";
    for (let card of cards) {
      cardHtml += `
            <div class="card">
                <div class="inner" data-id="${card.id}">
                    <div class="front" style="background-color: ${card.color}"></div>
                    <div class="back"></div>
                </div>
            </div>
            `;
    }
    playground.innerHTML = cardHtml;
  }

  setEventListener() {
    const playground = this.getMemoryHtml()["playground"];
    let counter = 0;
    let solved = 0;
    let locked, cardsEqual = false;
    let tempArr = [];

    playground.addEventListener("click", (e) => {
      if (!locked) {
        if (
          !e.target.className.includes("flipped") &&
          e.target.className.includes("inner")
        ) {
          counter++;
          e.target.classList.add("flipped");
          tempArr.unshift(e.target);

          if (counter % 2 === 0) {
            if (tempArr[0].dataset.id === tempArr[1].dataset.id) {
              solved++;
              cardsEqual = true;
            } else {
              cardsEqual = false;
            }

            locked = true;
            setTimeout(() => {
              if (!cardsEqual) {
                tempArr[0].classList.remove("flipped");
                tempArr[1].classList.remove("flipped");
              }
              locked = false;
            }, 1000);
          }

          if(solved === data.length) {
            alert('Gut gemacht');
          }
        }
      }
    });
  }
}

window.onload = () => {
  const cards = data.concat(data);

  let memory = new Memory();
  memory.init(cards);
};
