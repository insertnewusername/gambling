function rollDuck() {
    const roll = Math.random() * 100; // 0–100%

    if (roll < 50) {
        return "yellow.png";          // 50%
    } else if (roll < 75) {
        return "green.png";           // 25%
    } else if (roll < 90) {
        return "blue.png";            // 15%
    } else if (roll < 96) {
        return "pink.png";            // 6%
    } else if (roll < 99) {
        return "red.png";             // 3%
    } else {
        return "white(rare).png";     // 1%
    }
}


function startRollAnimation(finalDuck) {
    rollOverlay.style.display = "flex";

    duckCarousel.innerHTML = ""; // clear previous

    const ducks = ["yellow.png", "green.png", "blue.png", "pink.png", "red.png"];

    // Create scrolling ducks
    for (let i = 0; i < 20; i++) {
        let img = document.createElement("img");
        img.src = "ducks/" + ducks[Math.floor(Math.random() * ducks.length)];
        img.style.width = "100px";
        img.style.marginRight = "10px";
        duckCarousel.appendChild(img);
    }

    // Animate scroll
    duckCarousel.style.transition = "transform 1.5s linear";
    duckCarousel.style.transform = "translateX(-1500px)";

    // After animation ends → show final duck
    setTimeout(() => {
        duckCarousel.style.transition = "";
        duckCarousel.style.transform = "";

        duckCarousel.innerHTML = `
            <img src="ducks/${finalDuck}" width="120">
        `;

        resultText.innerHTML = "Rolled: " + finalDuck.replace(".png", "");
    }, 1500);
}
