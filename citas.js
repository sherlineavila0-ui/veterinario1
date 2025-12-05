document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('formCita');
    const modal = document.getElementById('modalConfirmacion');
    const btnLimpiar = document.getElementById('btnLimpiar');
    const btnEnviar = document.getElementById('btnEnviar');
    const modalClose = document.getElementById('modalClose');
    const btnNuevaCita = document.getElementById('btnNuevaCita');
    
    // Elementos de resumen
    const resumenMascota = document.getElementById('resumenMascota');
    const resumenDueno = document.getElementById('resumenDueno');
    const resumenFecha = document.getElementById('resumenFecha');
    const resumenHora = document.getElementById('resumenHora');
    const resumenMotivo = document.getElementById('resumenMotivo');
    
    // Inicialización
    inicializarFecha();
    cargarHorasDisponibles();
    
    // Configurar fecha mínima (hoy)
    function inicializarFecha() {
        const fechaInput = document.getElementById('fechaCita');
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.min = hoy;
        
        // Si es fin de semana, sugerir lunes
        const diaSemana = new Date().getDay();
        if (diaSemana === 0 || diaSemana === 6) { // Domingo (0) o Sábado (6)
            const lunes = new Date();
            lunes.setDate(lunes.getDate() + (8 - diaSemana) % 7);
            fechaInput.value = lunes.toISOString().split('T')[0];
        }
    }
    
    // Cargar horas disponibles
    function cargarHorasDisponibles() {
        const selectHora = document.getElementById('horaCita');
        const horas = [];
        
        // Generar horas de 8:00 AM a 6:00 PM
        for (let hora = 8; hora <= 18; hora++) {
            for (let minuto = 0; minuto < 60; minuto += 30) {
                const horaFormato = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
                horas.push(horaFormato);
            }
        }
        
        // Limpiar opciones existentes (excepto la primera)
        while (selectHora.options.length > 1) {
            selectHora.remove(1);
        }
        
        // Agregar nuevas opciones
        horas.forEach(hora => {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = hora;
            selectHora.appendChild(option);
        });
    }
    
    // Validación de formulario
    function validarFormulario() {
        let valido = true;
        
        // Limpiar mensajes de error
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });
        
        // Validar campos requeridos
        const camposRequeridos = [
            'nombreMascota', 'especie', 'nombreDueno', 'telefono', 'email',
            'tipoCita', 'sintomas', 'fechaCita', 'horaCita'
        ];
        
        camposRequeridos.forEach(campo => {
            const elemento = document.getElementById(campo);
            if (!elemento.value.trim()) {
                mostrarError(campo, 'Este campo es obligatorio');
                valido = false;
            }
        });
        
        // Validar email
        const email = document.getElementById('email').value;
        if (email && !validarEmail(email)) {
            mostrarError('email', 'Ingresa un correo electrónico válido');
            valido = false;
        }
        
        // Validar teléfono
        const telefono = document.getElementById('telefono').value;
        if (telefono && !validarTelefono(telefono)) {
            mostrarError('telefono', 'Ingresa un número de teléfono válido');
            valido = false;
        }
        
        // Validar términos
        if (!document.getElementById('terminos').checked) {
            mostrarError('terminos', 'Debes aceptar los términos y condiciones');
            valido = false;
        }
        
        return valido;
    }
    
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function validarTelefono(telefono) {
        const regex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return regex.test(telefono.replace(/\s/g, ''));
    }
    
    function mostrarError(campo, mensaje) {
        const errorElement = document.getElementById(`error${capitalizeFirst(campo)}`);
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.style.display = 'block';
        }
    }
    
    function capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Limpiar formulario
    function limpiarFormulario() {
        if (confirm('¿Estás seguro de que quieres limpiar todo el formulario?')) {
            form.reset();
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });
            inicializarFecha();
        }
    }
    
    // Enviar formulario
    function enviarFormulario(event) {
        event.preventDefault();
        
        if (!validarFormulario()) {
            // Mostrar mensaje de error general
            alert('Por favor, completa todos los campos requeridos correctamente.');
            return;
        }
        
        // Mostrar loading
        btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Agendando...';
        btnEnviar.disabled = true;
        
        // Simular envío (en un caso real, aquí iría una petición AJAX)
        setTimeout(() => {
            // Guardar datos para el resumen
            guardarResumen();
            
            // Mostrar modal de confirmación
            modal.style.display = 'block';
            
            // Restaurar botón
            btnEnviar.innerHTML = '<i class="fas fa-calendar-check"></i> Agendar Cita';
            btnEnviar.disabled = false;
            
            // Limpiar formulario
            form.reset();
            inicializarFecha();
            
        }, 2000);
    }
    
    function guardarResumen() {
        const formData = new FormData(form);
        
        resumenMascota.textContent = formData.get('nombreMascota');
        resumenDueno.textContent = formData.get('nombreDueno');
        
        // Formatear fecha
        const fecha = new Date(formData.get('fechaCita'));
        resumenFecha.textContent = fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        resumenHora.textContent = formData.get('horaCita');
        resumenMotivo.textContent = formData.get('tipoCita');
    }
    
    // Cerrar modal
    function cerrarModal() {
        modal.style.display = 'none';
    }
    
    // Nueva cita
    function nuevaCita() {
        cerrarModal();
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Event Listeners
    form.addEventListener('submit', enviarFormulario);
    btnLimpiar.addEventListener('click', limpiarFormulario);
    modalClose.addEventListener('click', cerrarModal);
    btnNuevaCita.addEventListener('click', nuevaCita);
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });
    
    // Validación en tiempo real
    document.querySelectorAll('input, select, textarea').forEach(elemento => {
        elemento.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                mostrarError(this.id, 'Este campo es obligatorio');
            } else {
                const errorElement = document.getElementById(`error${capitalizeFirst(this.id)}`);
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });
    });
    
    // Validación específica para email
    document.getElementById('email').addEventListener('blur', function() {
        if (this.value && !validarEmail(this.value)) {
            mostrarError('email', 'Ingresa un correo electrónico válido');
        }
    });
    
    // Validación específica para teléfono
    document.getElementById('telefono').addEventListener('blur', function() {
        if (this.value && !validarTelefono(this.value)) {
            mostrarError('telefono', 'Ingresa un número de teléfono válido');
        }
    });
    
    // Formatear automáticamente el teléfono
    document.getElementById('telefono').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = value.match(/.{1,3}/g).join(' ');
        }
        e.target.value = value;
    });
});