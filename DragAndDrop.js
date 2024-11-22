(function() {
        let dragged = null;
        const exerciseId = 'exercise-' + Math.random().toString(36).substr(2, 9);

        document.addEventListener('DOMContentLoaded', () => {
            const container = document.querySelector('.drag-drop');
            container.id = exerciseId;
            
            const words = container.querySelectorAll('.word');
            const dropzones = container.querySelectorAll('.dropzone');
            const scoreBtn = container.querySelector('.score-btn');
            const clearBtn = container.querySelector('.clear-btn');

            words.forEach(word => {
                word.addEventListener('dragstart', handleDragStart);
                word.addEventListener('dragend', handleDragEnd);
            });

            dropzones.forEach(dropzone => {
                dropzone.addEventListener('dragover', handleDragOver);
                dropzone.addEventListener('drop', handleDrop);
            });

            scoreBtn.addEventListener('click', checkAnswers);
            clearBtn.addEventListener('click', clearAnswers);
        });

        function handleDragStart(e) {
            dragged = e.target;
            e.target.style.opacity = '0.5';
        }

        function handleDragEnd(e) {
            e.target.style.opacity = '1';
        }

        function handleDragOver(e) {
            e.preventDefault();
        }

        function handleDrop(e) {
            e.preventDefault();
            if (e.target.classList.contains('dropzone') && e.target.children.length === 0) {
                e.target.appendChild(dragged);
                dragged.style.opacity = '1';
            }
        }

        function checkAnswers() {
            let score = 0;
            const container = document.getElementById(exerciseId);
            const dropzones = container.querySelectorAll('.dropzone');
            
            dropzones.forEach((dropzone) => {
                const correctAnswer = dropzone.dataset.correct;
                const userAnswer = dropzone.textContent.trim();
                const sentence = dropzone.parentElement;
                const resultIcon = sentence.querySelector('.result-icon');
                
                dropzone.classList.remove('correct', 'incorrect');
                
                if (userAnswer === correctAnswer) {
                    dropzone.classList.add('correct');
                    resultIcon.textContent = '✓';
                    score++;
                } else if (userAnswer) {
                    dropzone.classList.add('incorrect');
                    resultIcon.textContent = '✗';
                } else {
                    resultIcon.textContent = '';
                }
            });

            container.querySelector('.score-display').textContent = `Score: ${score}/${dropzones.length}`;
        }

        function clearAnswers() {
            const container = document.getElementById(exerciseId);
            const dropzones = container.querySelectorAll('.dropzone');
            const draggableWords = container.querySelector('.draggable-words');
            
            dropzones.forEach(dropzone => {
                if (dropzone.children.length > 0) {
                    draggableWords.appendChild(dropzone.children[0]);
                }
                dropzone.classList.remove('correct', 'incorrect');
                const sentence = dropzone.parentElement;
                const resultIcon = sentence.querySelector('.result-icon');
                resultIcon.textContent = '';
            });
            
            container.querySelector('.score-display').textContent = '';
        }
    })();
