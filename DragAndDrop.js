let dragged = null;

        document.addEventListener('DOMContentLoaded', () => {
            const words = document.querySelectorAll('.word');
            const dropzones = document.querySelectorAll('.dropzone');

            words.forEach(word => {
                word.addEventListener('dragstart', handleDragStart);
                word.addEventListener('dragend', handleDragEnd);
            });

            dropzones.forEach(dropzone => {
                dropzone.addEventListener('dragover', handleDragOver);
                dropzone.addEventListener('drop', handleDrop);
            });
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
            const dropzones = document.querySelectorAll('.dropzone');
            
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

            document.querySelector('.score-display').textContent = `Score: ${score}/${dropzones.length}`;
        }

        function clearAnswers() {
            const dropzones = document.querySelectorAll('.dropzone');
            const draggableWords = document.querySelector('.draggable-words');
            
            dropzones.forEach(dropzone => {
                if (dropzone.children.length > 0) {
                    draggableWords.appendChild(dropzone.children[0]);
                }
                dropzone.classList.remove('correct', 'incorrect');
                const sentence = dropzone.parentElement;
                const resultIcon = sentence.querySelector('.result-icon');
                resultIcon.textContent = '';
            });
            
            document.querySelector('.score-display').textContent = '';
        }