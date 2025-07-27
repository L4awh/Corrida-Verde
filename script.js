// Game State
class BoardGame {
    constructor() {
        this.currentPlayer = 1;
        this.playerPositions = [1, 1, 1]; // Starting positions for 3 players
        this.isMoving = false;
        this.gameEnded = false;
        this.usedQuestions = new Set(); // Track used questions to ensure uniqueness
        this.playerQuestions = { 1: new Set(), 2: new Set(), 3: new Set() }; // Track questions per player
        
        // Audio
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.musicPlaying = false;
        
        // Question spaces (positions on the board)
        this.questionSpaces = [6, 12, 18, 24, 30, 36]; // Adjusted for 30-square board
        
        // Comprehensive question bank
        this.questionBank = [
            // Easy Questions (Fácil)
            {
                id: 1,
                difficulty: 'easy',
                question: 'Qual é a principal fonte de energia renovável mais utilizada no Brasil?',
                options: ['A) Energia solar', 'B) Energia hidrelétrica', 'C) Energia eólica'],
                correct: 'B',
                hint: 'O Brasil possui muitos rios e grandes usinas que aproveitam a força da água.',
                explanation: 'O Brasil utiliza principalmente a energia hidrelétrica devido aos seus abundantes recursos hídricos.'
            },
            {
                id: 2,
                difficulty: 'easy',
                question: 'O que significa "eficiência energética"?',
                options: ['A) Usar mais energia', 'B) Usar menos energia para a mesma tarefa', 'C) Evitar usar energia'],
                correct: 'B',
                hint: 'É sobre fazer mais com menos, otimizando o uso de energia.',
                explanation: 'Eficiência energética é realizar as mesmas atividades usando menos energia.'
            },
            {
                id: 3,
                difficulty: 'easy',
                question: 'Qual aparelho geralmente consome mais energia em casa?',
                options: ['A) Televisão', 'B) Geladeira', 'C) Lâmpada'],
                correct: 'B',
                hint: 'Este aparelho funciona 24 horas por dia para manter os alimentos frescos.',
                explanation: 'A geladeira consome mais energia por funcionar continuamente.'
            },
            {
                id: 4,
                difficulty: 'easy',
                question: 'Qual tipo de lâmpada é mais eficiente energeticamente?',
                options: ['A) Incandescente', 'B) Fluorescente', 'C) LED'],
                correct: 'C',
                hint: 'A tecnologia mais moderna geralmente é mais eficiente.',
                explanation: 'Lâmpadas LED consomem até 80% menos energia que as incandescentes.'
            },
            {
                id: 5,
                difficulty: 'easy',
                question: 'O sol é uma fonte de energia:',
                options: ['A) Renovável', 'B) Não renovável', 'C) Artificial'],
                correct: 'A',
                hint: 'O sol brilhará por bilhões de anos.',
                explanation: 'A energia solar é renovável pois o sol é uma fonte inesgotável na escala humana.'
            },
            
            // Medium Questions (Médio)
            {
                id: 6,
                difficulty: 'medium',
                question: 'Qual é a unidade de medida da potência elétrica?',
                options: ['A) Watt (W)', 'B) Volt (V)', 'C) Ampère (A)'],
                correct: 'A',
                hint: 'Esta unidade tem o nome de um famoso inventor escocês.',
                explanation: 'O Watt é a unidade de potência, nomeada em homenagem a James Watt.'
            },
            {
                id: 7,
                difficulty: 'medium',
                question: 'O que é energia eólica?',
                options: ['A) Energia do petróleo', 'B) Energia do vento', 'C) Energia da água'],
                correct: 'B',
                hint: 'Éolo era o deus grego dos ventos.',
                explanation: 'Energia eólica é gerada pelo movimento do vento através de turbinas.'
            },
            {
                id: 8,
                difficulty: 'medium',
                question: 'Qual prática NÃO contribui para a eficiência energética?',
                options: ['A) Desligar aparelhos em standby', 'B) Usar ar condicionado em temperatura muito baixa', 'C) Aproveitar luz natural'],
                correct: 'B',
                hint: 'Temperaturas extremas no ar condicionado gastam muita energia.',
                explanation: 'Usar temperaturas muito baixas no ar condicionado consome energia excessiva.'
            },
            {
                id: 9,
                difficulty: 'medium',
                question: 'Qual combustível fóssil emite menos CO2 na queima?',
                options: ['A) Carvão', 'B) Petróleo', 'C) Gás natural'],
                correct: 'C',
                hint: 'É o combustível fóssil mais "limpo" em termos de emissões.',
                explanation: 'O gás natural emite menos CO2 por unidade de energia gerada.'
            },
            {
                id: 10,
                difficulty: 'medium',
                question: 'O que são painéis fotovoltaicos?',
                options: ['A) Painéis que aquecem água', 'B) Painéis que geram eletricidade a partir do sol', 'C) Painéis decorativos'],
                correct: 'B',
                hint: 'A palavra "foto" se refere à luz e "voltaico" à eletricidade.',
                explanation: 'Painéis fotovoltaicos convertem luz solar diretamente em energia elétrica.'
            },
            
            // Hard Questions (Difícil)
            {
                id: 11,
                difficulty: 'hard',
                question: 'Qual é aproximadamente a eficiência de uma célula fotovoltaica comercial típica?',
                options: ['A) 15-20%', 'B) 50-60%', 'C) 80-90%'],
                correct: 'A',
                hint: 'A tecnologia ainda tem muito potencial de melhoria.',
                explanation: 'Células fotovoltaicas comerciais têm eficiência entre 15-20%, com algumas atingindo 25%.'
            },
            {
                id: 12,
                difficulty: 'hard',
                question: 'O que é cogeração de energia?',
                options: ['A) Gerar energia de duas fontes diferentes', 'B) Produzir eletricidade e calor simultaneamente', 'C) Armazenar energia em baterias'],
                correct: 'B',
                hint: 'É uma forma de aproveitar melhor o combustível produzindo duas formas de energia.',
                explanation: 'Cogeração produz simultaneamente energia elétrica e térmica, aumentando a eficiência.'
            },
            {
                id: 13,
                difficulty: 'hard',
                question: 'Qual tecnologia permite armazenar energia renovável em grande escala?',
                options: ['A) Usinas hidrelétricas reversíveis', 'B) Pilhas comuns', 'C) Capacitores'],
                correct: 'A',
                hint: 'Utiliza água e gravidade para armazenar energia.',
                explanation: 'Usinas hidrelétricas reversíveis bombeiam água para reservatórios superiores, armazenando energia.'
            },
            {
                id: 14,
                difficulty: 'hard',
                question: 'O que é smart grid?',
                options: ['A) Uma rede social', 'B) Rede elétrica inteligente com comunicação digital', 'C) Tipo de painel solar'],
                correct: 'B',
                hint: 'É uma evolução da rede elétrica tradicional com tecnologia digital.',
                explanation: 'Smart grid é uma rede elétrica inteligente que otimiza a distribuição de energia.'
            },
            {
                id: 15,
                difficulty: 'hard',
                question: 'Qual é o principal desafio da energia solar fotovoltaica?',
                options: ['A) Alto custo de instalação', 'B) Intermitência e armazenamento', 'C) Poluição ambiental'],
                correct: 'B',
                hint: 'O sol não brilha 24 horas por dia nem todos os dias são ensolarados.',
                explanation: 'A intermitência da fonte solar e a necessidade de armazenamento são os principais desafios.'
            },
            
            // Additional questions to ensure variety
            {
                id: 16,
                difficulty: 'easy',
                question: 'Qual ação simples economiza mais energia no chuveiro?',
                options: ['A) Diminuir o tempo de banho', 'B) Aumentar a pressão da água', 'C) Usar água mais quente'],
                correct: 'A',
                hint: 'Menos tempo significa menos energia gasta para aquecer a água.',
                explanation: 'Banhos mais curtos reduzem significativamente o consumo de energia.'
            },
            {
                id: 17,
                difficulty: 'medium',
                question: 'O que é biomassa como fonte de energia?',
                options: ['A) Energia nuclear', 'B) Material orgânico usado para gerar energia', 'C) Energia do mar'],
                correct: 'B',
                hint: 'Inclui madeira, bagaço de cana, restos de plantas.',
                explanation: 'Biomassa são materiais orgânicos que podem ser queimados ou fermentados para gerar energia.'
            },
            {
                id: 18,
                difficulty: 'hard',
                question: 'Qual é o principal gás do efeito estufa relacionado ao consumo de energia?',
                options: ['A) Oxigênio (O2)', 'B) Dióxido de carbono (CO2)', 'C) Nitrogênio (N2)'],
                correct: 'B',
                hint: 'É produzido principalmente pela queima de combustíveis fósseis.',
                explanation: 'O CO2 é o principal gás do efeito estufa emitido pela queima de combustíveis fósseis.'
            },
            {
                id: 19,
                difficulty: 'easy',
                question: 'Qual é melhor para o meio ambiente?',
                options: ['A) Deixar aparelhos ligados', 'B) Desligar aparelhos quando não usar', 'C) Usar vários aparelhos ao mesmo tempo'],
                correct: 'B',
                hint: 'Economizar energia sempre ajuda o meio ambiente.',
                explanation: 'Desligar aparelhos não utilizados reduz o consumo de energia e o impacto ambiental.'
            },
            {
                id: 20,
                difficulty: 'medium',
                question: 'O que é energia geotérmica?',
                options: ['A) Energia do vento', 'B) Energia do calor da Terra', 'C) Energia das marés'],
                correct: 'B',
                hint: '"Geo" significa Terra e "térmica" se refere ao calor.',
                explanation: 'Energia geotérmica aproveitа o calor natural do interior da Terra.'
            }
        ];
        
        this.init();
    }

