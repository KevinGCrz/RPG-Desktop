//-----------------------------------------------------D20 FUNCIONAL    
document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('.jogador-char');
    const statusSelectedDiv = document.querySelector('.status-selecionado');
    const rollButton = document.querySelector('.btn-dado'); // Botão "RODAR A SORTE"
    const clearButton = document.querySelector('.btn-limpar'); // Botão "Limpar resultado"
    const currentClassTitleDisplay = document.querySelector('.acoes-jogadores h1:nth-of-type(1)'); // "A vez de..."
    const diceNumberDisplay = document.querySelector('.acoes-jogadores .resultado-dado-space h1'); // Número do dado
    const resultParagraph = document.querySelector('.acoes-jogadores .result'); // Resultado do dado
    const statsButtons = statusSelectedDiv ? statusSelectedDiv.querySelectorAll('.btn-stats-select') : [];

    if (statsButtons.length === 0) {
        console.warn("Nenhum botão de status encontrado.");
    }

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
        if (turnoButton) {
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
        }
    });

    // Lógica para rodar o dado e calcular o resultado
    rollButton.addEventListener('click', () => {
        const resultSpace = document.querySelector('.resultado-dado-space');
        resultSpace.classList.add('rotate-fast'); // Ativa a rotação rápida do fundo

        // Aguarda a rotação acabar para exibir o resultado
        setTimeout(() => {
            if (selectedStatus === null) {
                resultParagraph.textContent = "Por favor, selecione um status para o teste.";
                return;
            }

            const randomRoll = Math.floor(Math.random() * 20) + 1; // Número entre 1 e 20
            const statusValue = parseInt(statsButtons[selectedStatus].textContent, 10) || 0;
            const total = randomRoll + statusValue;

            let resultadoExtra = "";

            // Atualiza o número do dado na interface
            diceNumberDisplay.textContent = `${randomRoll}`;
            
            // Exibe o resultado inicial
            resultParagraph.innerHTML = `Número sorteado: ${randomRoll}, Soma: ${total}.`;

            if (total >= 25) {
                resultParagraph.innerHTML += " Ação bem sucedida!";
                resultadoExtra = " Ação bem sucedida!";
            } else {
                resultParagraph.innerHTML += " Ação falhou!";
                resultadoExtra = " Ação falhou!";
            }

            // Aplica as mensagens adicionais baseadas no resultado e adiciona classes
            let extraMessage = "";
            resultParagraph.classList.remove("result-dado-acertoCritico", "result-dado-acerto", "result-dado-falha", "result-dado-falhaCritica");

            if (resultadoExtra == " Ação bem sucedida!" && randomRoll == 20) {
                extraMessage = "Você atingiu o critico, jogue outra vez!";
                resultParagraph.classList.add("result-dado-acertoCritico");

            } else if (resultadoExtra == " Ação bem sucedida!" && randomRoll < 20) {
                extraMessage = "Você acertou!";
                resultParagraph.classList.add("result-dado-acerto");

            } else if (resultadoExtra == " Ação falhou!" && randomRoll >= 6) {
                extraMessage = "Você falhou na sua ação.";
                resultParagraph.classList.add("result-dado-falha");

            } else if (resultadoExtra == " Ação falhou!" && randomRoll <= 5) {
                extraMessage = "-1 ponto de vida.";
                resultParagraph.classList.add("result-dado-falhaCritica");
            }

            // Adiciona a mensagem extra abaixo do resultado
            if (extraMessage) {
                resultParagraph.innerHTML += `<br>${extraMessage}`;
            }

        }, 500); // Após 0.5 segundos, mostra o resultado

        // Remove a animação de rotação rapidamente
        setTimeout(() => {
            resultSpace.classList.remove('rotate-fast');
        }, 500); // A rotação dura 0.5 segundos
    });

    // Lógica para limpar os resultados
    clearButton.addEventListener('click', () => {
        diceNumberDisplay.textContent = "";
        resultParagraph.textContent = "";
        statsButtons.forEach(button => button.classList.remove('selected'));
        selectedStatus = null;
    });
});






