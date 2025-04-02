"use client";

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { FaExpand, FaBalanceScale } from 'react-icons/fa';

const ChartComponent = dynamic(() => import('./components/ChartComponent'), { ssr: false });

const ChartPage = () => {
  const [timeRange, setTimeRange] = useState('1w');
  const [activeTab, setActiveTab] = useState('Chart'); 
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isComparing, setIsComparing] = useState(false); 
  const chartContainerRef = useRef(null);
  const timeRanges = ['1d', '3d', '1w', '1m', '6m', '1y', 'max'];
  const tabs = ['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings'];

  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      chartContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  
  const toggleCompare = () => {
    setIsComparing((prev) => !prev);
  };

 
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Summary':
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
            <p className="text-gray-600 mt-2">
              This is the summary tab. You can display an overview of the data here, such as key metrics, recent trends, or a brief description.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li>Current Price: 63,179.71 USD</li>
              <li>24h Change: +2,161.42 (3.54%)</li>
              <li>Market Cap: $1.2T</li>
            </ul>
          </div>
        );
      case 'Chart':
        return (
          <div ref={chartContainerRef}>
            <ChartComponent isComparing={isComparing} />
          </div>
        );
      case 'Statistics':
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Statistics</h2>
            <p className="text-gray-600 mt-2">
              This is the statistics tab. You can display detailed stats here, such as historical data, volume, or other metrics.
            </p>
            <table className="mt-4 w-full text-gray-600 border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Metric</th>
                  <th className="text-left py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">All-Time High</td>
                  <td className="py-2">69,000 USD</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">All-Time Low</td>
                  <td className="py-2">67.81 USD</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Trading Volume (24h)</td>
                  <td className="py-2">$30B</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Analysis':
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Analysis</h2>
            <p className="text-gray-600 mt-2">
              This is the analysis tab. You can include technical analysis, predictions, or insights here.
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700">Recent Trends</h3>
              <p className="text-gray-600">
                The price has shown a bullish trend over the past week, with a 3.54% increase. Support levels are around 60,000 USD, with resistance at 65,000 USD.
              </p>
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
            <p className="text-gray-600 mt-2">
              This is the settings tab. You can add options to customize the chart or user preferences here.
            </p>
            <div className="mt-4">
              <label className="block text-gray-700">Chart Theme</label>
              <select className="mt-1 p-2 border rounded w-full max-w-xs">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
       
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">63,179.71 USD</h1>
            <p className="text-green-500 text-sm">+2,161.42 (3.54%)</p>
          </div>
        </div>

      
        <div className="flex space-x-4 border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

     
        {activeTab === 'Chart' && (
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button
                onClick={toggleFullscreen}
                className="flex items-center text-gray-500 hover:text-blue-600"
              >
                <FaExpand className="mr-1" />
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
              <button
                onClick={toggleCompare}
                className="flex items-center text-gray-500 hover:text-blue-600"
              >
                <FaBalanceScale className="mr-1" />
                {isComparing ? 'Hide Comparison' : 'Compare'}
              </button>
            </div>
            <div className="flex space-x-2">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        )}

       
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ChartPage;