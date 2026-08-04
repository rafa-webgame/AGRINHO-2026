// Banco de dados seguro para o Quiz Pedagógico
const quizData = [
    {
        question: "Qual técnica mitiga as emissões de carbono ao plantar diretamente sobre a palhada da colheita anterior, sem arar o terreno?",
        options: [
            "Queimada preventiva sazonal",
            "Sistema de Plantio Direto",
            "Mecanização profunda com tratores",
            "Fertilização química solúvel de alta dosagem"
        ],
        correct: 1,
        explanation: "O Plantio Direto mantém a palhada para resguardar os microrganismos protetores nativos da terra, combatendo a erosão hídrica severa e capturando carbono!"
    }
];

let currentQuestionIndex = 0;

function runQuizSystem() {
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
        button.addEventListener("click", () => evaluateAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function evaluateAnswer(selectedIndex) {
    const feedbackEl = document.getElementById("quiz-feedback");
    const currentQuiz = quizData[currentQuestionIndex];
    
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(btn => btn.disabled = true);

    feedbackEl.classList.remove("hide");
    if (selectedIndex === currentQuiz.correct) {
        feedbackEl.innerText = "Excelente escolha! " + currentQuiz.explanation;
        feedbackEl.className = "feedback-text correct";
    } else {
        feedbackEl.innerText = "Alternativa incorreta. " + currentQuiz.explanation;
        feedbackEl.className = "feedback-text wrong";
    }
}

// Lógica de Validação Estável para o Formulário de Contato
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

    // Conferência do Email com Regex seguro sem quebra de compilação
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email.value.trim())) {
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

    // Exibição do Alerta de Sucesso
    if (isFormValid) {
        successBox.classList.remove("hide");
        this.reset();
        setTimeout(() => {
            successBox.classList.add("hide");
        }, 5000);
    }
});

// Inicialização segura controlada por eventos estruturais do DOM
window.addEventListener("DOMContentLoaded", () => {
    runQuizSystem();
});
