/* script.js */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. Navbar Degradê Dinâmica
    // =========================================
    const navbar = document.getElementById('navbar');
    
    // Função para adicionar o efeito degradê ao rolar
    window.addEventListener('scroll', () => {
        // Adiciona a classe 'scrolled' após rolar 50px
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =========================================
    // ANIMAÇÃO TYPEWRITER (PRELOADER CINEMÁTICO)
    // =========================================
    const preloader = document.getElementById('preloader');
    const textElement = document.getElementById('typewriter-text');
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function typeWriterEffect() {
        const typeSpeed = 50;  // Velocidade da digitação
        const deleteSpeed = 25; // Velocidade apagando
        
        // --- FRASE 1 ---
        const phrase1Part1 = "Advocacia que protege seus direitos com firmeza, clareza e justiça.";
        // Apaga 20 caracteres exatos (", clareza e justiça.")
        const phrase1DeleteLength = 16; 
        // O que sobra: "...com firmeza"
        // O que entra (Ponto + Espaço + Texto):
        const phrase1Part2 = " Sempre com justiça.";
        
        // --- FRASE 2 ---
        const phrase2Part1 = "Defenda sua causa com estratégia, experiência e confiança.";
        // Apaga 26 caracteres exatos (", experiência e confiança.")
        const phrase2DeleteLength = 22; 
        // O que sobra: "...com estratégia"
        // O que entra (Ponto + Espaço + Texto):
        const phrase2Part2 = " com DR. Julio Ligaboi.";

        // Função para digitar (com suporte a cor azul neon)
        async function typeText(text, isHighlight = false) {
            if (isHighlight) {
                // Cria um span com a cor azul antes de digitar
                textElement.innerHTML += `<span class="highlight-type"></span>`;
            }
            
            for (let i = 0; i < text.length; i++) {
                if (isHighlight) {
                    // Digita dentro do span azul
                    const spans = textElement.querySelectorAll('.highlight-type');
                    spans[spans.length - 1].innerHTML += text.charAt(i);
                } else {
                    // Digita branco normal
                    textElement.innerHTML += text.charAt(i);
                }
                await sleep(typeSpeed);
            }
        }

        // Função para apagar o texto normal
        async function deleteText(amount) {
            for (let i = 0; i < amount; i++) {
                textElement.innerText = textElement.innerText.slice(0, -1);
                await sleep(deleteSpeed);
            }
        }

        // Início da Animação
        await sleep(500); // Respiro inicial
        
        await typeText(phrase1Part1);
        await sleep(900); // Pausa leitura
        await deleteText(phrase1DeleteLength);
        await sleep(300);
        await typeText(phrase1Part2, true); // true = escreve em azul neon!
        
        await sleep(1500); // Pausa leitura final
        
        textElement.innerHTML = ""; // Limpa tela
        await sleep(400);

        await typeText(phrase2Part1);
        await sleep(900);
        await deleteText(phrase2DeleteLength);
        await sleep(300);
        await typeText(phrase2Part2, true); // true = escreve em azul neon!

        await sleep(1500); // Pausa antes de revelar o site

        // Revela o site suavemente
        preloader.classList.add('fade-out');
        document.body.style.overflow = 'auto'; // Destrava o scroll
        
        // Remove o preloader do caminho após a animação (1.5s)
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1500);
    }

        // Trava o scroll enquanto carrega
    document.body.style.overflow = 'hidden';
    
    // Roda se o preloader existir na tela
    if(preloader && textElement) {
        typeWriterEffect();
    }

    // =========================================
    // FUNÇÃO PARA PULAR A ANIMAÇÃO
    // =========================================
    window.skipIntro = function() {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('fade-out')) {
            // Inicia o sumiço da tela preta
            preloader.classList.add('fade-out');
            
            // Devolve a barra de rolagem imediatamente
            document.body.style.overflow = 'auto';
            
            // Remove o elemento do caminho após a transição (1.5s)
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1500);
        }
    };

    // =========================================
    // 2. Menu Mobile (Responsividade)
    // =========================================
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', () => {
            // Alterna a classe 'active' para mostrar/esconder o menu
            navLinks.classList.toggle('active');
            
            // Alterna o ícone entre 'barras' e 'X' para feedback visual
            const icon = mobileMenuIcon.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    

    // =========================================
    // 3. Smooth Scroll & Fechar Menu Mobile
    // =========================================
    // Garante que o clique nos links do menu feche o menu mobile e role suavemente
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            
            // Apenas previne o padrão se o link for uma âncora interna válida
            if (this.getAttribute('href').length > 1) {
                 e.preventDefault();

                // Fecha o menu mobile se estiver aberto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuIcon.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                // Rolagem suave até a seção alvo
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calcula a posição do topo, descontando a altura da navbar
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});