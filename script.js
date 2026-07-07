
// --- DUCK COLLECTION SYSTEM ---

const DUCK_TYPES = [
    { id: 'yellow.png',     name: 'Yellow' },
    { id: 'green.png',      name: 'Green' },
    { id: 'blue.png',       name: 'Blue' },
    { id: 'pink.png',       name: 'Pink' },
    { id: 'red.png',        name: 'Red' },
    { id: 'white(rare).png', name: 'White' }
];

const RARITY_MAP = {
    'yellow.png': '50%',
    'green.png': '25%',
    'blue.png': '15%',
    'pink.png': '6%',
    'red.png': '3%',
    'white(rare).png': '1%'
};


// --- ROLL LOGIC ---

function rollDuck() {
    const roll = Math.random() * 100;

    if (roll < 50) {
        return "Yellow Duck";
    } else if (roll < 75) {
        return "Green Duck";
    } else if (roll < 90) {
        return "Blue Duck";
    } else if (roll < 96) {
        return "Pink Duck";
    } else if (roll < 99) {
        return "Red Duck";
    } else {
        return "White Duck (ULTRA RARE)";
    }
}

function updateduckcount(duckFile) {
    if (duckFile === "Yellow Duck") {
        window.yellowduckno++;
    } else if (duckFile === "Green Duck") {
        window.greenduckno++;
    } else if (duckFile === "Blue Duck") {
        window.blueduckno++;
    } else if (duckFile === "Pink Duck") {
        window.pinkduckno++;
    } else if (duckFile === "Red Duck") {
        window.redduckno++;
    } else if (duckFile === "White Duck (ULTRA RARE") {
        window.whiteduckno++;
    }
}

    