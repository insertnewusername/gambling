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
    duckCarousel.innerHTML = "";

    const ducks = [
        "yellow.png", "yellow.png", "yellow.png", "yellow.png", "yellow.png",
        "green.png", "green.png", "green.png", "green.png",
        "blue.png", "blue.png", "blue.png",
        "pink.png", "pink.png",
        "red.png",
    ];

    // Build the carousel
    for (let i = 0; i < 40; i++) {
        let img = document.createElement("img");
        img.src = "ducks/" + ducks[Math.floor(Math.random() * ducks.length)];
        img.style.width = "100px";
        img.style.marginRight = "10px";
        duckCarousel.appendChild(img);
    }

    // Calculate layout before measuring
    requestAnimationFrame(() => {
        const containerWidth = duckCarousel.scrollWidth;
        const visibleWidth = duckCarousel.clientWidth;
        const scrollDistance = containerWidth - visibleWidth;

        duckCarousel.style.transition = "transform 2s linear";
        duckCarousel.style.transform = `translateX(-${scrollDistance}px)`;
    });

    setTimeout(() => {
        duckCarousel.style.transition = "";
        duckCarousel.style.transform = "";

        duckCarousel.innerHTML = `
            <img src="ducks/${finalDuck}" width="120">
        `;

        resultText.innerHTML = "Rolled: " + finalDuck.replace(".png", "");
    }, 2000);
}