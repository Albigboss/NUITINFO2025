function startTimingGame() {
    let startTime = null;
    let timerInterval = null;
    let stopped = false;

    // Crée un affichage
    const display = document.createElement('div');
    display.style.fontSize = '2em';
    display.style.textAlign = 'center';
    display.style.margin = '30px';
    display.textContent = 'Arreter vous proche de 10s :\n0.0 s';
    document.body.appendChild(display);

    function updateTimer() {
        if (!stopped) {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000;
            if (elapsed >= 9 && elapsed < 9.8 || elapsed > 10.2 && elapsed <= 11) {
                display.style.color = 'orange';
            }
            else if (elapsed >= 9.8 && elapsed <= 10.2)
            {
                display.style.color = 'green';
            }
            else {
                display.style.color = 'black';
            }
            display.textContent = `Arreter vous proche de 10s (space ou click) :\n${elapsed.toFixed(1)} s`;
        }
    }

    async function stopTimer() {
        if (stopped) return;
        stopped = true;
        clearInterval(timerInterval);
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        if (elapsed >= 9.8 && elapsed <= 10.2) {
            display.textContent += ' — Bravo !';
            await new Promise(resolve => setTimeout(resolve, 2000));
            display.remove();
            window.canWrite = true;
        } else {
            display.remove();
            startTimingGame();
        }
        // Nettoie les écouteurs
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('click', stopTimer);
    }

    function onKeyDown(e) {
        if (e.code === 'Space') {
            stopTimer();
        }
    }

    // Démarre le timer
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);

    // Ajoute les écouteurs
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', stopTimer);
}
