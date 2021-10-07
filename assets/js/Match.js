function start(cards) {
    /* create cards */

    for (let id = 0; id < (game.getNumberCouples() * 2); id++) {
            let card = cards[id];

            card.id = "card" + id;
            game.saveCard(card, id);
    }

    /* add click event */
    const matchfield = document.getElementById("matchfield");

    matchfield.addEventListener("click", function (event) {
        addClickEvent(event.target);
    });

    /* random card colors */
    cardColors();

    /* start game time */
    timer();

    /* game info */
    game.changePlayer();
    document.getElementById("pointsPlayerOne").innerHTML = msg.playerPoints(game.getPlayerOne())
    document.getElementById("pointsPlayerTwo").innerHTML = msg.playerPoints(game.getPlayerTwo())

    /* start game */
    game.setStatus(1);
}

/* 

additonal start funktions 

*/

function addClickEvent(card) {
    if (!card.classList.contains("card")) return;

    id = card.id.substring(4, card.id.length);

    gameCard = game.getCard(id);

    if (game.getStatus() == 1) {
        moveOne(gameCard);
    } else if (game.getStatus() == 2) {
        moveTwo(gameCard);
    }
}

function cardColors() {
    let max = game.getNumberCouples();
    let min = 2;

    let colors = new Array2D(30, 2);

    colors.items[0][0] = "#00FFFF"; //cyan
    colors.items[0][1] = 0;

    colors.items[1][0] = "#00BFFF"; //DeepSkyBlue
    colors.items[1][1] = 0;

    colors.items[2][0] = "#7FFFD4"; //Aquamarine
    colors.items[2][1] = 0;

    colors.items[3][0] = "#0000FF"; //Blue
    colors.items[3][1] = 0;
    
    colors.items[4][0] = "#006400"; //DarkGreen
    colors.items[4][1] = 0;

    colors.items[5][0] = "#8FBC8F"; //DarkSeaGreen
    colors.items[5][1] = 0;

    colors.items[6][0] = "#90EE90"; //LightGreen
    colors.items[6][1] = 0;

    colors.items[7][0] = "#00FF00"; //Lime
    colors.items[7][1] = 0;

    colors.items[8][0] = "#FF8C00"; //DarkOrange
    colors.items[8][1] = 0;

    colors.items[9][0] = "#8A2BE2"; //BlueViolet
    colors.items[9][1] = 0;

    colors.items[10][0] = "#8B008B"; //DarkMagenta
    colors.items[10][1] = 0;

    colors.items[11][0] = "#EE82EE"; //Violet
    colors.items[11][1] = 0;

    colors.items[12][0] = "#A9A9A9"; //DarkGray
    colors.items[12][1] = 0;

    colors.items[13][0] = "#2F4F4F"; //DarkSlateGray
    colors.items[13][1] = 0;

    colors.items[14][0] = "#696969"; //DimGray
    colors.items[14][1] = 0;

    colors.items[15][0] = "#778899"; //LightSlateGray
    colors.items[15][1] = 0;

    colors.items[16][0] = "#FF4500"; //OrangeRed
    colors.items[16][1] = 0;

    colors.items[17][0] = "#FF0000"; //Red
    colors.items[17][1] = 0;

    colors.items[18][0] = "#CD5C5C"; //IndianRed
    colors.items[18][1] = 0;

    colors.items[19][0] = "#DC143C"; //Crimson
    colors.items[19][1] = 0;

    colors.items[20][0] = "#A52A2A"; //Brown
    colors.items[20][1] = 0;

    colors.items[21][0] = "#8B4513"; //SaddleBrown
    colors.items[21][1] = 0;

    colors.items[22][0] = "#F4A460"; //SandyBrown
    colors.items[22][1] = 0;

    colors.items[23][0] = "#FFFF00"; //Yellow
    colors.items[23][1] = 0;

    colors.items[24][0] = "#FFFFE0"; //LightYellow
    colors.items[24][1] = 0;

    colors.items[25][0] = "#B8860B"; //DarkGoldenRod
    colors.items[25][1] = 0;

    colors.items[26][0] = "#FF1493"; //DeepPink
    colors.items[26][1] = 0;

    colors.items[27][0] = "#FFD700"; //Gold
    colors.items[27][1] = 0;

    colors.items[28][0] = "#FF69B4"; //HotPink
    colors.items[28][1] = 0;

    colors.items[29][0] = "#4682B4"; //SteelBlue
    colors.items[29][1] = 0;

    for (let id = 0; id < (game.getNumberCouples() * 2); id++) {
        game.getCard(id).setColor(generateColor());
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
    if (card.getID() == game.getCardOne().getID()) return;

    card.getElement().classList.replace("back", "front");

    setTimeout(function() {
        card.getElement().style.background = card.getColor();
    }, 300);

    game.setCardTwo(card);
    game.setStatus(3);

    checkCards(game.getCardOne(), game.getCardTwo());
}

function checkCards(cardOne, cardTwo) {

    if (cardOne.getColor() == cardTwo.getColor()) {

        if (game.getActivePlayer() == game.getPlayerOne()) {
            game.getPlayerOne().addAttempt(true);
            document.getElementById("pointsPlayerOne").innerHTML = msg.playerPoints(game.getPlayerOne());
        } else {
            game.getPlayerTwo().addAttempt(true);
            document.getElementById("pointsPlayerTwo").innerHTML = msg.playerPoints(game.getPlayerTwo());
        }

        console.log(msg.playerGetPoint(game.getActivePlayer().getName()));

        game.getCard(cardOne.getID()).lock();
        game.getCard(cardTwo.getID()).lock();

        if ((game.getPlayerOne().getPoints() + game.getPlayerTwo().getPoints()) == game.getNumberCouples()) {
            stop();

        } else {
            game.setStatus(1);
        }

    } else {
        if (game.getActivePlayer() == game.getPlayerOne()) {
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