window.onload = function() {
    const button = document.getElementById("startMemory");

    button.addEventListener("click", function () {
        memoryController();
    });

    let form = document.getElementById("createGame");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById("startMemory").click();
    });
}

function loadCards() {
    const cards = document.querySelectorAll(".card");
    
    cards[0].id = "test";
    start(cards);

    console.log(msg.loadCards);
}

/* 2d array funktion */

function Array2D(x, y){
    this.items = new Array(y);
    for (let i = 0; i < x; i++){
        this.items[i] = new Array(x);
    }
}


/* create game */

/*  
    0: Start
    1: name playerOne
    2: name playerTwo
    3: select couples
*/
let createGameStatus = 0;

let playerOne;
let playerTwo;

let game;

function memoryController() {
    let htmlElement;
    let value;
    let count;

    if (createGameStatus == 0) {
        
        htmlElement = document.getElementById("startMemory");
        htmlElement.innerHTML = msg.goOn;
        htmlElement.style.top = "0px";

        htmlElement = document.getElementById("playerName");
        htmlElement.classList.replace("hide", "show");
    
        htmlElement = document.getElementById("createGameText");
        htmlElement.innerHTML = msg.setPlayerNameOne;

        createGameStatus++;

    } else if (createGameStatus == 1) {
        htmlElement = document.getElementById("playerName");
        value = htmlElement.value;
        
        if (!value) return;
        if(!checkName(value)) return;
        if (value.length > 15)  return;

        playerOne = new Player(htmlElement.value);
        htmlElement.value = "";

        htmlElement = document.getElementById("createGameText");
        htmlElement.innerHTML = msg.setPlayerNameTwo;

        createGameStatus++;

    } else if (createGameStatus == 2) {
        htmlElement = document.getElementById("playerName");
        value = htmlElement.value;

        if (!value) return;
        if(!checkName(value)) return;
        if (value.length > 15) return;

        playerTwo = new Player(htmlElement.value);
        htmlElement.value = "";

        htmlElement = document.getElementById("createGameText");
        htmlElement.innerHTML = msg.countCouples;

        createGameStatus++;

    } else if (createGameStatus == 3) {
        htmlElement = document.getElementById("playerName");
        count = parseInt(htmlElement.value);
        
        if (!Number.isInteger(count)) return;
        //if (count % 2 != 0) return;
        if (count > 30 || count < 2) return;

        htmlElement.classList.replace("show", "hide");

        htmlElement = document.getElementById("startForm");
        htmlElement.classList.replace("show", "hide");

        htmlElement = document.getElementById("cards");
        htmlElement.classList.replace("hide", "show");

        let div;
        for (let i = 0; i < (count * 2); i++) {
            div = document.createElement("div");
            div.classList.add("card");
            div.classList.add("back");
            document.getElementById("cards").appendChild(div);
        }

        game = new Game(playerOne, playerTwo, count);

        createGameStatus++;
        loadCards();

    } else if (createGameStatus == 4) {
        htmlElement = document.getElementById("startForm");
        htmlElement.classList.replace("hide", "show");
        
        htmlElement = document.getElementById("startMemory");
        htmlElement.innerHTML = msg.playAgain;

        htmlElement = document.getElementById("createGameText");
        htmlElement.innerHTML = msg.gameWin(game.getActivePlayer().getName());
        htmlElement.classList.replace("hide", "show");

        htmlElement = document.getElementById("cards");
        htmlElement.classList.replace("show", "hide");

        htmlElement = document.getElementById("winningPlayer");
        htmlElement.innerHTML = msg.gameWinInfo(game.getPlayerOne());
        htmlElement.innerHTML += htmlElement.value + "\n\n" + msg.gameWinInfo(game.getPlayerTwo());
        value = htmlElement.innerHTML;
        value = value.replaceAll("\n", "<br>");
        htmlElement.innerHTML = value;
        htmlElement.classList.replace("hide", "show");

        htmlElement = document.getElementById("highscore");
        printHighscore();
        htmlElement.classList.replace("hide", "show");

        createGameStatus++;
    
    } else if (createGameStatus == 5) {
        location.reload();
    }

    function checkName(name) {
        let test = /[^A-z0-9]/;
        if (test.exec(name)) {
            return false; 
        } 
        return true;
    }
}