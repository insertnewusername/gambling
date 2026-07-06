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
    resultText.innerHTML = "";

    //  Reset the container
    duckCarousel.innerHTML = ""; // Delete old track

    // Create the inner moving track 
    const track = document.createElement("div");
    track.style.display = "flex";
    track.style.alignItems = "center";
    track.style.height = "100%";
    track.style.width = "max-content"; // Make it as wide as the ducks
    track.style.transition = "none";   // No animation yet
    track.style.transform = "translateX(0)";

    // Duck pool for the spinning effect 
    const fillerDucks = [
        "yellow.png", "yellow.png", "yellow.png", "yellow.png", "yellow.png",
        "green.png", "green.png", "green.png", "green.png",
        "blue.png", "blue.png", "blue.png",
        "pink.png", "pink.png",
        "red.png"
    ];

    const totalDucks = 50;
    const targetIndex = 28; // Winner sits here

    // Fill with ducks!
    for (let i = 0; i < totalDucks; i++) {
        let img = document.createElement("img");
        
        let src;
        if (i === targetIndex) {
            src = "ducks/" + finalDuck;
            img.id = "targetDuck"; // Tag the winner
        } else {
            src = "ducks/" + fillerDucks[Math.floor(Math.random() * fillerDucks.length)];
        }
        
        img.src = src;
        img.style.height = "200px";    
        img.style.width = "auto";      
        img.style.margin = "0 10px";
        img.style.flexShrink = "0";    // Stop images from squishing
        
        track.appendChild(img);
    }

    // Put the track inside the carousel
    duckCarousel.appendChild(track);

    // Calculate and animate 
    requestAnimationFrame(() => {
        const target = document.getElementById("targetDuck");
        if (!target) return;

        const containerWidth = duckCarousel.clientWidth;
        const targetOffset = target.offsetLeft;
        const targetWidth = target.offsetWidth;

        // Distance to scroll to center the winning duck
        const scrollToX = targetOffset - (containerWidth / 2) + (targetWidth / 2);

        // Apply smooth animation to the INNER track
        track.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.15, 1)";
        track.style.transform = `translateX(-${scrollToX}px)`;
    });

    // Result
    setTimeout(() => {
        resultText.innerHTML = "🎉 Rolled: " + finalDuck.replace(".png", "");
    }, 3200);
}