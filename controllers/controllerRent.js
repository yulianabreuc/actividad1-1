const Model = require('../models/models.js');

exports.getRents = (req, res) => {
    res.json(Model.getRents());
};

exports.createRent = (req, res) => {
    const { idUser, idBook, date_rent } = req.body;
    if (!idUser || !idBook || !date_rent) {
        res.status(400).json({ message: 'Faltan datos requeridos: idUser, idBook, date' });
    } else {
        const user = Model.getUserById(idUser);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            const book = Model.getBookById(idBook);
            if (!book) {
                res.status(404).json({ message: 'Libro no encontrado' });
            } else if (!book.disponible) {
                res.status(400).json({ message: 'Libro no disponible' });
            } else {
                Model.addRent(req.body);
                res.status(201).json({ message: 'Rent Guardado', data: req.body });
            }
        }
    }
}