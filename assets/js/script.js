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
        this.selectMode();
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

        // Creating the Cards and giving them a Color
        for (let card of cardElements) {
            let currentCard = new Card(card, this.colorPicker());
            deck.push(currentCard);
            let cardBack = currentCard.element.querySelector('.card-back');
            cardBack.style.backgroundColor = currentCard.color;
        }
        return deck;
    }

    // Make Cards unclickable
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

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    CookieTimeout() {
        var now = new Date();
        var time = now.getTime();

        time += 3600 * 1000;
        now.setTime(time);
        return now.toUTCString()
    }

    gameover() {
        const reloadBtn = document.getElementById('reload');
        const container = document.getElementById('container');
        const background = document.getElementById('background');
        const highscore = document.getElementById('numericScore');
        var yourScore = document.getElementById('current_score');
        var currentScore = (this.right + this.wrong);

        yourScore.innerHTML = 'SCORE: ' + currentScore;
        
        // Creating Cookie for the Highscore
        if (this.getCookie('score') === undefined) {
            document.cookie = 'score=' + currentScore + '; expires=' + this.CookieTimeout();
        } 

        // Update the value of the Cookie if a new Highscore got reached
        if (currentScore < this.getCookie('score')) {
            document.cookie = 'score=' + currentScore;
        }

        // Enable the endscreen when the Game is done
        container.style.display = 'block';
        background.style.display = 'flex';
        highscore.innerHTML = this.getCookie('score');

        reloadBtn.onclick = () => {
            location.reload();
        }
    }

    
    selectMode() {
        const menuBackground = document.getElementById('menu_background');
        const singlePlayer = document.getElementById('single_player');
        const multiPlayer = document.getElementById('multi_player')
        const mode = document.getElementById('mode');

        singlePlayer.onclick = () => {
            location.reload();
        }

        // Timeout for the Cookie 
        if (this.getCookie('visited') === undefined) {
            menuBackground.style.visibility = 'visible';
            document.cookie = 'visited=true';
        } 

        mode.onclick = () => {
            document.cookie = 'visited=true';
            menuBackground.style.visibility = 'visible';
        }

        if (this.getCookie('visited') === true) {
            menuBackground.style.visibility = 'visible';
            document.cookie = 'visited = false; expires=' + this.CookieTimeout();
        } 

        multiPlayer.onclick = () => {
            this.createMultiPlayer();
        }
    }

    createMultiPlayer() {
        //TODO create a Multiplayer mode
    }

    checkColorOfCards(cardElement, cardElementParent) {
        var colorOfSelectedCards = [];
        var playerRightCards = document.querySelector('#right > p');
        var playerWrongCards = document.querySelector('#wrong > p');
        const wrapper = document.getElementById('wrapper');

        for (var i = 0; i < cardElement.length; i++) {
            var color = cardElement[i].style.backgroundColor;
            colorOfSelectedCards.push(color);

            if (colorOfSelectedCards.length == 2) {
                wrapper.style.pointerEvents = 'none'

                // Check the selected Cards if they're the same
                if (colorOfSelectedCards[0] == colorOfSelectedCards[1]) {
                    this.rightCards(cardElement);
                    this.right++;
                    wrapper.style.pointerEvents = 'all';

                    //! How many Siblings you gotta find
                    if (this.right == 8) {
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

        playerRightCards.innerHTML = this.right + '/8';
        playerWrongCards.innerHTML = this.wrong;

    }

    addEventHandler() {
        var clickedCard = [];
        var parentOfClickedCard = []; // The parent element of the selected Card

        document.querySelector('#wrapper').addEventListener('click', (event) => {
            var card = event.target;
            var cardParent = card.parentElement;

            // What happenes to the selected Card
            if (card.classList.contains('card-back')) {
                this.addFlipAnimation(cardParent);
                card.style.pointerEvents = 'none'
                clickedCard.push(card);
                parentOfClickedCard.push(cardParent);
            }

            // When two Cards are selected, they'll be checked if they're the same
            if (clickedCard.length == 2) {
                this.checkColorOfCards(clickedCard, parentOfClickedCard);
                clickedCard = [];
                parentOfClickedCard = [];
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