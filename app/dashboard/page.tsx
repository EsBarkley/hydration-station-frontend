'use client';
//import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StationMonitor from '../components/StationMonitor';
import { useStationContext } from '../../context/StationContext';
//Objective: display a dashboard based on current selected station from the user
function Dashboard() {
  const { selectedStation, setSelectedStation } = useStationContext();
  //Function to set the station to the one selected by user
  const handleStationSelect = (station) => {
    setSelectedStation(station);
  }
  //Show loading if there is an error where no station is selected
  if (!selectedStation) {
    return <div>Loading stations...</div>; // Show loading until a station is selected
  }
  //Navigation bar on top with station monitor component showing selectedstation data
  return (
    <div>
      <Navbar onSelectStation={handleStationSelect} selectedStation={selectedStation} />
      <StationMonitor station={selectedStation} />
    </div>
  );
}

export default Dashboard;
