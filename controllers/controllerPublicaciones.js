const Model = require('../models/models.js');

exports.getPublicaciones = (req, res) => {
    res.json(Model.getPubli());
};

exports.getPublicacion = (req, res) => {
    const { id } = req.params;
    const publi = Model.getPubliById(id);
    if (!publi) {
        return res.status(404).json({ message: 'Publicacion no encontrado' });
    } else {
        res.json(Model.getPubliById(id));
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

exports.updatePublicacion = (req, res) => {
    const { id } = req.params;
    const publi = Model.getPubliById(id);
    if (!publi) {
        return res.status(404).json({ message: 'Publicacion no encontrada' });
    } else {
        const { title, description, urlMedia } = req.body;
        if (!title || !description || !urlMedia) {
            res.status(400).json({ message: 'Faltan datos requeridos: title, description, urlMedia' });
        } else {
            Model.updatePublicacion(id, req.body);
            res.status(200).json({ message: 'Publicacion Actualizada', data: req.body });
        }
    }
}
exports.deleteBook = (req, res) => {
    const { id } = req.params;
    const book = Model.getPubliById(id);
    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    } else {
        Model.deleteBook(id);
        res.status(200).json({ message: 'Libro Eliminado' });
    }
};