// let questions = [];
// let index = 0;
// let score = 0;

// const questionEl = document.getElementById("question");
// const optionsEl = document.getElementById("options");
// const scoreBox = document.getElementById("scoreBox");
// const newGameBtn = document.getElementById("newGame");

// function fetchQuestions() {
//     questionEl.textContent = "Loading questions...";
//     optionsEl.innerHTML = "";
//     scoreBox.textContent = "";

//     fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
//     .then(res => res.json())
//     .then(data => {
//         questions = data.results.map(q => formatQuestion(q));
//         index = 0;
//         score = 0;
//     })
//     .catch(() => {
//         questionEl.textContent = "Failed to load questions. Try again.";
//     });
// }

// function formatQuestion(q) {
//     const options = [...q.incorrect_answers];
//     const correctPosition = Math.floor(Math.random() * 5);
//     options.splice(correctPosition, 0, q.correct_answer);

//     return {
//     question: q.question,
//     options: options,
//     answer: correctPosition
//     };
// }

// function loadQuestion() {
//     if (index >= questions.length) return endQuiz();

//     const q = questions[index];
//     questionEl.innerHTML = q.question;
//     optionsEl.innerHTML = "";

//     q.options.forEach((opt, i) => {
//         const div = document.createElement("div");
//         div.className = "option";
//         div.innerHTML = opt;

//         div.onclick = () => checkAnswer(i, div);
//         optionsEl.appendChild(div);
//     });
// }

// function checkAnswer(selected, selectedDiv) {
//     const correct = questions[index].answer;

//     Array.from(optionsEl.children).forEach(opt => opt.style.pointerEvents = "none");

//     if (selected === correct) {
//         selectedDiv.style.background = "#4caf50";
//         score++;
//     } 
//     else {
//         selectedDiv.style.background = "#f44336";
//         optionsEl.children[correct].style.background = "#4caf50";
//     }

//     setTimeout(() => {
//         index++;
//         loadQuestion();
//     }, 900);
// }

// function endQuiz() {
//     questionEl.innerHTML = score >= 3 ? "<center>🎉 Congratulations! You Won!</center" : "<center>You finished the quiz!</center";

//     optionsEl.innerHTML = "";
//     scoreBox.innerHTML = `Your Score: <strong>${score} / ${questions.length}</strong>`;
//     newGameBtn.style.display = "block";
// }

// newGameBtn.onclick = () => {
//     newGameBtn.style.display = "none";
//     fetchQuestions();
// };

// fetchQuestions();

// ==========================
//       QUIZ DATA
// ==========================
let questions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        answer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: 2
    },
    {
        question: "Who wrote the National Anthem of India?",
        options: ["Bankim Chandra", "Sarojini Naidu", "Tagore", "Premchand"],
        answer: 2
    },
    {
        question: "Which is the largest ocean?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        answer: 2
    },
    {
        question: "HTML stands for?",
        options: [
            "Hyper Text Makeup Language",
            "HighText Markup Language",
            "Hyper Text Markup Language",
            "Hyper Tool Multi Language"
        ],
        answer: 2
    }
];

let index = 0;
let score = 0;
let gameHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
let timer;
let timeLeft = 10;

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
// ==========================
//       LOAD QUESTION
// ==========================
function loadQuestion() {
    if (index >= questions.length) return endQuiz();

    timeLeft = 10;
    updateTimer();

    clearInterval(timer);
    timer = setInterval(countDown, 1000);

    const q = questions[index];

    questionEl.innerHTML = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerHTML = opt;

        div.onclick = () => checkAnswer(i, div);
        optionsEl.appendChild(div);
        div.style.pointerEvents = "auto";
        div.style.background = "#e3e3e3";
    });
}

function updateScorecard() {
    currentScoreEl.textContent = `Score: ${score}`;
    questionCounterEl.textContent = `Question: ${index + 1}/${questions.length}`;
}

// ==========================
//         TIMER
// ==========================
function countDown() {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
        clearInterval(timer);
        timeUp();
    }
}

function updateTimer() {
    scoreBox.innerHTML = `⏳ Time Left: <strong>${timeLeft}</strong> seconds<br>Score: ${score}`;
}

// ==========================
//        TIME UP LOGIC
// ==========================
function timeUp() {
    questionEl.innerHTML += "<br><span style='color:red; font-size:16px;'>Time Up!</span>";

    const correct = questions[index].answer;

    Array.from(optionsEl.children).forEach(opt => opt.style.pointerEvents = "none");

    optionsEl.children[correct].style.background = "#4caf50"; // highlight correct

    setTimeout(() => {
        index++;
        loadQuestion();
    }, 1000);
}

// ==========================
//     CHECK ANSWER
// ==========================
function checkAnswer(selected, selectedDiv) {
    clearInterval(timer);

    const correct = questions[index].answer;

    Array.from(optionsEl.children).forEach(opt => {
        opt.style.pointerEvents = "none";
        opt.onclick = null;
    });

    if (selected === correct) {
        selectedDiv.style.background = "#4caf50";
        score++;
    } else {
        selectedDiv.style.background = "#f44336";
        optionsEl.children[correct].style.background = "#4caf50";
    }

    setTimeout(() => {
        index++;
        loadQuestion();
    }, 900);
}

// ==========================
//         END QUIZ
// ==========================
function endQuiz() {
    questionEl.innerHTML = score >= 3 ? "<center>🎉 Congratulations! You Won!</center>" : "<center>You finished the quiz!</center>";
    clearInterval(timer);

    questionEl.innerHTML =
        score >= 3
            ? "<center>🎉 Congratulations! You Won!</center>"
            : "<center>You finished the quiz!</center>";

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

// ==========================
//        NEW GAME
// ==========================
newGameBtn.onclick = () => {
    newGameBtn.style.display = "none";
    index = 0;
    score = 0;
    loadQuestion();
};

themeToggle.onclick = toggleTheme;

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

fetchQuestions();
// START GAME
loadQuestion();
