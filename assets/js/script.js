class Card {
    constructor(element, color) {
        this.color = color;
        this.element = element;
    }
}

class Board {
    constructor(colors) {
        this.colors = colors;
        this.generateDeck();
        this.addEventHandler();
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    } 

    colorPicker() {
        this.shuffle(this.colors);
        return this.colors.pop();
    }

    generateDeck() {
        const cardElements = document.querySelectorAll('.card');
        let deck = []
        for (let card of cardElements) {
            let currentCard = new Card(card, this.colorPicker());
            deck.push(currentCard);
            let cardBack = currentCard.element.querySelector('.card-back');
            cardBack.style.backgroundColor = currentCard.color;
        }
        console.log(deck)
        return deck;
    }

    Sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    rightCards(cardArray) {
        cardArray[0].setAttribute('listener', 'true');
        cardArray[1].setAttribute('listener', 'true');
    }

    async wrongCards(cardArray) {
        await this.Sleep(1350);
        cardArray[0].classList.remove('card-flip');
        cardArray[1].classList.remove('card-flip');
    }

    selectedCard(cardArray) {
        cardArray[0].classList.add('card-flip');
        cardArray[1].classList.add('card-flip');
    }

    checkColorOfCards(cardElement) {
        var colorOfSelectedCards = new Array;
        var parentOfCardElementArr = new Array;
        for (var i = 0; i < cardElement.length; i++) {
            var color = cardElement[i].style.backgroundColor;
            var currentlySelectedParent = cardElement[i].parentElement;
            parentOfCardElementArr.push(currentlySelectedParent);
            colorOfSelectedCards.push(color);
            if (parentOfCardElementArr.length == 2) {
                if (cardElement[0].getAttribute('listener') !== 'true' && cardElement[1].getAttribute('listener') !== 'true') {
                    if (parentOfCardElementArr[0].classList.contains('card-inner') && parentOfCardElementArr[1].classList.contains('card-inner')) {
                        this.selectedCard(parentOfCardElementArr);
                        if (colorOfSelectedCards[0] == colorOfSelectedCards[1]) {
                            this.rightCards(cardElement);
                        } else {
                            this.wrongCards(parentOfCardElementArr);
                        }
                    } 
                }
            }
        }
    }

    addEventHandler() {
        var clickedOnCards = new Array
        document.querySelector('#wrapper').addEventListener('click', (event) => {
            var card = event.target;
            clickedOnCards.push(card);
            if (clickedOnCards.length == 2) {
                this.checkColorOfCards(clickedOnCards);
                clickedOnCards = [];
            }
        });
    }
}

const color_arr = [
    '#FF6633', '#FFB399', '#FF6633', '#FFB399', '#FF33FF', '#E6B333', '#FF33FF', '#E6B333',
    '#FFFF99', '#00B3E6', '#FFFF99', '#00B3E6', '#3366E6', '#999966', '#3366E6', '#999966'
];

window.addEventListener('load', () => {
    new Board(color_arr);
});

