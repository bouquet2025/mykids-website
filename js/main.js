
const translations = {
    "Главная": {
        kz: "Басты бет",
        en: "Home"
    },
    "Все города": {
        kz: "Барлық қалалар",
        en: "All cities"
    },
    "Контакты": {
        kz: "Байланыс",
        en: "Contacts"
    },
    "Самая крупная сеть детских парков развлечений": {
        kz: "Ең ірі балалар ойын-сауық саябақтарының желісі",
        en: "The largest network of children's amusement parks"
    },
    "Мы дарим счастье детям и комфортный отдых родителям по всему Казахстану": {
        kz: "Біз Қазақстан бойынша балаларға бақыт және ата-аналарға жайлы демалыс сыйлаймыз",
        en: "We give happiness to children and comfortable rest to parents all over Kazakhstan"
    },
    "Выбрать парк": {
        kz: "Саябақты таңдау",
        en: "Choose a park"
    },
    "Наши парки": {
        kz: "Біздің саябақтар",
        en: "Our parks"
    },
    "Выберите ближайший к вам филиал My Kids": {
        kz: "Өзіңізге ең жақын My Kids филиалын таңдаңыз",
        en: "Choose the My Kids branch closest to you"
    },
    "Открыто": {
        kz: "Ашық",
        en: "Open"
    },
    "В процессе стройки": {
        kz: "Құрылыс барысында",
        en: "Under construction"
    },
    "Скоро открытие": {
        kz: "Жақында ашылады",
        en: "Opening soon"
    },
    "Фото парка": {
        kz: "Саябақ суреті",
        en: "Park photo"
    },
    "Скоро фото": {
        kz: "Жақында сурет",
        en: "Photo soon"
    },
    "Отметить день рождения": {
        kz: "Туған күнді атап өту",
        en: "Celebrate Birthday"
    },
    "Написать в WhatsApp": {
        kz: "WhatsApp-қа жазу",
        en: "Write on WhatsApp"
    },
    "Как добраться?": {
        kz: "Қалай жетуге болады?",
        en: "How to get there?"
    },
    "Выбрать филиал": {
        kz: "Филиалды таңдау",
        en: "Choose branch"
    },
    "Узнать подробнее": {
        kz: "Толығырақ білу",
        en: "Learn more"
    },
    "О компании": {
        kz: "Компания туралы",
        en: "About the company"
    },
    "Свяжитесь с нами любым удобным способом": {
        kz: "Бізбен кез келген ыңғайлы тәсілмен байланысыңыз",
        en: "Contact us in any convenient way"
    },
    "Города": {
        kz: "Қалалар",
        en: "Cities"
    },
    "Забронировать праздник": {
        kz: "Мерекені брондау",
        en: "Book a holiday"
    },
    "ФИО": {
        kz: "Аты-жөні",
        en: "Full Name"
    },
    "Телефон": {
        kz: "Телефон",
        en: "Phone"
    },
    "Дата праздника": {
        kz: "Мереке күні",
        en: "Holiday date"
    },
    "Дополнительная информация": {
        kz: "Қосымша ақпарат",
        en: "Additional information"
    },
    "Отправить заявку": {
        kz: "Өтінімді жіберу",
        en: "Send request"
    },
    "Заявка отправлена!": {
        kz: "Өтінім жіберілді!",
        en: "Request sent!"
    },
    "Мы свяжемся с вами в ближайшее время для подтверждения бронирования.": {
        kz: "Брондауды растау үшін жақын арада сізбен байланысамыз.",
        en: "We will contact you shortly to confirm your booking."
    },
    "Пакеты на день рождения": {
        kz: "Туған күн пакеттері",
        en: "Birthday packages"
    },
    "Забронировать": {
        kz: "Брондау",
        en: "Book"
    },
    "Безлимитное посещение на 5 детей": {
        kz: "5 балаға шектеусіз кіру",
        en: "Unlimited visit for 5 children"
    },
    "Именинник бесплатно": {
        kz: "Туған күн иесі тегін",
        en: "Birthday child for free"
    },
    "Всем остальным гостям -25% скидка": {
        kz: "Қалған қонақтарға -25% жеңілдік",
        en: "25% discount for all other guests"
    },
    "Вынос торта/поздравление": {
        kz: "Торт шығару/құттықтау",
        en: "Cake delivery/congratulations"
    },
    "Аренда VIP-комнаты - 2.5 часа": {
        kz: "VIP бөлмені жалға алу - 2.5 сағат",
        en: "VIP room rental - 2.5 hours"
    },
    "Аренда VIP-комнаты - 5 часов": {
        kz: "VIP бөлмені жалға алу - 5 сағат",
        en: "VIP room rental - 5 hours"
    },
    "Любая пицца в подарок": {
        kz: "Кез келген пицца сыйлыққа",
        en: "Any pizza as a gift"
    },
    "Любые 2 пиццы в подарок": {
        kz: "Кез келген 2 пицца сыйлыққа",
        en: "Any 2 pizzas as a gift"
    },
    "Любые 3 пиццы в подарок": {
        kz: "Кез келген 3 пицца сыйлыққа",
        en: "Any 3 pizzas as a gift"
    }
};


