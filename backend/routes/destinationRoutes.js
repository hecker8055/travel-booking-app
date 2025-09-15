const express = require('express');
const router = express.Router();
const Destination = require('../models/destination');


router.post('/', async (req, res) => {
    const destination = new Destination(req.body);
    await destination.save();
    res.json(destination);
});


router.get('/', async (req, res) => {
    const destinations = await Destination.find();
    res.json(destinations);
});


router.put('/:id', async (req, res) => {
    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});


router.delete('/:id', async (req, res) => {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted' });
});

module.exports = router;
