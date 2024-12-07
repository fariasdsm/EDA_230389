const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Para encriptar contraseñas

const app = express();
const port = 3000;

// Archivos estaticos
app.use(express.static('pages'));


// Configurar el servidor para recibir datos JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia según tu configuración
    password: 'root', // Cambia según tu configuración
    database: 'eda_230389' // El nombre de tu base de datos
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar un usuario
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Encriptar contraseña

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al registrar');
        }
        res.status(200).send('Usuario registrado');
    });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { username, email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al iniciar sesión');
        }

        if (result.length === 0) {
            return res.status(400).send('Correo no registrado');
        }

        // Comparar la contraseña ingresada con la almacenada
        const user = result[0];
        const validPassword = bcrypt.compareSync(password, user.password);

        if (validPassword) {
            res.status(200).send({ message: 'Login exitoso', user: user });
        } else {
            res.status(400).send('Contraseña incorrecta');
        }
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


// RUTAS GET

// Ruta para mostrar el formulario de login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/pages/login.html');
});

// Ruta para mostrar el formulario de registro
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/pages/register.html');
});
