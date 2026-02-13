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