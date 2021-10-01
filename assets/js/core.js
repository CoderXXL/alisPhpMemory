window.onload = function() {
    const button = document.getElementById("startMemory");

    button.addEventListener("click", function () {
        startMemory();
    });
}

function loadCards() {
    const cards = document.querySelectorAll(".card");
    start(cards);

    console.log(msg.loadCards);
}

function Array2D(x, y){
    this.items = new Array(y);
    for(i = 0; i < x; i++){
        this.items[i] = new Array(x);
    }
}


/* create game */

let createGameStatus = 0;

let playerOne;
let playerTwo;

let game;

function startMemory() {
    /* 
        status 0:   - startMemory = hidden
                    - namePlayerOne = visible

        status 1:   - namePlayerOne

        status 2:   - namePlayerTwo
                    - cards = visible
    */

    let htmlElement;

    if (createGameStatus == 0) {
        htmlElement = document.getElementById("startMemory");
        htmlElement.innerHTML = "Weiter";

        htmlElement = document.getElementById("namePlayerOne");
        htmlElement.style.visibility = "visible";
    
        createGameStatus++;

    } else if (createGameStatus == 1) {
        htmlElement = document.getElementById("namePlayerOne");
        playerOne = new Player(htmlElement.value);
        htmlElement.style.visibility = "hidden";

        htmlElement = document.getElementById("namePlayerTwo");
        htmlElement.style.visibility = "visible";

        createGameStatus++;

    } else if (createGameStatus == 2) {
        htmlElement = document.getElementById("namePlayerTwo");
        playerTwo = new Player(htmlElement.value);
        htmlElement.style.visibility = "hidden";

        htmlElement = document.getElementById("startForm");
        htmlElement.style.visibility = "hidden";

        htmlElement = document.getElementById("cards");
        htmlElement.style.visibility = "visible";

        game = new Game(playerOne, playerTwo);

        loadCards();
    }
}

