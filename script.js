// --- DUCK COLLECTION SYSTEM ---

// Master list of all ducks
const DUCK_TYPES = [
    { id: 'yellow.png',     name: 'Yellow' },
    { id: 'green.png',      name: 'Green' },
    { id: 'blue.png',       name: 'Blue' },
    { id: 'pink.png',       name: 'Pink' },
    { id: 'red.png',        name: 'Red' },
    { id: 'white(rare).png', name: 'White' }
];

// Load saved collection from localStorage, or start fresh
function loadCollection() {
    const saved = localStorage.getItem('duckCollection');
    if (saved) {
        return JSON.parse(saved);
    }
    // Initialize all counts to 0
    const initial = {};
    DUCK_TYPES.forEach(d => initial[d.id] = 0);
    return initial;
}

let duckCounts = loadCollection();

function saveCollection() {
    localStorage.setItem('duckCollection', JSON.stringify(duckCounts));
}

// Render the collection bar at the bottom
function renderCollection() {
    const container = document.getElementById('collectionContainer');
    if (!container) return;
    container.innerHTML = '';

    DUCK_TYPES.forEach(duck => {
        const count = duckCounts[duck.id] || 0;
        const isUnlocked = count > 0;

        const slot = document.createElement('div');
        slot.className = `collection-slot ${isUnlocked ? 'unlocked' : ''}`;

        // --- Image / Placeholder ---
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

        // --- Label ---
        const label = document.createElement('div');
        label.className = 'duck-label';
        label.textContent = duck.name;

        // --- Count ---
        const countDisplay = document.createElement('div');
        countDisplay.className = 'duck-count';
        countDisplay.textContent = count;

        slot.appendChild(imgWrapper);
        slot.appendChild(label);
        slot.appendChild(countDisplay);
        container.appendChild(slot);
    });
}

// Call this whenever a duck is rolled
function addDuckToCollection(duckId) {
    if (duckCounts[duckId] !== undefined) {
        duckCounts[duckId]++;
        saveCollection();
        renderCollection();
    }
}

// Initial render
renderCollection();










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

setTimeout(() => {
    duckCarousel.style.transition = "";
    duckCarousel.style.transform = "";

    duckCarousel.innerHTML = `
        <img src="ducks/${finalDuck}" width="120">
    `;

    resultText.innerHTML = "Rolled: " + finalDuck.replace(".png", "");

    // 👇 ADD THIS LINE TO SAVE THE DUCK
    addDuckToCollection(finalDuck);

}, 2000); }