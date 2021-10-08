class Player {
    #attempts = 0;
    #rightAttempts = 0;

    #name;

    constructor(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }
    
    getAttemps() {
        return this.#attempts;
    }

    getPoints() {
        return this.#rightAttempts;
    }

    addAttempt(right) {
        if (right) {
            this.#rightAttempts++;
        }

        this.#attempts++;
    }
}