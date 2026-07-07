
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
    updateCollectionBar();
}

function updateCollectionBar() {
    // Yellow
    document.getElementById('count-yellow').textContent = window.yellowduckno || 0;
    document.getElementById('img-yellow').src = window.yellowduckno > 0 ? 'images/yellow.png' : 'images/blank.png';
    document.getElementById('slot-yellow').classList.toggle('unlocked', window.yellowduckno > 0);

    // Green
    document.getElementById('count-green').textContent = window.greenduckno || 0;
    document.getElementById('img-green').src = window.greenduckno > 0 ? 'images/green.png' : 'images/blank.png';
    document.getElementById('slot-green').classList.toggle('unlocked', window.greenduckno > 0);

    // Blue
    document.getElementById('count-blue').textContent = window.blueduckno || 0;
    document.getElementById('img-blue').src = window.blueduckno > 0 ? 'images/blue.png' : 'images/blank.png';
    document.getElementById('slot-blue').classList.toggle('unlocked', window.blueduckno > 0);

    // Pink
    document.getElementById('count-pink').textContent = window.pinkduckno || 0;
    document.getElementById('img-pink').src = window.pinkduckno > 0 ? 'images/pink.png' : 'images/blank.png';
    document.getElementById('slot-pink').classList.toggle('unlocked', window.pinkduckno > 0);

    // Red
    document.getElementById('count-red').textContent = window.redduckno || 0;
    document.getElementById('img-red').src = window.redduckno > 0 ? 'images/red.png' : 'images/blank.png';
    document.getElementById('slot-red').classList.toggle('unlocked', window.redduckno > 0);

    // White
    document.getElementById('count-white').textContent = window.whiteduckno || 0;
    document.getElementById('img-white').src = window.whiteduckno > 0 ? 'images/white(rare).png' : 'images/blank.png';
    document.getElementById('slot-white').classList.toggle('unlocked', window.whiteduckno > 0);
}