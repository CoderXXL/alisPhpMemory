
class Card {
    constructor(element, color) {
        this.cardElement = element;
        this.color = color;
    }

    onClick() {
        this.cardElement.classList.add('card-flip');
    }

}

class Board {
    constructor(colors) {
        this.colors = colors;
        this.deck = this.generateDeck();
        this.OnClick();
    }

    generateDeck() {
        const cardElements = document.querySelectorAll('.card');
        let deck = []
        for (let card of cardElements) {
            deck.push(new Card(card, this.getRandomColor()));
            this.shuffle(deck);
        }
        return deck;
    }

    OnClick() {
        var card = this.currentTarget;
        var board = this.target;
        document.querySelector('#wrapper').addEventListener('click', (event) => {
            var cardInner = event.target.parentElement;
            if (cardInner.classList.contains('card-inner')) {
                cardInner.classList.add('card-flip');
            }
        });
        console.log(card)
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

    getRandomColor() {
        return this.colors.pop();
    }
}

const color_arr = [
    '#FF6633', '#FFB399', '#FF6633', '#FFB399', '#FF33FF', '#E6B333', '#FF33FF', '#E6B333',
    '#FFFF99', '#00B3E6', '#FFFF99', '#00B3E6', '#3366E6', '#999966', '#3366E6', '#999966'
];

window.addEventListener('load', () => {
    const CardBoard = new Board(color_arr);
});

