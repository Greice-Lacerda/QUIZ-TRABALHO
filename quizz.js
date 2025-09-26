// Variáveis para controlar o estado do jogo
let perguntaAtualIndex = 0;
let pontuacao = 0;
let perguntasDaRodada = [];

// BANCO COMPLETO DE PERGUNTAS (20 no total)
const bancoDePerguntasCompleto = [
    // ... seu banco de 20 perguntas continua aqui, sem alterações ...
    { pergunta: "Qual foi o primeiro videogame da história, criado em 1958?", alternativas: ["A) Pong", "B) Spacewar!", "C) Tennis for Two"], respostaCorreta: 2 },
    { pergunta: "Qual destes jogos é consistentemente um dos mais jogados no mundo, famoso por seus blocos e criatividade sem limites?", alternativas: ["A) Minecraft", "B) Among Us", "C) Candy Crush"], respostaCorreta: 0 },
    { pergunta: "A palavra 'robô' apareceu pela primeira vez em uma peça de teatro. O que ela significava originalmente?", alternativas: ["A) Trabalhador forçado", "B) Mente de metal", "C) Amigo elétrico"], respostaCorreta: 0 },
    { pergunta: "Qual foi o primeiro robô industrial, que trabalhava em uma fábrica de carros nos anos 60?", alternativas: ["A) R2-D2", "B) Unimate", "C) Wall-E"], respostaCorreta: 1 },
    { pergunta: "Qual destas tarefas uma Inteligência Artificial, como a Alexa ou o Google Assistente, consegue fazer?", alternativas: ["A) Amarrar seu sapato", "B) Contar uma piada", "C) Fazer seu dever de casa por você"], respostaCorreta: 1 },
    { pergunta: "Em um videogame, o que é um 'NPC'?", alternativas: ["A) Um jogador muito poderoso", "B) Um personagem controlado pelo computador", "C) Um prêmio secreto no jogo"], respostaCorreta: 1 },
    { pergunta: "Qual empresa japonesa criou os famosos personagens Mario e Link (de Zelda)?", alternativas: ["A) Sony", "B) Sega", "C) Nintendo"], respostaCorreta: 2 },
    { pergunta: "O robô 'Curiosity', enviado para Marte pela NASA, tem qual principal objetivo?", alternativas: ["A) Procurar por sinais de vida e estudar o planeta", "B) Construir uma base para humanos", "C) Coletar pedras para vender"], respostaCorreta: 0 },
    { pergunta: "O que é 'Machine Learning' (Aprendizado de Máquina)?", alternativas: ["A) Um robô que aprende a consertar máquinas", "B) Um tipo de IA que aprende com dados, sem ser programada para cada tarefa", "C) Um curso online para aprender a programar"], respostaCorreta: 1 },
    { pergunta: "Qual destes NÃO é considerado um console de videogame?", alternativas: ["A) PlayStation 5", "B) Xbox Series X", "C) Amazon Echo"], respostaCorreta: 2 },
    { pergunta: "Os robôs aspiradores de pó usam sensores para:", alternativas: ["A) Ouvir música enquanto limpam", "B) Mapear a casa e desviar de obstáculos", "C) Conversar com os donos da casa"], respostaCorreta: 1 },
    { pergunta: "Em jogos online, o que significa a sigla 'GG'?", alternativas: ["A) 'Get Good' (Fique Bom)", "B) 'Good Game' (Bom Jogo)", "C) 'Go Go' (Vai Vai)"], respostaCorreta: 1 },
    { pergunta: "Qual o nome da famosa IA da série de filmes 'O Exterminador do Futuro'?", alternativas: ["A) Skynet", "B) HAL 9000", "C) Jarvis"], respostaCorreta: 0 },
    { pergunta: "O que é um 'bug' no contexto de jogos e software?", alternativas: ["A) Um personagem secreto em forma de inseto", "B) Uma falha ou erro no código do programa", "C) Um item que dá superpoderes"], respostaCorreta: 1 },
    { pergunta: "Como uma IA em um jogo de xadrez decide sua próxima jogada?", alternativas: ["A) Sorteando uma peça aleatória", "B) Lendo a mente do jogador", "C) Calculando milhões de jogadas possíveis"], respostaCorreta: 2 },
    { pergunta: "Qual robô dos filmes 'Star Wars' é um 'droide de protocolo' fluente em mais de seis milhões de formas de comunicação?", alternativas: ["A) BB-8", "B) R2-D2", "C) C-3PO"], respostaCorreta: 2 },
    { pergunta: "O que é 'Realidade Virtual' (VR)?", alternativas: ["A) Assistir a vídeos em uma TV muito grande", "B) Uma tecnologia que cria um ambiente digital imersivo com o uso de óculos especiais", "C) Conversar com robôs por texto"], respostaCorreta: 1 },
    { pergunta: "Qual o objetivo principal do Teste de Turing, relacionado à IA?", alternativas: ["A) Verificar se um computador consegue vencer um humano em um jogo", "B) Testar a velocidade de processamento de uma máquina", "C) Avaliar se uma máquina consegue se passar por um humano em uma conversa"], respostaCorreta: 2 },
    { pergunta: "Qual o nome do primeiro jogo de grande sucesso comercial, lançado pela Atari em 1972?", alternativas: ["A) Donkey Kong", "B) Space Invaders", "C) Pong"], respostaCorreta: 2 },
    { pergunta: "Robôs usados em cirurgias médicas ajudam os médicos a:", alternativas: ["A) Realizar operações com maior precisão", "B) Decidir qual o diagnóstico do paciente", "C) Conversar com a família do paciente"], respostaCorreta: 0 }
];

