const Model = require('../models/models.js');

exports.getPublicaciones = (req, res) => {
    res.json(Model.getPubli());
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

exports.createPublicacion = (req, res) => {
    console.log('req', req.body)
    const { title, description, urlMedia } = req.body;
    if (!title || !description || !urlMedia) {
        res.status(400).json({ message: 'Faltan datos requeridos: title, description, urlMedia' });
    } else {
        Model.addPublicacion(req.body);
        res.status(201).json({ message: 'Publicacion Guardada', data: req.body });
    }
};

exports.createComentarioPubli = (req, res) => {
    const { idPubli } = req.body;
    const book = Model.getPubliById(idPubli);
    if (!book) {
        return res.status(404).json({ message: 'Publicacion no encontrado' });
    } else {
        const { comment, user } = req.body;
        if (!comment || !user) {
            res.status(400).json({ message: 'Faltan datos requeridos: comment, user' });
        } else {
            Model.addComentarioPubli(req.body);
            res.status(201).json({ message: 'Comentario Guardado', data: req.body });
        }
    }
}

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