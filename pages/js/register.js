document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        // Validación opcional
        if (!username || !email) {
            alert('Por favor, llena todos los campos.');
            return;
        }

        // Redirección
        window.location.href = 'pages/general.html';
    });
});

// --------------- BD REGISTER ----------------- //

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validación de los campos
        if (!username || !email || !password) {
            alert('Por favor, llena todos los campos.');
            return;
        }

        // Enviar los datos de registro al servidor
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Si el registro es exitoso, redirigir al login
                window.location.href = 'index.html';
            } else {
                alert('Error al registrar la cuenta.');
            }
        })
        .catch(error => console.error('Error al registrar:', error));
    });
});
