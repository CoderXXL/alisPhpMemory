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
        this.wrong2 = 0;
        this.generateDeck();
        this.addEventHandler();
        this.selectMode();
        this.checkGameMode();
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

    checkWrongCounter() {
        if (this.wrong < this.wrong2) {
            return (this.right + this.wrong);
        } else {
            return (this.right + this.wrong2);
        }
    }

    gameover() {
        const reloadBtn = document.getElementById('reload');
        const container = document.getElementById('container');
        const background = document.getElementById('background');
        const highscore = document.getElementById('numericScore');
        var yourScore = document.getElementById('current_score');

        yourScore.innerHTML = 'SCORE: ' + (this.checkWrongCounter());
        
        // Creating Cookie for the Highscore
        if (this.getCookie('score') === undefined) {
            if (sessionStorage.getItem('mode') === 'true') {
                document.cookie = 'score=' + (this.checkWrongCounter() + this.right) + '; expires=' + this.CookieTimeout();
            } else {
                document.cookie = 'score=' + (this.right + this.wrong) + '; expires=' + this.CookieTimeout();
            }
        }

        // Update the value of the Cookie if a new Highscore got reached
        if (sessionStorage.getItem('mode') === 'true') {
            yourScore.innerHTML = 'SCORE: ' + (this.checkWrongCounter());
            if (this.checkWrongCounter() < this.getCookie('score')) {
                document.cookie = 'score=' + this.checkWrongCounter();
            }
        } else {
            yourScore.innerHTML = 'SCORE: ' + (this.right + this.wrong);
            if ((this.wrong + this.right) < this.getCookie('score')) {
                document.cookie = 'score=' + (this.wrong + this.right);
            }
        }

        // Enable the endscreen when the Game is done
        container.style.display = 'block';
        background.style.display = 'flex';
        highscore.innerHTML = this.getCookie('score');

        reloadBtn.onclick = () => {
            location.reload();
        }

    }

    checkGameMode() {
        if (sessionStorage.getItem('multi') === 'true') {
            this.createMultiPlayer();
        }
    }

    createMultiPlayer() {
        const counter = document.getElementsByClassName('counter');

        if (sessionStorage.getItem('multi') === 'true') {
            counter[0].classList.add('multiCounter');
        }
    }
    
    selectMode() {
        const menuBackground = document.getElementById('menu_background');
        const singlePlayer = document.getElementById('single_player');
        const multiPlayer = document.getElementById('multi_player');
        const mode = document.getElementById('mode');

        mode.onclick = () => {
            sessionStorage.setItem('visited', 'true');
            menuBackground.style.visibility = 'visible';
        }

        singlePlayer.onclick = () => {
            sessionStorage.setItem('multi', 'false');
            sessionStorage.setItem('mode', 'false')
            document.cookie = 'score=100';
            location.reload();
        }

        multiPlayer.onclick = () => {
            sessionStorage.setItem('multi', 'true');
            sessionStorage.setItem('mode', 'true')
            document.cookie = 'score=100';
            location.reload()
        }

        if (sessionStorage.getItem('visited') === null) {
            menuBackground.style.visibility = 'visible';
            sessionStorage.setItem('visited', 'true')
        }

        if (sessionStorage.getItem('visited') === 'true') {
            sessionStorage.setItem('visited', 'false');
        } 
    }

    increaseWrong(count) {
        var playerWrongCards = document.querySelector('#wrong > p');
        var secondCounter = document.querySelector('#wrong2 > p');
        var fullCount = (this.wrong + this.wrong2 + 1);
        fullCount = fullCount * (count % 2);

        if (fullCount !== 0) {
            --fullCount;
            if (fullCount % 2 === 1) {
                secondCounter.innerHTML = ++this.wrong2;
    
            } else {
                playerWrongCards.innerHTML = ++this.wrong;
    
            }
        }
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

                    if (sessionStorage.getItem('mode') == 'true') {
                        this.increaseWrong(1);
                    } else {
                        ++this.wrong;
                        playerWrongCards.innerHTML = this.wrong;
                    }

                    this.enableClickEvent(cardElement);
                    this.wrongCards(cardElementParent);

                }

                setTimeout(() => {
                    wrapper.style.pointerEvents = 'all';
                }, 1350);
            }
        }

        playerRightCards.innerHTML = this.right + '/8';
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