function checkAnswers(exerciseId) {
    // Get the exercise number from the id
    const exerciseNum = exerciseId.replace('exercise', '');
    const container = document.getElementById(exerciseId);
    const inputs = container.querySelectorAll('input');
    let score = 0;
    const totalQuestions = inputs.length;

    inputs.forEach(input => {
        const correct = input.getAttribute('data-answer');
        const userAnswer = input.value.trim().toLowerCase();
        const checkSpan = input.nextElementSibling;

        if (userAnswer === correct) {
            input.className = 'correct';
            checkSpan.innerHTML = '✓';
            checkSpan.style.color = '#4CAF50';
            score++;
        } else {
            input.className = 'incorrect';
            checkSpan.innerHTML = '✗';
            checkSpan.style.color = '#f44336';
        }
    });

    document.getElementById(`score${exerciseNum}`).textContent = `Score: ${score} / ${totalQuestions}`;
}

function clearAnswers(exerciseId) {
    // Get the exercise number from the id
    const exerciseNum = exerciseId.replace('exercise', '');
    const container = document.getElementById(exerciseId);
    const inputs = container.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.value = '';
        input.className = '';
        input.nextElementSibling.innerHTML = '';
    });
    
    document.getElementById(`score${exerciseNum}`).textContent = '';
}