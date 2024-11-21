 let firstSelection = null;
       let matches = new Set();
       const canvas = document.getElementById('arrows');
       const ctx = canvas.getContext('2d');

       function initializeGame() {
           const leftColumn = document.getElementById('left-column');
           const rightColumn = document.getElementById('right-column');
           
           leftColumn.innerHTML = '';
           rightColumn.innerHTML = '';

           // Create word pairs with unique IDs
           const wordPairsWithIds = wordPairs.map((pair, index) => ({
               ...pair,
               id: index
           }));

           const shuffledLeft = [...wordPairsWithIds];
           const shuffledRight = [...wordPairsWithIds];
           
           shuffleArray(shuffledLeft);
           shuffleArray(shuffledRight);

           shuffledLeft.forEach((pair) => {
               const wordDiv = document.createElement('div');
               wordDiv.className = 'word';
               wordDiv.dataset.pair = pair.id;
               wordDiv.textContent = pair.base;
               leftColumn.appendChild(wordDiv);
           });

           shuffledRight.forEach((pair) => {
               const wordDiv = document.createElement('div');
               wordDiv.className = 'word';
               wordDiv.dataset.pair = pair.id;
               wordDiv.textContent = pair.past;
               rightColumn.appendChild(wordDiv);
           });

           addWordListeners();
       }

       function shuffleArray(array) {
           for (let i = array.length - 1; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
               [array[i], array[j]] = [array[j], array[i]];
           }
       }

       function resizeCanvas() {
           const container = document.getElementById('game-container');
           canvas.width = container.offsetWidth;
           canvas.height = container.offsetHeight;
           drawMatchedArrows();
       }

       function drawArrow(start, end) {
           ctx.beginPath();
           ctx.moveTo(start.x, start.y);
           ctx.lineTo(end.x, end.y);
           ctx.strokeStyle = '#333';
           ctx.lineWidth = 2;
           ctx.stroke();
       }

       function clearCanvas() {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
       }

       function drawMatchedArrows() {
           clearCanvas();
           matches.forEach(pair => {
               const [left, right] = pair.split('-');
               const leftElement = document.querySelector(`#left-column .word[data-pair="${left}"]`);
               const rightElement = document.querySelector(`#right-column .word[data-pair="${right}"]`);
               
               const startX = leftElement.offsetLeft + leftElement.offsetWidth;
               const startY = leftElement.offsetTop + leftElement.offsetHeight/2;
               const endX = rightElement.offsetLeft;
               const endY = rightElement.offsetTop + rightElement.offsetHeight/2;
               
               drawArrow({x: startX, y: startY}, {x: endX, y: endY});
           });
       }

       function resetGame() {
           matches.clear();
           clearCanvas();
           document.querySelectorAll('.word').forEach(word => {
               word.classList.remove('selected', 'correct', 'incorrect');
           });
           initializeGame();
       }

       function showIncorrectFeedback(elements) {
           elements.forEach(element => {
               element.classList.add('incorrect');
               setTimeout(() => {
                   element.classList.remove('incorrect');
                   element.classList.remove('selected');
               }, 1000);
           });
       }

       function addWordListeners() {
           document.querySelectorAll('.word').forEach(word => {
               word.addEventListener('click', () => {
                   if (matches.has(word.dataset.pair)) return;
                   
                   if (!firstSelection) {
                       firstSelection = word;
                       word.classList.add('selected');
                   } else {
                       if (firstSelection === word) {
                           firstSelection.classList.remove('selected');
                           firstSelection = null;
                           return;
                       }

                       const isMatch = 
                           (firstSelection.parentElement.id === 'left-column' && word.parentElement.id === 'right-column') ||
                           (firstSelection.parentElement.id === 'right-column' && word.parentElement.id === 'left-column');

                       if (isMatch && firstSelection.dataset.pair === word.dataset.pair) {
                           firstSelection.classList.remove('selected');
                           firstSelection.classList.add('correct');
                           word.classList.add('correct');
                           
                           const pair = firstSelection.dataset.pair;
                           matches.add(pair + '-' + pair);
                           drawMatchedArrows();
                       } else {
                           showIncorrectFeedback([firstSelection, word]);
                       }

                       firstSelection = null;
                   }
               });
           });
       }

       window.addEventListener('resize', resizeCanvas);
       initializeGame();
       resizeCanvas();