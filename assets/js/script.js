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
        cardArray.classList.add('card-flip');
    }

    disableClickEvent(element) { 
        element[0].style.pointerEvents = 'all';
        element[1].style.pointerEvents = 'all';
    }

    checkColorOfCards(cardElement, cardElementParent) {
        var colorOfSelectedCards = new Array;
        for (var i = 0; i < cardElement.length; i++) {
            var color = cardElement[i].style.backgroundColor;
            colorOfSelectedCards.push(color);
            console.log(colorOfSelectedCards);
            if (colorOfSelectedCards.length == 2) {
                if (cardElement[0].getAttribute('listener') !== 'true' && cardElement[1].getAttribute('listener') !== 'true') {
                    if (colorOfSelectedCards[0] == colorOfSelectedCards[1]) {
                        this.rightCards(cardElement);
                    } else {
                        this.wrongCards(cardElementParent);
                        this.disableClickEvent(cardElement);
                    }
                }
            }
        }
    }

    addEventHandler() {
        var clickedOnCards = new Array;
        var clickedOnCardsParent = new Array;
        document.querySelector('#wrapper').addEventListener('click', (event) => {
            var card = event.target;
            var cardParent = card.parentElement;
            this.selectedCard(cardParent);

            card.style.pointerEvents = 'none'
            
            clickedOnCards.push(card);
            clickedOnCardsParent.push(cardParent);
        
            if (clickedOnCards.length == 2) {
                this.checkColorOfCards(clickedOnCards, clickedOnCardsParent);
                clickedOnCards = [];
                clickedOnCardsParent = [];
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

