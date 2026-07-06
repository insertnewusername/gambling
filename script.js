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
