const Model = require('../models/models.js');

exports.createSolicitudAmistad = (req, res) => {
    const { userSend, userReq } = req.body;   
    if (!userSend || !userReq) {
        return res.status(400).json({ error: 'Se requieren tanto userSend como userReq' });
    } else if (userSend === userReq) {
        return res.status(400).json({ error: 'userSend y userReq no pueden ser el mismo usuario' });
    } else {
        const relacion = Model.findRelacion(userSend, userReq);
        if (relacion) {
            if (relacion.estado === 'pendiente') {
                return res.status(400).json({ error: 'Ya existe una solicitud de amistad pendiente entre estos usuarios' });
            } else if (relacion.estado === 'agregado') {
                return res.status(400).json({ error: 'Estos usuarios ya son amigos' });
            } else if (relacion.estado === 'rechazado') {
                req.body.estado = 'pendiente';
                const SolActu = Model.updateSolicitudAmi(relacion.id, req.body);
                res.status(201).json({ message: 'solicitud Modificada', SolActu });
            }
        } else {
            req.body.estado = 'pendiente';
            const solCreada = Model.createSolicitudAmi(req.body);
            res.status(201).json({ message: 'solicitud Guardada', solCreada });
        }
    }
}