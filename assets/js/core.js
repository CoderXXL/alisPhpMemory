window.onload = function() {
    loadCards();
}

function loadCards() {
    const cards = document.querySelectorAll(".card");
    start(cards);

    console.log("Karten wurden geladen.");
}

function Array2D(x, y){
    this.items = new Array(x);
    for(i = 0; i < y; i++){
        this.items[i] = new Array(y);
    }
}
