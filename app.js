const express = require('express');
const app = express();
const routesBook = require('./routes/routesbook.js');
const routesUsers = require('./routes/routesuser.js');
const routesRent = require('./routes/routesrent.js');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());

app.use('/api/users', routesUsers);
app.use('/api/books', routesBook);
app.use('/api/rent', routesRent);

const { getBooks, getUsers, getHistoric } = require('./models/models.js');
app.get('/home', (req, res) => {
    const books = getBooks();
    res.render('index', { welcomeMessage: 'Mensaje de Bienvenida', books: books });
});
app.get('/users', (req, res) => {
    const users = getUsers();
    res.render('users', { welcomeMessage: 'Usuarios Registrados', users: users });
});
app.get('/historic', (req, res) => {
    const historic = getHistoric();
    res.render('users', { welcomeMessage: 'Bienvenido a historic', historic: historic });
});
app.get('/', (req, res) => {
    res.send('Por favor, diríjase a la ruta /home');
});
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});