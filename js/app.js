document.addEventListener('keydown', (event) => {
    if (event.key.toUpperCase() === 'S') {
        const selectedText = window.getSelection().toString();
        if (selectedText === '🐍') {
            window.location.href = './pages/snake.html';
        }
    }
});