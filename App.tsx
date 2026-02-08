
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PlantIdentifier from './components/PlantIdentifier';
import PlantDetail from './components/PlantDetail';
import GardeningChat from './components/GardeningChat';
import { AppTab, PlantCareInfo } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.IDENTIFY);
  const [selectedPlant, setSelectedPlant] = useState<PlantCareInfo | null>(null);
  const [history, setHistory] = useState<PlantCareInfo[]>([]);

  // Load history from session or local storage
  useEffect(() => {
    const saved = localStorage.getItem('plant_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const handlePlantIdentified = (plant: PlantCareInfo) => {
    setSelectedPlant(plant);
    // Update history, avoiding duplicates
    setHistory(prev => {
      const exists = prev.find(p => p.name === plant.name);
      if (exists) return prev;
      const newHistory = [plant, ...prev].slice(0, 20); // Keep last 20
      localStorage.setItem('plant_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const renderContent = () => {
    if (activeTab === AppTab.IDENTIFY) {
      if (selectedPlant) {
        return <PlantDetail plant={selectedPlant} onBack={() => setSelectedPlant(null)} />;
      }
      return <PlantIdentifier onPlantIdentified={handlePlantIdentified} />;
    }

    if (activeTab === AppTab.CHAT) {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <GardeningChat />
        </div>
      );
    }

    if (activeTab === AppTab.HISTORY) {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl font-bold text-gray-800">My Collection</h2>
          {history.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400">Your garden is empty. Start by identifying a plant!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {history.map((plant, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    setSelectedPlant(plant);
                    setActiveTab(AppTab.IDENTIFY);
                  }}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all text-left"
                >
                  <div>
                    <h3 className="font-bold text-gray-800">{plant.name}</h3>
                    <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
