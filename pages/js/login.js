document.addEventListener('DOMContentLoaded', function () {
    // Datos del usuario (pueden venir de una API o base de datos)
    const user = {
        name: username,
        email: email
    };

    // Actualizar la información del usuario
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
});

// --------- BD LOGIN ----------------- //

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el formulario y los campos de entrada
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        // Validación de los campos
        if (!username || !email) {
            alert('Por favor, ingresa tu nombre y correo.');
            return;
        }

        // Aquí puedes hacer una llamada AJAX a tu backend para autenticar al usuario
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Si el login es exitoso, puedes redirigir al usuario
                window.location.href = 'pages/general.html';
            } else {
                alert('Credenciales incorrectas');
            }
        })
        .catch(error => console.error('Error al hacer login:', error));
    });
});
