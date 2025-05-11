document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-header')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll per i link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Chiudi il menu mobile dopo il click
                navLinks.classList.remove('active');
            }
        });
    });

    // Caricamento dinamico delle notizie
    const newsGrid = document.querySelector('.news-grid');
    const sampleNews = [
        {
            title: 'Giornata Mondiale del Ricordo delle Vittime della Strada',
            excerpt: 'Eventi e commemorazioni in tutta Italia per ricordare le vittime della strada.',
            date: '15 Novembre 2024',
            image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            altText: 'Candele commemorative accese durante una cerimonia'
        },
        {
            title: 'Campagna di Sensibilizzazione nelle Scuole',
            excerpt: 'Nuovo programma di educazione stradale per gli studenti delle scuole superiori.',
            date: '10 Novembre 2024',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            altText: 'Studenti in aula durante una lezione di educazione stradale'
        },
        {
            title: 'Raccolta Firme per la Sicurezza Stradale',
            excerpt: 'Iniziativa per richiedere maggiori controlli e sicurezza sulle strade italiane.',
            date: '5 Novembre 2024',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            altText: 'Persone che firmano una petizione per la sicurezza stradale'
        }
    ];

    // Popola la griglia delle notizie
    function populateNews() {
        sampleNews.forEach(news => {
            const article = document.createElement('article');
            article.className = 'news-card';
            article.innerHTML = `
                <div class="news-image">
                    <img src="${news.image}" alt="${news.altText}">
                </div>
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <p>${news.excerpt}</p>
                    <div class="news-date">${news.date}</div>
                    <a href="#" class="read-more">Leggi di più</a>
                </div>
            `;
            newsGrid.appendChild(article);
        });
    }

    populateNews();

    // Animazione al caricamento delle sezioni
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Header sticky con effetto show/hide su scroll
    let lastScroll = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});