// 0 = Chemin, 1 = Mur, 2 = Départ, 3 = Arrivée
const PATH = 0;
const WALL = 1;
const START = 2;
const END = 3;

// Dimensions du labyrinthe (DOIT être impair pour cet algorithme)
const MAZE_WIDTH = 15;
const MAZE_HEIGHT = 7;

let finished = false;
let maze = [];
let player = { x: 1, y: 1 }; // Le joueur commence à (1, 1)

// --- FONCTIONS DE GÉNÉRATION DU LABYRINTHE ---

/**
 * Initialise la grille avec uniquement des murs.
 * @param {number} width - Largeur de la grille
 * @param {number} height - Hauteur de la grille
 */
function initializeGrid(width, height) {
    const grid = [];
    for (let y = 0; y < height; y++) {
        grid[y] = [];
        for (let x = 0; x < width; x++) {
            grid[y][x] = WALL;
        }
    }
    return grid;
}

/**
 * Algorithme de Backtracking Récursif pour générer le labyrinthe.
 * @param {number} x - Coordonnée X de départ
 * @param {number} y - Coordonnée Y de départ
 */
function generateMaze(x, y) {
    // 1. Ouvrir la cellule actuelle
    maze[y][x] = PATH;

    // 2. Définir les directions possibles de manière aléatoire
    const directions = [
        [0, -2], // Haut
        [0, 2],  // Bas
        [-2, 0], // Gauche
        [2, 0]   // Droite
    ];
    
    // Mélanger les directions
    for (let i = directions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    // 3. Essayer chaque direction
    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        
        // Vérifier les limites et si la nouvelle cellule est un mur
        if (newY > 0 && newY < MAZE_HEIGHT - 1 && 
            newX > 0 && newX < MAZE_WIDTH - 1 && 
            maze[newY][newX] === WALL) {
            
            // Ouvrir le mur entre la cellule actuelle et la nouvelle cellule
            const wallX = x + dx / 2;
            const wallY = y + dy / 2;
            maze[wallY][wallX] = PATH;
            
            // Appel récursif à la nouvelle cellule
            generateMaze(newX, newY);
        }
    }
}

/**
 * Configure les points de départ et d'arrivée.
 */
function setStartAndEnd() {
    // Départ (en haut à gauche, après le mur extérieur)
    maze[1][1] = START;
    player = { x: 1, y: 1 }; // Mettre à jour la position de départ du joueur

    // Arrivée (en bas à droite, avant le mur extérieur)
    maze[MAZE_HEIGHT - 2][MAZE_WIDTH - 2] = END;
}

const mazeContainer = document.getElementById('game-container');
mazeContainer.classList.add('maze-container');
mazeContainer.classList.remove('game-container');

/**
 * Dessine le labyrinthe dans le DOM à partir du tableau `maze`.
 */
function drawMaze() {
    mazeContainer.innerHTML = ''; // Nettoyer l'ancien labyrinthe
    
    for (let y = 0; y < maze.length; y++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('maze-row');
        
        for (let x = 0; x < maze[y].length; x++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            
            // Appliquer les classes CSS selon le type de cellule
            if (maze[y][x] === 1) {
                cellDiv.classList.add('wall');
            } else if (maze[y][x] === 2) {
                cellDiv.classList.add('path', 'start');
            } else if (maze[y][x] === 3) {
                cellDiv.classList.add('path', 'end');
            } else {
                cellDiv.classList.add('path');
            }
            
            // Dessiner le joueur
            if (x === player.x && y === player.y) {
                cellDiv.classList.add('player');
                cellDiv.textContent = 'P'; // Représentation du joueur
            }
            
            rowDiv.appendChild(cellDiv);
        }
        mazeContainer.appendChild(rowDiv);
    }
}

/**
 * Tente de déplacer le joueur à la nouvelle position (newX, newY).
 * @param {number} newX - La nouvelle colonne
 * @param {number} newY - La nouvelle ligne
 */
function movePlayer(newX, newY) {
    // Vérifier si la nouvelle position est à l'intérieur des limites du labyrinthe
    if (newY >= 0 && newY < maze.length && newX >= 0 && newX < maze[0].length) {
        
        const nextCell = maze[newY][newX];

        // Vérifier si ce n'est pas un mur (1)
        if (nextCell !== 1) {
            player.x = newX;
            player.y = newY;
            drawMaze(); // Redessiner le labyrinthe avec la nouvelle position
            
            // Vérifier si la sortie a été atteinte
            if (nextCell === 3) {
                mazeContainer.innerHTML = ''; // Vider le plateau de jeu
                window.canWrite = true; // Permettre à l'utilisateur de continuer à écrire
                mazeContainer.classList.remove('maze-container');
                mazeContainer.classList.add('game-container');
                finished = true;
            }
        }
    }
}

// Écouter les touches du clavier pour le mouvement
document.addEventListener('keydown', (event) => {
    if (!finished){
        let newX = player.x;
        let newY = player.y;

        switch (event.key) {
            case 'ArrowUp':
            case 'z': // Pour ceux qui préfèrent ZQSD
                newX--;
                break;
            case 'ArrowDown':
            case 's':
                newX++;
                break;
            case 'ArrowLeft':
            case 'q':
                newY--;
                break;
            case 'ArrowRight':
            case 'd':
                newY++;
                break;
            default:
                return; // Ignorer les autres touches
        }
        
        event.preventDefault(); // Empêcher le défilement de la page avec les flèches
        movePlayer(newX, newY);
    }
});

function initializeGame() {
    // 1. Initialiser la grille remplie de murs
    finished = false;
    maze = initializeGrid(MAZE_WIDTH, MAZE_HEIGHT);
    
    // 2. Générer le labyrinthe en partant de (1, 1) (doit être impair)
    generateMaze(1, 1); 
    
    // 3. Définir le départ et l'arrivée
    setStartAndEnd();
    
    // 4. Afficher le labyrinthe
    drawMaze();
}