//-----------------------------------------------------D20 LIVRE 
document.addEventListener("DOMContentLoaded", () => {
    const btnDado = document.querySelector(".dado-livre-view .btn-dado");
    const btnLimpar = document.querySelector(".dado-livre-view .btn-limpar");
    const resultDisplay = document.querySelector(".dado-livre-view .resultado-dado-space-2 h1");
    const resultSpace = document.querySelector(".dado-livre-view .resultado-dado-space-2");

    // Evento para rodar o dado
    btnDado.addEventListener("click", () => {
        // Inicia a animação de rotação rápida
        resultSpace.classList.add("rotate-fast");

        // Aguarda 0.5 segundos para mostrar o resultado
        setTimeout(() => {
            const resultado = Math.floor(Math.random() * 20) + 1; // Gera um número entre 1 e 20
            resultDisplay.textContent = resultado; // Exibe o resultado no h1 dentro de "resultado-dado-space"
        }, 500); // Espera 0.5 segundos para exibir o resultado

        // Remove a animação de rotação após 0.5 segundos
        setTimeout(() => {
            resultSpace.classList.remove("rotate-fast");
        }, 500); // A rotação dura 0.5 segundos
    });

    // Evento para limpar o resultado
    btnLimpar.addEventListener("click", () => {
        resultDisplay.textContent = "?"; // Reseta o resultado para "?"
    });
});



//-----------------------------------------------------ICONE DE ARRASTAR MAPA
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



//-----------------------------------------------------MINIMIZAR CLASSES E CONTROLAR VIDAS
document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".toggle-visibility");

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



