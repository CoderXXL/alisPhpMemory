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

    //DEBUG
    //eatSomeCookies();
    //jsonTest();
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

        //DEBUG
        //changeCookie();

    } else if (createGameStatus == 1) {
        htmlElement = document.getElementById("playerName");
        let name = htmlElement.value;
        
        if (!name) return;
        if(!checkName(name)) return;
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
        if(!checkName(name)) return;
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

    function checkName(name) {
        let test = /[^A-z0-9]/;
        if (test.exec(name)) {
            return false; 
        } 
        return true;
    }
}


/*function eatSomeCookies() {
    document.cookie = "cookie=test; max-age=31536000; Secure";

    let date = new Date();
    date = new Date(date.getTime() + 60*60*24*365);

    let cookieTest = new Cookie("cookieTest");
    cookieTest.setValue("Schokolade");
    //cookieTest.setMaxAge("31536000");
    cookieTest.setExpires(date.toUTCString());
    cookieTest.setDomain("sub.localhost");
    //cookieTest.setPath("/home");

    console.log(document.cookie);
}

function changeCookie() {
    let cookies = getCookies();
    let cookie;
    
    for(i = 0; i < cookies.items.length; i++) {
        console.log(i + ": " + cookies.items[i][0] + " » " + cookies.items[i][1]);
        cookie = new Cookie(cookies.items[i][0]);
        cookie.setValue("haha");
    }
}

function delCookies() {
    let cookieTest = new Cookie("cookieTest");
    cookieTest.delete();

    console.log(document.cookie);
}

function jsonTest() {
    let test = '{' +
        '"highscore":[' +
            '{' + 
                '"name": "Sebastian",' +
                '"score": 17,' +
                '"time": "30m 23s"' +
            '}' +
        ']' +
    '}';

    let obj = JSON.parse(test);

    let name = "Fabian";
    let newScore = {"name":name,"score":25,"time":"25m 41s"};

    obj.highscore.push(newScore);

    console.log(test);
    console.log(obj.countScores);
    console.log(obj.highscore[0].name);
    console.log(obj.highscore[1].name);

    obj.highscore.pop();
    console.log(obj.highscore);
    
}*/