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

    const ducks = [
        "yellow.png", "yellow.png", "yellow.png", "yellow.png", "yellow.png", // 50%
        "green.png", "green.png", "green.png", "green.png",                  // 25%
        "blue.png", "blue.png", "blue.png",                                  // 15%
        "pink.png", "pink.png",                                              // 6%
        "red.png",                                                           // 3%
        // white is NOT in the spin list (rare reveal only)
    ];

    // Create a LONG scrolling list
    for (let i = 0; i < 40; i++) {
        let img = document.createElement("img");
        img.src = "ducks/" + ducks[Math.floor(Math.random() * ducks.length)];
        img.style.width = "100px";
        img.style.marginRight = "10px";
        duckCarousel.appendChild(img);
    }

    // Animate scroll (now wide enough)
    duckCarousel.style.transition = "transform 2s linear";
    duckCarousel.style.transform = "translateX(-3000px)";

    // After animation ends → show final duck
    setTimeout(() => {
        duckCarousel.style.transition = "";
        duckCarousel.style.transform = "";

        duckCarousel.innerHTML = `
            <img src="ducks/${finalDuck}" width="120">
        `;

        resultText.innerHTML = "Rolled: " + finalDuck.replace(".png", "");
    }, 2000);
}
