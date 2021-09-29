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


    /* SPÄTER ENTFERNEN */
    game.changePlayer();
    game.setStatus(1);

    document.getElementById("test1").innerHTML = "[DEBUG] Spieler 1: " + game.getPlayerOne().getPoints();
    document.getElementById("test2").innerHTML = "[DEBUG] Spieler 2: " + game.getPlayerTwo().getPoints();
    document.getElementById("test3").innerHTML = "[DEBUG] Game status: " + game.getStatus();

    /* Alle Farben anzeigen

    for (a = 0; a < 4; a++) {
        for (b = 0; b < 5; b++) {
            game.getCard(b, a).getElement().style.background = game.getCard(b, a).getColor();
        }
    }*/
    /* SPÄTER ENTFERNEN */
}

function addClickEvent(card) {
    x = card.classList[1].substring(1, card.classList[1].length)
    y = card.classList[2].substring(1, card.classList[2].length);

    gameCard = game.getCard(x, y);

    if(game.getStatus() == 1) {
        moveOne(gameCard);
    } else if (game.getStatus() == 2) {
        moveTwo(gameCard);
    }
}

function cardColors() {
    let max = 10;
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

function moveOne(card) {
    if (card.isLocked()) {return}

    card.getElement().style.background = game.getCard(x, y).getColor();

    game.setCardOne(card);
    game.setStatus(2);

    document.getElementById("test3").innerHTML = "[DEBUG] Game status: " + game.getStatus(); /* SPÄTER ENTFERNEN */
}

function moveTwo(card) {
    if (card.isLocked()) {return}
    if(card.getX() == game.getCardOne().getX() && card.getY() == game.getCardOne().getY()) {return}

    card.getElement().style.background = game.getCard(x, y).getColor();

    game.setCardTwo(card);
    game.setStatus(3);

    checkCards(game.getCardOne(), game.getCardTwo());

    document.getElementById("test3").innerHTML = "[DEBUG] Game status: " + game.getStatus(); /* SPÄTER ENTFERNEN */
}

function checkCards(cardOne, cardTwo) {
    
    if(cardOne.getColor() == cardTwo.getColor()) {

        if(game.getActivePlayer() == game.getPlayerOne()) {
            game.getPlayerOne().addAttempt(true);
            console.log("Spieler 1 hat einen Punkt erhalten.");
            document.getElementById("test1").innerHTML = "[DEBUG] Spieler 1: " + game.getPlayerOne().getPoints(); /* SPÄTER ENTFERNEN */
        } else {
            game.getPlayerTwo().addAttempt(true);
            console.log("Spieler 2 hat einen Punkt erhalten.");
            document.getElementById("test2").innerHTML = "[DEBUG] Spieler 2: " + game.getPlayerTwo().getPoints(); /* SPÄTER ENTFERNEN */
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
            game.setStatus(1);
        }

    } else {
        console.log("Spieler " + game.getActivePlayer().getName() + " hat eine falsche Kombination.");
        game.changePlayer();

        setTimeout(function() {
            cardOne.getElement().style.background = null;
            cardTwo.getElement().style.background = null;

            game.setStatus(1);
            document.getElementById("test3").innerHTML = "[DEBUG] Game status: " + game.getStatus(); /* SPÄTER ENTFERNEN */
        }, 2000);
    }

    document.getElementById("test3").innerHTML = "[DEBUG] Game status: " + game.getStatus(); /* SPÄTER ENTFERNEN */
}

let playerOne = new Player("Player 1");
let playerTwo = new Player("Player 2");

let game = new Game(playerOne, playerTwo);