//-----------------------------------------------------SORTEIO DE MONSTROS
document.addEventListener("DOMContentLoaded", () => {
    let rodada = 1; // Número da rodada
    const btnSortear = document.querySelector(".monstros-select .btn-monstro");
    const resultadoContainer = document.querySelector(".monstros-select .monstro-resultado");
    const imgInicial = document.querySelector(".monstros-select img");

    const monstrosOriginais  = [
        {
            nome: "Lobos Selvagens",
            imagem: "./IMAGES/Monsters/monster-Lobos.jpg",
            desc:"Uma horda de 3 lobos famintos por carne, cada um com dois pontos de vida",
            coracoes: 6
        },
        {
            nome: "Iguana gigante",
            imagem: "./IMAGES/Monsters/monster-Iguana.jpg",
            desc:"Uma enorme e majestosa criatura da ilha, cuidado que a aparência pacifica esconde sua fome por carne",
            coracoes: 6
        },
        {
            nome: "3 Goblins saqueadores",
            imagem: "./IMAGES/Monsters/monster-Goblins.jpg",
            desc:"Uma horda de 3 goblis saqueadores, cada um com dois pontos de vida",
            coracoes: 6
        },
        {
            nome: "Caçador de cabeças e seu Carniceiro",
            imagem: "./IMAGES/Monsters/monster-Hunter.jpg",
            desc:"Um caçador(4 pontos de vida) furioso cego pela sede de sangue montado em seu fiel Carniceiro(4 pontos de vida), uma besta feroz que só conhece violência",
            coracoes: 8
        },
        {
            nome: "2 Hienas demoniacas",
            imagem: "./IMAGES/Monsters/monster-Hienas.jpg",
            desc:"Uma horda de 2 hienas vindas de outro mundo, cada um com três pontos de vida",
            coracoes: 6
        },
        {
            nome: "Urso de guerra zumbi",
            imagem: "./IMAGES/Monsters/monster-UrsoZumbi.jpg",
            desc:"Irrefreavel e tomado por uma fome interminável",
            coracoes: 6
        },
        {
            nome: "5 Esqueletos de piratas",
            imagem: "./IMAGES/Monsters/monster-Esqueletos.jpg",
            desc:"Uma horda de 5 esqueletos daqueles que chegaram antes de vocês, cada um com um ponto de vida",
            coracoes: 5
        },
        {
            nome: "Homem morcego selvagem",
            imagem: "./IMAGES/Monsters/monster-HomemMorcego.jpg",
            desc:"Vitima de uma terrivel maldição cego de ódio e sede de sangue",
            coracoes: 7
        },
        {
            nome: "Senhora dos afogados",
            imagem: "./IMAGES/Monsters/monster-senhoraAfogados.jpg",
            desc:"A maior lenda entre os piratas responsável por desaparecer com embarcações inteiras",
            coracoes: 6
        },
        {
            nome: "Sapo touro gigante",
            imagem: "./IMAGES/Monsters/monster-SapoTouro.jpg",
            desc:"Super resistente e com uma saliva ácida letal",
            coracoes: 7
        },
        {
            nome: "5 Espectros dos afogados",
            imagem: "./IMAGES/Monsters/monster-Afogados.jpg",
            desc:"Uma horda de 5 fantasmas dos velhos arcanos da ilha, cada um com um ponto de vida",
            coracoes: 5
        },
        {
            nome: "Pantera de duas cabeças",
            imagem: "./IMAGES/Monsters/monster-PanteraTwoHead.webp",
            desc:"Uma criatura majestosa encontrada exclusivamente nesta ilha, mas duplamente voraz",
            coracoes: 6
        },
        {
            nome: "3 Aranhas gigantes",
            imagem: "./IMAGES/Monsters/monster-Aranhas.jpg",
            desc:"Uma horda de 3 aranhas do submundo, cada um com dois pontos de vida",
            coracoes: 6
        },
        {
            nome: "Berserker zumbi",
            imagem: "./IMAGES/Monsters/monster-Berserker.jpg",
            desc:"Movido pela raiva de todos que matou na guerra arcana",
            coracoes: 8
        },
        {
            nome: "Ratazana demoniaca",
            imagem: "./IMAGES/Monsters/monster-Rato.jpg",
            desc:"Voraz e frenética famosa por triturar ossos",
            coracoes: 6
        },
        {
            nome: "Hidra de três cabeças",
            imagem: "./IMAGES/Monsters/monster-hydra.jpg",
            desc:"Uma criatura sinistra vinda de outro mundo, cada cabeça com dois pontos de vida",
            coracoes: 6
        },
        {
            nome: "Golem elemental",
            imagem: "./IMAGES/Monsters/monster-Golem.jpg",
            desc:"Guardião ancestral da ilha, criado e abandonado pelos antigos feiticeiros arcanos",
            coracoes: 8
        },
        {
            nome: "Caranguejo colosso",
            imagem: "./IMAGES/Monsters/monster-Caranguejo.jpg",
            desc:"Criatura ancestral tão velha quanto a ilha mas famosa por afundar grandes barcos",
            coracoes: 6
        },
        {
            nome: "Urso tubarão",
            imagem: "./IMAGES/Monsters/monster-Ursotubarao.webp",
            desc:"A brutalidade das duas criaturas mais temiveis do mar e da terra",
            coracoes: 6
        },
        {
            nome: "Dragão marinho",
            imagem: "./IMAGES/Monsters/monster-serpente.jpg",
            desc:"Mãe de todas serpentes do outro mundo é uma criatura temivel e lendária",
            coracoes: 8
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



//-----------------------------------------------------CARTAS DO DESTINO
document.addEventListener("DOMContentLoaded", () => {
    const btnEntregar = document.querySelector(".alteradores .btn-destino");
    const cartasDestinoViradas = document.querySelector(".cartas-destino-viradas");
    const alteradores = document.querySelector(".alteradores");
    const btnTurnos = document.querySelectorAll(".rodada-stats button"); // Todos os botões "Meu turno"
    const ovo = document.querySelector(".evento-destino.ovo"); // Seleciona o ovo
    const ovoChocado = document.querySelector(".ovo-chocado"); // Elemento ovo-chocado
    const destruirOvoBtn = document.querySelector(".evento-destino .evento-opcoes button"); // Botão "Destruir ovo"
    
    // Lista de cartas disponíveis
    const cartas = [
        "./IMAGES/CartasDestino/CartasDestino-1.png",
        "./IMAGES/CartasDestino/CartasDestino-2.png",
        "./IMAGES/CartasDestino/CartasDestino-3.png",
        "./IMAGES/CartasDestino/CartasDestino-4.png",
        "./IMAGES/CartasDestino/CartasDestino-5.png",
        "./IMAGES/CartasDestino/CartasDestino-6.png",
        "./IMAGES/CartasDestino/CartasDestino-7.png",
        "./IMAGES/CartasDestino/CartasDestino-8.png",
        "./IMAGES/CartasDestino/CartasDestino-9.png",
        "./IMAGES/CartasDestino/CartasDestino-10.png",
        "./IMAGES/CartasDestino/CartasDestino-11.png",
        "./IMAGES/CartasDestino/CartasDestino-12.png",
        "./IMAGES/CartasDestino/CartasDestino-13.png",
        "./IMAGES/CartasDestino/CartasDestino-14.png",
        "./IMAGES/CartasDestino/CartasDestino-15.png",
        "./IMAGES/CartasDestino/CartasDestino-16.png",
        "./IMAGES/CartasDestino/CartasDestino-17.png",
        "./IMAGES/CartasDestino/CartasDestino-18.png",
        "./IMAGES/CartasDestino/CartasDestino-19.png",
        "./IMAGES/CartasDestino/CartasDestino-20.png",
        "./IMAGES/CartasDestino/CartasDestino-21.png",
        "./IMAGES/CartasDestino/CartasDestino-22.png"
    ];

    // Limite de cartas viradas
    const maxCartas = 8;
    let cartasViradas = 0;

    btnEntregar.addEventListener("click", () => {
        // Verifica se atingiu o limite de cartas
        if (cartasViradas >= maxCartas) {
            alert("Remova uma carta do banco para poder puxar uma nova carta do destino!");
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

        // Verifica se a carta sorteada é a CartasDestino-21
        if (cartaSorteada === "./IMAGES/CartasDestino/CartasDestino-21.png") {
            // Altera o estilo para "flex"
            if (ovo) {
                ovo.style.display = "flex";

                // Cria o input dentro da classe ovo, caso ainda não exista
                if (!ovo.querySelector("input")) {
                    const input = document.createElement("input");
                    input.type = "number";
                    input.value = 1; // Inicia o valor como 1
                    input.id = "input-ovo"; // Atribui um ID ao input
                    ovo.appendChild(input); // Adiciona o input ao ovo
                } else {
                    // Caso o input já exista, garantimos que ele tenha o valor inicial de 1
                    const input = ovo.querySelector("input");
                    if (input.value === "" || input.value === "NaN") {
                        input.value = 1; // Garantir que o valor inicie como 1
                    }
                }
            }
        }

        // Adiciona a carta ao layout "cartas-destino-viradas"
        const cartaElement = document.createElement("div");
        cartaElement.classList.add("carta-container");

        const cartaImg = document.createElement("img");
        cartaImg.src = cartaSorteada;
        cartaImg.alt = "Carta do destino";
        cartaImg.style.margin = "5px"; // Ajuste de espaçamento
        
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("btn-remover");

        btnRemover.addEventListener("click", () => {
            cartaElement.remove(); // Remove a carta e o botão
            cartasViradas--; // Diminui o contador de cartas viradas
        });

        cartaElement.appendChild(cartaImg);
        cartaElement.appendChild(btnRemover);

        // Agora a carta será adicionada diretamente dentro de "cartas-destino-viradas"
        cartasDestinoViradas.appendChild(cartaElement);

        // Incrementa o número de cartas viradas
        cartasViradas++;

        // Atualiza a funcionalidade do botão para continuar sorteando
        const btnNovo = alteradores.querySelector(".btn-destino");
        btnNovo.addEventListener("click", () => btnEntregar.click());
    });

    // Evento para incrementar o valor do input dentro de "ovo" quando qualquer botão "Meu turno" for pressionado
    btnTurnos.forEach(btnTurno => {
        btnTurno.addEventListener("click", () => {
            const inputOvo = ovo ? ovo.querySelector("input") : null;
            if (inputOvo) {
                // Garantir que o valor do input é um número válido
                let currentValue = parseInt(inputOvo.value);
                if (!isNaN(currentValue)) {
                    inputOvo.value = currentValue + 1; // Incrementa o valor do input

                    // Verifica se o valor do input atingiu 100
                    if (currentValue + 1 === 100) {
                        // Altera o display de ovo e ovo-chocado
                        if (ovo) {
                            ovo.style.display = "none"; // Esconde o ovo
                        }
                        if (ovoChocado) {
                            ovoChocado.style.display = "flex"; // Mostra o ovo-chocado
                            ovoChocado.style.flexDirection = "column"; // Alinha em coluna
                        }
                    }
                }
            }
        });
    });

    // Evento para destruir o ovo
    if (destruirOvoBtn) {
        destruirOvoBtn.addEventListener("click", () => {
            if (ovo) {
                ovo.style.display = "none"; // Esconde a classe ovo ao clicar no botão "Destruir ovo"
            }
        });
    }
});


//-----------------------------------------------------OVO ATIVADO
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os elementos <p> dentro de .vida-dragao que contêm o emoji
    const coracoes = document.querySelectorAll(".evento-destino .vida-dragao p");

    // Adiciona o evento de clique em cada elemento <p>
    coracoes.forEach(coracao => {
        coracao.addEventListener("click", () => {
            // Verifica se o conteúdo atual é o emoji de coração ❤
            if (coracao.textContent === "❤") {
                // Troca para o emoji de caveira 💀
                coracao.textContent = "💀";
                coracao.classList.remove("heart"); // Remove a classe "heart"
                coracao.classList.add("skull"); // Adiciona a classe "skull"
            } else {
                // Caso contrário, troca para o emoji de coração ❤
                coracao.textContent = "❤";
                coracao.classList.remove("skull"); // Remove a classe "skull"
                coracao.classList.add("heart"); // Adiciona a classe "heart"
            }
        });
    });
});


//-----------------------------------------------------INICIAR JORNADA

document.addEventListener("DOMContentLoaded", function() {
    const iniciarJornadaBtn = document.querySelector(".btn-jornada");
    const jogadorChars = document.querySelectorAll(".jogador-char");
    const proxRodadaBtn = document.querySelector(".btn-jornada[style='display: none;']");

    iniciarJornadaBtn.addEventListener("click", function() {
        // Para cada 'jogador-char', verifica se o campo de nome está preenchido
        jogadorChars.forEach(jogador => {
            const inputName = jogador.querySelector(".name input");
            if (inputName && inputName.value.trim() === "") {
                // Esconde o jogador-char se o nome estiver vazio
                jogador.style.display = "none";
            } else {
                // Garante que os jogadores com nome preenchido permaneçam visíveis
                jogador.style.display = "flex";
                jogador.style.flexDirection = "column"
            }
        });

        // Trocar o texto do botão
        iniciarJornadaBtn.style.display = "none";
        proxRodadaBtn.style.display = "inline-block";
    });
});

//-----------------------------------------------------RANDOMIZAR JOGADORES ORDEM

document.addEventListener("DOMContentLoaded", function() {
    const proxRodadaBtn = document.querySelector(".btn-jornada[style='display: none;']");
    const jogadorChars = document.querySelectorAll(".jogador-char");
    
    proxRodadaBtn.addEventListener("click", function() {
        // Filtra os jogadores que estão visíveis (com nome preenchido)
        const jogadoresAtivos = Array.from(jogadorChars).filter(jogador => {
            const inputName = jogador.querySelector(".name input");
            return inputName && inputName.value.trim() !== "";
        });

        // Embaralha a lista de jogadores ativamente visíveis
        const jogadoresEmbaralhados = shuffleArray(jogadoresAtivos);

        // Reorganiza a ordem dos jogadores no DOM
        const containerJogadores = document.querySelector(".jogadores");
        jogadoresEmbaralhados.forEach(jogador => {
            containerJogadores.appendChild(jogador); // Move os jogadores para a nova ordem
        });
    });

    // Função para embaralhar um array aleatoriamente
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca elementos
        }
        return array;
    }
});




document.addEventListener("DOMContentLoaded", () => {
    const iniciarJornadaBtn = document.querySelector(".btn-jornada"); // Substitua pelo seletor correto do botão
    const charRegras = document.querySelector(".jogador-char.char-regras");
    const charMonstro = document.querySelector(".jogador-char.char-monstro");

    if (iniciarJornadaBtn && charRegras && charMonstro) {
        iniciarJornadaBtn.addEventListener("click", () => {
            // Esconde completamente a div das regras
            charRegras.style.display = "none"; 

            // Mostra a div do monstro
            charMonstro.style.display = "flex"; // ou "block", dependendo do seu layout
        });
    } else {
        console.warn("Elementos não encontrados. Verifique os seletores.");
    }
});




document.addEventListener("DOMContentLoaded", () => {
    const iniciarJornadaBtn = document.getElementById("iniciar-jornada"); // Botão INICIAR JORNADA
    const proximaRodadaBtn = document.getElementById("proxima-rodada"); // Botão PROXIMA RODADA
    const monstroDiv = document.querySelector(".char-monstro"); // Div do monstro
    const regrasDiv = document.querySelector(".char-regras"); // Div das regras
    const monstroAcao = document.querySelector(".char-monstro .monstro-acao"); // Texto da ação do monstro
    const jogadores = document.querySelectorAll(".jogador-char:not(.char-monstro):not(.char-regras)"); // Todos os jogadores ativos


     // 2️⃣ Ao clicar em PRÓXIMA RODADA, o monstro faz uma ação aleatória e a página rola para o topo
     if (proximaRodadaBtn) {
        proximaRodadaBtn.addEventListener("click", () => {
            

            // Filtra apenas jogadores visíveis e com nome preenchido
            const jogadoresAtivos = Array.from(jogadores).filter(jogador => {
                const nome = jogador.querySelector("h1")?.textContent.trim();
                return nome && jogador.style.display !== "none";
            });

            // Sorteia um jogador ativo
            let jogadorSorteado = jogadoresAtivos.length > 0
                ? jogadoresAtivos[Math.floor(Math.random() * jogadoresAtivos.length)].querySelector("h1").textContent
                : null;

            // Lista de ações do monstro
            const acoes = [
                "O monstro não conseguiu atacar ninguém.",
                jogadorSorteado ? `O monstro atacou ${jogadorSorteado} -1 de vida.` : "O monstro está confuso e não atacou.",
                "O monstro está tentando se recuperar! 2 turnos sem levar dano e ele recupera 1 ponto de vida."
            ];

            // Escolhe uma ação aleatória
            monstroAcao.textContent = acoes[Math.floor(Math.random() * acoes.length)];

            // Rola para o topo da página
            monstroDiv.scrollIntoView({ behavior: "smooth", block: "center" });
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});













