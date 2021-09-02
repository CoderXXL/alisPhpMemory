class Memory {
    init(cards) {
        this.shuffleCards(cards);
        this.setup(cards);
        this.setEventListener(cards);
    }

    setup(cards) {
        let html = this.getHtml();
        this.buildCardsHtml(cards, html.playground);
    }

    getHtml() {
        const playground = document.getElementById('playground');
        const cards = document.getElementsByClassName('card');

        return {
            "playground": playground,
            "cards": cards
        };
    }

    buildCardsHtml(cards, playground) {
        let cardHtml = '';
        for(let card of cards) {
            cardHtml += `
            <div class="card" data-id="${card.id}">
                <div class="inner">
                    <div class="front">
                        <img src="${card.img}" alt="${card.name}">
                    </div>
                    <div class="back">back</div>
                </div>
            </div>
            `;
        }
        playground.innerHTML = cardHtml;
    }

    setEventListener() {
        const playground = this.getHtml()["playground"];
        playground.addEventListener('click', (e) => {
            console.log(e);
            e.target.classList.toggle("flipped");
        });
    }

    shuffleCards(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}

window.onload = () => {
    const cards = data.concat(data);

    let memory = new Memory();
    memory.init(cards);
}