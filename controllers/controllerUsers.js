const Model = require('../models/models.js');
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
    res.json(Model.getUsers());
};

exports.createUser = (req, res) => {
    console.log("body", req.body);
    const { email, password, repassword, userName } = req.body;
    console.log(Model.getUserByUserName(userName))
    if (!email || !password || !repassword || !userName) {
        res.status(400).json({ message: 'Faltan datos requeridos: email, password, repetir password, userName' });
    } else if (password !== repassword) {
        res.status(400).json({ message: 'Las contraseñas no coinciden' });
    } else if (Model.getUserByUserName(userName)) {
        res.status(400).json({ message: 'El nombre de usuario ya está registrado' });        
    } else {
        const user = Model.getUserByEmail(email);
        if (user) {
            res.status(400).json({ message: 'El email ya está registrado' });
        } else {
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            req.body.password = hashedPassword;
            Model.addUser(req.body);
            res.status(201).json({ message: 'User Guardado', data: req.body });
        }
    }
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { email, password, repassword } = req.body;
    if (!email) {
        res.status(400).json({ message: 'Debe ingresar el email' });
    } else {
        const user = Model.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            Model.updateUser(id, req.body);
            res.status(200).json({ message: 'Usuario Actualizado', data: req.body });
        }
    }
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const user = Model.getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
        const rentHistory = Model.getUserRentHistory(id);
        if (rentHistory && rentHistory.length > 0) {
            return res.status(400).json({ message: 'El usuario tiene rentas y no puede ser eliminado' });
        }
        Model.deleteUser(id);
        res.status(200).json({ message: 'Usuario Eliminado' });
    }
};

exports.getUser = (req, res) => {
    const { id } = req.params;
    const user = Model.getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
        const { state } = req.body;
        const validStates = ['Pending', 'Finished'];

        if (state && validStates.includes(state)) {
            const rentHistory = Model.getUserRentHistoryByState(id, state);
            res.status(200).json({ user, rentHistory });
            return;
        }
        const rentHistory = Model.getUserRentHistory(id);
        res.status(200).json({ user, rentHistory });
    }
}