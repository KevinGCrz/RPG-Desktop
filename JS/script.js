document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('.jogador-char');
    const statusSelectedDiv = document.querySelector('.status-selecionado');
    const rollButton = document.querySelector('.btn-dado'); // Botão "RODAR A SORTE"
    const clearButton = document.querySelector('.btn-limpar'); // Botão "Limpar resultado"
    const currentClassTitleDisplay = document.querySelector('.acoes-jogadores h1:nth-of-type(1)'); // "A vez de..."
    const diceNumberDisplay = document.querySelector('.acoes-jogadores h1:nth-of-type(2)'); // Número do dado
    const resultParagraph = document.querySelector('.acoes-jogadores p');
    const statsButtons = statusSelectedDiv.querySelectorAll('.btn-stats-select');
    
    const pontosVida = document.querySelectorAll('.pontos-vida p');
    
    // Função para alternar entre os emojis
    pontosVida.forEach(ponto => {
        ponto.addEventListener('click', () => {
            if (ponto.classList.contains('heart')) {
                ponto.classList.remove('heart');
                ponto.classList.add('skull');  // Troca para a classe "skull"
                ponto.textContent = '💀';      // Altera para o emoji de caveira
            } else {
                ponto.classList.remove('skull');
                ponto.classList.add('heart');  // Troca para a classe "heart"
                ponto.textContent = '❤';      // Altera para o emoji de coração
            }
        });
    });

    let selectedStatus = null;
    let currentClassTitle = "";

    // Seleção de qual status será usado para o teste
    statsButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            statsButtons.forEach(button => button.classList.remove('selected'));
            btn.classList.add('selected');
            selectedStatus = index; // 0 = Força, 1 = Agilidade, 2 = Percepção
        });
    });

    // Transferir status do jogador atual para a interface de seleção
    players.forEach(player => {
        const turnoButton = player.querySelector('.rodada-stats button');
        turnoButton.addEventListener('click', () => {
            const stats = player.querySelectorAll('.status input');
            const title = player.querySelector('h1');
            const rodadaInput = player.querySelector('.rodada-stats input');

            // Atualiza os valores nos botões de status
            statsButtons[0].textContent = stats[0].value || 0; // Força
            statsButtons[1].textContent = stats[1].value || 0; // Agilidade
            statsButtons[2].textContent = stats[2].value || 0; // Percepção

            // Atualiza o título da classe atual
            currentClassTitle = title.textContent;

            // Atualiza a exibição no título da vez
            currentClassTitleDisplay.textContent = `A vez de ${currentClassTitle} testar sua sorte`;

            // Incrementa o número no input "Rodada N°"
            rodadaInput.value = parseInt(rodadaInput.value || 0, 10) + 1;

            // Limpa os resultados da rodada anterior
            diceNumberDisplay.textContent = "?"; // Limpa o número do dado
            resultParagraph.textContent = ""; // Limpa o resultado

            // Resetar seleção de status
            selectedStatus = null;
            statsButtons.forEach(button => button.classList.remove('selected'));
        });
    });

    // Lógica para rodar o dado e calcular o resultado
    rollButton.addEventListener('click', () => {
        if (selectedStatus === null) {
            resultParagraph.textContent = "Por favor, selecione um status para o teste.";
            return;
        }

        const randomRoll = Math.floor(Math.random() * 20) + 1; // Número entre 1 e 20
        const statusValue = parseInt(statsButtons[selectedStatus].textContent, 10) || 0;
        const total = randomRoll + statusValue;

        // Atualiza o número do dado na interface
        diceNumberDisplay.textContent = `${randomRoll}`;
        
        // Exibe o resultado
        resultParagraph.innerHTML = `
            Número sorteado: ${randomRoll}, Soma: ${total}. 
        `;
        if (total >= 25) {
            resultParagraph.innerHTML += "Ação bem sucedida!";
        } else {
            resultParagraph.innerHTML += "Ação falhou!";
        }
    });

    // Lógica para limpar os resultados
    clearButton.addEventListener('click', () => {
        diceNumberDisplay.textContent = "";
        resultParagraph.textContent = "";
        statsButtons.forEach(button => button.classList.remove('selected'));
        selectedStatus = null;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const dragIcon = document.getElementById('drag-icon');
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    // Inicia o arraste
    dragIcon.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - dragIcon.offsetLeft;
        offsetY = e.clientY - dragIcon.offsetTop;
        dragIcon.style.cursor = 'grabbing';
    });

    // Move o ícone
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            dragIcon.style.left = `${e.clientX - offsetX}px`;
            dragIcon.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // Finaliza o arraste
    document.addEventListener('mouseup', () => {
        isDragging = false;
        dragIcon.style.cursor = 'grab';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".toggle-visibility");

    // Inicializa todos os jogadores no estado minimizado
    const jogadores = document.querySelectorAll(".jogador-char");
    jogadores.forEach(jogador => {
        const nomeClasse = jogador.querySelector("h1").textContent;
        jogador.classList.add("minimized");
        const button = jogador.querySelector(".toggle-visibility");
        button.textContent = nomeClasse; // Exibe o nome da classe no botão
    });

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const jogadorChar = button.closest(".jogador-char");
            const className = jogadorChar.querySelector("h1").textContent; // Obtém o nome da classe
            
            // Alterna a classe 'minimized'
            jogadorChar.classList.toggle("minimized");
            
            // Atualiza o texto do botão
            if (jogadorChar.classList.contains("minimized")) {
                button.textContent = className; // Define o nome da classe no botão
            } else {
                button.textContent = "Minimizar"; // Retorna ao texto padrão
            }
        });
    });
});







