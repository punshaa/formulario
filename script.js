document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');

    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función para mostrar mensajes de error
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('error');
    }

    // Función para ocultar mensajes de error
    function hideError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.style.display = 'none';
        input.classList.remove('error');
    }

    // Función para validar campos requeridos
    function validateRequired(input) {
        if (input.value.trim() === '') {
            showError(input, 'Este campo es obligatorio');
            return false;
        }
        hideError(input);
        return true;
    }

    // Función para validar email
    function validateEmail(input) {
        if (!emailRegex.test(input.value)) {
            showError(input, 'Por favor, ingresa un correo electrónico válido');
            return false;
        }
        hideError(input);
        return true;
    }

    // Función para validar el checkbox de privacidad
    function validateCheckbox(input) {
        if (!input.checked) {
            showError(input, 'Debes aceptar la política de privacidad');
            return false;
        }
        hideError(input);
        return true;
    }

    // Función para validar el formulario completo
    function validateForm() {
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            if (input.type === 'email') {
                if (!validateEmail(input)) isValid = false;
            } else if (input.type === 'checkbox') {
                if (!validateCheckbox(input)) isValid = false;
            } else {
                if (!validateRequired(input)) isValid = false;
            }
        });

        return isValid;
    }

    // Event listeners para validación en tiempo real
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', () => {
            if (input.type === 'email') {
                validateEmail(input);
            } else if (input.hasAttribute('required')) {
                validateRequired(input);
            }
        });

        input.addEventListener('blur', () => {
            if (input.type === 'email') {
                validateEmail(input);
            } else if (input.hasAttribute('required')) {
                validateRequired(input);
            }
        });
    });

    // Event listener para el checkbox de privacidad
    const privacyCheckbox = document.getElementById('privacidad');
    privacyCheckbox.addEventListener('change', () => {
        validateCheckbox(privacyCheckbox);
    });

    // Event listener para el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simular envío del formulario
            form.style.display = 'none';
            successMessage.style.display = 'block';

            // Aquí iría el código para enviar los datos al servidor
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            console.log('Datos del formulario:', formObject);

            // Resetear el formulario después de 3 segundos
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.style.display = 'none';
            }, 3000);
        }
    });

    // Validación de longitud máxima para el textarea
    const mensajeTextarea = document.getElementById('mensaje');
    mensajeTextarea.addEventListener('input', () => {
        const maxLength = parseInt(mensajeTextarea.getAttribute('maxlength'));
        const currentLength = mensajeTextarea.value.length;
        
        if (currentLength > maxLength) {
            mensajeTextarea.value = mensajeTextarea.value.substring(0, maxLength);
        }
    });
}); 