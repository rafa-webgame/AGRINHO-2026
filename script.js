/* =========================================================
   AGRINHO 2026 — script.js
   Menu, tema, animações, quiz, calculadora, simulador e contato
========================================================= */

/* ---------- MENU MOBILE ---------- */
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');

hamburger.addEventListener('click', () => navList.classList.toggle('active'));
navList.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navList.classList.remove('active'))
);

/* ---------- TEMA CLARO / ESCURO ---------- */
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  themeToggle.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

/* ---------- HEADER + BOTÃO VOLTAR AO TOPO ---------- */
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('show', window.scrollY > 600);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- ANIMAÇÃO DE APARIÇÃO (SCROLL REVEAL) ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- CONTADORES ANIMADOS ---------- */
function animarContador(el) {
  const alvo = parseFloat(el.dataset.target);
  const decimais = parseInt(el.dataset.decimals || 0);
  const sufixo = el.dataset.suffix || '';
  const duracao = 2000;
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const suave = 1 - Math.pow(1 - progresso, 3); // easing
    el.textContent = (alvo * suave).toFixed(decimais).replace('.', ',') + sufixo;
    if (progresso < 1) requestAnimationFrame(passo);
  }
  requestAnimationFrame(passo);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animarContador(e.target); counterObserver.unobserve(e.target); }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ---------- ABAS DAS FERRAMENTAS ---------- */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

/* ================= QUIZ ================= */
const quizData = [
  { p: 'Segundo a Embrapa, qual porcentagem do território brasileiro é coberta por vegetação nativa?', o: ['Cerca de 25%', 'Cerca de 45%', 'Cerca de 66%', 'Cerca de 90%'], r: 2, e: 'Isso mesmo! A Embrapa Territorial aponta ~66% do país com vegetação nativa.' },
  { p: 'O que significa a sigla ILPF?', o: ['Irrigação, Lavragem, Poda e Fertilização', 'Integração Lavoura-Pecuária-Floresta', 'Índice de Lucro da Produção Familiar', 'Instituto Livre de Proteção Florestal'], r: 1, e: 'Correto! A ILPF soma lavoura, pecuária e floresta na mesma área: são 17,4 mi de hectares no Brasil.' },
  { p: 'Qual técnica planta sem revolver o solo, mantendo a palha na superfície?', o: ['Aração profunda', 'Queimada controlada', 'Monocultivo irrigado', 'Sistema Plantio Direto'], r: 3, e: 'Exato! O plantio direto cobre ~35 milhões de hectares e combate a erosão.' },
  { p: 'Qual é a participação das fontes renováveis na matriz energética brasileira?', o: ['Cerca de 10%, igual à média mundial', 'Cerca de 50%, o triplo da média mundial', 'Cerca de 20%', '100%'], r: 1, e: 'Isso! O Brasil tem ~50% de renováveis, enquanto a média mundial fica perto de 14%.' },
  { p: 'Quanto o agronegócio representou no PIB brasileiro em 2025 (Cepea/CNA)?', o: ['Cerca de 5%', 'Cerca de 10%', 'Cerca de 25%', 'Cerca de 60%'], r: 2, e: 'Correto: 25,13% — o agro é um quarto da economia do Brasil!' },
  { p: 'O Plano ABC+ prevê recuperar quantos hectares de pastagens degradadas até 2030?', o: ['30 milhões', '1 milhão', '500 mil', '100 milhões'], r: 0, e: 'Isso mesmo! Recuperar 30 mi de ha de pastagens é transformar problema em produção sustentável.' }
];

let qAtual = 0, qPontos = 0, qRespondida = false;
const quizProgress = document.getElementById('quizProgress');
const quizScore = document.getElementById('quizScore');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const quizNext = document.getElementById('quizNext');
const quizRestart = document.getElementById('quizRestart');

function renderPergunta() {
  qRespondida = false;
  const q = quizData[qAtual];
  quizProgress.textContent = `Pergunta ${qAtual + 1} de ${quizData.length}`;
  quizScore.textContent = `⭐ Pontos: ${qPontos}`;
  quizQuestion.textContent = q.p;
  quizFeedback.textContent = '';
  quizNext.disabled = true;
  quizNext.textContent = qAtual === quizData.length - 1 ? 'Ver resultado 🏁' : 'Próxima →';
  quizOptions.innerHTML = '';
  q.o.forEach((opcao, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opcao;
    btn.addEventListener('click', () => responder(i, btn));
    quizOptions.appendChild(btn);
  });
}

function responder(i, btn) {
  if (qRespondida) return;
  qRespondida = true;
  const q = quizData[qAtual];
  const botoes = quizOptions.querySelectorAll('.quiz-option');
  botoes.forEach(b => b.disabled = true);

  if (i === q.r) {
    btn.classList.add('correct');
    qPontos++;
    quizFeedback.textContent = '✅ ' + q.e;
    quizFeedback.style.color = 'var(--verde)';
  } else {
    btn.classList.add('wrong');
    botoes[q.r].classList.add('correct');
    quizFeedback.textContent = '❌ Não foi dessa vez. ' + q.e;
    quizFeedback.style.color = 'var(--vermelho)';
  }
  quizScore.textContent = `⭐ Pontos: ${qPontos}`;
  quizNext.disabled = false;
}

quizNext.addEventListener('click', () => {
  if (qAtual < quizData.length - 1) { qAtual++; renderPergunta(); }
  else finalizarQuiz();
});

