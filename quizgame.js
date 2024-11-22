let currentQuestion = 0;
        let score = 0;
        let selectedAnswer = "";

        function renderQuestion() {
            const question = questions[currentQuestion];
            const quizContent = document.getElementById('quiz-content');
            
            const content = `
                <p class="sentence">${question.sentence}</p>
                <div class="options">
                    ${question.options.map(option => `
                        <button class="option-btn ${selectedAnswer === option ? 'selected' : ''}" 
                                onclick="selectAnswer('${option}')">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <button class="next-btn" 
                        onclick="nextQuestion()" 
                        ${!selectedAnswer ? 'disabled' : ''}>
                    ${currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(currentQuestion + 1) / questions.length * 100}%"></div>
                    </div>
                    <p class="progress-text">Question ${currentQuestion + 1} of ${questions.length}</p>
                </div>
            `;
            
            quizContent.innerHTML = content;
        }

        function renderResults() {
            const quizContent = document.getElementById('quiz-content');
            quizContent.innerHTML = `
                <div class="results">
                    <h2>Quiz Complete!</h2>
                    <p class="score">Your score: ${score} out of ${questions.length}</p>
                    <button class="next-btn" onclick="restartQuiz()">Try Again</button>
                </div>
            `;
        }

        function selectAnswer(answer) {
            selectedAnswer = answer;
            renderQuestion();
        }

        function nextQuestion() {
            if (selectedAnswer === questions[currentQuestion].correct) {
                score++;
            }
            
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                selectedAnswer = "";
                renderQuestion();
            } else {
                renderResults();
            }
        }

        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            selectedAnswer = "";
            renderQuestion();
        }

        // Initialize the quiz
        renderQuestion();