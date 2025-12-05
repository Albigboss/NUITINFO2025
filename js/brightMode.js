// Script pour gérer le mode sombre/clair

// Fonction pour basculer entre les modes
function toggleDarkMode() {
    const toggle = document.getElementById('toggle');
    const body = document.body;
    
    // Basculer la classe dark-mode sur le body
    body.classList.toggle('dark-mode');
    
    // Sauvegarder la préférence dans le localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Charger la préférence au chargement de la page
window.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    const savedTheme = localStorage.getItem('theme');
    
    // Appliquer le thème sauvegardé
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggle.checked = true;
    }
    
    // Ajouter l'écouteur d'événement sur le toggle
    toggle.addEventListener('change', toggleDarkMode);
});