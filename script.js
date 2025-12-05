// Navegación interactiva
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const chatBot = document.getElementById('chatBot');
    
    // Efecto de scroll en la navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Menú móvil toggle
    navToggle.addEventListener('click', function() {
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
        navToggle.classList.toggle('active');
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            navToggle.classList.remove('active');
        });
    });
    
    // Chat bot interactivo
    chatBot.addEventListener('click', function() {
        const phoneNumber = '1234567890';
        const message = '¡Hola! Me gustaría obtener más información sobre Pet-Paradise';
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Abrir WhatsApp o mostrar alerta
        if (confirm('¿Te gustaría contactarnos por WhatsApp?')) {
            window.open(whatsappURL, '_blank');
        } else {
            alert('Puedes contactarnos al (123) 456-7890 o visitarnos en Calle Mascotas Felices 123, Ciudad. ¡Estaremos encantados de atenderte!');
        }
    });
    
    // Carrusel de testimonios
    const slides = document.querySelectorAll('.testimonio-slide');
    const dots = document.querySelectorAll('.carrusel-dot');
    const prevBtn = document.querySelector('.carrusel-prev');
    const nextBtn = document.querySelector('.carrusel-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Cambio automático de slides
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.servicio-card, .feature, .testimonio-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});