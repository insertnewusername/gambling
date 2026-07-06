// --- COIN SAVING SYSTEM ---
const COINS_KEY = 'onekey_coins';

function loadCoins() {
    const saved = localStorage.getItem(COINS_KEY);
    return saved ? parseInt(saved, 10) : 0;
}

function saveCoins() {
    localStorage.setItem(COINS_KEY, coins.toString());
}

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

function loadCollection() {
    const saved = localStorage.getItem('duckCollection');
    if (saved) {
        return JSON.parse(saved);
    }
    const initial = {};
    DUCK_TYPES.forEach(d => initial[d.id] = 0);
    return initial;
} 

let duckCounts = loadCollection();

function saveCollection() {
    localStorage.setItem('duckCollection', JSON.stringify(duckCounts));
}

function renderCollection() {
    const container = document.getElementById('collectionContainer');
    if (!container) return;
    container.innerHTML = '';

    DUCK_TYPES.forEach(duck => {
        const count = duckCounts[duck.id] || 0;
        const isUnlocked = count > 0;

        const slot = document.createElement('div');
        slot.className = `collection-slot ${isUnlocked ? 'unlocked' : ''}`;

        const imgWrapper = document.createElement('div');
        if (isUnlocked) {
            const img = document.createElement('img');
            img.src = `ducks/${duck.id}`;
            img.alt = duck.name;
            img.className = 'duck-img';
            imgWrapper.appendChild(img);
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'locked-placeholder';
            placeholder.textContent = '?';
            imgWrapper.appendChild(placeholder);
        }

        const label = document.createElement('div');
        label.className = 'duck-label';
        label.textContent = duck.name;

        const countDisplay = document.createElement('div');
        countDisplay.className = 'duck-count';
        countDisplay.textContent = count;

        slot.appendChild(imgWrapper);
        slot.appendChild(label);
        slot.appendChild(countDisplay);
        container.appendChild(slot);
    });
}

function addDuckToCollection(duckId) {
    if (duckCounts[duckId] !== undefined) {
        duckCounts[duckId]++;
        saveCollection();
        renderCollection();
    }
}

renderCollection();

// --- ROLL LOGIC ---

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

    duckCarousel.innerHTML = "";

    const track = document.createElement("div");
    track.style.display = "flex";
    track.style.alignItems = "center";
    track.style.height = "100%";
    track.style.width = "max-content";
    track.style.transition = "none";
    track.style.transform = "translateX(0)";

    const fillerDucks = [
        "yellow.png", "yellow.png", "yellow.png", "yellow.png", "yellow.png",
        "green.png", "green.png", "green.png", "green.png",
        "blue.png", "blue.png", "blue.png",
        "pink.png", "pink.png",
        "red.png"
    ];

    const totalDucks = 50;
    const targetIndex = 28;
    const loadPromises = [];

    for (let i = 0; i < totalDucks; i++) {
        let img = document.createElement("img");

        let src;
        if (i === targetIndex) {
            src = "ducks/" + finalDuck;
            img.id = "targetDuck";
        } else {
            src = "ducks/" + fillerDucks[Math.floor(Math.random() * fillerDucks.length)];
        }

        img.src = src;
        img.style.width = "120px";
        img.style.height = "120px";
        img.style.objectFit = "contain";
        img.style.margin = "0 10px";
        img.style.flexShrink = "0";
        img.style.borderRadius = "8px";
        img.style.backgroundColor = "#f0f0f0"; // fallback while loading


        const loadPromise = new Promise((resolve) => {
            if (img.complete) {
                resolve();
            } else {
                img.onload = resolve;
                img.onerror = resolve; // resolve anyway
            }
        });
        loadPromises.push(loadPromise);

        track.appendChild(img);
    }

    duckCarousel.appendChild(track);

    Promise.all(loadPromises).then(() => {
        // Double RAF ensures the browser has finished layout
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const target = document.getElementById("targetDuck");
                if (!target) return;

                const containerWidth = duckCarousel.clientWidth;
                const targetOffset = target.offsetLeft;
                const targetWidth = target.offsetWidth;

                const scrollToX = targetOffset - (containerWidth / 2) + (targetWidth / 2);

                track.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.15, 1)";
                track.style.transform = `translateX(-${scrollToX}px)`;
            });
        });
    });

 setTimeout(() => {
    const target = document.getElementById("targetDuck");
    if (target) {
        target.classList.add("glow"); 
    }
    const duckName = finalDuck.replace(".png", "");
    const rarity = RARITY_MAP[finalDuck] || '';
    resultText.innerHTML = `🎉 Rolled: ${duckName} (${rarity})`;
    addDuckToCollection(finalDuck);
}, 3200);
}

// --- FALLING DUCKS---

function spawnFallingDucks(count = 2) {
    // Create container if it doesn't exist
    let container = document.getElementById('fallingDuckContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'fallingDuckContainer';
        document.body.appendChild(container);
    }

    const duckIds = DUCK_TYPES.map(d => d.id);

    for (let i = 0; i < count; i++) {
        const duck = document.createElement('img');
        const randomDuck = getWeightedRandomDuck();
        duck.src = `ducks/${randomDuck}`;

        // Randomise size, position, rotation, and fall speed
        const size = 45 + Math.random() * 40;          // 45–85px
        const left = 5 + Math.random() * 90;           // 5% – 95%
        const rotation = Math.random() * 360;
        const duration = 2.5 + Math.random() * 3;      // 2.5–5.5 seconds
        const delay = Math.random() * 0.4;             // up to 0.4s delay

        duck.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: auto;
            left: ${left}%;
            top: -60px;
            transform: rotate(${rotation}deg);
            opacity: 0.9;
            pointer-events: none;
            animation: duckFall ${duration}s ease-in ${delay}s forwards;
        `;

        container.appendChild(duck);

        // Remove the element after animation ends + small buffer
        const totalTime = (duration + delay) * 1000 + 200;
        setTimeout(() => {
            if (duck.parentNode) duck.remove();
        }, totalTime);
    }
}

// --- WEIGHTED RANDOM DUCK (based on collection counts) ---

function getWeightedRandomDuck() {
    const total = Object.values(duckCounts).reduce((a, b) => a + b, 0);
    if (total === 0) {
        // Fallback: if no ducks owned yet, show all types equally
        const allIds = DUCK_TYPES.map(d => d.id);
        return allIds[Math.floor(Math.random() * allIds.length)];
    }

    let rand = Math.random() * total;
    for (const id in duckCounts) {
        const count = duckCounts[id];
        if (count > 0) {
            rand -= count;
            if (rand <= 0) {
                return id;
            }
        }
    }
    // Safety fallback (should never reach)
    return DUCK_TYPES[0].id;
}