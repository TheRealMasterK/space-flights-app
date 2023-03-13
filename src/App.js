import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [flights, setFlights] = useState([]);

  // Use the useEffect hook to fetch data from the SpaceX API when the component mounts
  useEffect(() => {
    // Make a GET request to the SpaceX flights API using the axios library
    axios.get('https://api.spacexdata.com/v2/launches')
      .then((res) => {
        // Update the state with the retrieved data
        setFlights(res.data);
      })
      .catch((err) => {
        // Handle any errors that occur during the request
        console.log('Error while fetching from the SpaceX API: ', err);
      });
  }, []);

  // Render the flight data in an unordered list
  return (
    <ul className='flights-list'>
      {flights.map((flight) => (
        <li key={flight.flight_number}>
          <div className='flight-info'>
            <img src={flight.links.mission_patch_small}
            alt={flight.mission_name} />
          </div>
          <div className='flight-data'>
            <h2>{flight.mission_name}</h2>
            <p>Flight Number: {flight.flight_number}</p>
            <p>Launched Date: {flight.launch_date_utc}</p>
            <p>Flight Details: {flight.details}</p>
            <p>Launch Year: {flight.launch_year}</p>
            {flight.links.article && flight.links.article.link && <a href={flight.links.article.link}>Read more about the launch</a>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default App;