function translatePage(lang) {
    if (!window.translationDictReady) {
        window.translationDictReady = true;
        window.revTranslations = {};
        for(let key in translations) {
            window.revTranslations[key] = key;
            if(translations[key].kz) window.revTranslations[translations[key].kz] = key;
            if(translations[key].en) window.revTranslations[translations[key].en] = key;
            window.revTranslations[key.toUpperCase()] = key;
            if(translations[key].kz) window.revTranslations[translations[key].kz.toUpperCase()] = key;
            if(translations[key].en) window.revTranslations[translations[key].en.toUpperCase()] = key;
        }
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
        const text = node.nodeValue.trim();
        if (text.length > 0 && window.revTranslations[text]) {
            const ruKey = window.revTranslations[text];
            let newText = ruKey;
            if (lang !== 'ru' && translations[ruKey] && translations[ruKey][lang]) {
                newText = translations[ruKey][lang];
            }
            if (text === text.toUpperCase() && text !== text.toLowerCase()) {
                newText = newText.toUpperCase();
            }
            node.nodeValue = node.nodeValue.replace(text, newText);
        }
    }
    
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        const text = el.getAttribute('placeholder').trim();
        if (text.length > 0 && window.revTranslations[text]) {
            const ruKey = window.revTranslations[text];
            let newText = ruKey;
            if (lang !== 'ru' && translations[ruKey] && translations[ruKey][lang]) {
                newText = translations[ruKey][lang];
            }
            if (text === text.toUpperCase() && text !== text.toLowerCase()) {
                newText = newText.toUpperCase();
            }
            el.setAttribute('placeholder', newText);
        }
    });
}

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

// ===== Language Switcher =====
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // Set initial language from localStorage or default to ru
    let currentLang = localStorage.getItem('mykids_lang') || 'ru';
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('mykids_lang', lang);
        
        // Update buttons
        langBtns.forEach(b => {
            if (b.dataset.lang === lang) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
        
        // Translate page
        translatePage(lang);
    }
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
    
    // Delay initial translation slightly to ensure DOM is ready
    setTimeout(() => {
        if (currentLang !== 'ru') {
            setLanguage(currentLang);
        }
    }, 100);
}

// ===== Booking Modal =====
function initBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    const closeBtn = document.getElementById('closeBooking');
    const form = document.getElementById('bookingForm');
    const successMsg = document.getElementById('bookingSuccess');
    const packageNameElem = document.getElementById('bookingPackageName');

    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Забронировать')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.price-card');
                const packageName = card ? card.querySelector('h3').textContent : '';
                if(packageNameElem) packageNameElem.textContent = `Пакет: ${packageName}`;
                form.style.display = 'block';
                successMsg.style.display = 'none';
                form.reset();
                modal.classList.add('active');
            });
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            successMsg.style.display = 'block';
            setTimeout(() => {
                modal.classList.remove('active');
            }, 3000);
        });
    }
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
    initLanguageSwitcher();
    initBookingModal();
});
