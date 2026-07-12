/* =========================================================
   GamaNet - main.js (Navegación Dinámica y Sliders Asíncronos 2026)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LÓGICA DE NAVEGACIÓN Y LÍNEA NARANJA
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    const makeActive = (id) => {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const options = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', 
        threshold: 0
    };

    const callback = (entries) => {
        if (window.scrollY < 50) {
            makeActive('inicio');
            return;
        }
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                makeActive(entry.target.id);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    sections.forEach(section => observer.observe(section));

    // Forzar contacto al llegar al fondo
    window.addEventListener('scroll', () => {
        const triggersBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);
        if (triggersBottom) {
            makeActive('contacto');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const id = link.getAttribute('href').substring(1);
            setTimeout(() => { makeActive(id); }, 150);
        });
    });

    // ==========================================
    // 2. MOTOR DE SLIDERS ASÍNCRONOS (IMPLEMENTACIONES)
    // ==========================================
    const initCardSlider = (sliderSelector, intervalTime) => {
        const slider = document.querySelector(sliderSelector);
        if (!slider) return;

        const images = slider.querySelectorAll('img');
        const totalImages = images.length;
        let currentIndex = 0;

        // Cambia el tamaño del contenedor del slider dinámicamente según sus imágenes reales
        slider.style.width = `${totalImages * 100}%`;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            // Desplazamiento matemático preciso en base al número real de imágenes
            const percentageTranslate = currentIndex * (100 / totalImages);
            slider.style.transform = `translateX(-${percentageTranslate}%)`;
        }, intervalTime);
    };

    // Inicializaciones con tiempos completamente desfasados (Efecto asíncrono y natural)
    initCardSlider('.slide-apg', 3500);     // APG cambia cada 3.5 segundos
    initCardSlider('.slide-frudest', 5000); // Frudest cambia cada 5.0 segundos (más lento por tener 10 fotos)
    initCardSlider('.slide-valle', 4200);   // Valle Real cambia cada 4.2 segundos
});