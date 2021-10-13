class Game {
    #activePlayer = new Player("playerNone");
    #player = new Array(2);

    #numberCouples;

    #cards = new Array(0);
    #cardOne;
    #cardTwo;

    #interval;
    #timer = [0, 0, 0];

    /* 
        Status 0: Spielbeginn
        Status 1: Spieler wählt Karte 1
        Status 2: Spieler wählt Karte 2
        Status 3: Kartenvergleich + Spielerwechsel
        Status 4: Spielende
    */

    #status = 0;

    constructor(playerOne, playerTwo, numberCouples) {
        this.#player[0] = playerOne;
        this.#player[1] = playerTwo;
        this.#numberCouples = numberCouples;
    }

    #getTest() {

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

    getCard(id) {
        for(let i = 0; i < this.#cards.length; i++) {
            if(this.#cards[i].getID() == id) return this.#cards[i];
        }
        return null;
    }

    saveCard(card, id) {
        this.#cards[this.#cards.length] = new Card(card, id);
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

    #timerControl() {
        let timerElement = document.getElementById("timer");
        let timer = this.#timer;
        let timerMsg = "";

        this.#interval = setInterval(function() {
            timer[0] = timer[0] + 1 ;

            if (timer[0] == 60) {
                timer[1] = timer[1] + 1;
                timer[0] = 0;
            }

            if (timer[1] == 60) {
                timer[2] = timer[2] + 1;
                timer[1] = 0;
            }

            if (timer[2] > 0) {
                timerMsg = msg.gameTime + " " + timer[2] + "" + msg.hours + " " + timer[1] + "" + msg.minutes + " " + timer[0] + "" + msg.seconds;
            } else {
                timerMsg = msg.gameTime + " " + timer[1] + "" + msg.minutes + " " + timer[0] + "" + msg.seconds;
            }

            timerElement.innerHTML = timerMsg;
        },1000);
    }

    startTimer() {
        this.#timerControl();
    }

    getTimer() {
        return this.#timer;
    }

    endTimer() {
        clearInterval(this.#interval);
    }
}