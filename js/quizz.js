// Gestion du Quizz
document.addEventListener('DOMContentLoaded', function() {
    const questionCards = document.querySelectorAll('.question-card');
    const totalQuestions = questionCards.length;
    let score = 0;
    let answeredQuestions = 0;
    
    // Mettre à jour l'affichage du total
    document.getElementById('total').textContent = totalQuestions;
    
    // Pour chaque carte de question
    questionCards.forEach(card => {
        const answerButtons = card.querySelectorAll('.answer-btn');
        const explanationBox = card.querySelector('.explanation-box');
        
        answerButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Empêcher de répondre plusieurs fois
                if (card.classList.contains('answered')) {
                    return;
                }
                
                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                // Marquer la carte comme répondue
                card.classList.add('answered');
                answeredQuestions++;
                
                // Afficher toutes les réponses
                answerButtons.forEach(btn => {
                    btn.classList.add('disabled');
                    if (btn.getAttribute('data-correct') === 'true') {
                        btn.classList.add('correct');
                    }
                });
                
                // Marquer la réponse cliquée
                if (!isCorrect) {
                    this.classList.add('incorrect');
                } else {
                    score++;
                }
                
                // Afficher l'explication avec animation
                setTimeout(() => {
                    explanationBox.classList.add('show');
                }, 200);
                
                // Mettre à jour le score
                document.getElementById('score').textContent = score;
                
                // Vérifier si toutes les questions ont été répondues
                if (answeredQuestions === totalQuestions) {
                    setTimeout(() => {
                        showResults();
                    }, 1000);
                }
                
                // Scroll vers la prochaine question non répondue
                setTimeout(() => {
                    const nextUnanswered = Array.from(questionCards).find(q => !q.classList.contains('answered'));
                    if (nextUnanswered) {
                        nextUnanswered.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                }, 600);
            });
        });
    });
    
    function showResults() {
        const resultsSection = document.querySelector('.quiz-results');
        const finalScoreSpan = document.getElementById('final-score');
        const resultMessage = document.getElementById('result-message');
        
        finalScoreSpan.textContent = score;
        
        // Message personnalisé selon le score
        let message = '';
        const percentage = (score / totalQuestions) * 100;
        
        if (percentage === 100) {
            message = '🏆 Parfait ! Vous êtes un expert NIRD ! Vous maîtrisez tous les concepts du numérique responsable.';
        } else if (percentage >= 80) {
            message = '🌟 Excellent ! Vous avez une très bonne compréhension de la démarche NIRD.';
        } else if (percentage >= 60) {
            message = '👍 Bien joué ! Vous connaissez les bases de NIRD, continuez à vous informer.';
        } else if (percentage >= 40) {
            message = '📚 Pas mal ! Il y a encore quelques points à approfondir sur le numérique responsable.';
        } else {
            message = '💪 Continuez vos efforts ! N\'hésitez pas à relire les explications pour mieux comprendre NIRD.';
        }
        
        resultMessage.textContent = message;
        
        // Afficher les résultats
        resultsSection.classList.add('show');
        
        // Scroll vers les résultats
        setTimeout(() => {
            resultsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
    }
});
