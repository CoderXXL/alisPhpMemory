class Memory {
  constructor() {
    this.locked = false;
    this.cardsEqual = false;
    this.counter = 0;
    this.solved = 0;
    this.tempArr = [];
  }

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
    for (let [index, value] of cards.entries()) {
      cardHtml += `
            <div class="card fade-in-${index}">
                <div class="inner" data-id="${value.id}">
                    <div class="front" style="background-color: ${value.color}"></div>
                    <div class="back"></div>
                </div>
            </div>
            `;
    }
    playground.innerHTML = cardHtml;
  }

  setEventListener() {
    const playground = this.getMemoryHtml()["playground"];
    playground.addEventListener("click", (e) => this.cardClicked(e));
  }

  cardClicked(e) {
    let currCard = e.target;
    if (!this.isLocked()) {
      if (
        !currCard.className.includes("flipped") &&
        currCard.className.includes("inner")
      ) {
        this.counter++;
        this.adjustFlippedClass(currCard);
        this.tempArr.unshift(currCard);

        if (this.counter % 2 === 0) {
          if (this.tempArr[0].dataset.id === this.tempArr[1].dataset.id) {
            this.solved++;
            this.isCardEqual(true);
          } else {
            this.isCardEqual(false);
          }

          this.isLocked(true);

          setTimeout(() => {
            if (!this.isCardEqual()) {
              this.adjustFlippedClass(this.tempArr[0], true);
              this.adjustFlippedClass(this.tempArr[1], true);
            }
            this.isLocked(false);
          }, 1000);
        }

        if(this.solved === data.length) {
          for (let card of this.tempArr) {
            setTimeout(() => {
              this.adjustFlippedClass(card, true)
            }, 1000);
          }
          this.solved = 0;
        }
      }
    }
  }

  adjustFlippedClass(element, remove = false) {
    if (remove) {
      element.classList.remove("flipped");
    } else {
      element.classList.add("flipped");
    }
  }

  isLocked(locked) {
    return (locked != undefined) ? this.locked = locked : this.locked;
  }

  isCardEqual(cardsEqual) {
    return (cardsEqual != undefined) ? this.cardsEqual = cardsEqual : this.cardsEqual;
  }
}

window.onload = () => {
  const cards = data.concat(data);

  let memory = new Memory();
  memory.init(cards);
};
