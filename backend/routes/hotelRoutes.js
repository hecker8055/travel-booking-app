const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel');


router.post('/', async (req, res) => {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.json(hotel);
});


router.get('/:destinationId', async (req, res) => {
    const hotels = await Hotel.find({ destination: req.params.destinationId });
    res.json(hotels);
});


router.put('/:id', async (req, res) => {
    const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});


router.delete('/:id', async (req, res) => {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hotel deleted' });
});

module.exports = router;
