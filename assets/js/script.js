

window.onload = () => {
    // Start here
    const cards = document.getElementsByClassName('card')


    for (let card of cards) {
        card.addEventListener('click', (event) => {
            card.classList.add('card-flip');
        });
    }

    //loop through class and add eventlistenerclick

// end here
}