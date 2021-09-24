class Card {
    #locked = false;
    #color = "fffff";
    #position = new Array(2);
    #element;

    constructor(card, x, y) {
        this.#element = card;
        this.#position[0] = x;
        this.#position[1] = y;
    }

    isLocked() {
        return this.#locked;
    }

    lock() {
        this.#locked = true;
    }

    getElement() {
        return this.#element;
    }

    getX() {
        return this.#position[0];
    }

    getY() {
        return this.#position[1];
    }

    getColor() {
        return this.#color;
    }

    setColor(color) {
        this.#color = color;
    }
}

class Player {
    #attempts = 0;
    #rightAttempts = 0;

    #name;

    constructor(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }
    
    getAttemps() {
        return this.#attempts;
    }

    getPoints() {
        return this.#rightAttempts;
    }

    addAttempt(right) {
        if (right) {
            this.#rightAttempts++;
        }

        this.#attempts++;
    }
}

class Game {
    #activePlayer = new Player("playerNone");
    #player = new Array(2);

    #cards = new Array2D(5, 4);
    #cardOne;
    #cardTwo;

    #numberCouples = 10

    /* 
        Status 0: Spielbeginn
        Status 1: Spieler wählt Karte 1
        Status 2: Spieler wählt Karte 2
        Status 3: Kartenvergleich + Spielerwechsel
        Status 4: Spielende
    */

    #status = 1;

    constructor(playerOne, playerTwo) {
        this.#player[0] = playerOne;
        this.#player[1] = playerTwo;
    }

    getNumberCouples() {
        return this.#numberCouples;
    }

    getStatus() {
        return this.#status;
    }

    setStatus(status) {
        this.#status = status;
    }

    getCardOne() {
        return this.#cardOne;
    }

    setCardOne(card) {
        this.#cardOne = card;
    }

    getCardTwo() {
        return this.#cardTwo;
    }

    setCardTwo(card) {
        this.#cardTwo = card;
    }

    getCard(x, y) {
        return this.#cards.items[y][x];
    }

    saveCard(card, x, y) {
        this.#cards.items[y][x] = new Card(card, x, y);
    }

    getActivePlayer(){
        return this.#activePlayer;
    }

    getPlayerOne(){
        return this.#player[0];
    }

    getPlayerTwo(){
        return this.#player[1];
    }

    changePlayer() {
        if (this.#activePlayer == this.#player[0]) {
            this.#activePlayer = this.#player[1]
        } else {
            this.#activePlayer = this.#player[0]
        }

        document.getElementById("activePlayer").innerHTML =  "Akiver Spieler: " + game.getActivePlayer().getName();
    }   
}

function Array2D(x, y){
    this.items = new Array(x);
    for(i = 0; i < y; i++){
        this.items[i] = new Array(y);
    }
}

function start(cards) {
    let count = 0;

    for (y = 0; y < 4; y++) {
        for (x = 0; x < 5; x++) {
            let card = cards[count];

            card.classList.add("X" + x);
            card.classList.add("Y" + y);

            card.addEventListener("click", function () {
                addClickEvent(card);
            }, true);

            game.saveCard(card, x, y);
            count++;
        }
    }

    document.getElementById("activePlayer").innerHTML += "-";


    /* Karte Farben */

    /* Namen eingeben */





    /* SPÄTER ENZFERNEN */
    game.changePlayer();

    document.getElementById("test1").innerHTML = "[DEBUG] Spieler 1: " + game.getPlayerOne().getPoints();
    document.getElementById("test2").innerHTML = "[DEBUG] Spieler 2: " + game.getPlayerTwo().getPoints();
    document.getElementById("test3").innerHTML = "[DEBUG] Game status: " + game.getStatus();
}

function addClickEvent(card) {
    x = card.classList[0].substring(1, card.classList[0].length)
    y = card.classList[1].substring(1, card.classList[1].length);

    /*console.log("Das ist die Karte X:" + x + " Y:" + y);*/

    gameCard = game.getCard(x, y);
    element = gameCard.getElement();


    switch (game.getStatus()) {
        case 1:
            moveOne(gameCard);
            break;
        case 2:
            moveTwo(gameCard);
            break;
        default:
            break;
    }

        /*if(element.style.background == "red") {
            card.style.background = "blue";

            setTimeout(function() {
                card.style.background = "lightskyblue";
            }, 2000);

        } else if (element.style.background == "blue") {
        
        } else {
            card.style.background = "red";
        }*/
}

function moveOne(card) {
    if (card.isLocked()) {return}

    /* Karte umdehen --> */

    game.setCardOne(card);
    game.setStatus(2);

    document.getElementById("test3").innerHTML = "[DEBUG] Game status: " + game.getStatus(); /* SPÄTER ENZFERNEN */
}

function moveTwo(card) {
    if (card.isLocked()) {return}
    if(card.getX() == game.getCardOne().getX() && card.getY() == game.getCardOne().getY()) {return}

    /* Karte umdehen --> */

    game.setCardTwo(card);
    game.setStatus(3);

    checkCards(game.getCardOne(), game.getCardTwo());

    document.getElementById("test3").innerHTML = "[DEBUG] Game status: " + game.getStatus(); /* SPÄTER ENZFERNEN */
}

function checkCards(cardOne, cardTwo) {
    
    if(cardOne.getColor() == cardTwo.getColor()) {

        if(game.getActivePlayer() == game.getPlayerOne()) {
            game.getPlayerOne().addAttempt(true);
            console.log("Spieler 1 hat einen Punkt erhalten.");
            document.getElementById("test1").innerHTML = "[DEBUG] Spieler 1: " + game.getPlayerOne().getPoints(); /* SPÄTER ENZFERNEN */
        } else {
            game.getPlayerTwo().addAttempt(true);
            console.log("Spieler 2 hat einen Punkt erhalten.");
            document.getElementById("test2").innerHTML = "[DEBUG] Spieler 2: " + game.getPlayerTwo().getPoints(); /* SPÄTER ENZFERNEN */
        }

        game.getCard(cardOne.getX(), cardOne.getY()).lock();
        game.getCard(cardTwo.getX(), cardTwo.getY()).lock();

        if((game.getPlayerOne().getPoints() + game.getPlayerTwo().getPoints()) == game.getNumberCouples()) {
            game.setStatus(4);

            if (game.getPlayerOne().getPoints() > game.getPlayerTwo().getPoints()) {
                /* Spieler 1 gewinnt */
                console.log("Spieler 1 (" + game.getPlayerOne().getName() + ") hat gewonnen.");

            } else if (game.getPlayerOne().getPoints() < game.getPlayerTwo().getPoints()) {
                /* Spieler 2 gewinnt */
                console.log("Spieler 2 (" + game.getPlayerTwo().getName() + ") hat gewonnen.");

            } else {
                /* Unentschieden */
                console.log("Unentschieden, kein Spieler hat gewonnen.");

            }

        } else {
            /*game.changePlayer(true);*/
            game.setStatus(1);

            /* Karte umdehen --> */
        }

    } else {
        console.log("Spieler " + game.getActivePlayer().getName() + " hat eine falsche Kombination.");
        game.changePlayer(false);
        game.setStatus(1);

        /* Karte umdehen --> */
    }
    document.getElementById("test3").innerHTML = "[DEBUG] Game status: " + game.getStatus(); /* SPÄTER ENZFERNEN */
}




let playerOne = new Player("Player 1");
let playerTwo = new Player("Player 2");

let game = new Game(playerOne, playerTwo);