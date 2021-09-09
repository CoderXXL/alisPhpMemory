class Card {
    constructor(element, color) {
        this.color = color;
        this.element = element;
        //this.colorGenerator();
    }

/*     colorGenerator() {
        const cardElements = document.querySelectorAll('.card-back');
        for (let card of cardElements) {
            card.style.backgroundColor = this.color;
        }
    } */

}

class Board {
    constructor(colors) {
        this.colors = colors;
        this.generateDeck();
        this.addEventHandler();
    }

    colorPicker() {
        return this.colors.pop();
    }

    generateDeck() {
        const cardElements = document.querySelectorAll('.card');
        let deck = []
        for (let card of cardElements) {
            let currentCard = new Card(card, this.colorPicker());
            console.log(currentCard);
            deck.push(currentCard);
            let cardBack = document.querySelectorAll('.card-back');
            cardBack.style.backgroundColor = this.colorPicker();
            //this.shuffle(deck);            
        }
        console.log(deck)
        return deck;
    }

/*     colorGenerator() {
        const cardElements = document.querySelectorAll('.card');
        for (let card of cardElements) {
            let cardBack = document.querySelector('.card-back')
            cardBack.style.backgroundColor = this.color;
        }
    }  */

    addEventHandler() {
        document.querySelector('#wrapper').addEventListener('click', (event) => {
            var cardInner = event.target.parentElement;
            //var cardFront = event.target.previousSibling
            var card = event.target;
            if (card.getAttribute('listener') !== 'true') {
                if (cardInner.classList.contains('card-inner')) {
                    cardInner.classList.toggle('card-flip');
                } 
            //card.setAttribute('listener', 'true');
            }
        });
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

}

const color_arr = [
    '#FF6633', '#FFB399', '#FF6633', '#FFB399', '#FF33FF', '#E6B333', '#FF33FF', '#E6B333',
    '#FFFF99', '#00B3E6', '#FFFF99', '#00B3E6', '#3366E6', '#999966', '#3366E6', '#999966'
];

window.addEventListener('load', () => {
    new Board(color_arr);
});

