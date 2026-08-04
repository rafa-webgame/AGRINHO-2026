// Banco de dados do Quiz Técnico (Agrinho 2026)
const quizData = [
    {
        question: "Qual técnica mitiga as emissões de carbono ao plantar diretamente sobre os restos orgânicos da colheita anterior, sem arar a terra?",
        options: [
            "Queimada controlada tradicional",
            "Sistema de Plantio Direto",
            "Mecanização profunda do terreno",
            "Fertilização química solúvel de alta dosagem"
        ],
        correct: 1,
        explanation: "O Plantio Direto mantém a palhada da lavoura antiga para resguardar a microbiota do solo, evitando a erosão mecânica e capturando carbono de forma orgânica!"
    }
];

let currentQuestionIndex = 0;

function loadQuizSystem() {
    const questionEl = document.getElementById("quiz-question");
    const optionsContainer = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");

    if (!questionEl || !optionsContainer || !feedbackEl) return;

    feedbackEl.classList.add("hide");
    const currentQuiz = quizData[currentQuestionIndex];
    
    questionEl.innerText = currentQuiz.question;
    optionsContainer.innerHTML = "";

    currentQuiz.options.forEach((optionText, index) => {
        const button = document.createElement("button");
        button.innerText = optionText;
        button.classList.add("option-btn");
        button.addEventListener("click", () => checkQuizAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function checkQuizAnswer(selectedIndex) {
    const feedbackEl = document.getElementById("quiz-feedback");
    const currentQuiz = quizData[currentQuestionIndex];
    
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(btn => btn.disabled = true);

    feedbackEl.classList.remove("hide");
    if (selectedIndex === currentQuiz.correct) {
        feedbackEl.innerText = "Excelente! " + currentQuiz.explanation;
        feedbackEl.className = "feedback-text correct";
    } else {
        feedbackEl.innerText = "Incorreto. " + currentQuiz.explanation;
        feedbackEl.className = "feedback-text wrong";
    }
}

// Validação Robusta e Dinâmica do Formulário
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const successBox = document.getElementById("formSuccess");
    
    let isFormValid = true;

    // Conferência do Nome
    if (name.value.trim().length < 3) {
        name.parentElement.classList.add("invalid");
        isFormValid = false;
    } else {
        name.parentElement.classList.remove("invalid");
    }

    // Conferência Segura do Email por Verificação Própria
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        email.parentElement.classList.add("invalid");
        isFormValid = false;
    } else {
        email.parentElement.classList.remove("invalid");
    }

    // Conferência da Mensagem
    if (message.value.trim() === "") {
        message.parentElement.classList.add("invalid");
        isFormValid = false;
    } else {
        message.parentElement.classList.remove("invalid");
    }

    // Disparo de Mensagem de Êxito Local
    if (isFormValid) {
        successBox.classList.remove("hide");
        this.reset();
        setTimeout(() => {
            successBox.classList.add("hide");
        }, 5000);
    }
});

// Inicialização estável controlada pelo DOM
window.addEventListener("DOMContentLoaded", () => {
    loadQuizSystem();
});
