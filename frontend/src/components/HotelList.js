import { useState, useEffect } from 'react';
import api from '../api';

function HotelList() {
    const [destinations, setDestinations] = useState([]);
    const [selectedDest, setSelectedDest] = useState('');
    const [hotels, setHotels] = useState([]);
    const [language, setLanguage] = useState('en');  // 'en' or 'ar'
    const [error, setError] = useState('');

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

    const fetchHotels = async () => {
        if (!selectedDest) return alert('Please select a destination');

        try {
            const res = await api.get(`/hotels/${selectedDest}`);
            setHotels(res.data);
            setError('');
        } catch (err) {
            console.error('Failed to load hotels:', err);
            setError('Unable to load hotels.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2>Hotel List</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: '15px' }}>
                <label>Select Language: </label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                </select>
            </div>

            <select value={selectedDest} onChange={(e) => setSelectedDest(e.target.value)}>
                <option value="">Select Destination</option>
                {destinations.map(d => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                ))}
            </select>

            <button onClick={fetchHotels}>View Hotels</button>

            <ul>
                {hotels.map(h => (
                    <li key={h._id}>
                        <strong>{h.name[language]}</strong><br />
                        Address: {h.address}<br />
                        Stars: {h.stars} | Rating: {h.rating}<br />
                        Price From: ${h.priceFrom}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HotelList;
