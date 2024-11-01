'use client';
import React, { useState } from 'react';
import { useStationContext } from '../../context/StationContext'; // Import the context

function Navbar({ onSelectStation, selectedStation }) {
  const { stations } = useStationContext(); // Access station data from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track if the dropdown is open

  // Toggle the dropdown menu open/close
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle between open/close
  };

  // Close the dropdown when a station is selected
  const handleStationClick = (station) => {
    // You can handle station selection logic here, e.g., setSelectedStation(station);
    onSelectStation(station); // Pass the selected station to the parent component
    setIsDropdownOpen(false); // Close the dropdown after selecting a station
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          {/* Menu button to toggle dropdown */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={handleDropdownToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          {/* Dropdown content: only show when isDropdownOpen is true */}
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {/* Dynamically render the station names */}
              {stations.map((station) => (
                <li key={station.id}>
                  <a
                    onClick={() => handleStationClick(station)} // Close the menu on station click
                    className={`cursor-pointer flex items-center gap-2 ${
                        selectedStation.id === station.id ? 'font-bold' : ''
                      }`}
                  >
                    <span>{station.name}</span>
                    <span className="badge badge-primary">{station.bottlescleaned}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Hydration Station</a>
      </div>

      <div className="navbar-end"></div>
    </div>
  );
}

export default Navbar;
