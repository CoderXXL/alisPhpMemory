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

    var elementIsClicked = false;
    function clickHandler() {
        elementIsClicked = true;
    }

    // loop through every element in the HTML-collection and add Eventlistener
    for (let card of cards) {
        if (card.getAttribute('listener') !== 'true') {
            card.addEventListener('click', (clickHandler) => {
                const elementClicked = clickHandler.target;
                elementClicked.setAttribute('listener', 'true');
                card.classList.add('card-flip');
                card.style.background = 'none';
                card.style.backgroundColor = color_arr.pop();
                if (elementClicked == true) {
                    cards.removeEventListener('click', clickHandler, false);
                }
            });
        }
    }
}

//TODO compare two cards if they got the same color

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