const Model = require('../models/models.js');

exports.getFeed = (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }
    res.json(Model.getFeed(id));
};