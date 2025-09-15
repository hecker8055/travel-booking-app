import { useState, useEffect } from 'react';
import api from '../api';

function AddHotel() {
    const [destinations, setDestinations] = useState([]);
    const [form, setForm] = useState({
        name: { en: '', ar: '' },
        address: '',
        stars: '',
        rating: '',
        priceFrom: '',
        destinationId: '',
        roomTypes: [],
        nearbyAttractions: [],
        photos: []
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await api.get('/destinations');
                setDestinations(res.data);
            } catch (err) {
                console.error('Failed to load destinations:', err);
                setError('Unable to load destinations.');
            }
        };

        fetchDestinations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/hotels', {
                name: form.name,  // { en: "...", ar: "..." }
                address: form.address,
                stars: Number(form.stars),
                rating: Number(form.rating),
                priceFrom: Number(form.priceFrom),
                destination: form.destinationId,
                roomTypes: [
                    {
                        name: 'Deluxe Room',
                        price: 250,
                        facilities: ['Free Wi-Fi', 'AC', 'Balcony']
                    },
                    {
                        name: 'Suite',
                        price: 400,
                        facilities: ['Living Area', 'Mini Bar', 'Jacuzzi']
                    }
                ],
                nearbyAttractions: [
                    { name: 'Eiffel Tower', distance: '2.1 km' },
                    { name: 'Louvre Museum', distance: '1.5 km' }
                ],
                photos: [{ url: 'https://example.com/photos/hotel1.jpg' }]
            });

            setSuccess('Hotel added successfully');
            setError('');
            setForm({
                name: { en: '', ar: '' },
                address: '',
                stars: '',
                rating: '',
                priceFrom: '',
                destinationId: '',
                roomTypes: [],
                nearbyAttractions: [],
                photos: []
            });
        } catch (err) {
            console.error('Failed to add hotel:', err);
            setError('Failed to add hotel');
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
            <h2>Add New Hotel</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <input
                placeholder="Hotel Name (English)"
                value={form.name.en}
                onChange={(e) => setForm({ ...form, name: { ...form.name, en: e.target.value } })}
                required
            />

            <input
                placeholder="Hotel Name (Arabic)"
                value={form.name.ar}
                onChange={(e) => setForm({ ...form, name: { ...form.name, ar: e.target.value } })}
                required
            />

            <input
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
            />

            <input
                placeholder="Stars (e.g., 5)"
                type="number"
                value={form.stars}
                onChange={(e) => setForm({ ...form, stars: e.target.value })}
                required
            />

            <input
                placeholder="Rating (e.g., 4.7)"
                type="number"
                step="0.1"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                required
            />

            <input
                placeholder="Price From (USD)"
                type="number"
                value={form.priceFrom}
                onChange={(e) => setForm({ ...form, priceFrom: e.target.value })}
                required
            />

            <select
                value={form.destinationId}
                onChange={(e) => setForm({ ...form, destinationId: e.target.value })}
                required
            >
                <option value="">Select Destination</option>
                {destinations.map(d => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                ))}
            </select>

            <button type="submit">Add Hotel</button>
        </form>
    );
}

export default AddHotel;
