function checkAnswers(exerciseId) {
            // Get the exercise number from the id
            const exerciseNum = exerciseId.replace('exercise', '');
            const container = document.getElementById(exerciseId);
            const selects = container.querySelectorAll('select');
            let score = 0;
            const totalQuestions = selects.length;

            selects.forEach(select => {
                const correct = select.getAttribute('data-answer');
                const userAnswer = select.value.trim().toLowerCase();
                const checkSpan = select.nextElementSibling;

                if (userAnswer === correct) {
                    select.className = 'correct';
                    checkSpan.innerHTML = '✓';
                    checkSpan.style.color = '#4CAF50';
                    score++;
                } else {
                    select.className = 'incorrect';
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
            const selects = container.querySelectorAll('select');
            
            selects.forEach(select => {
                select.selectedIndex = 0;
                select.className = '';
                select.nextElementSibling.innerHTML = '';
            });
            
            document.getElementById(`score${exerciseNum}`).textContent = '';
        }