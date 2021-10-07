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
    3: select couples //in work
*/
let createGameStatus = 0;

let playerOne;
let playerTwo;

let game;

function startMemory() {
    let htmlElement;
    let name = "";

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
        let name = htmlElement.value;

        if (!name) return;
        if (name.length > 15)  return;

        playerOne = new Player(htmlElement.value);
        htmlElement.value = "";

        htmlElement = document.getElementById("createGameText");
        htmlElement.innerHTML = msg.setPlayerNameTwo;

        createGameStatus++;

    } else if (createGameStatus == 2) {
        htmlElement = document.getElementById("playerName");
        let name = htmlElement.value;

        if (!name) return;
        if (name.length > 15) return;

        playerTwo = new Player(htmlElement.value);
        htmlElement.value = "";

        htmlElement = document.getElementById("createGameText");
        htmlElement.innerHTML = msg.countCouples;

        createGameStatus++;

    } else if (createGameStatus == 3) {
        htmlElement = document.getElementById("playerName");
        let count = parseInt(htmlElement.value);
        
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

        loadCards();
    }

     /* set number Couples */
}


function eatSomeCookies() {
    create();
    function create() {
        let date = new Date();
        date = new Date(date.getTime() + 1000*60*60*24*365);
        
        console.log("" + date.toGMTString());

        let name = "test";
        let path = "/"
        let domain = "heroesofgamers.de";

        //document.cookie = "name=" + name + "; max-age=" + date.toGMTString() + "; path=" + path + "; domain=" + domain + ";";

        document.cookie = "name=oeschger; SameSite=None; Secure";
        document.cookie = "favorite_food=tripe; SameSite=None; Secure";
        
        console.log(document.cookie);
    }

    get();
    function get() {
        let cookies = document.cookie;

        let cookieList = cookies.split(";");
        
        for(i = 0; i < cookieList.length; i++) {
            console.log(i + ": " + cookieList[i].substring(0, cookieList[i].indexOf("=")) + "  CookieList.lenght: " + cookieList.length);
        }
    }
}