    init() {
        this.createBoard();
        this.createTokens();
        this.updateCurrentPlayerDisplay();
        this.setupEventListeners();
        this.setupAudioControls();
    }

    setupEventListeners() {
        document.getElementById('rollDiceBtn').addEventListener('click', () => this.rollDice());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        
        // Option buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectAnswer(e.target.dataset.option));
        });
    }

    setupAudioControls() {
        const musicToggle = document.getElementById('musicToggle');
        const volumeSlider = document.getElementById('volumeSlider');
        
        musicToggle.addEventListener('click', () => this.toggleMusic());
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        
        // Set initial volume
        this.backgroundMusic.volume = 0.5;
    }

    toggleMusic() {
        const musicToggle = document.getElementById('musicToggle');
        const icon = musicToggle.querySelector('i');
        
        if (this.musicPlaying) {
            this.backgroundMusic.pause();
            icon.className = 'fas fa-volume-mute';
            this.musicPlaying = false;
        } else {
            this.backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
            icon.className = 'fas fa-volume-up';
            this.musicPlaying = true;
        }
    }

    setVolume(value) {
        this.backgroundMusic.volume = value / 100;
    }

    createBoard() {
        const board = document.getElementById('gameBoard');
        board.innerHTML = '';
        
        // Create 30 squares in a path pattern
        for (let i = 1; i <= 30; i++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.id = `square-${i}`;
            
            if (i === 1) {
                square.classList.add('start');
                square.textContent = 'INÍCIO';
            } else if (i === 30) {
                square.classList.add('finish');
                square.textContent = 'FIM';
            } else if (this.questionSpaces.includes(i)) {
                square.classList.add('question');
            } else {
                square.textContent = i;
            }
            
            board.appendChild(square);
        }
    }

    createTokens() {
        // Place all tokens on the starting square
        const startSquare = document.getElementById('square-1');
        
        for (let i = 1; i <= 3; i++) {
            const token = document.createElement('div');
            token.className = `token player${i}-token`;
            token.id = `player${i}-token`;
            startSquare.appendChild(token);
        }
    }

    updateCurrentPlayerDisplay() {
        document.getElementById('currentPlayerDisplay').textContent = this.currentPlayer;
        const indicator = document.getElementById('playerIndicator');
        indicator.className = `player-indicator player${this.currentPlayer}-token`;
    }

    rollDice() {
        if (this.isMoving || this.gameEnded) return;
        
        const rollBtn = document.getElementById('rollDiceBtn');
        const dice = document.getElementById('dice');
        const diceIcon = dice.querySelector('i');
        
        rollBtn.disabled = true;
        dice.classList.add('rolling');
        
        // Animate dice roll
        const diceNumbers = ['fa-dice-one', 'fa-dice-two', 'fa-dice-three', 'fa-dice-four', 'fa-dice-five', 'fa-dice-six'];
        let rollCount = 0;
        const rollInterval = setInterval(() => {
            diceIcon.className = `fas ${diceNumbers[Math.floor(Math.random() * 6)]}`;
            rollCount++;
            if (rollCount > 10) {
                clearInterval(rollInterval);
                const finalRoll = Math.floor(Math.random() * 6) + 1;
                diceIcon.className = `fas ${diceNumbers[finalRoll - 1]}`;
                dice.classList.remove('rolling');
                this.movePlayer(finalRoll);
            }
        }, 100);
    }

    async movePlayer(steps) {
        this.isMoving = true;
        const currentPos = this.playerPositions[this.currentPlayer - 1];
        const newPos = Math.min(currentPos + steps, 30);
        
        const token = document.getElementById(`player${this.currentPlayer}-token`);
        
        // Move step by step
        for (let i = currentPos + 1; i <= newPos; i++) {
            const targetSquare = document.getElementById(`square-${i}`);
            token.classList.add('moving');
            targetSquare.appendChild(token);
            
            await new Promise(resolve => setTimeout(resolve, 400));
            token.classList.remove('moving');
        }
        
        this.playerPositions[this.currentPlayer - 1] = newPos;
        
        // Check if landed on question space
        if (this.questionSpaces.includes(newPos)) {
            this.showQuestion();
            return;
        }
        
        // Check win condition
        if (newPos >= 30) {
            this.endGame();
            return;
        }
        
        this.nextPlayer();
    }

    showQuestion() {
        // Get available questions for current player
        const availableQuestions = this.questionBank.filter(q => 
            !this.playerQuestions[this.currentPlayer].has(q.id) && 
            !this.usedQuestions.has(q.id)
        );
        
        if (availableQuestions.length === 0) {
            // If no unique questions available, allow any unused question
            const fallbackQuestions = this.questionBank.filter(q => !this.usedQuestions.has(q.id));
            if (fallbackQuestions.length === 0) {
                // Reset used questions if all have been used
                this.usedQuestions.clear();
                this.currentQuestion = this.questionBank[Math.floor(Math.random() * this.questionBank.length)];
            } else {
                this.currentQuestion = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
            }
        } else {
            this.currentQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        }
        
        // Mark question as used
        this.usedQuestions.add(this.currentQuestion.id);
        this.playerQuestions[this.currentPlayer].add(this.currentQuestion.id);
        
        // Display question
        const modal = document.getElementById('questionModal');
        const difficultyBadge = document.getElementById('difficultyBadge');
        const questionText = document.getElementById('questionText');
        const optionA = document.getElementById('optionA');
        const optionB = document.getElementById('optionB');
        const optionC = document.getElementById('optionC');
        const hintText = document.getElementById('hintText');
        const questionResult = document.getElementById('questionResult');
        
        // Reset previous state
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.className = 'option-btn';
            btn.disabled = false;
        });
        hintText.style.display = 'none';
        questionResult.style.display = 'none';
        
        // Set difficulty badge
        difficultyBadge.textContent = this.getDifficultyText(this.currentQuestion.difficulty);
        difficultyBadge.className = `difficulty-badge ${this.currentQuestion.difficulty}`;
        
        // Set question content
        questionText.textContent = this.currentQuestion.question;
        optionA.textContent = this.currentQuestion.options[0];
        optionB.textContent = this.currentQuestion.options[1];
        optionC.textContent = this.currentQuestion.options[2];
        
        modal.style.display = 'block';
    }

    getDifficultyText(difficulty) {
        const texts = {
            'easy': 'Fácil',
            'medium': 'Médio', 
            'hard': 'Difícil'
        };
        return texts[difficulty] || 'Médio';
    }

    showHint() {
        const hintText = document.getElementById('hintText');
        hintText.textContent = this.currentQuestion.hint;
        hintText.style.display = 'block';
    }

    selectAnswer(selectedOption) {
        const isCorrect = selectedOption === this.currentQuestion.correct;
        const resultDiv = document.getElementById('questionResult');
        
        // Disable all option buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.option === this.currentQuestion.correct) {
                btn.classList.add('correct');
            } else if (btn.dataset.option === selectedOption && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Show result
        resultDiv.style.display = 'block';
        
        if (isCorrect) {
            resultDiv.className = 'question-result correct';
            const moveForward = this.getDifficultyReward(this.currentQuestion.difficulty);
            resultDiv.innerHTML = `
                <strong>Correto!</strong><br>
                ${this.currentQuestion.explanation}<br>
                <em>Avance ${moveForward} casa${moveForward > 1 ? 's' : ''}!</em>
            `;
            
            setTimeout(() => {
                this.closeQuestionModal();
                this.movePlayerByReward(moveForward);
            }, 3000);
        } else {
            resultDiv.className = 'question-result incorrect';
            const moveBackward = this.getDifficultyPenalty(this.currentQuestion.difficulty);
            resultDiv.innerHTML = `
                <strong>Incorreto!</strong><br>
                ${this.currentQuestion.explanation}<br>
                <em>Volte ${moveBackward} casa${moveBackward > 1 ? 's' : ''}!</em>
            `;
            
            setTimeout(() => {
                this.closeQuestionModal();
                this.movePlayerByReward(-moveBackward);
            }, 3000);
        }
    }

    getDifficultyReward(difficulty) {
        const rewards = { 'easy': 1, 'medium': 2, 'hard': 3 };
        return rewards[difficulty] || 1;
    }

    getDifficultyPenalty(difficulty) {
        const penalties = { 'easy': 3, 'medium': 2, 'hard': 1 };
        return penalties[difficulty] || 2;
    }

    async movePlayerByReward(steps) {
        this.isMoving = true;
        const currentPos = this.playerPositions[this.currentPlayer - 1];
        const newPos = Math.max(1, Math.min(currentPos + steps, 30));
        
        const token = document.getElementById(`player${this.currentPlayer}-token`);
        
        if (steps > 0) {
            // Move forward
            for (let i = currentPos + 1; i <= newPos; i++) {
                const targetSquare = document.getElementById(`square-${i}`);
                token.classList.add('moving');
                targetSquare.appendChild(token);
                await new Promise(resolve => setTimeout(resolve, 400));
                token.classList.remove('moving');
            }
        } else {
            // Move backward
            for (let i = currentPos - 1; i >= newPos; i--) {
                const targetSquare = document.getElementById(`square-${i}`);
                token.classList.add('moving');
                targetSquare.appendChild(token);
                await new Promise(resolve => setTimeout(resolve, 400));
                token.classList.remove('moving');
            }
        }
        
        this.playerPositions[this.currentPlayer - 1] = newPos;
        
        // Check win condition
        if (newPos >= 30) {
            this.endGame();
            return;
        }
        
        this.nextPlayer();
    }

    closeQuestionModal() {
        document.getElementById('questionModal').style.display = 'none';
    }

    nextPlayer() {
        this.currentPlayer = (this.currentPlayer % 3) + 1;
        this.updateCurrentPlayerDisplay();
        this.isMoving = false;
        document.getElementById('rollDiceBtn').disabled = false;
    }

    endGame() {
        this.gameEnded = true;
        const winModal = document.getElementById('winModal');
        const winMessage = document.getElementById('winMessage');
        
        winMessage.textContent = `O Jogador ${this.currentPlayer} venceu! Parabéns por aprender sobre energia sustentável!`;
        winModal.style.display = 'block';
        
        // Stop background music
        this.backgroundMusic.pause();
    }

    restartGame() {
        // Reset game state
        this.currentPlayer = 1;
        this.playerPositions = [1, 1, 1];
        this.isMoving = false;
        this.gameEnded = false;
        this.usedQuestions.clear();
        this.playerQuestions = { 1: new Set(), 2: new Set(), 3: new Set() };
        
        // Hide modals
        document.getElementById('winModal').style.display = 'none';
        document.getElementById('questionModal').style.display = 'none';
        
        // Reset UI
        document.getElementById('rollDiceBtn').disabled = false;
        this.updateCurrentPlayerDisplay();
        
        // Recreate board and tokens
        this.createBoard();
        this.createTokens();
        
        // Reset dice
        const dice = document.getElementById('dice');
        dice.querySelector('i').className = 'fas fa-dice-one';
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BoardGame();
});
