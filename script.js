const questions = [

    {
        question: "Which language is used to structure a web page?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "HTML"
    },

    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "CSS", "C++", "SQL"],
        answer: "CSS"
    },

    {
        question: "Which language is mainly used to add interactivity to web pages?",
        options: ["JavaScript", "HTML", "CSS", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["let", "define", "variable", "int"],
        answer: "let"
    },

    {
        question: "Which method is used to print output in the browser console?",
        options: [
            "console.log()",
            "print()",
            "display()",
            "write.console()"
        ],
        answer: "console.log()"
    }

];


let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

let timeLeft = 300;
let timerInterval;


// Start exam
function startExam() {

    document.getElementById("startScreen").classList.add("hidden");

    document.getElementById("examScreen").classList.remove("hidden");

    currentQuestion = 0;
    score = 0;
    timeLeft = 300;

    showQuestion();

    startTimer();
}


// Display question
function showQuestion() {

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("question").textContent =
        q.question;

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";

    selectedAnswer = null;

    q.options.forEach(option => {

        const div = document.createElement("div");

        div.className = "option";

        div.textContent = option;

        div.onclick = function () {

            document.querySelectorAll(".option").forEach(item => {
                item.classList.remove("selected");
            });

            div.classList.add("selected");

            selectedAnswer = option;
        };

        optionsDiv.appendChild(div);
    });


    if (currentQuestion === questions.length - 1) {
        document.getElementById("nextButton").textContent =
            "Submit Exam";
    }

    else {
        document.getElementById("nextButton").textContent =
            "Next";
    }
}


// Next question
function nextQuestion() {

    if (selectedAnswer === null) {

        alert("Please select an answer.");

        return;
    }


    if (selectedAnswer === questions[currentQuestion].answer) {

        score++;
    }


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }

    else {

        finishExam();
    }
}


// Timer
function startTimer() {

    clearInterval(timerInterval);

    timerInterval = setInterval(function () {

        timeLeft--;

        let minutes = Math.floor(timeLeft / 60);

        let seconds = timeLeft % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").textContent =
            `0${minutes}:${seconds}`;


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            finishExam();
        }

    }, 1000);
}


// Finish exam
function finishExam() {

    clearInterval(timerInterval);

    document.getElementById("examScreen").classList.add("hidden");

    document.getElementById("resultScreen").classList.remove("hidden");

    document.getElementById("score").textContent =
        `${score} / ${questions.length}`;


    if (score >= 4) {

        document.getElementById("resultMessage").textContent =
            "Excellent performance!";

    }

    else if (score >= 3) {

        document.getElementById("resultMessage").textContent =
            "Good job! Keep practicing.";

    }

    else {

        document.getElementById("resultMessage").textContent =
            "Keep learning and try again.";
    }
}


// Restart exam
function restartExam() {

    document.getElementById("resultScreen").classList.add("hidden");

    document.getElementById("startScreen").classList.remove("hidden");

}