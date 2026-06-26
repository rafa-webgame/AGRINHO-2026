document.addEventListener("DOMContentLoaded", () => {
    // 1. Rolagem suave para os links do menu de navegação
    const linksDoMenu = document.querySelectorAll("nav a");

    linksDoMenu.forEach(link => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede o salto brusco padrão
            
            const idAlvo = link.getAttribute("href");
            const secaoAlvo = document.querySelector(idAlvo);

            if (secaoAlvo) {
                secaoAlvo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 2. Interação do Botão "Saiba Mais" do Banner
    const botaoSaibaMais = document.querySelector(".banner button");
    const secaoSustentabilidade = document.querySelector("#sustentabilidade");

    if (botaoSaibaMais && secaoSustentabilidade) {
        botaoSaibaMais.addEventListener("click", () => {
            secaoSustentabilidade.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    // 3. Envio do Formulário de Contato
    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Impede a página de recarregar

            // Captura os dados digitados
            const nome = formulario.querySelector('input[type="text"]').value;
            const mensagem = formulario.querySelector('textarea').value;

            // Simula o envio bem-sucedido
            alert(`Obrigado pelo contato, ${nome}! Sua mensagem foi enviada com sucesso.`);
            
            // Limpa o formulário
            formulario.reset();
        });
    }
});
