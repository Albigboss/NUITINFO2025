// Génère une séquence aléatoire de directions
function generateRytmeSequence(length) {
    const sequence = [];
    const possibleBeats = ['Droite', 'Gauche', 'Haut', 'Bas'];
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * possibleBeats.length);
        sequence.push(possibleBeats[randomIndex]);
    }
    return sequence;
}

// Variables globales pour le jeu
let currentKeyHandler = null;

// Démarre le jeu de rythme
async function StartRytmeGame() {
    // Générer une nouvelle séquence
    const sequenceLength = 5;
    const rytmeSequence = generateRytmeSequence(sequenceLength);
    let currentStep = 0;
    let isGameActive = true;
    
    // Créer l'affichage
    const display = document.createElement('div');
    display.style.fontSize = '2em';
    display.style.textAlign = 'center';
    display.style.margin = '30px';
    display.textContent = `Reproduisez la séquence : ${rytmeSequence.join(' ')}`;
    document.body.appendChild(display);
    
    // Mapping des touches
    const keyMap = {
        'ArrowUp': 'Haut',
        'ArrowDown': 'Bas',
        'ArrowLeft': 'Gauche',
        'ArrowRight': 'Droite'
    };
    
    // Retirer l'ancien écouteur s'il existe
    if (currentKeyHandler) {
        document.removeEventListener('keydown', currentKeyHandler);
    }
    
    // Créer le nouvel écouteur
    currentKeyHandler = async (event) => {
        // Ignorer si le jeu n'est plus actif
        if (!isGameActive) return;
        
        const pressedKey = keyMap[event.key];
        if (!pressedKey) return;
        
        console.log(`Entrée utilisateur: ${pressedKey}`);
        
        // Vérifier si la touche correspond à la séquence
        if (pressedKey === rytmeSequence[currentStep]) {
            currentStep++;
            display.style.color = 'green';
            display.textContent = `${pressedKey}`;
            
            // Vérifier si la séquence est complète
            if (currentStep >= sequenceLength) {
                isGameActive = false;
                window.canWrite = true; // Réactiver l'écriture
                display.textContent = `Bravo ! Séquence complète.`;
                await new Promise(resolve => setTimeout(resolve, 2000));
                display.remove();
                document.removeEventListener('keydown', currentKeyHandler);
                window.canWrite = true; // Réactiver l'écriture
            }
        } else {
            // Erreur
            isGameActive = false;
            display.style.color = 'red';
            display.textContent = `${pressedKey}`;
            await new Promise(resolve => setTimeout(resolve, 1500));
            display.remove();
            
            // Retirer l'écouteur et relancer le jeu
            document.removeEventListener('keydown', currentKeyHandler);
            StartRytmeGame();
        }
    };
    
    // Ajouter l'écouteur
    document.addEventListener('keydown', currentKeyHandler);
}


