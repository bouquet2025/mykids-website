// ===== Header Scroll Effect =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ===== Scroll Progress Bar =====
function initScrollProgress() {
    const scrollBar = document.getElementById('scrollBar');
    if (!scrollBar) return;
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollBar.style.width = ((winScroll / height) * 100) + '%';
    });
}

// ===== Reveal Animations =====
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== Card Stagger Animation =====
function initCardAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.advantage-card, .service-card, .location-card, .contact-card, .price-card, .stat-item');
                cards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(25px)';
                    card.style.transition = `all 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`;
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.advantages-grid, .services-grid, .locations-grid, .contact-grid, .pricing-grid, .stats-grid').forEach(grid => {
        observer.observe(grid);
    });
}

// ===== Animated Counter =====
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.count);
                    const suffix = counter.dataset.suffix || '';
                    let current = 0;
                    const step = Math.ceil(target / 60);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = current.toLocaleString() + suffix;
                    }, 25);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.stats-grid').forEach(el => observer.observe(el));
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const nav = document.querySelector('.desktop-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                const nav = document.querySelector('.desktop-nav');
                if (nav) nav.classList.remove('active');
            }
        });
    });
}

// ===== City Modal =====
function initCityModal() {
    const modal = document.getElementById('cityModal');
    if (!modal) return;
    const closeBtn = document.getElementById('closeModal');
    const cityBtns = document.querySelectorAll('.city-btn');

    document.querySelectorAll('.nav-btn, .hero-btns .btn-primary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.textContent.includes('Найти парк') || btn.textContent.includes('Выбрать парк')) {
                e.preventDefault();
                modal.classList.add('active');
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    cityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const city = btn.dataset.city;
            const isMainPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
            window.location.href = isMainPage ? `pages/${city}.html` : `${city}.html`;
        });
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initRevealAnimations();
    initCardAnimations();
    initCounters();
    initMobileMenu();
    initSmoothScroll();
    initCityModal();
});