function finalizarQuiz() {
  const total = quizData.length;
  let msg = '';
  if (qPontos === total) msg = '🏆 Perfeito! Você é um verdadeiro guardião do campo sustentável!';
  else if (qPontos >= total / 2) msg = '💪 Mandou bem! Continue explorando o site para gabaritar.';
  else msg = '🌱 Que tal reler as seções e tentar de novo? Aprender faz parte!';

  quizProgress.textContent = 'Quiz finalizado';
  quizQuestion.textContent = `🏁 Você fez ${qPontos} de ${total} pontos!`;
  quizOptions.innerHTML = '';
  quizFeedback.textContent = msg;
  quizFeedback.style.color = 'var(--texto)';
  quizNext.classList.add('hidden');
  quizRestart.classList.remove('hidden');
}

quizRestart.addEventListener('click', () => {
  qAtual = 0; qPontos = 0;
  quizNext.classList.remove('hidden');
  quizRestart.classList.add('hidden');
  renderPergunta();
});
renderPergunta();

/* ================= CALCULADORA DE CARBONO ================= */
document.getElementById('calcForm').addEventListener('submit', e => {
  e.preventDefault();
  const area = parseFloat(document.getElementById('calcArea').value);
  const fator = parseFloat(document.getElementById('calcPratica').value);
  const pratica = document.getElementById('calcPratica').selectedOptions[0].text.split(' (')[0];
  const resultado = document.getElementById('calcResult');

  if (!area || area <= 0) {
    resultado.innerHTML = '<h4>⚠️ Atenção</h4><p>Informe uma área válida maior que zero.</p>';
    resultado.classList.remove('hidden');
    return;
  }

  const toneladas = area * fator;
  const arvores = Math.round((toneladas * 1000) / 22);   // 1 árvore ≈ 22 kg CO₂/ano
  const carros = (toneladas / 1.7).toFixed(1);           // 1 carro ≈ 1,7 t CO₂/ano

  resultado.innerHTML = `
    <h4>🌳 Resultado da simulação — ${pratica}</h4>
    <ul>
      <li>🌍 Sequestro estimado: <strong>${toneladas.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} toneladas de CO₂e por ano</strong></li>
      <li>🌳 Equivale a cerca de <strong>${arvores.toLocaleString('pt-BR')} árvores adultas</strong> absorvendo CO₂</li>
      <li>🚗 Ou tirar <strong>${carros.replace('.', ',')} carros</strong> das ruas por ano</li>
    </ul>`;
  resultado.classList.remove('hidden');
});

/* ================= SIMULADOR SOLAR ================= */
const simSol = document.getElementById('simSol');
const simSolOut = document.getElementById('simSolOut');
simSol.addEventListener('input', () => {
  simSolOut.textContent = simSol.value.replace('.', ',') + ' h';
});

document.getElementById('simForm').addEventListener('submit', e => {
  e.preventDefault();
  const paineis = parseInt(document.getElementById('simPaineis').value);
  const sol = parseFloat(simSol.value);
  const resultado = document.getElementById('simResult');

  if (!paineis || paineis <= 0) {
    resultado.innerHTML = '<h4>⚠️ Atenção</h4><p>Informe ao menos 1 painel solar.</p>';
    resultado.classList.remove('hidden');
    return;
  }

  const diaria = paineis * 0.55 * sol * 0.85;      // kW × h × eficiência
  const mensal = diaria * 30;
  const economia = mensal * 0.90;                  // R$ por kWh
  const co2 = mensal * 0.074;                      // kg CO₂ evitados por kWh (fator Brasil)

  resultado.innerHTML = `
    <h4>☀️ Resultado da simulação solar</h4>
    <ul>
      <li>⚡ Geração diária: <strong>${diaria.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} kWh</strong></li>
      <li>🔋 Geração mensal: <strong>${mensal.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kWh</strong></li>
      <li>💰 Economia estimada: <strong>R$ ${economia.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}/mês</strong></li>
      <li>🌍 CO₂ evitado: <strong>${co2.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} kg/mês</strong></li>
    </ul>`;
  resultado.classList.remove('hidden');
});

/* ================= VALIDAÇÃO DO FORMULÁRIO DE CONTATO ================= */
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function marcarErro(input, elErro, msg) {
  input.classList.add('invalid');
  elErro.textContent = msg;
}
function limparErro(input, elErro) {
  input.classList.remove('invalid');
  elErro.textContent = '';
}

[nameInput, emailInput, messageInput].forEach(el =>
  el.addEventListener('input', () => limparErro(el, document.getElementById('error' + el.id.charAt(0).toUpperCase() + el.id.slice(1))))
);

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let valido = true;
  const erroNome = document.getElementById('errorName');
  const erroEmail = document.getElementById('errorEmail');
  const erroMsg = document.getElementById('errorMessage');

  // Nome
  if (nameInput.value.trim().length < 3) {
    marcarErro(nameInput, erroNome, 'Informe seu nome completo (mínimo 3 caracteres).');
    valido = false;
  } else limparErro(nameInput, erroNome);

  // E-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!regexEmail.test(emailInput.value.trim())) {
    marcarErro(emailInput, erroEmail, 'Digite um e-mail válido, ex.: voce@exemplo.com');
    valido = false;
  } else limparErro(emailInput, erroEmail);

  // Mensagem
  if (messageInput.value.trim().length < 10) {
    marcarErro(messageInput, erroMsg, 'Sua mensagem precisa ter pelo menos 10 caracteres.');
    valido = false;
  } else limparErro(messageInput, erroMsg);

  if (valido) {
    const sucesso = document.getElementById('formSuccess');
    sucesso.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => sucesso.classList.add('hidden'), 6000);
  }
});
