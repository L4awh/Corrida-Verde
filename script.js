document.addEventListener('DOMContentLoaded', () => {
  const boardEl = document.getElementById('board');
  const rollBtn = document.getElementById('rollBtn');
  const diceResult = document.getElementById('diceResult');
  const modal = document.getElementById('modal');
  const questionText = document.getElementById('questionText');
  const optionButtons = document.querySelectorAll('.optionBtn');

  // Configurações iniciais
  const TOTAL_SQUARES = 30;
  const questionPositions = [4, 9, 15, 20, 24, 28];
  let currentPlayer = 0;
  let isMoving = false;
  let currentQuestion = null;

  // Lista de perguntas
  const questions = [
    // Fácil
    {
      question: 'Qual é o principal objetivo da eficiência energética?',
      options: { A: 'Aumentar o consumo', B: 'Reduzir o desperdício', C: 'Gerar mais energia' },
      correct: 'B',
      difficulty: 'easy'
    },
    {
      question: 'Qual equipamento perde eficiência se o filtro estiver sujo?',
      options: { A: 'Ar-condicionado', B: 'Lâmpada LED', C: 'Painel solar' },
      correct: 'A',
      difficulty: 'easy'
    },
    {
      question: 'Qual fonte de energia renovável vem do vento?',
      options: { A: 'Eólica', B: 'Solar', C: 'Biomassa' },
      correct: 'A',
      difficulty: 'easy'
    },
    // Médio
    {
      question: 'Qual a eficiência típica de painéis solares comerciais?',
      options: { A: '5–10%', B: '15–20%', C: '30–35%' },
      correct: 'B',
      difficulty: 'medium'
    },
    {
      question: 'O que é cogeração na eficiência energética?',
      options: {
        A: 'Produção simultânea de calor e eletricidade',
        B: 'Armazenamento de energia',
        C: 'Conversão de resíduos em energia'
      },
      correct: 'A',
      difficulty: 'medium'
    },
    {
      question: 'Qual desses NÃO é energia renovável?',
      options: { A: 'Hidrelétrica', B: 'Carvão', C: 'Geotérmica' },
      correct: 'B',
      difficulty: 'medium'
    },
    // Difícil
    {
      question: 'Qual é a fórmula da eficiência energética?',
      options: {
        A: '(Energia Útil / Energia Fornecida) × 100',
        B: 'Energia Fornecida / Energia Útil',
        C: 'Energia Perdida / Energia Fornecida'
      },
      correct: 'A',
      difficulty: 'hard'
    },
    {
      question: 'Quem descobriu o efeito fotovoltaico?',
      options: { A: 'Albert Einstein', B: 'Edmond Becquerel', C: 'Nikola Tesla' },
      correct: 'B',
      difficulty: 'hard'
    },
    {
      question: 'Qual tecnologia melhora mais a eficiência térmica de edifícios?',
      options: {
        A: 'Inércia Térmica Avançada',
        B: 'Isolamento Convencional',
        C: 'Lâmpadas Incandescentes'
      },
      correct: 'A',
      difficulty: 'hard'
    }
  ];

  // Jogadores: posição inicial e token
  const players = [
    { pos: 1, tokenEl: null },
    { pos: 1, tokenEl: null },
    { pos: 1, tokenEl: null }
  ];

  // Gera o tabuleiro
  function buildBoard() {
    for (let i = 1; i <= TOTAL_SQUARES; i++) {
      const sq = document.createElement('div');
      sq.classList.add('square');
      sq.dataset.index = i;
      if (questionPositions.includes(i)) {
        sq.classList.add('question');
      }
      boardEl.appendChild(sq);
    }
  }

  // Cria os tokens e posiciona no início
  function createTokens() {
    players.forEach((pl, idx) => {
      const t = document.createElement('div');
      t.classList.add('token', `player${idx}`);
      t.id = `token${idx}`;
      pl.tokenEl = t;
      getSquare(1).appendChild(t);
    });
  }

  // Retorna a div da casa pelo índice
  function getSquare(idx) {
    return boardEl.querySelector(`.square[data-index='${idx}']`);
  }

  // Atualiza posição de um jogador (move o elemento token)
  function updateTokenPosition(playerIdx) {
    const pl = players[playerIdx];
    let pos = pl.pos;
    if (pos < 1) pos = pl.pos = 1;
    if (pos > TOTAL_SQUARES) pos = pl.pos = TOTAL_SQUARES;
    getSquare(pos).appendChild(pl.tokenEl);
  }

  // Avança token passo a passo
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

  // Passa para o próximo jogador
  function nextTurn() {
    currentPlayer = (currentPlayer + 1) % players.length;
    diceResult.textContent = `Vez do Jogador ${currentPlayer + 1}`;
    isMoving = false;
  }

  // Verifica se caiu em casa de pergunta
  function checkQuestion() {
    const pos = players[currentPlayer].pos;
    if (questionPositions.includes(pos)) {
      showQuestion();
    } else {
      nextTurn();
    }
  }

  // Exibe modal com pergunta
  function showQuestion() {
    isMoving = true;
    // Seleciona pergunta aleatória
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    questionText.textContent = currentQuestion.question;
    optionButtons.forEach(btn => {
      const key = btn.dataset.option;
      btn.textContent = `${key}) ${currentQuestion.options[key]}`;
    });
    modal.classList.remove('hidden');
  }

  // Trata resposta da pergunta
  function handleAnswer(choice) {
    const correct = choice === currentQuestion.correct;
    const diff = currentQuestion.difficulty;
    let adjust = 0;

    if (diff === 'easy') {
      adjust = correct ? +1 : -3;
    } else if (diff === 'medium') {
      adjust = correct ? +2 : -2;
    } else if (diff === 'hard') {
      adjust = correct ? +3 : -1;
    }

    alert(
      (correct ? 'Correto!' : 'Errado!') +
      ` ${correct
        ? `Avance ${Math.abs(adjust)} casa(s).`
        : `Volte ${Math.abs(adjust)} casa(s).`}`
    );

    // Atualiza posição e oculta modal
    players[currentPlayer].pos += adjust;
    updateTokenPosition(currentPlayer);
    modal.classList.add('hidden');

    // Próxima jogada
    nextTurn();
  }

  // Inicialização
  buildBoard();
  createTokens();

  // Eventos
  rollBtn.addEventListener('click', () => {
    if (isMoving) return;
    isMoving = true;
    const dice = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `Você rolou: ${dice}`;
    moveSteps(dice, checkQuestion);
  });

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(btn.dataset.option));
  });
});