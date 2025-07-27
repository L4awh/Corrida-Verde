document.addEventListener('DOMContentLoaded', () => {
  const boardEl = document.getElementById('board');
  const rollBtn = document.getElementById('rollBtn');
  const diceResult = document.getElementById('diceResult');
  const modal = document.getElementById('modal');
  const questionText = document.getElementById('questionText');
  const hintText = document.getElementById('hintText');
  const hintBtn = document.getElementById('hintBtn');
  const optionButtons = document.querySelectorAll('.optionBtn');
  const musicBtn = document.getElementById('toggleMusic');
  const bgMusic = document.getElementById('bgMusic');
  const feedback = document.getElementById('feedback');

  const TOTAL_SQUARES = 30;
  const questionPositions = [6, 12, 18, 22, 26, 30];
  let currentPlayer = 0;
  let isMoving = false;
  let currentQuestion = null;

  const questions = [
    {
      question: 'Qual é o principal objetivo da eficiência energética?',
      options: { A: 'Aumentar o consumo', B: 'Reduzir o desperdício', C: 'Gerar mais energia' },
      correct: 'B',
      difficulty: 'easy',
      hint: 'Pense em aproveitar melhor o que já temos.'
    },
    {
      question: 'O que é cogeração na eficiência energética?',
      options: {
        A: 'Produção simultânea de calor e eletricidade',
        B: 'Armazenamento de energia',
        C: 'Conversão de resíduos em energia'
      },
      correct: 'A',
      difficulty: 'medium',
      hint: 'Duas formas de energia ao mesmo tempo.'
    },
    {
      question: 'Quem descobriu o efeito fotovoltaico?',
      options: { A: 'Albert Einstein', B: 'Edmond Becquerel', C: 'Nikola Tesla' },
      correct: 'B',
      difficulty: 'hard',
      hint: 'Foi um físico francês no século XIX.'
    }
  ];

  const players = [
    { pos: 1, tokenEl: null },
    { pos: 1, tokenEl: null },
    { pos: 1, tokenEl: null }
  ];

  function buildBoard() {
    for (let i = 1; i <= TOTAL_SQUARES; i++) {
      const sq = document.createElement('div');
      sq.classList.add('square');
      sq.dataset.index = i;
      if (questionPositions.includes(i)) sq.classList.add('question');
      boardEl.appendChild(sq);
    }
  }

  function createTokens() {
    players.forEach((pl, idx) => {
      const t = document.createElement('div');
      t.classList.add('token', `player${idx}`);
      t.id = `token${idx}`;
      pl.tokenEl = t;
      getSquare(1).appendChild(t);
    });
  }

  function getSquare(idx) {
    return boardEl.querySelector(`.square[data-index='${idx}']`);
  }

  function updateTokenPosition(playerIdx) {
    const pl = players[playerIdx];
    let pos = pl.pos;
    if (pos < 1) pos = pl.pos = 1;
    if (pos > TOTAL_SQUARES) pos = pl.pos = TOTAL_SQUARES;
    getSquare(pos).appendChild(pl.tokenEl);
  }

  function moveSteps(steps, onComplete) {
    let moved = 0;
    function step() {
      if (moved < steps) {
        moved++;
        players[currentPlayer].pos++;
        updateTokenPosition(currentPlayer);
        setTimeout(step, 300);
      } else {
        onComplete();
      }
    }
    step();
  }

  function nextTurn() {
    currentPlayer = (currentPlayer + 1) % players.length;
    diceResult.textContent = `Vez do Jogador ${currentPlayer + 1}`;
    isMoving = false;
  }

  function checkQuestion() {
    const pos = players[currentPlayer].pos;
    if (questionPositions.includes(pos)) {
      showQuestion();
    } else {
      nextTurn();
    }
  }

  function showQuestion() {
    isMoving = true;
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    questionText.textContent = currentQuestion.question;
    hintText.textContent = `Dica: ${currentQuestion.hint}`;
    hintText.classList.add('hidden');
    optionButtons.forEach(btn => {
      const key = btn.dataset.option;
      btn.textContent = `${key}) ${currentQuestion.options[key]}`;
    });
    modal.classList.remove('hidden');
  }

  hintBtn.addEventListener('click