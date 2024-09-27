const Model = require('../models/models.js');

exports.getBooks = (req, res) => {
    res.json(Model.getBooks());
};

exports.getBook = (req, res) => {
    const { id } = req.params;
    const book = Model.getBookById(id);
    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    } else {
        res.json(Model.getBookById(id));
    }
};

exports.createBook = (req, res) => {
    console.log('req', req.body)
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        res.status(400).json({ message: 'Faltan datos requeridos: title, author, year' });
    } else {
        Model.addBook(req.body);
        res.status(201).json({ message: 'Libro Guardado', data: req.body });
    }
};

exports.updateBook = (req, res) => {
    const { id } = req.params;
    const book = Model.getBookById(id);
    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    } else {
        const { title, author, year } = req.body;
        if (!title || !author || !year) {
            res.status(400).json({ message: 'Faltan datos requeridos: title, author, year' });
        } else {
            Model.updateBook(id, req.body);
            res.status(200).json({ message: 'Libro Actualizado', data: req.body });
        }
    }
}
exports.deleteBook = (req, res) => {
    const { id } = req.params;
    const book = Model.getBookById(id);
    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    } else {
        Model.deleteBook(id);
        res.status(200).json({ message: 'Libro Eliminado' });
    }
};