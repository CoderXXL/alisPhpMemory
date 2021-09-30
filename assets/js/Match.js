function start(cards) {
    /* create cards */
    let count = 0;

    for (y = 0; y < 4; y++) {
        for (x = 0; x < 5; x++) {
            let card = cards[count];

            card.classList.add("X" + x);
            card.classList.add("Y" + y);

            game.saveCard(card, x, y);

            count++;
        }
    }

    /* add click event */
    const matchfield = document.getElementById("matchfield");

    matchfield.addEventListener("click", function (event) {
        addClickEvent(event.target);
    });

    /* set active player none */
    document.getElementById("activePlayer").innerHTML += "-";

    /* random card colors */
    cardColors();

    /* set playernames */

    
    /* set number Couples */


    /* start game time */
    timer();

    /* SPÄTER ENTFERNEN */
    game.changePlayer();
    game.setStatus(1);

    document.getElementById("pointsPlayerOne").innerHTML = msg.playerPoints(game.getPlayerOne())
    document.getElementById("pointsPlayerTwo").innerHTML = msg.playerPoints(game.getPlayerTwo())
    /* SPÄTER ENTFERNEN */
}

/* 

additonal start funktions 

*/

function addClickEvent(card) {
    if(!card.classList.contains("card")) return;

    x = card.classList[2].substring(1, card.classList[1].length)
    y = card.classList[3].substring(1, card.classList[2].length);

    gameCard = game.getCard(x, y);

    if(game.getStatus() == 1) {
        moveOne(gameCard);
    } else if (game.getStatus() == 2) {
        moveTwo(gameCard);
    }
}

function cardColors() {
    let max = game.getNumberCouples();
    let min = 2;

    let colors = new Array2D(10, 2);

    colors.items[0][0] = "red";
    colors.items[0][1] = 0;

    colors.items[1][0] = "yellow";
    colors.items[1][1] = 0;

    colors.items[2][0] = "green";
    colors.items[2][1] = 0;

    colors.items[3][0] = "gray";
    colors.items[3][1] = 0;
    
    colors.items[4][0] = "aqua";
    colors.items[4][1] = 0;

    colors.items[5][0] = "blue";
    colors.items[5][1] = 0;

    colors.items[6][0] = "purple";
    colors.items[6][1] = 0;

    colors.items[7][0] = "orange";
    colors.items[7][1] = 0;

    colors.items[8][0] = "lime";
    colors.items[8][1] = 0;

    colors.items[9][0] = "pink";
    colors.items[9][1] = 0;

    for (y = 0; y < 4; y++) {
        for (x = 0; x < 5; x++) {
            game.getCard(x, y).setColor(generateColor());
        }
    }

    function generateColor() {
                let random = Math.floor(Math.random() * max);

                if (colors.items[random][1] >= min) {
                    return generateColor();
                } else {
                    colors.items[random][1] = colors.items[random][1] + 1;
                    return colors.items[random][0];
                }
    }
}

function timer() {
    let second = 0;
    let minute = 0;
    let hour = 0;

    let timerElement = document.getElementById("timer");
    let interval;

    let timerMsg = "";

    startTimer(interval);

    function startTimer(interval){
        interval = setInterval(function() {
                if (game.getStatus() == 4) clearInterval(interval);

                second++;

                if(second == 60){
                    minute++;
                    second = 0;
                }
                if(minute == 60){
                    hour++;
                    minute = 0;
                }

                if (hour > 0) {
                    timerMsg = msg.gameTime + " " + hour + " " + msg.hours + " " + minute + " " + msg.minutes + " " + second + " " + msg.seconds;
                } else {
                    timerMsg = msg.gameTime + " " + minute + " " + msg.minutes + " " + second + " " + msg.seconds;
                }

                timerElement.innerHTML = timerMsg;
        },1000);
    }
}

/*

card click

*/

function moveOne(card) {
    if (card.isLocked()) return;

    card.getElement().classList.replace("back", "front");

    setTimeout(function() {
        card.getElement().style.background = card.getColor();
    }, 300);

    game.setCardOne(card);
    game.setStatus(2);
}

function moveTwo(card) {
    if (card.isLocked()) return;
    if(card.getX() == game.getCardOne().getX() && card.getY() == game.getCardOne().getY()) return;

    card.getElement().classList.replace("back", "front");

    setTimeout(function() {
        card.getElement().style.background = card.getColor();
    }, 300);

    game.setCardTwo(card);
    game.setStatus(3);

    checkCards(game.getCardOne(), game.getCardTwo());
}

function checkCards(cardOne, cardTwo) {

    if(cardOne.getColor() == cardTwo.getColor()) {

        if(game.getActivePlayer() == game.getPlayerOne()) {
            game.getPlayerOne().addAttempt(true);
            document.getElementById("pointsPlayerOne").innerHTML = msg.playerPoints(game.getPlayerOne());
        } else {
            game.getPlayerTwo().addAttempt(true);
            document.getElementById("pointsPlayerTwo").innerHTML = msg.playerPoints(game.getPlayerTwo());
        }

        console.log(msg.playerGetPoint(game.getActivePlayer().getName()));

        game.getCard(cardOne.getX(), cardOne.getY()).lock();
        game.getCard(cardTwo.getX(), cardTwo.getY()).lock();

        if((game.getPlayerOne().getPoints() + game.getPlayerTwo().getPoints()) == game.getNumberCouples()) {
            stop();

        } else {
            game.setStatus(1);
        }

    } else {
        if(game.getActivePlayer() == game.getPlayerOne()) {
            game.getPlayerOne().addAttempt(false);
        } else {
            game.getPlayerTwo().addAttempt(false);
        }

        console.log(msg.wrongCouple(game.getActivePlayer().getName()));

        setTimeout(function() {
            cardOne.getElement().classList.replace("front", "back");
            cardTwo.getElement().classList.replace("front", "back");

            setTimeout(function() {
                cardOne.getElement().style.background = null;
                cardTwo.getElement().style.background = null;
            }, 300);

            game.changePlayer();
            game.setStatus(1);
        }, 2000);
    }
}

/* 

game end 

*/

function stop() {
    game.setStatus(4);

    if (game.getPlayerOne().getPoints() > game.getPlayerTwo().getPoints()) {
        /* Spieler 1 gewinnt */
        console.log(msg.gameWin(game.getPlayerOne().getName()));

    } else if (game.getPlayerOne().getPoints() < game.getPlayerTwo().getPoints()) {
        /* Spieler 2 gewinnt */
        console.log(msg.gameWin(game.getPlayerTwo().getName()));

    } else {
        /* Unentschieden */
        console.log(msg.gameDraw);

    }

    console.log(msg.gameWinInfo(game.getPlayerOne()));
    console.log(msg.gameWinInfo(game.getPlayerTwo()));
}

/* 

create new game 

*/

let playerOne = new Player("Player 1");
let playerTwo = new Player("Player 2");

let game = new Game(playerOne, playerTwo);