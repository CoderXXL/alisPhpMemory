window.onload = function () {
    const cards = document.querySelectorAll('.card');
    const color_arr = [
                '#FF6633',
                '#FFB399',
                '#FF33FF',
                '#FFFF99',
                '#00B3E6',
                '#E6B333',
                '#3366E6',
                '#999966',
                '#FF6633',
                '#FFB399',
                '#FF33FF',
                '#FFFF99',
                '#00B3E6',
                '#E6B333',
                '#3366E6',
                '#999966'];

    function shuffle(a) {

        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    shuffle(color_arr)

    var card_color_arr = []

    function myEvent (event) {

        const card = event.target;

        if (card !== true) {
            card.removeEventListener('click', myEvent);
        }

        const current_color = color_arr.pop();
        card_color_arr.push(current_color);

        if (card_color_arr.length === 2) {
            if (card_color_arr[0] === card_color_arr[1]) {
                alert('richtig');
                card_color_arr.length = 0;
            } else {
                color_arr.concat(card_color_arr);
            }
        }

        card.classList.add('card-flip');
        card.style.background = 'none';
        card.style.backgroundColor = current_color;

    }

    for (let card of cards) {
        if (card.getAttribute('listener') !== 'true') {
            card.addEventListener('click', myEvent);

        }
    }
}

// (TODO) compare two cards by calling their 'current_color' Attribute

/*
class Card {

    cardElement;

    constructor(element) {
        this.cardElement = element;
        this.cardElement.addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
        this.cardElement.classList.add('card-flip');
    }
}

window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.card');
    for (let card of cards) {
        new Card(card);
    }
});
*/