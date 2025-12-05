// Wrapper la logique dans une fonction réutilisable
function createClickableRectangle() {
    const rectangle = document.createElement('div');
    rectangle.id = 'clickable-rectangle';   
    rectangle.style.width = '200px';
    rectangle.style.height = '150px';
    rectangle.style.backgroundColor = '#3498db';
    rectangle.style.cursor = 'pointer';
    rectangle.style.display = 'flex';
    rectangle.style.alignItems = 'center';
    rectangle.style.justifyContent = 'center';
    rectangle.style.fontSize = '18px';
    rectangle.style.fontWeight = 'bold';
    rectangle.style.color = 'white';
    rectangle.style.userSelect = 'none';
    rectangle.style.margin = '50px auto';
    rectangle.style.borderRadius = '8px';
    rectangle.style.textAlign = 'center';

    let clickCount = 0;
    rectangle.textContent = `Clics pour pouvoir écrire a nouveau`;

    rectangle.addEventListener('click', () => {
        clickCount++;
        rectangle.textContent = `Clics: ${clickCount}/50`;
        
        if (clickCount > 10 && clickCount < 20) {
            rectangle.style.transition = 'background-color 0.5s ease';
            rectangle.style.backgroundColor = '#e67e22'; // Orange
        } else if (clickCount >= 20 && clickCount < 35) {
            rectangle.style.transition = 'background-color 0.5s ease';
            rectangle.style.backgroundColor = '#f1c40f'; // Jaune
        } else if (clickCount >= 35) {
            rectangle.style.transition = 'background-color 0.5s ease';
            rectangle.style.backgroundColor = '#2ecc71'; // Vert
        }

        if (clickCount === 50) {
            rectangle.style.transition = 'opacity 0.3s ease';
            rectangle.style.opacity = '0';
            setTimeout(() => {
                rectangle.remove();
                window.canWrite = true;
            }, 300);
        }
    });

    document.body.appendChild(rectangle);
}

//createClickableRectangle();
