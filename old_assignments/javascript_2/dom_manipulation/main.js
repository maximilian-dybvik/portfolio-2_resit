// Advanced DOM Manipulation //

// Loads the dom before we draw the cards in order to utilize our template.
document.addEventListener("DOMContentLoaded", function() {
    // A for loop for making 9 cards.
    for (let i = 1; i <= 9; i++) {
        let cardTemplate = document.querySelector("#cardTemplate");
        let card = cardTemplate.content.querySelector(".card");

        // Set card__title text dynamically:
        cardTemplate.content.querySelector(".card__title").innerHTML = "This is a test Card for Noroff, it is number " + i;

        // Set data attribute value equal to card number.
        card.setAttribute("data-number", i);

        // Set class to card--green on any odd numbered card
        if (i % 2 !== 0) {
            card.classList.add("card--green");
        } else {
            card.classList.remove("card--green");
        }

        // Clone the template and append to the body.
        let cardClone = cardTemplate.content.cloneNode(true);
        document.body.appendChild(cardClone);
    }
});