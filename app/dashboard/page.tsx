'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StationMonitor from '../components/StationMonitor';

function Dashboard() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  
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

  // Navigation bar on top with station monitor component showing selected station data
  return (
    <div>
      <Navbar stations={stations} onSelectStation={handleStationSelect} selectedStation={selectedStation} />
      <StationMonitor station={selectedStation} />
    </div>
  );
}

export default Dashboard;
