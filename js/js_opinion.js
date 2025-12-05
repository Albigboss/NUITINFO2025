// sélectionner le formulaire
const formulaire = document.getElementById('opinion');
// créer un div pour afficher les lettres avec numéros
// définir un id pour le div
// insérer le div après le formulaire

formulaire.addEventListener('keypress', (event) => {
  if (!window.canWrite) {
    // si on ne peut pas écrire, empêcher l'entrée
    event.preventDefault();
    return;
  }
  else {
    // empecher d'écrirre dans le champ de texte
    //event.preventDefault();


    const lettre = event.key;
    let randomNumber = Math.floor(Math.random() * 50) + 1;


      if (randomNumber <= 6) {
        // change la variable globale canWrite à false
        window.canWrite = false;
        if (window.NumberOfdefi === randomNumber) {
          if (randomNumber === 6) {
            randomNumber -= 1;
          } else {
            randomNumber += 1;
          }
        }
        window.NumberOfdefi = randomNumber;
        // Appeler le bloc si NumberOfdefi devient 2
        if (window.NumberOfdefi === 2 && typeof createClickableRectangle === "function") {
          createClickableRectangle();
        }
        else if (window.NumberOfdefi === 1 && typeof createGameBoard === "function") {
          createGameBoard();
        }
        else if (window.NumberOfdefi === 3 && typeof startTimingGame === "function") {
          startTimingGame();
        }
        else if (window.NumberOfdefi === 4 && typeof StartRytmeGame === "function") {
          StartRytmeGame();
        }
        else if (window.NumberOfdefi === 5 && typeof  createGrid === "function") {
          createGrid(20, 20 , lettre);
        }
        else if (window.NumberOfdefi === 6 && typeof  initializeGame=== "function") {
          initializeGame();
        }
    
    
      affichageLettres.appendChild(span);

    }
  }
});



// Event listener sur le submit du formulaire
const form = document.getElementById('opinion-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Logique à exécuter lors de la soumission
    console.log('Formulaire soumis');

    if (numberOfSend <= 3) {
      numberOfSend++;

      // 1. Définir les limites de déplacement (ex: 80% de la fenêtre pour éviter qu'il ne disparaisse)
      const max_width = window.innerWidth * 0.8;
      const max_height = window.innerHeight * 0.8;

      // 2. Générer des coordonnées aléatoires (en pixels)
      const randomX = Math.floor(Math.random() * max_width);
      const randomY = Math.floor(Math.random() * max_height);

      // 3. Appliquer la nouvelle position au bouton
      submitButton.style.position = 'absolute'; // Assurez-vous qu'il est absolu
      submitButton.style.left = randomX + 'px';
      submitButton.style.top = randomY + 'px';


      let opinion = document.getElementById('opinion');

      // Génère un nombre entre 0 et 360 pour une rotation complète.
      let angle = Math.random() * 360;

      if (opinion) {
        // ✅ Correction : Ajout de l'unité 'deg' (degrés)
        opinion.style.transform = `rotate(${angle}deg)`;
      }
    }
    else {
      // Rediriger vers la page de félicitation
      window.location.href = 'felicitation.html';
    }


  });
}