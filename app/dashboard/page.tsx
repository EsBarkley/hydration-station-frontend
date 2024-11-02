'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [stations, setStations] = useState([]); // Local state for storing stations
  const [selectedStation, setSelectedStation] = useState(null); // Local state for the selected station

  // Function to load stations from the API
  const loadStations = async () => {
    try {
      const response = await fetch('/api/get'); // Replace with your actual API route
      const data = await response.json();
      setStations(data); // Set the fetched stations
      if (data.length > 0 && !selectedStation) {
        setSelectedStation(data[0]); // Set the first station as default if not set
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  // Load stations when component mounts
  useEffect(() => {
    loadStations();
  }, []);

  // Show loading if there is an error where no station is selected
  if (!selectedStation) {
    return <div>Loading stations...</div>; // Show loading until a station is selected
  }

  // Function to set the station to the one selected by user
  const handleStationSelect = (station) => {
    setSelectedStation(station);
  };

  // Navigation bar on top
  return (
    <div>
      <Navbar stations={stations} onSelectStation={handleStationSelect} selectedStation={selectedStation} />
      {/* If you need to render something based on selectedStation, add it here */}
      {/* Example: <div>{selectedStation.name}</div> */}
    </div>
  );
}

export default Dashboard;
