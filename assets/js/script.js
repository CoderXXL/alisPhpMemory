window.onload = function () {

    const cards = document.querySelectorAll('.card');

    const color_arr = [
        '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966',
        '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966'
        /*'#FF6633', '#FF6633', '#FF6633', '#FF6633', '#FF6633', '#FF6633', '#FF6633', '#FF6633',
        '#FF6633', '#FF6633', '#FF6633', '#FF6633', '#FF6633', '#FF6633', '#FF6633', '#FF6633'*/
    ];

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

    var card_color_arr = [];
    var card_arr = [];
    var right_counter = 1;
    var wrong_counter = 1;

    function onCardClick(event){

        const cardInner = event.target.parentElement;
        const card_wrapper = cardInner.parentElement;
        const card = event.target;

        event.currentTarget.removeEventListener('click', onCardClick);
        const right = document.querySelector('#right > p');
        const wrong = document.querySelector('#wrong > p');

        //debugger;
        const current_color = color_arr.pop();
        card_color_arr.push(current_color);

        if (card_color_arr.length === 2) {
            if (card_color_arr[0] === card_color_arr[1]) {
                right.innerHTML = right_counter;
                right_counter++;
                console.log(card_color_arr);
                card_color_arr.length = 0;
            }
            else {
                wrong.innerHTML = wrong_counter;
                wrong_counter++;
                color_arr.concat(card_color_arr);
                card_color_arr.length = 0;
            }
        }

/*         function flip() {
            this.classList.toggle('card-flip');
        }

        for (var flip_card in cardInner)
        cardInner.addEventListener('click', flip);
 */
        cardInner.classList.add('card-flip');
        card.style.backgroundColor = current_color;

    }


    for (let card of cards) {
        if (card.getAttribute('listener') !== 'true') {
            card.addEventListener('click', onCardClick);
            //card.addEventListener('click', flip);
            console.log("card outside onclick", card)

        }
    }
}

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