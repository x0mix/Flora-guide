
import React, { useState, useRef } from 'react';
import { identifyPlant } from '../services/geminiService';
import { PlantCareInfo } from '../types';

interface PlantIdentifierProps {
  onPlantIdentified: (plant: PlantCareInfo) => void;
}

const PlantIdentifier: React.FC<PlantIdentifierProps> = ({ onPlantIdentified }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      // Prepare for API
      const base64Promise = new Promise<string>((resolve) => {
        const r = new FileReader();
        r.onload = () => {
          const result = r.result as string;
          resolve(result.split(',')[1]);
        };
        r.readAsDataURL(file);
      });

      const base64 = await base64Promise;
      const result = await identifyPlant(base64);
      onPlantIdentified(result);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setError('Failed to identify plant. Please try another photo.');
    } finally {
      setLoading(false);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
        {preview ? (
          <div className="relative w-full max-w-xs aspect-square mb-4">
            <img src={preview} alt="Plant Preview" className="w-full h-full object-cover rounded-2xl shadow-md" />
            {loading && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Identify Any Plant</h2>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">Snap a photo of your plant to get instant identification and care advice.</p>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        <button 
          onClick={triggerUpload}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? 'Analyzing...' : preview ? 'Try Another' : 'Take a Photo'}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>

        {error && <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="bg-blue-50 p-2 rounded-xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-800">10,000+</span>
          <span className="text-xs text-gray-500">Species Database</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="bg-orange-50 p-2 rounded-xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-800">Real-time</span>
          <span className="text-xs text-gray-500">AI Analysis</span>
        </div>
      </div>
    </div>
  );
};

export default PlantIdentifier;
