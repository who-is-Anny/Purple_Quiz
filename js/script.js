const perguntas = [
    {
        categoria: "ASTRONOMIA",
        pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
        alternativas: ["Vênus", "Marte", "Júpiter", "Mercúrio"],
        respostaCorreta: 1,
        explicacao: "Marte tem uma aparência avermelhada devido aos óxidos de ferro presentes em sua superfície."
    },
    {
        categoria: "CIÊNCIA",
        pergunta: "Qual é o maior órgão do corpo humano?",
        alternativas: ["Coração", "Fígado", "Pele", "Pulmão"],
        respostaCorreta: 2,
        explicacao: "A pele é o maior órgão do corpo humano e ajuda a proteger o organismo."
    },
    {
        categoria: "GEOGRAFIA",
        pergunta: "Qual é a capital do Japão?",
        alternativas: ["Pequim", "Seul", "Bangkok", "Tóquio"],
        respostaCorreta: 3,
        explicacao: "Tóquio é a capital do Japão e uma das maiores áreas metropolitanas do mundo."
    },
    {
        categoria: "TECNOLOGIA",
        pergunta: "Qual linguagem é usada para adicionar interatividade às páginas web?",
        alternativas: ["JavaScript", "HTML", "SQL", "CSS"],
        respostaCorreta: 0,
        explicacao: "JavaScript permite responder a cliques, alterar o DOM e criar interações dinâmicas."
    },
    {
        categoria: "NATUREZA",
        pergunta: "Qual destes animais é um mamífero?",
        alternativas: ["Tubarão", "Golfinho", "Polvo", "Pinguim"],
        respostaCorreta: 1,
        explicacao: "O golfinho é um mamífero: respira por pulmões, é de sangue quente e amamenta seus filhotes."
    },
    {
        categoria: "CURIOSIDADES",
        pergunta: "Quantas cores são tradicionalmente associadas ao arco-íris?",
        alternativas: ["Cinco", "Seis", "Sete", "Oito"],
        respostaCorreta: 2,
        explicacao: "Tradicionalmente, identificamos sete cores no arco-íris: vermelho, laranja, amarelo, verde, azul, anil e violeta."
    },
    {
        categoria: "LITERATURA",
        pergunta: "Quem escreveu o livro 'O Pequeno Príncipe'?",
        alternativas: [
            "J. R. R. Tolkien",
            "Antoine de Saint-Exupéry",
            "Monteiro Lobato",
            "Lewis Carroll"
        ],
        respostaCorreta: 1,
        explicacao: "Antoine de Saint-Exupéry escreveu e ilustrou O Pequeno Príncipe, publicado em 1943."
    },
    {
        categoria: "MATEMÁTICA",
        pergunta: "Quanto é 12 × 8?",
        alternativas: ["84", "88", "92", "96"],
        respostaCorreta: 3,
        explicacao: "12 multiplicado por 8 é igual a 96."
    }
];

// Elementos do DOM
const telaQuiz = document.getElementById("telaQuiz");
const telaResultado = document.getElementById("telaResultado");

const numeroPergunta = document.getElementById("numeroPergunta");
const textoProgresso = document.getElementById("textoProgresso");
const barraProgresso = document.getElementById("barraProgresso");
const barraContainer = document.getElementById("barraContainer");

const categoriaEl = document.getElementById("categoria");
const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");

const feedbackEl = document.getElementById("feedback");
const feedbackIcone = document.getElementById("feedbackIcone");
const feedbackTitulo = document.getElementById("feedbackTitulo");
const feedbackTexto = document.getElementById("feedbackTexto");

const botaoProximo = document.getElementById("botaoProximo");
const botaoReiniciar = document.getElementById("botaoReiniciar");

// Estado do jogo
let indiceAtual = 0;
let pontuacao = 0;
let respondida = false;

// Letras utilizadas nas alternativas
const letras = ["A", "B", "C", "D"];

// Renderiza a pergunta atual.
function mostrarPergunta() {
    const perguntaAtual = perguntas[indiceAtual];

    respondida = false;

    // Atualiza o conteúdo da pergunta
    categoriaEl.textContent = perguntaAtual.categoria;
    perguntaEl.textContent = perguntaAtual.pergunta;

    // Atualiza o indicador de progresso
    const numero = indiceAtual + 1;
    const porcentagem = Math.round(
        (indiceAtual / perguntas.length) * 100
    );

    numeroPergunta.textContent =
        `PERGUNTA ${String(numero).padStart(2, "0")} DE ${String(perguntas.length).padStart(2, "0")}`;

    textoProgresso.textContent = `${porcentagem}% concluído`;
    barraProgresso.style.width = `${porcentagem}%`;
    barraContainer.setAttribute("aria-valuenow", porcentagem);

    // Limpa as alternativas anteriores
    alternativasEl.replaceChildren();

    // Esconde o feedback anterior
    feedbackEl.hidden = true;
    feedbackEl.className = "feedback";

    // Cria os botões das alternativas
    perguntaAtual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa";

        const letra = document.createElement("span");
        letra.className = "letra-alternativa";
        letra.textContent = letras[indice];

        const texto = document.createElement("span");
        texto.className = "texto-alternativa";
        texto.textContent = alternativa;

        const simbolo = document.createElement("span");
        simbolo.className = "simbolo-alternativa";
        simbolo.setAttribute("aria-hidden", "true");

        botao.append(letra, texto, simbolo);

        // Evento de clique para verificar a resposta
        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        alternativasEl.appendChild(botao);
    });

    botaoProximo.disabled = true;
    botaoProximo.innerHTML = indiceAtual === perguntas.length - 1
        ? 'Ver resultado <span>✦</span>'
        : 'Próxima <span>→</span>';
}

