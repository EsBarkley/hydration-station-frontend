'use client';
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of the station data
interface Station {
  id: number;
  name: string;
  bottlescleaned: number;
  soaplevel: number;
  sanitation: number;
  numbottlesfilled: number;
}

// Define the shape of the context state and actions
interface StationContextType {
  stations: Station[];
  selectedStation: Station | null;
  setSelectedStation: (station: Station) => void;
  loadStations: () => Promise<void>;  // Add loadStations to the context type
}

// Create the context
const StationContext = createContext<StationContextType | undefined>(undefined);

// Hook to use the station context
export const useStationContext = () => {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error('useStationContext must be used within a StationProvider');
  }
  return context;
};

// Station Provider component
export const StationProvider = ({ children }: { children: ReactNode }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  // Function to load stations (initial load or refresh)
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

  // Polling mechanism to regularly update station data
  useEffect(() => {
    // Initial load of stations after login
    loadStations();

    // Set up interval to poll every 5 seconds
    const intervalId = setInterval(() => {
      console.log('Fetching latest station data...');
      loadStations(); // Poll for updated stations
    }, 5000); // Poll every 5 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StationContext.Provider value={{ stations, selectedStation, setSelectedStation, loadStations }}>
      {children}
    </StationContext.Provider>
  );
};
