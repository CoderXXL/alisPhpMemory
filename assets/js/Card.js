class Card {
    #locked = false;
    #color = "black";
    #position = new Array(2);
    #element;

    constructor(card, x, y) {
        this.#element = card;
        this.#position[0] = x;
        this.#position[1] = y;
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

    getX() {
        return this.#position[0];
    }

    getY() {
        return this.#position[1];
    }

    getColor() {
        return this.#color;
    }

    setColor(color) {
        this.#color = color;
    }
}