/*Début de la partie pour la page de conseils*/

// Fonction pour ouvrir/fermer un menu dépliable
function toggleAccordion(sectionId) {
    const content = document.getElementById(sectionId);
    const icon = document.getElementById('icon-' + sectionId);

    // Vérifier si le contenu est actuellement caché
    if (content.style.display === 'none' || content.style.display === '') {
        // Ouvrir
        content.style.display = 'block';
        icon.textContent = '-';
    } else {
        // Fermer
        content.style.display = 'none';
        icon.textContent = '+';
    }
}

// Optionnel : Fermer toutes les sections au chargement
window.addEventListener('DOMContentLoaded', function () {
    const allContents = document.querySelectorAll('.accordion-content');
    allContents.forEach(function (content) {
        content.style.display = 'none';
    });
});

// Optionnel : Fonction pour tout ouvrir
function openAll() {
    const allContents = document.querySelectorAll('.accordion-content');
    const allIcons = document.querySelectorAll('.accordion-icon');

    allContents.forEach(function (content) {
        content.style.display = 'block';
    });

    allIcons.forEach(function (icon) {
        icon.textContent = '-';
    });
}

// Optionnel : Fonction pour tout fermer
function closeAll() {
    const allContents = document.querySelectorAll('.accordion-content');
    const allIcons = document.querySelectorAll('.accordion-icon');

    allContents.forEach(function (content) {
        content.style.display = 'none';
    });

    allIcons.forEach(function (icon) {
        icon.textContent = '+';
    });
}

/*Fin de la partie pour la page de conseils*/









