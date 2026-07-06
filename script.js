// --- DUCK COLLECTION SYSTEM ---

const DUCK_TYPES = [
    { id: 'yellow.png',     name: 'Yellow' },
    { id: 'green.png',      name: 'Green' },
    { id: 'blue.png',       name: 'Blue' },
    { id: 'pink.png',       name: 'Pink' },
    { id: 'red.png',        name: 'Red' },
    { id: 'white(rare).png', name: 'White' }
];

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
            target.style.border = "4px solid gold";
            target.style.borderRadius = "12px";
            target.style.boxShadow = "0 0 30px gold, 0 0 60px rgba(255, 215, 0, 0.5)";
        }
        resultText.innerHTML = "🎉 Rolled: " + finalDuck.replace(".png", "");
        addDuckToCollection(finalDuck);
    }, 3200);
}