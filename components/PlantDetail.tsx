
import React from 'react';
import { PlantCareInfo } from '../types';

interface PlantDetailProps {
  plant: PlantCareInfo;
  onBack: () => void;
}

const PlantDetail: React.FC<PlantDetailProps> = ({ plant, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-4 text-emerald-700 font-semibold flex items-center gap-1 hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to scan
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
        <div className="bg-emerald-600 p-8 text-white relative">
          <div className="absolute top-4 right-4 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2C11.5,2,11,2.1,10.5,2.3c-4.8,1.5-8.3,6-8.5,11.2C2,13.8,2,14.2,2,14.5c0,4.1,3.4,7.5,7.5,7.5c2.1,0,4-0.9,5.4-2.3 c1.4,1.4,3.3,2.3,5.4,2.3c4.1,0,7.5-3.4,7.5-7.5c0-0.3,0-0.7,0-1c-0.2-5.2-3.7-9.7-8.5-11.2C13.8,2.1,13,2,12.5,2L12,2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold">{plant.name}</h2>
          <p className="text-emerald-100 italic text-lg opacity-90">{plant.scientificName}</p>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              About
            </h3>
            <p className="text-gray-600 leading-relaxed">{plant.description}</p>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-1 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                Watering
              </div>
              <p className="text-sm text-gray-700">{plant.watering}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-700 font-bold mb-1 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                Sunlight
              </div>
              <p className="text-sm text-gray-700">{plant.sunlight}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-orange-700 font-bold mb-1 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Soil
              </div>
              <p className="text-sm text-gray-700">{plant.soil}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-red-700 font-bold mb-1 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Temp
              </div>
              <p className="text-sm text-gray-700">{plant.temperature}</p>
            </div>
          </div>

          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-400 rounded-full"></span>
              Common Issues
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {plant.commonIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </section>

          <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-2xl">
            <h4 className="font-bold text-emerald-800 text-sm mb-1">Did you know?</h4>
            <p className="text-emerald-700 italic text-sm">{plant.funFact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
