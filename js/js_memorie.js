// --- 1. CONSTANTES & SÉLECTEURS ---
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const opinionInput = document.getElementById('opinion'); // Votre champ de texte
const gameContainer = document.getElementById('game-container');
const messageElement = document.getElementById('message');

// --- 2. VARIABLES D'ÉTAT DU JEU ---
let targetLetter = ''; // La lettre que l'utilisateur doit retrouver
let gameActive = false; // Le jeu est désactivé tant qu'aucune lettre n'est tapée
let cardFound = false; // Indique si la carte cible a déjà été trouvée
let gameOn = false; // Indique si le jeu est en cours

// --- 3. FONCTION UTILITAIRE : MÉLANGE DE TABLEAU ---
/**
 * Mélange aléatoirement un tableau (Algorithme de Fisher-Yates).
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// -------------------------------------------------------------------------
// --- 4. LOGIQUE DE GESTION DU CLIC SUR LA CARTE ---
// -------------------------------------------------------------------------
function handleCardClick(event) {
    // Si le jeu n'est pas actif (pas de lettre cible définie ou en attente de retournement)
    if (!gameActive || !targetLetter) {
        messageElement.textContent = "Veuillez saisir au moins une lettre dans le champ d'avis pour commencer.";
        return;
    }
    
    // Nous cliquons sur le .card-container, nous devons cibler l'intérieur pour l'effet de retournement
    const cardContainer = event.currentTarget;
    const cardInner = cardContainer.querySelector('.card-inner');
    
    // Garde : Si la carte est déjà face visible, on sort
    if (cardInner.classList.contains('is-flipped')) {
        return; 
    }
    
    const cardLetter = cardInner.dataset.letter; 

    // Retourner la carte
    cardInner.classList.add('is-flipped');
    gameActive = false; // Désactiver le jeu pendant la vérification

    // --- VÉRIFICATION ---
    if (cardLetter === targetLetter) {
        // VICTOIRE !
        cardFound = true;
        
        // Marquer la carte comme trouvée et la laisser face visible
        cardInner.classList.add('is-matched');
        cardContainer.removeEventListener('click', handleCardClick); // Désactiver le clic sur cette carte
        
        messageElement.textContent = `FÉLICITATIONS ! Vous avez trouvé la lettre "${targetLetter}". Vous pouvez continuer votre avis !`;
        
        window.canWrite = true; // Permettre à l'utilisateur de continuer à écrire
        setTimeout(() => {
            gameContainer.innerHTML = ''; // Vider le plateau de jeu
            messageElement.textContent = '';
            gameOn = false; // Arrêter le jeu
        }, 2000);
        
    } else {
        // ÉCHEC POUR CETTE TENTATIVE
        messageElement.textContent = `Ce n'est pas la lettre "${targetLetter}". Essayez encore !`;
        
        setTimeout(() => {
            cardInner.classList.remove('is-flipped'); // Retourner la carte après 1 seconde
            gameActive = true; // Réactiver les clics
            messageElement.textContent = `Trouvez la carte "${targetLetter}" !`;
        }, 1000);
    }
}

// -------------------------------------------------------------------------
// --- 5. LOGIQUE DE GESTION DE LA SAISIE (INPUT) ---
// -------------------------------------------------------------------------
function handleOpinionInput(event) {
    const text = event.target.value;
    
    if (text.length > 0) {
        const lastChar = text.slice(-1).toUpperCase();
        
        // On ne traite que les lettres de l'alphabet
        if (gameOn && lastChar.match(/[A-Z]/)) {
            
            // Si la cible change OU si on vient de trouver la carte précédente
            if (lastChar !== targetLetter || cardFound) {
                targetLetter = lastChar;
                
                // Réinitialiser l'état du jeu pour la nouvelle cible
                cardFound = false;
                gameActive = true;

                messageElement.textContent = `Nouveau défi : Trouvez la carte de la lettre "${targetLetter}" !`;
                console.log("Nouvelle Lettre Cible définie : " + targetLetter);
            }
        }
    } else {
        // Si le champ est vide
        targetLetter = '';
        gameActive = false;
        messageElement.textContent = "Saisissez une lettre pour lancer le défi Memory.";
    }
}

// -------------------------------------------------------------------------
// --- 6. FONCTION D'INITIALISATION / RÉINITIALISATION VISUELLE ---
// -------------------------------------------------------------------------

/**
 * Crée les cartes au lancement et les mélange.
 */
function createGameBoard() {
    gameContainer.innerHTML = '';
    gameOn = true;
    const shuffledLetters = shuffleArray([...ALPHABET]); 

    shuffledLetters.forEach(letter => {
        // Conteneur (pour l'écouteur de clic)
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.addEventListener('click', handleCardClick); 

        // Intérieur (pour l'effet de flip)
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        cardInner.dataset.letter = letter; 

        // Faces de la carte
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.textContent = '?'; 

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
        cardFront.textContent = letter; 

        // Assemblage
        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);
        cardContainer.appendChild(cardInner);
        gameContainer.appendChild(cardContainer);
    });
}

/**
 * Réinitialise l'apparence visuelle sans recréer le HTML des cartes.
 * (Utilisé lors d'un changement de lettre cible après une victoire)
 */
function resetGameBoard() {
    const allCardsInner = gameContainer.querySelectorAll('.card-inner');
    
    allCardsInner.forEach(cardInner => {
        // Retirer toutes les classes d'état de jeu
        cardInner.classList.remove('is-flipped', 'is-matched');
        
        // Réactiver l'écouteur de clic (si nécessaire, car il a pu être enlevé lors d'une victoire)
        // Note: L'écouteur est sur le parent .card-container, donc il n'est retiré que si vous l'avez fait dans handleCardClick.
        // Si vous avez retiré l'écouteur, vous devriez recréer le plateau ou le réattacher ici. 
        // Pour simplifier, la fonction 'createGameBoard' sera suffisante pour un reset complet.
    });
    
    // Pour une réinitialisation complète incluant le mélange des cartes :
    createGameBoard(); 
}

// -------------------------------------------------------------------------
// --- 7. DÉMARRAGE DU JEU ---
// -------------------------------------------------------------------------

// 1. Créer le plateau initial
// createGameBoard();

// 2. Attacher l'écouteur au champ d'avis
opinionInput.addEventListener('input', handleOpinionInput);
