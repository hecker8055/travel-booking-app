import { useState } from 'react';
import api from '../api';

function AddDestination() {
    const [form, setForm] = useState({ name: '', country: '', description: '', lat: '', lon: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/destinations', {
                name: form.name,
                country: form.country,
                description: form.description,
                coordinates: { lat: parseFloat(form.lat), lon: parseFloat(form.lon) }
            });
            setSuccess('Destination added successfully');
            setError('');
            setForm({ name: '', country: '', description: '', lat: '', lon: '' });
        } catch (err) {
            console.error(err);
            setError('Failed to add destination');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Destination</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required />
            <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <input placeholder="Latitude" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} required />
            <input placeholder="Longitude" value={form.lon} onChange={(e) => setForm({ ...form, lon: e.target.value })} required />

            <button type="submit">Add Destination</button>
        </form>
    );
}

export default AddDestination;
