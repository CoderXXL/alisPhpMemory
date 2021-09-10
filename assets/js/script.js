class Card {
    constructor(element, color) {
        this.color = color;
        this.element = element;
        //this.colorGenerator();
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
        await this.Sleep(1250);
        cardArray[0].classList.remove('card-flip');
        cardArray[1].classList.remove('card-flip');
    }

    checkColorOfCards(cardElement) {
        var blub = new Array;
        var parentCardElement = new Array;
        for (var i = 0; i < cardElement.length; i++) {
            var color = cardElement[i].style.backgroundColor;
            var hallo = cardElement[i].parentElement;
            parentCardElement.push(hallo);
            blub.push(color);

            if (parentCardElement.length == 2) {
                if (cardElement[0].getAttribute('listener') !== 'true' && cardElement[1].getAttribute('listener') !== 'true') {
                    if (parentCardElement[0].classList.contains('card-inner') && parentCardElement[1].classList.contains('card-inner')) {
                        parentCardElement[0].classList.add('card-flip');
                        parentCardElement[1].classList.add('card-flip');
                        if (blub[0] == blub[1]) {
                            this.rightCards(cardElement);
                        } else {
                            this.wrongCards(parentCardElement);
                        }
                    } 
                    //card.setAttribute('listener', 'true');
                }
            }
        }
    }

    addEventHandler() {
        var clickedOnCards = new Array
        document.querySelector('#wrapper').addEventListener('click', (event) => {
            var cardInner = event.target.parentElement;
            var card = event.target;
            //var cardBack = card.style.backgroundColor;
            clickedOnCards.push(card);
            if (clickedOnCards.length == 2) {
                this.checkColorOfCards(clickedOnCards);
                clickedOnCards = [];
            }
            //console.log(cardBack);
/*             if (card.getAttribute('listener') !== 'true') {
                if (cardInner.classList.contains('card-inner')) {
                    cardInner.classList.toggle('card-flip');
                } 
                card.setAttribute('listener', 'true');
            } */
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

