class Card {
    constructor(element, color) {
        this.color = color;
        this.element = element;
    }
}

class Board {
    constructor(colors) {
        this.colors = colors;
        this.wrong = 0;
        this.right = 0;
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

    rightCards(cardArray) {
        cardArray[0].setAttribute('listener', 'true');
        cardArray[1].setAttribute('listener', 'true');
    }

    wrongCards(cardArray) {
        setTimeout(() => {
            cardArray[0].classList.remove('card-flip');
            cardArray[1].classList.remove('card-flip');
        }, 1350);
    }

    addFlipAnimation(cardArray) {
        cardArray.classList.add('card-flip');
    }

    enableClickEvent(element) {
        element[0].style.pointerEvents = '';
        element[1].style.pointerEvents = '';
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    gameover() {
        const reloadBtn = document.getElementById('reload');
        const container = document.getElementById('container');
        const background = document.getElementById('background');
        const close = document.getElementById('close');
        const highscore = document.getElementById('numericScore');
        var currentScore = (this.right + this.wrong);

        console.log(this.getCookie("score"));
        console.log(this.getCookie('score') == "undefined")
        if (this.getCookie('score') == "undefined") {
            document.cookie = 'score=' + currentScore;
            console.log(currentScore);
        } else {
            var oldScore = this.getCookie('score');
        }

        if (currentScore < oldScore) {
            document.cookie = 'score=' + currentScore;
        } else {
            document.cookie = 'score=' + oldScore;
        }


        console.log(document.cookie)
        container.style.display = 'block';
        background.style.display = 'flex';
        //highscore.innerHTML = blub;

        close.onclick = () => {
            container.style.display = 'none'
            background.style.display = 'none';
        }

        reloadBtn.onclick = () => {
            location.reload();
        }
    }

    checkColorOfCards(cardElement, cardElementParent) {
        var colorOfSelectedCards = new Array;
        var playerRightCards = document.querySelector('#right > p');
        var playerWrongCards = document.querySelector('#wrong > p');

        for (var i = 0; i < cardElement.length; i++) {
            var color = cardElement[i].style.backgroundColor;
            colorOfSelectedCards.push(color);

            if (colorOfSelectedCards.length == 2) {
                const wrapper = document.getElementById('wrapper')
                wrapper.style.pointerEvents = 'none'

                if (cardElement[0].getAttribute('listener') !== 'true' &&
                    cardElement[1].getAttribute('listener') !== 'true') {

                    if (colorOfSelectedCards[0] == colorOfSelectedCards[1]) {
                        this.rightCards(cardElement);
                        this.right++;
                        wrapper.style.pointerEvents = 'all';
                        if (this.right == 1) {
                            this.gameover();
                        }

                    } else {
                        this.enableClickEvent(cardElement);
                        this.wrongCards(cardElementParent);
                        this.wrong++;

                        setTimeout(() => {
                            wrapper.style.pointerEvents = 'all';
                        }, 1350);
                    }
                }
            }
        }

        playerRightCards.innerHTML = this.right + '/8';
        playerWrongCards.innerHTML = this.wrong;

    }

    addEventHandler() {
        var clickedOnCards = new Array;
        var clickedOnCardsParent = new Array; // The parent element of the selected Card

        document.querySelector('#wrapper').addEventListener('click', (event) => {
            var card = event.target;
            var cardParent = card.parentElement;

            if (card.classList.contains('card-back')) {
                this.addFlipAnimation(cardParent);
                card.style.pointerEvents = 'none'
                clickedOnCards.push(card);
                clickedOnCardsParent.push(cardParent);
            }

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
    var board = new Board(color_arr);
});