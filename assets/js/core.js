window.onload = function() {
    const button = document.getElementById("startMemory");

    button.addEventListener("click", function () {
        startMemory();
    });

    let form = document.getElementById("createGame");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById("startMemory").click();
    });
}

function loadCards() {
    const cards = document.querySelectorAll(".card");
    start(cards);

    console.log(msg.loadCards);
}

/* 2d array funktion */

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
    let htmlElement;
    let name = "";

    if (createGameStatus == 0) {
        
        htmlElement = document.getElementById("startMemory");
        htmlElement.innerHTML = "Weiter";
        htmlElement.style.top = "0px";

        htmlElement = document.getElementById("playerName");
        htmlElement.classList.replace("hide", "show");
    
        htmlElement = document.getElementById("createGameText");
        htmlElement.innerHTML = "Gebe den Namen für Spieler 1 ein:";

        createGameStatus++;

    } else if (createGameStatus == 1) {
        htmlElement = document.getElementById("playerName");
        name = htmlElement.value;

        if (!name) return;
        if (name.length > 15)  return;

        playerOne = new Player(htmlElement.value);
        htmlElement.value = "";

        htmlElement = document.getElementById("createGameText");
        htmlElement.innerHTML = "Gebe den Namen für Spieler 2 ein:";

        createGameStatus++;

    } else if (createGameStatus == 2) {
        htmlElement = document.getElementById("playerName");
        name = htmlElement.value;

        if (!name) return;
        if (name.length > 15) return;

        playerTwo = new Player(htmlElement.value);
        htmlElement.classList.replace("show", "hide");

        htmlElement = document.getElementById("startForm");
        htmlElement.classList.replace("show", "hide");

        htmlElement = document.getElementById("cards");
        htmlElement.classList.replace("hide", "show");

        game = new Game(playerOne, playerTwo);

        loadCards();
    }

     /* set number Couples */
}