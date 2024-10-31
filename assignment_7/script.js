const questionList = [
    {
        question: "Which is the largest animal in the world?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ],
    },
    {
        question: "What is the capital city of France?",
        answer: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answer: [
            { text: "Gold", correct: false },
            { text: "Diamond", correct: true },
            { text: "Silver", correct: false },
            { text: "Iron", correct: false },
        ],
    },
    {
        question: "How many continents are there on Earth?",
        answer: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false },
        ],
    },
    {
        question: "Which ocean is the largest?",
        answer: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
    {
        question: "What is the smallest country in the world?",
        answer: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "Malta", correct: false },
            { text: "Liechtenstein", correct: false },
        ],
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answer: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false },
        ],
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answer: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Hydrogen", correct: false },
        ],
    },
    {
        question: "What is the largest desert in the world?",
        answer: [
            { text: "Sahara Desert", correct: false },
            { text: "Arabian Desert", correct: false },
            { text: "Antarctic Desert", correct: true },
            { text: "Gobi Desert", correct: false },
        ],
    },
];
const question = document.getElementById("question");
const set_answers = document.getElementById("set-answers");
const next_button = document.getElementById("next-button");
const check_button = document.getElementById("check-button");
const timer = document.getElementById("timer");

let timerInterval;
let score = 0;
let currquestionNo = 0;

function startQuiz() {
    score = 0;
    currquestionNo = 0;
    check_button.style.display = "none";
    next_button.style.display = "none";
    showQuestion();
}

function showQuestion() {
    set_answers.innerHTML = "";
    let currques = questionList[currquestionNo];
    let questionIndex = currquestionNo + 1;
    question.innerHTML = questionIndex + ". " + currques.question;
    currques.answer.forEach((answer) => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("answer");
        button.dataset.correct = answer.correct;

        button.addEventListener("click", () => {
            button.classList.toggle("isSelected");

            const anySelected = Array.from(
                document.querySelectorAll(".answer")
            ).some((btn) => btn.classList.contains("isSelected"));
            check_button.innerHTML = "CHECK";
            check_button.style.display = anySelected ? "block" : "none";
        });

        set_answers.appendChild(button);
    });
    startTimer();
}

function startTimer() {
    let timeLeft = 30;
    timer.innerHTML = timeLeft;
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        timer.innerHTML = timeLeft;
        if (timeLeft <= 30) {
            timer.style.color = "#3ae214"; // Yellow color
        }
        if (timeLeft <= 20) {
            timer.style.color = "#cae214"; // Yellow color
        }
        if (timeLeft <= 10) {
            timer.style.color = "#e21414"; // Red color
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
            checkQuestion();
        }
    }, 1000);
}

function checkQuestion() {
    const allButtons = document.querySelectorAll(".answer");
    const selectedBtnsByUser = document.querySelectorAll(".answer.isSelected");

    selectedBtnsByUser.forEach((btn) => {
        btn.classList.add("selected");
    });

    let scoreIncrease = true;
    allButtons.forEach((button) => {
        const isCorrect = button.dataset.correct === "true";
        button.classList.remove("isSelected");
        
        if (isCorrect) {
            button.classList.add("correctans");
        } else {
            button.classList.add("uncorrectans");
        }

        if (button.classList.contains("selected") && button.classList.contains("uncorrectans")) {
            scoreIncrease = false;
           
        }
    });

    if (scoreIncrease) {score++;
        console.log(score);

    }

    allButtons.forEach((button) => (button.disabled = true));

    check_button.style.display = "none";
    next_button.style.display = "block";
    next_button.innerHTML =
        currquestionNo < questionList.length - 1 ? "NEXT!" : "FINISH";
}

function nextQuestion() {
    currquestionNo++;
    if (currquestionNo < questionList.length) {
        showQuestion();
        next_button.style.display = "none";
    } else {
        next_button.style.display = "none";
        alert(`Quiz finished! Your score is ${score}`);
    }
}

check_button.addEventListener("click", checkQuestion);
next_button.addEventListener("click", nextQuestion);

startQuiz();
