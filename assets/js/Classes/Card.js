class Card {
    #locked = false;
    #color = "black";
    #id;
    #element;

    constructor(card, id) {
        this.#element = card;
        this.#id = id;
    }

    isLocked() {
        return this.#locked;
    }

    lock() {
        this.#locked = true;
    }

    getElement() {
        return this.#element;
    }

    getID() {
        return this.#id;
    }

    getColor() {
        return this.#color;
    }

    setColor(color) {
        this.#color = color;
    }
}