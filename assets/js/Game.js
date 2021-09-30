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

    #status = 0;

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
        return this.#cards.items[x][y];
    }

    saveCard(card, x, y) {
        this.#cards.items[x][y] = new Card(card, x, y);
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

        document.getElementById("activePlayer").innerHTML = "Akiver Spieler: " + game.getActivePlayer().getName();
    }
}