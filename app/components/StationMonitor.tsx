// components/StationMonitor.tsx
'use client'
import React from 'react';

function StationMonitor({ station }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{station.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Bottles Cleaned</h3>
          <p>{station.bottlescleaned}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Soap Level</h3>
          <p>{station.soaplevel}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Sanitation</h3>
          <p>{station.sanitation}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Bottles Filled</h3>
          <p>{station.numbottlesfilled}</p>
        </div>
      </div>
    </div>
  );
}

export default StationMonitor;
