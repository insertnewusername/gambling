function rollDuck() {
    const roll = Math.random() * 100;

    if (roll < 50) {
        return "yellow.png";
    } else if (roll < 75) {
        return "green.png";
    } else if (roll < 90) {
        return "blue.png";
    } else if (roll < 96) {
        return "pink.png";
    } else if (roll < 99) {
        return "red.png";
    } else {
        return "white(rare).png";
    }
}

function startRollAnimation(finalDuck) {
    rollOverlay.style.display = "flex";
    resultText.innerHTML = ""; // clear old result

    // ------------------------------------------------------------
    // Reset the carousel to prevent layout breaking
    // ------------------------------------------------------------
    duckCarousel.style.transition = "none";
    duckCarousel.style.transform = "translateX(0)";
    duckCarousel.innerHTML = "";
    // Force the browser to apply these resets immediately
    void duckCarousel.offsetWidth;

    // ------------------------------------------------------------
    // Carousel with 50 ducks
    // ------------------------------------------------------------
    const fillerDucks = [
        "yellow.png", "yellow.png", "yellow.png", "yellow.png", "yellow.png",
        "green.png", "green.png", "green.png", "green.png",
        "blue.png", "blue.png", "blue.png",
        "pink.png", "pink.png",
        "red.png"
    ];

    const totalDucks = 50;
    const targetIndex = 28; //  The winning duck!

    for (let i = 0; i < totalDucks; i++) {
        let img = document.createElement("img");

        let src;
        if (i === targetIndex) {
            src = "ducks/" + finalDuck;
        } else {
            src = "ducks/" + fillerDucks[Math.floor(Math.random() * fillerDucks.length)];
        }

        img.src = src;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.marginRight = "10px";
        img.style.flexShrink = "0"; // Prevent images from squishing
        if (i === targetIndex) {
            img.id = "targetDuck"; 
        }
        duckCarousel.appendChild(img);
    }

    // ------------------------------------------------------------
    // Winning duck centered
    // ------------------------------------------------------------
    requestAnimationFrame(() => {
        const target = document.getElementById("targetDuck");
        if (!target) return;

        const containerWidth = duckCarousel.clientWidth;
        const targetOffset = target.offsetLeft;
        const targetWidth = target.offsetWidth;

        // Calculate how far to scroll so the target is perfectly centered
        const scrollToX = targetOffset - (containerWidth / 2) + (targetWidth / 2);

        // Apply the smooth slot-machine spin (3 seconds with a nice easing)
        duckCarousel.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.15, 1)";
        duckCarousel.style.transform = `translateX(-${scrollToX}px)`;
    });

    // ------------------------------------------------------------
    // Result
    // ------------------------------------------------------------
    setTimeout(() => {
        // Remove the temporary highlight border
        const target = document.getElementById("targetDuck");
        if (target) target.style.border = "none";

        // Show what you rolled
        resultText.innerHTML = "🎉 Rolled: " + finalDuck.replace(".png", "");
    }, 3200); // Wait a bit longer than the transition (3s)
}