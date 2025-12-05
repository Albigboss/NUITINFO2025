function createGrid(rows, cols, letter) {

    const container = document.getElementById('game-container');
    
    // Créer et ajouter le texte AU DÉBUT du conteneur
    const text = document.createElement('div');
    text.textContent = `Retrouvez la lettre "${letter.toUpperCase()}" dans la grille pour pouvoir écrire à nouveau !`;
    text.style.gridColumn = `1 / ${cols + 1}`; // Pour qu'il prenne toute la largeur
    text.style.marginBottom = '20px';
    text.style.textAlign = 'center';
    text.id = 'instruction-text';
    
    container.appendChild(text);
    
    // Ensuite configurer la grille
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gap = '5px';
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Retirer la lettre cible de la liste
    if (letter) {
        letters = letters.replace(letter.toUpperCase(), '');
    }


    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            
            const cell = document.createElement('button');
            
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            cell.textContent = randomLetter;
            cell.style.border = '1px solid #333';
            cell.dataset.row = r;
            cell.dataset.col = c;

            container.appendChild(cell);
        }
    }
    randomRox = Math.floor(Math.random() * rows);
    randomCol = Math.floor(Math.random() * cols);
    const targetCell = container.querySelector(`button[data-row='${randomRox}'][data-col='${randomCol}']`);
    targetCell.textContent = letter.toUpperCase();

    targetCell.addEventListener('click', () => {
        targetCell.style.transition = 'opacity 0.3s ease';
            targetCell.style.opacity = '0';
            setTimeout(() => {
                container.remove();
                text.remove();
                window.canWrite = true;
            }, 300);
    });
}
