'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StationMonitor from '../components/StationMonitor';

function Dashboard() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  
  // Placeholder data for stations
  const placeholderStations = [
    {
      id: 1,
      name: 'Hydration Station 1',
      bottlescleaned: 25,
      soaplevel: 12,
      sanitation: 10,
      numbottlesfilled: 10
    },
    {
      id: 2,
      name: 'Hydration Station 2',
      bottlescleaned: 30,
      soaplevel: 8,
      sanitation: 9,
      numbottlesfilled: 15
    },
    {
      id: 3,
      name: 'Hydration Station 3',
      bottlescleaned: 15,
      soaplevel: 10,
      sanitation: 8,
      numbottlesfilled: 5
    }
  ];

  // Set placeholder stations on mount
  useEffect(() => {
    setStations(placeholderStations);
    if (placeholderStations.length > 0) {
      setSelectedStation(placeholderStations[0]); // Set the first station as default
    }
  }, []);

  // Show loading if no station is selected
  if (!selectedStation) {
    return <div>Loading stations...</div>; // You may change this message if needed
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
