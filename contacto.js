document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const contactForm = document.getElementById('contactForm');
    const appointmentForm = document.getElementById('appointmentForm');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    const topBtn = document.querySelector('.floating-btn.top');

    // Configurar fecha mínima para la cita
    const appointmentDate = document.getElementById('appointmentDate');
    if (appointmentDate) {
        const today = new Date().toISOString().split('T')[0];
        appointmentDate.min = today;
        
        // Fecha máxima (3 meses)
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        appointmentDate.max = maxDate.toISOString().split('T')[0];
    }

    // Configurar hora para la cita
    const appointmentTime = document.getElementById('appointmentTime');
    if (appointmentTime) {
        appointmentTime.min = '08:00';
        appointmentTime.max = '18:00';
    }

    // Mostrar/ocultar botón "volver arriba"
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.style.opacity = '1';
            topBtn.style.visibility = 'visible';
        } else {
            topBtn.style.opacity = '0';
            topBtn.style.visibility = 'hidden';
        }
    });

    // Formulario de contacto
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = this.nombre.value.trim();
        const email = this.email.value.trim();
        const mascota = this.mascota.value.trim();
        const mensaje = this.mensaje.value.trim();
        
        if (!nombre || !email || !mascota || !mensaje) {
            showNotification('Por favor, complete todos los campos', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Por favor, ingrese un correo válido', 'error');
            return;
        }
        
        // Simular envío
        showNotification('Mensaje enviado con éxito. Te contactaremos pronto.', 'success');
        this.reset();
    });

    // Formulario de cita
    appointmentForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = this.appointmentName.value.trim();
        const fecha = this.appointmentDate.value;
        const hora = this.appointmentTime.value;
        const servicio = this.appointmentService.value;
        
        if (!nombre || !fecha || !hora || !servicio) {
            showNotification('Por favor, complete todos los campos de la cita', 'error');
            return;
        }
        
        // Validar domingos
        const selectedDate = new Date(fecha);
        if (selectedDate.getDay() === 0) {
            if (!confirm('Los domingos solo atendemos emergencias. ¿Desea continuar?')) {
                return;
            }
        }
        
        // Formatear fecha
        const fechaFormateada = selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        showNotification(`Cita confirmada para ${nombre} el ${fechaFormateada} a las ${hora}`, 'success');
        this.reset();
    });

    // Funciones auxiliares
    function showNotification(message, type = 'success') {
        notificationMessage.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Efectos en inputs
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Animación de entrada
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});