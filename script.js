document.addEventListener('DOMContentLoaded', function () {
    // DOM Selection
    const form = document.getElementById('sbs-form');
    const inputs = form.querySelectorAll('input');
    const submitButton = document.getElementById('claim');
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const eyeClosed = togglePassword.querySelector('.eye-icon.closed');
    const eyeOpen = togglePassword.querySelector('.eye-icon.open');

    const errorMessages = {
        firstName: 'First Name cannot be empty',
        lastName: 'Last Name cannot be empty',
        email: 'Looks like this is not an email',
        password: 'Password cannot be empty'
    };

    // Add error icon to each input
    inputs.forEach(input => {
        const errorIcon = document.createElement('img');
        errorIcon.src = 'images/icon-error.svg';
        errorIcon.alt = 'Error';
        errorIcon.className = 'error-icon';
        errorIcon.style.display = 'none'; // Initially hide the error icon

        const inputContainer = input.closest('.sbs-section');
        inputContainer.appendChild(errorIcon);
    });

    // Submit Form Validation
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            const inputContainer = input.closest('.sbs-section');
            const errorDiv = inputContainer.querySelector('.error-message');
            const errorIcon = inputContainer.querySelector('.error-icon');

            if (input.value.trim() === '') {
                isValid = false;
                showError(input, errorDiv, errorIcon, errorMessages[input.id] ||
                    `${input.placeholder} is required`);
            } else if (input.id === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                showError(input, errorDiv, errorIcon, errorMessages.email);
            } else {
                hideError(input, errorDiv, errorIcon);
            }
        });

        if (isValid) {
            form.submit();
        }
    });

    // Hide the current error happening when user starts typing
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const inputContainer = this.closest('.sbs-section');
            const errorDiv = inputContainer.querySelector('.error-message');
            const errorIcon = inputContainer.querySelector('.error-icon');
            hideError(this, errorDiv, errorIcon);
        });
    });

    // Toggle password visibility
    togglePassword.addEventListener('click', function () {
        if (password.type === 'password') {
            password.type = 'text';
            eyeClosed.style.display = 'none';
            eyeOpen.style.display = 'inline';
        } else {
            password.type = 'password';
            eyeClosed.style.display = 'inline';
            eyeOpen.style.display = 'none';
        }
    });

    // Show error function
    function showError(input, errorDiv, errorIcon, message) {
        input.classList.add('error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorIcon.style.display = 'block';
    }

    // Hide error function
    function hideError(input, errorDiv, errorIcon) {
        input.classList.remove('error');
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
        errorIcon.style.display = 'none';
    }

    // Validating email form
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});