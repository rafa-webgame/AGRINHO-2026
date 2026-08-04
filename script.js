// Banco de Dados Limpo do Simulador e Quiz do Agrinho 2026
const quizData = [
    {
        question: "Qual técnica sustentável adota o plantio direto sobre a biomassa protetora da colheita anterior, combatendo severamente a erosão?",
        options: [
            "Queimada controlada tradicional",
            "Sistema de Plantio Direto Consolidade",
            "Aração profunda contínua do solo",
            "Fertilização química de alta solubilidade"
        ],
        correct: 1,
        explanation: "O Plantio Direto protege a integridade microbiológica do solo, retém a umidade de forma natural e sequestra gás carbônico na matéria orgânica!"
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

// Validação Interativa do Formulário de Contato (Sem quebras de compilação)
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

    // Conferência Sintática do Email via Expressão Regular Padrão RFC
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    // Exibição de Alerta de Transmissão de Sucesso
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