// Verifica a resposta selecionada.
function verificarResposta(indiceEscolhido, botaoEscolhido) {
    // Impede pontuação duplicada na mesma pergunta
    if (respondida) return;

    respondida = true;

    const perguntaAtual = perguntas[indiceAtual];
    const acertou = indiceEscolhido === perguntaAtual.respostaCorreta;

    // Bloqueia todos os botões após a escolha
    const botoes = alternativasEl.querySelectorAll(".alternativa");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    const botaoCorreto = botoes[perguntaAtual.respostaCorreta];
    const simboloCorreto = botaoCorreto.querySelector(
        ".simbolo-alternativa"
    );

    // Destaca a resposta correta
    botaoCorreto.classList.add("correta");
    simboloCorreto.textContent = "✓";

    if (acertou) {
        pontuacao++;

        feedbackEl.classList.add("certo");
        feedbackIcone.textContent = "✨";
        feedbackTitulo.textContent = "Isso aí! Você acertou!";
    } else {
        botaoEscolhido.classList.add("errada");

        botaoEscolhido.querySelector(
            ".simbolo-alternativa"
        ).textContent = "×";

        feedbackEl.classList.add("errado");
        feedbackIcone.textContent = "💜";
        feedbackTitulo.textContent = "Quase! Continue tentando.";
    }

    // Explica a resposta para incentivar o aprendizado
    feedbackTexto.textContent = perguntaAtual.explicacao;
    feedbackEl.hidden = false;

    // Permite avançar somente depois de responder
    botaoProximo.disabled = false;
}

// Avança para a próxima pergunta ou finaliza o jogo.
function proximaPergunta() {
    if (!respondida) return;

    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

// Calcula e exibe o resultado final.
function finalizarQuiz() {
    telaQuiz.hidden = true;
    telaResultado.hidden = false;

    const total = perguntas.length;
    const erros = total - pontuacao;
    const desempenho = Math.round((pontuacao / total) * 100);

    document.getElementById("pontuacaoFinal").textContent = pontuacao;
    document.getElementById("pontuacaoMaxima").textContent = total;

    document.getElementById("acertosFinais").textContent = pontuacao;
    document.getElementById("errosFinais").textContent = erros;

    document.getElementById("porcentagemFinal").textContent =
        `${desempenho}%`;

    document.getElementById("barraFinal").style.width =
        `${desempenho}%`;

    const icone = document.getElementById("iconeResultado");
    const titulo = document.getElementById("tituloResultado");
    const mensagem = document.getElementById("mensagemResultado");
    const frase = document.getElementById("fraseFinal");

    // Mensagens personalizadas conforme o desempenho
    if (desempenho === 100) {
        icone.textContent = "👑";
        titulo.textContent = "Perfeição absoluta!";
        mensagem.textContent =
            "Você acertou tudo! Sua curiosidade e seu conhecimento estão brilhando.";
        frase.textContent =
            "A coroa é sua. Que tal tentar de novo e manter esse nível?";
    } else if (desempenho >= 75) {
        icone.textContent = "🏆";
        titulo.textContent = "Você arrasou!";
        mensagem.textContent =
            "Um resultado incrível! Você mostrou que sabe muito mais do que imagina.";
        frase.textContent =
            "Continue assim. Seu conhecimento merece ir ainda mais longe!";
    } else if (desempenho >= 50) {
        icone.textContent = "🌟";
        titulo.textContent = "Você está brilhando!";
        mensagem.textContent =
            "Você foi muito bem! Cada pergunta é uma chance de descobrir algo novo.";
        frase.textContent =
            "Mais uma rodada pode transformar esses acertos em um recorde!";
    } else {
        icone.textContent = "🌱";
        titulo.textContent = "Sua jornada começou!";
        mensagem.textContent =
            "O importante é aprender. Agora você já sabe um pouco mais do que antes.";
        frase.textContent =
            "Respire fundo, confie em você e tente novamente. Você consegue!";
    }
}

// Reinicia todas as variáveis e inicia uma nova rodada.
function reiniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;
    respondida = false;

    telaResultado.hidden = true;
    telaQuiz.hidden = false;

    document.getElementById("barraFinal").style.width = "0%";

    mostrarPergunta();
}

// Eventos dos botões de navegação
botaoProximo.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", reiniciarQuiz);

// Inicia o quiz ao abrir a página
mostrarPergunta();