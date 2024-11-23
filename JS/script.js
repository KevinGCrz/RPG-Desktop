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

document.addEventListener("DOMContentLoaded", () => {
    let rodada = 1; // Número da rodada
    const btnSortear = document.querySelector(".monstros-select .btn-monstro");
    const resultadoContainer = document.querySelector(".monstros-select .monstro-resultado");
    const imgInicial = document.querySelector(".monstros-select img");

    const monstrosOriginais  = [
        {
            nome: "Lobos Selvagens",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Uma horda de 3 lobos, cada um com dois pontos de vida",
            coracoes: 6
        },
        {
            nome: "Iguana gigante",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Uma enorme e furiosa",
            coracoes: 4
        },
        {
            nome: "3 Goblins saqueadores",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Uma horda de 3 goblis, cada um com um ponto de vida",
            coracoes: 3
        },
        {
            nome: "Ciclope furioso",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Possesso e carregando um enorme tronco que usa de porrete",
            coracoes: 5
        },
        {
            nome: "2 Hienas demoniacas",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Uma horda de 2 hienas, cada um com três pontos de vida",
            coracoes: 6
        },
        {
            nome: "Urso de guerra zumbi",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Irrefreavel e morrendo de fome",
            coracoes: 6
        },
        {
            nome: "4 Esqueletos de piratas",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Uma horda de 4 esqueletos, cada um com um ponto de vida",
            coracoes: 4
        },
        {
            nome: "Homem morcego selvagem",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Cego mas com uma aldição absurda",
            coracoes: 5
        },
        {
            nome: "3 Nativos canibais",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Uma horda de 3 canibais, cada um com dois pontos de vida",
            coracoes: 6
        },
        {
            nome: "Sapo touro gigante",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Super resistente e carnivoro",
            coracoes: 7
        },
        {
            nome: "5 Espectros dos afogados",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Uma horda de 5 fantasmas, cada um com um ponto de vida",
            coracoes: 5
        },
        {
            nome: "Pantera de duas cabeças",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Duplamente com fome",
            coracoes: 5
        },
        {
            nome: "3 Aranhas gigantes",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Uma horda de 3 aranhas, cada um com dois pontos de vida",
            coracoes: 6
        },
        {
            nome: "Berserker zumbi",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Movido pela raiva de todos que matou na guerra arcana",
            coracoes: 7
        },
        {
            nome: "Ratazana demoniaca",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Voraz e frenética",
            coracoes: 5
        },
        {
            nome: "Hidra de três cabeças",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Uma criatura sinistra, cada cabeça com dois pontos de vida",
            coracoes: 6
        },
        {
            nome: "Golem elemental",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Guardião ancestral da arena",
            coracoes: 5
        },
        {
            nome: "Carangueijo colosso",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Criatura ancestral tão velha quanto a ilha",
            coracoes: 6
        },
        {
            nome: "Urso tubarão",
            imagem: "./IMAGES/prop-monster.png",
            desc:"A brutalidade das duas criaturas",
            coracoes: 4
        },
        {
            nome: "Serpente do submundo",
            imagem: "./IMAGES/prop-monster.png",
            desc:"Diretamente de uma dimensão obscura e sombria",
            coracoes: 7
        }
    ];

    let monstrosDisponiveis = [...monstrosOriginais];

    btnSortear.addEventListener("click", () => {
        // Verifica se ainda há monstros disponíveis
        if (monstrosDisponiveis.length === 0) {
            resultadoContainer.innerHTML = `
                <p>Todos os monstros já foram sorteados!</p>
                <p>Reinicie o jogo para jogar novamente.</p>
            `;
            return;
        }

        // Sorteia um monstro aleatório
        const indiceSorteado = Math.floor(Math.random() * monstrosDisponiveis.length);
        const monstroSorteado = monstrosDisponiveis[indiceSorteado];

        // Remove o monstro sorteado da lista de disponíveis
        monstrosDisponiveis.splice(indiceSorteado, 1);

        // Oculta a imagem inicial
        imgInicial.style.display = "none";

        // Gera os corações clicáveis
        const coracoesHTML = Array(monstroSorteado.coracoes)
            .fill("❤")
            .map(
                (_, index) =>
                    `<button class="vida" data-index="${index}" >❤</button>`
            )
            .join("");

        // Atualiza o HTML para exibir o monstro sorteado
        resultadoContainer.innerHTML = `
            <p>Rodada do Monstro: ${rodada}</p>
            <img src="${monstroSorteado.imagem}" alt="${monstroSorteado.nome}" />
            <h1>${monstroSorteado.nome}</h1>
            <p>${monstroSorteado.desc}</p>
            <div class="vidas">${coracoesHTML}</div>
        `;

        // Adiciona funcionalidade aos botões de vida
        const botoesVida = document.querySelectorAll(".vida");
        botoesVida.forEach((botao) => {
            botao.addEventListener("click", () => {
                botao.textContent = botao.textContent === "❤" ? "💀" : "❤";
            });
        });

        // Incrementa o número da rodada
        rodada++;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btnEntregar = document.querySelector(".alteradores .btn-destino");
    const cartasDestinoViradas = document.querySelector(".cartas-destino-viradas");
    const alteradores = document.querySelector(".alteradores");

    // Lista de cartas disponíveis
    const cartas = [
        "./IMAGES/CartasDestino/Carta01.jpg",
        "./IMAGES/CartasDestino/Carta02.jpg",
        "./IMAGES/CartasDestino/Carta03.jpg",
        "./IMAGES/CartasDestino/Carta04.jpg",
        "./IMAGES/CartasDestino/Carta05.jpg",
        "./IMAGES/CartasDestino/Carta06.jpg",
        "./IMAGES/CartasDestino/Carta07.jpg",
        "./IMAGES/CartasDestino/Carta08.jpg",
        "./IMAGES/CartasDestino/Carta09.jpg",
        "./IMAGES/CartasDestino/Carta10.jpg",
        "./IMAGES/CartasDestino/Carta11.jpg",
        "./IMAGES/CartasDestino/Carta12.jpg",
        "./IMAGES/CartasDestino/Carta13.jpg",
        "./IMAGES/CartasDestino/Carta14.jpg",
        "./IMAGES/CartasDestino/Carta15.jpg",
        "./IMAGES/CartasDestino/Carta16.jpg",
        "./IMAGES/CartasDestino/Carta17.jpg",
        "./IMAGES/CartasDestino/Carta18.jpg",
        "./IMAGES/CartasDestino/Carta19.jpg",
        "./IMAGES/CartasDestino/Carta20.jpg",
    ];

    // Limite de cartas viradas
    const maxCartas = 9;
    let cartasViradas = 0;

    btnEntregar.addEventListener("click", () => {
        // Verifica se atingiu o limite de cartas
        if (cartasViradas >= maxCartas) {
            alert("Você já entregou todas as cartas ao destino!");
            return;
        }

        // Verifica se ainda há cartas disponíveis
        if (cartas.length === 0) {
            alert("Não há mais cartas disponíveis para sortear!");
            return;
        }

        // Remove a imagem inicial se for a primeira carta
        if (cartasViradas === 0) {
            cartasDestinoViradas.innerHTML = ""; // Limpa a div
        }

        // Sorteia uma carta aleatória
        const indiceSorteado = Math.floor(Math.random() * cartas.length);
        const cartaSorteada = cartas[indiceSorteado];

        // Remove a carta sorteada da lista
        cartas.splice(indiceSorteado, 1);

        // Exibe a carta sorteada na div "alteradores"
        alteradores.innerHTML = `
            <h1>Cartas do destino ao jogo</h1>
            <img src="${cartaSorteada}" alt="Carta sorteada">
            <button class="btn-destino">ENTREGAR AO DESTINO</button>
        `;

        // Adiciona a carta ao layout "cartas-destino-viradas"
        const cartaElement = document.createElement("img");
        cartaElement.src = cartaSorteada;
        cartaElement.alt = "Carta do destino";
        cartaElement.style.margin = "5px"; // Ajuste de espaçamento
        cartasDestinoViradas.appendChild(cartaElement);

        // Incrementa o número de cartas viradas
        cartasViradas++;

        // Atualiza a funcionalidade do botão para continuar sorteando
        const btnNovo = alteradores.querySelector(".btn-destino");
        btnNovo.addEventListener("click", () => btnEntregar.click());
    });
});







