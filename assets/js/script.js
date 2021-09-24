window.onload = function() {
    loadCards();
}

window.onclick = function() {
/*
    game.getCard(4, 3).getElement().style.background = "red";

    const card = document.querySelectorAll(".X0, .Y0");
    
    for (i = 0; i < card.length; i++) {
        card[i].style.background = "green";
    }
*/
}

function loadCards() {
    const cards = document.querySelectorAll("#card");
    start(cards);

    console.log("Karten wurden geladen.");
}

/*
function getCards() {
    const cards = document.querySelectorAll("#card");

    for (i = 0; i < cards.length; i++) {
        alert("am laden");
        cards[i].addEventListener("load", function () {
            start(cards[i]);
        }, true);
    }

    alert("geladen");
}
*/