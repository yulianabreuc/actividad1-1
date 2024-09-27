const express = require('express');
const app = express();
const routesBook = require('./routes/routesbook.js');
const routesUsers = require('./routes/routesuser.js');
const routesRent = require('./routes/routesrent.js');

app.set('view engine', 'pug');

app.use(express.json());

app.use('/api/users', routesUsers);
app.use('/api/books', routesBook);
app.use('/api/rent', routesRent);
app.get('/', (req, res) => {
    res.render('index', { welcomeMessage: 'Mensaje de Bienvenida' });
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
  console.log(`Server corriendo ${PORT}`);
});