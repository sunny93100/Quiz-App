const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "A) Hyper Trainer Marking Language", correct: false },
            { text: "B) Hyper Text Markup Language", correct: true },
            { text: "C) Hyper Text Marketing Language", correct: false },
            { text: "D) Hyper Tool Multi Language", correct: false },
        ]
    },
    {
        question: "Which of the following is not a programming language?",
        answers: [
            { text: "A) Python", correct: false },
            { text: "B) Java", correct: false },
            { text: "C) HTML", correct: false },
            { text: "D) Linux", correct: true },
        ]
    },
    {
        question: "Which CSS property controls the font size?",
        answers: [
            { text: "A) font weight", correct: false },
            { text: "B) text size", correct: false },
            { text: "C) font size", correct: true },
            { text: "D) size", correct: false },
        ]
    },
    {
        question: "Which keyword is used to define a constant in JavaScript?",
        answers: [
            { text: "A) var", correct: false },
            { text: "B) let", correct: false },
            { text: "C) constant", correct: false },
            { text: "D) const", correct: true },
        ]
    },    
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "A) Computer Style Sheets", correct: false },
            { text: "B) Creative Style Sheets", correct: false },
            { text: "C) Cascading Style Sheets", correct: true },
            { text: "D) Colorful Style Sheets", correct: false },

        ]
    }    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
