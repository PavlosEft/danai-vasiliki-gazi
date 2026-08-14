let currentLang = 'el';
let Default_FontSize = '14px';

document.addEventListener('DOMContentLoaded', () => {
    
    // Inject configuration data
    if (typeof siteConfig !== 'undefined') {
        document.querySelectorAll('.dyn-phone-link').forEach(el => el.href = "tel:" + siteConfig.phone_raw);
        document.querySelectorAll('.dyn-phone-text').forEach(el => el.textContent = siteConfig.phone_display);
        document.querySelectorAll('.dyn-wa-link').forEach(el => el.href = siteConfig.whatsapp_url);
        document.querySelectorAll('.dyn-viber-link').forEach(el => el.href = siteConfig.viber_url);
        document.querySelectorAll('.dyn-location-link').forEach(el => el.href = siteConfig.location_url);
    }

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    const savedLang = localStorage.getItem('userLang');
    
    if (urlLang && i18n[urlLang]) {
        currentLang = urlLang;
    } else if (savedLang && i18n[savedLang]) {
        currentLang = savedLang;
    }

    const savedFont = localStorage.getItem('themeFont');
    if (savedFont) setThemeFont(savedFont);

    const savedImg = localStorage.getItem('profileImg');
    if (savedImg) document.getElementById('profile-img').src = savedImg;

    setLanguage(currentLang);
    
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    mobileBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
        });
    });

    document.getElementById('last-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submission simulated.');
        this.reset();
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-selector')) {
            document.getElementById('lang-dropdown').classList.remove('show');
        }
        if (!e.target.closest('.theme-selector')) {
            document.getElementById('theme-dropdown').classList.remove('show');
        }
    });
});

function toggleLangMenu() {
    document.getElementById('lang-dropdown').classList.toggle('show');
    document.getElementById('theme-dropdown').classList.remove('show');
}

function toggleThemeMenu() {
    document.getElementById('theme-dropdown').classList.toggle('show');
    document.getElementById('lang-dropdown').classList.remove('show');
}

function setLanguage(lang) {
    if(!i18n[lang]) return;
    currentLang = lang;
    localStorage.setItem('userLang', lang);
    
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('lang', lang);
    window.history.pushState({}, '', newUrl);

    if (i18n[lang].seo_title) {
        document.title = i18n[lang].seo_title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && i18n[lang].seo_desc) {
        metaDesc.setAttribute("content", i18n[lang].seo_desc);
    }
    
    const langBtn = document.querySelector('.lang-btn');
    langBtn.innerHTML = lang.toUpperCase() + ' &#9662;';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(i18n[lang][key]) {
            el.innerHTML = i18n[lang][key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(i18n[lang][key]) {
            el.placeholder = i18n[lang][key];
        }
    });
    
    document.getElementById('lang-dropdown').classList.remove('show');
}

function setThemeColor(colorTheme) {
    document.documentElement.classList.add('theme-transition');
    
    if(colorTheme === 'light') {
        document.documentElement.classList.add('light-theme');
    } else {
        document.documentElement.classList.remove('light-theme');
    }
    
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 300);
}

function setThemeFont(fontName) {
    const fontLink = document.getElementById('theme-font');
    if(fontName === 'Open Sans') {
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap';
        document.documentElement.style.setProperty('--font-family', "'Open Sans', sans-serif");
    } else if(fontName === 'Merriweather') {
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap';
        document.documentElement.style.setProperty('--font-family', "'Merriweather', serif");
    } else if(fontName === 'Roboto') {
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
        document.documentElement.style.setProperty('--font-family', "'Roboto', sans-serif");
    } else if(fontName === 'Playfair Display') {
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap';
        document.documentElement.style.setProperty('--font-family', "'Playfair Display', serif");
    }
    localStorage.setItem('themeFont', fontName);
}

function setThemeFontSize(size) {
    document.documentElement.style.setProperty('--base-font-size', size);
    localStorage.setItem('themeFontSize', size);
}

function toggleProfileImage() {
    const img = document.getElementById('profile-img');
    if (img.src.includes('IMG_2672-2.jpg')) {
        img.src = '1760260188731.jpg';
    } else {
        img.src = 'IMG_2672-2.jpg';
    }
    localStorage.setItem('profileImg', img.src);
}