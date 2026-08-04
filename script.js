// Banco de dados dinâmico de perguntas do Quiz
const quizData = [
    {
        question: "Qual das seguintes técnicas reduz drasticamente o uso de defensivos químicos ao mapear pragas via satélite ou imagens aéreas?",
        options: ["Aração convencional profunda", "Agricultura de Precisão", "Monocultura contínua", "Queimada controlada"],
        correct: 1,
        explanation: "A Agricultura de Precisão utiliza dados localizados para aplicar insumos apenas onde é estritamente necessário!"
    }
];

let currentQuestionIndex = 0;

function loadQuiz() {
    const quizQuestion = document.getElementById("quiz-question");
    const quizOptions = document.getElementById("quiz-options");
    const quizFeedback = document.getElementById("quiz-feedback");

    if (!quizQuestion || !quizOptions || !quizFeedback) return;

    quizFeedback.classList.add("hide");
    const currentData = quizData[currentQuestionIndex];
    quizQuestion.innerText = currentData.question;
    quizOptions.innerHTML = "";

    currentData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => checkAnswer(index));
        quizOptions.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const feedback = document.getElementById("quiz-feedback");
    const currentData = quizData[currentQuestionIndex];
    
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);

    feedback.classList.remove("hide");
    if(selectedIndex === currentData.correct) {
        feedback.innerText = "Correto! " + currentData.explanation;
        feedback.className = "feedback-text correct";
    } else {
        feedback.innerText = "Incorreto. " + currentData.explanation;
        feedback.className = "feedback-text wrong";
    }
}

// Lógica de Validação do Formulário Corrigida
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const successAlert = document.getElementById("formSuccess");
    
    let isValid = true;

    // Validar Nome
    if (name.value.trim().length < 3) {
        name.parentElement.classList.add("invalid");
        isValid = false;
    } else {
        name.parentElement.classList.remove("invalid");
    }

    // Validar Email (Expressão Regular corrigida sem travar o script)
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email.value.trim())) {
        email.parentElement.classList.add("invalid");
        isValid = false;
    } else {
        email.parentElement.classList.remove("invalid");
    }

    // Validar Mensagem
    if (message.value.trim() === "") {
        message.parentElement.classList.add("invalid");
        isValid = false;
    } else {
        message.parentElement.classList.remove("invalid");
    }

    if (isValid) {
        successAlert.classList.remove("hide");
        this.reset();
        setTimeout(() => {
            successAlert.classList.add("hide");
        }, 5000);
    }
});

// Inicialização segura ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
    loadQuiz();
});
