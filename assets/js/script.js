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
/*
    checkColorOfCards(cardElement) {
        var cardColor = cardElement.color;
        var checkCardArray = [];
        checkCardArray.push(cardColor);
        console.log(checkCardArray);
        if  (checkCardArray.length == 2) {
            if (checkCardArray[0] == checkCardArray[1]) {
                this.rightCard();
                checkCardArray = [];
            } else {
                this.wrongCard();
                checkCardArray = [];
            }
        } 
    }
*/
    addEventHandler() {
        document.querySelector('#wrapper').addEventListener('click', (event) => {
            var cardInner = event.target.parentElement;
            var card = event.target;
            var cardBack = card.style.backgroundColor;
            //this.checkColorOfCards(cardBack);
            console.log('blub ' + cardBack);
            if (card.getAttribute('listener') !== 'true') {
                if (cardInner.classList.contains('card-inner')) {
                    cardInner.classList.toggle('card-flip');
                    
                } 
                //card.setAttribute('listener', 'true');
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

