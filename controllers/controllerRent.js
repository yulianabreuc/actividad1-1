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
                const existingRent = Model.getRentByBookId(idBook);
                if (existingRent && existingRent.state === 'Pending') {
                    return res.status(400).json({ message: 'El libro ya está rentado y en estado pendiente' });
                }

                const userPendingRent = Model.getRentByUserId(idUser);
                if (userPendingRent && userPendingRent.state === 'Pending') {
                    return res.status(400).json({ message: 'El usuario ya tiene una renta pendiente por entregar' });
                }
                
                Model.addRent(req.body);
                res.status(201).json({ message: 'Rent Guardado', data: req.body });
            }
        }
    }
}

exports.updateRent = (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    if (!state) {
        res.status(400).json({ message: 'Faltan datos requeridos: state' });
    } else {
        const rent = Model.getRentById(id);
        if (!rent) {
            res.status(404).json({ message: 'Rent no encontrado' });
        } else {
            Model.updateRent(id, req.body);
            res.json({ message: 'Rent actualizado', data: req.body });
        }
    }
}