function iniciarNovoJogo() {
    perguntaAtualIndex = 0;
    pontuacao = 0;
    document.getElementById('progresso-container').style.display = 'block';
    const perguntasEmbaralhadas = [...bancoDePerguntasCompleto];
    for (let i = perguntasEmbaralhadas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [perguntasEmbaralhadas[i], perguntasEmbaralhadas[j]] = [perguntasEmbaralhadas[j], perguntasEmbaralhadas[i]];
    }
    perguntasDaRodada = perguntasEmbaralhadas.slice(0, 10);
    mostrarPergunta();
}

function mostrarPergunta() {
    atualizarBarraDeProgresso();
    const perguntaAtual = perguntasDaRodada[perguntaAtualIndex];
    document.getElementById('pergunta').innerText = perguntaAtual.pergunta;
    const alternativasContainer = document.getElementById('alternativas');
    alternativasContainer.innerHTML = '';
    perguntaAtual.alternativas.forEach((alt, index) => {
        const botao = document.createElement('button');
        botao.innerText = alt;
        botao.onclick = () => verificarResposta(index);
        alternativasContainer.appendChild(botao);
    });
}

function atualizarBarraDeProgresso() {
    const totalPerguntas = perguntasDaRodada.length;
    const porcentagem = ((perguntaAtualIndex + 1) / totalPerguntas) * 100;
    document.getElementById('barra-progresso').style.width = `${porcentagem}%`;
    document.getElementById('progresso-texto').innerText = `Pergunta ${perguntaAtualIndex + 1} de ${totalPerguntas}`;
}

function verificarResposta(indexSelecionado) {
    document.querySelectorAll('#alternativas button').forEach(button => button.disabled = true);
    const perguntaAtual = perguntasDaRodada[perguntaAtualIndex];
    if (indexSelecionado === perguntaAtual.respostaCorreta) {
        pontuacao++;
        document.getElementById('somAcerto').play();
        mostrarModal("Você acertou!");
    } else {
        document.getElementById('somErro').play();
        const msgErro = `Errado! A resposta correta era: ${perguntaAtual.alternativas[perguntaAtual.respostaCorreta]}`;
        mostrarModal(msgErro);
    }
}

/**
 * AJUSTADO: Função do modal agora fecha automaticamente após 5 segundos.
 */
function mostrarModal(mensagem) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTexto = document.getElementById('modal-texto');

    modalTexto.innerText = mensagem;
    modalOverlay.classList.remove('hidden'); // Mostra o modal

    // Define um temporizador para fechar o modal e avançar
    setTimeout(() => {
        modalOverlay.classList.add('hidden'); // Esconde o modal
        proximaPergunta(); // Chama a próxima pergunta
    }, 5000); // 5000 milissegundos = 5 segundos
}

function proximaPergunta() {
    perguntaAtualIndex++;
    if (perguntaAtualIndex < perguntasDaRodada.length) {
        mostrarPergunta();
    } else {
        // Um pequeno delay antes de mostrar a tela final para dar tempo do modal sumir completamente
        setTimeout(mostrarTelaFinal, 200);
    }
}

function mostrarTelaFinal() {
    document.getElementById('progresso-container').style.display = 'none';
    const totalPerguntas = perguntasDaRodada.length;
    const porcentagemAcertos = Math.round((pontuacao / totalPerguntas) * 100);
    let mensagemFinalHTML = '';
    
    if (porcentagemAcertos >= 50) {
        document.getElementById('somAcerto').play();
        mensagemFinalHTML = `<img src="./Trofeu.png" alt="Troféu de Vencedor" class="imagem-final"><h4>Parabéns! Você acertou ${porcentagemAcertos}% das perguntas!</h4><p>Você é um verdadeiro expert digital!</p>`;
        setTimeout(dispararConfetes, 100);
    } else {
        const somPesar = document.getElementById('somPesar') || document.getElementById('somErro');
        somPena2.play();
        mensagemFinalHTML = `<h2>Não foi desta vez... 😢</h2><p>Você acertou ${porcentagemAcertos}% das perguntas.</p><p>Continue estudando e tente novamente!</p>`;
    }

    document.getElementById('pergunta').innerHTML = mensagemFinalHTML;
    document.getElementById('alternativas').innerHTML = `<button onclick="reiniciarQuizz()">Jogar Novamente</button>`;
}

function dispararConfetes() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) { return clearInterval(interval); }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}

function reiniciarQuizz() {
    iniciarNovoJogo();
}

window.onload = iniciarNovoJogo;