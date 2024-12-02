'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Station {
  id: number;
  name: string;
  bottlescleaned: number;
  soaplevel: number;
  sanitation: number;
  numbottlesfilled: number;
}

interface SensorData {
  sensor_id: number;
  value: number;
  timestamp: string;
}

function StationMonitor({ station }: { station: Station }) {
  const [soapLevelData, setSoapLevelData] = useState<SensorData[]>([]);
  const [bottlesCleanedData, setBottlesCleanedData] = useState<SensorData[]>([]);
  const [latestValues, setLatestValues] = useState({
    soapLevel: 0,
    bottlesCleaned: 0,
    numBottlesFilled: 0,
    sanitation: 0,
  });

  useEffect(() => {
    const ws = new WebSocket('wss://a40gu1xmfa.execute-api.us-west-2.amazonaws.com/production/');

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'selectMachine', machine_id: station.id }));
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data) as SensorData[];

      // Update sensor data for graphs
      setSoapLevelData(
        newData
          .filter((data) => data.sensor_id === 1)
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      );

      setBottlesCleanedData(
        newData
          .filter((data) => data.sensor_id === 2)
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      );

      // Update latest values
      const latest = {
        soapLevel: newData.find((data) => data.sensor_id === 1)?.value || 0,
        bottlesCleaned: newData.find((data) => data.sensor_id === 2)?.value || 0,
        numBottlesFilled: newData.find((data) => data.sensor_id === 3)?.value || 0,
        sanitation: newData.find((data) => data.sensor_id === 4)?.value || 0,
      };
      setLatestValues(latest);
    };

    return () => ws.close(); // Cleanup WebSocket connection on unmount
  }, [station.id]);

  // Prepare chart data for Soap Level
  const soapLevelLabels = soapLevelData.map((d) => new Date(d.timestamp).toLocaleTimeString());
  const soapLevelValues = soapLevelData.map((d) => d.value);

  const soapLevelChartData = {
    labels: soapLevelLabels,
    datasets: [
      {
        label: `Soap Level for ${station.name}`,
        data: soapLevelValues,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Prepare chart data for Bottles Cleaned
  const bottlesCleanedLabels = bottlesCleanedData.map((d) => new Date(d.timestamp).toLocaleTimeString());
  const bottlesCleanedValues = bottlesCleanedData.map((d) => d.value);

  const bottlesCleanedChartData = {
    labels: bottlesCleanedLabels,
    datasets: [
      {
        label: `Bottles Cleaned for ${station.name}`,
        data: bottlesCleanedValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Value' } },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{station.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Bottles Cleaned</h3>
          <p>{latestValues.bottlesCleaned}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Soap Level</h3>
          <p>{latestValues.soapLevel*100}%</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Sanitation</h3>
          <p>{latestValues.sanitation}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Bottles Filled</h3>
          <p>{latestValues.numBottlesFilled}</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold">Soap Level Sensor Data</h3>
        <Line data={soapLevelChartData} options={chartOptions} />
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold">Bottles Cleaned Sensor Data</h3>
        <Line data={bottlesCleanedChartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default StationMonitor;
