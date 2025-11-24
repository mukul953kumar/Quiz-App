let questions = [];
let index = 0;
let score = 0;
let gameHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreBox = document.getElementById("scoreBox");
const newGameBtn = document.getElementById("newGame");
const themeToggle = document.getElementById("themeToggle");
const scoreboard = document.getElementById("scoreboard");
const scoreHistory = document.getElementById("scoreHistory");
const currentScoreEl = document.getElementById("currentScore");
const questionCounterEl = document.getElementById("questionCounter");

const dummyQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Monet"],
    answer: 2
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  }
];

function fetchQuestions() {
    questionEl.textContent = "Loading questions...";
    optionsEl.innerHTML = "";
    scoreBox.textContent = "";
    scoreboard.style.display = "none";

    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => {
        questions = data.results.map(q => formatQuestion(q));
        index = 0;
        score = 0;
        loadQuestion();
    })
    .catch(() => {
        questions = dummyQuestions;
        index = 0;
        score = 0;
        loadQuestion();
    });
}

function formatQuestion(q) {
    const options = [...q.incorrect_answers];
    const correctPosition = Math.floor(Math.random() * 5);
    options.splice(correctPosition, 0, q.correct_answer);

    return {
    question: q.question,
    options: options,
    answer: correctPosition
    };
}

function loadQuestion() {
    if (index >= questions.length) return endQuiz();

    updateScorecard();
    const q = questions[index];
    questionEl.innerHTML = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerHTML = opt;

        div.onclick = () => checkAnswer(i, div);
        optionsEl.appendChild(div);
    });
}

function updateScorecard() {
    currentScoreEl.textContent = `Score: ${score}`;
    questionCounterEl.textContent = `Question: ${index + 1}/${questions.length}`;
}

function checkAnswer(selected, selectedDiv) {
    const correct = questions[index].answer;

    Array.from(optionsEl.children).forEach(opt => {
        opt.style.pointerEvents = "none";
        opt.onclick = null;
    });

    if (selected === correct) {
        selectedDiv.style.background = "#4caf50";
        score++;
    } 
    else {
        selectedDiv.style.background = "#f44336";
        optionsEl.children[correct].style.background = "#4caf50";
    }

    setTimeout(() => {
        index++;
        loadQuestion();
    }, 900);
}

function endQuiz() {
    questionEl.innerHTML = score >= 3 ? "<center>🎉 Congratulations! You Won!</center>" : "<center>You finished the quiz!</center>";

    optionsEl.innerHTML = "";
    scoreBox.innerHTML = `Your Score: <strong>${score} / ${questions.length}</strong>`;
    
    saveScore();
    displayScoreboard();
    newGameBtn.style.display = "block";
}

function saveScore() {
    const gameResult = {
        score: score,
        total: questions.length,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    gameHistory.unshift(gameResult);
    if (gameHistory.length > 10) gameHistory.pop();
    localStorage.setItem('quizHistory', JSON.stringify(gameHistory));
}

function displayScoreboard() {
    scoreHistory.innerHTML = gameHistory.map((game, i) => 
        `<div class="score-entry">#${i + 1}: ${game.score}/${game.total} - ${game.date}</div>`
    ).join('');
    scoreboard.style.display = "block";
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
}

newGameBtn.onclick = () => {
    newGameBtn.style.display = "none";
    fetchQuestions();
};

themeToggle.onclick = toggleTheme;

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

fetchQuestions();