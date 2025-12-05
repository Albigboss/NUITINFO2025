// Gestion des value cards comme radio buttons
document.addEventListener('DOMContentLoaded', function() {
    const valueCards = document.querySelectorAll('.value-card[data-card]');
    
    valueCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.getAttribute('data-card');
            const detailSection = document.getElementById(`detail-${cardType}`);
            
            // Vérifier si la card est déjà active
            const isActive = this.classList.contains('active');
            
            // Désactiver toutes les cards et sections
            valueCards.forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.detail-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Si la card n'était pas active, l'activer
            if (!isActive) {
                this.classList.add('active');
                detailSection.classList.add('active');
                
                    // Scroll smooth vers la section de détail
                setTimeout(() => {
                    detailSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        });
    });
});

