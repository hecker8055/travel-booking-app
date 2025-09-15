import AddDestination from './components/AddDestination';
import AddHotel from './components/AddHotel';
import HotelList from './components/HotelList';
import './styles.css';

function App() {
    return (
        <div>
            <h1>Travel Booking App</h1>

            <div className="cards-container">
                <div className="card">
                    <AddDestination />
                </div>

                <div className="card">
                    <AddHotel />
                </div>
            </div>

            <HotelList />
        </div>
    );
}

export default App;
