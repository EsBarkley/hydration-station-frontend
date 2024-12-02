'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StationMonitor from '../components/StationMonitor';

// Define the Station interface
interface Station {
  id: number;
  name: string;
  bottlescleaned: number;
  soaplevel: number;
  sanitation: number;
  numbottlesfilled: number;
}

function Dashboard() {
  const [stations, setStations] = useState<Station[]>([]); // Specify the type for stations
  const [selectedStation, setSelectedStation] = useState<Station | null>(null); // Specify the type for selectedStation
  
  // Placeholder data for stations
  const placeholderStations: Station[] = [
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
    },
    {
      id: 4,
      name: 'Hydration Station 4',
      bottlescleaned: 15,
      soaplevel: 10,
      sanitation: 8,
      numbottlesfilled: 5
    },
    {
      id: 5,
      name: 'Hydration Station 5',
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
  const handleStationSelect = (station: Station) => {
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
