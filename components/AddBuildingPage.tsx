import React, { useState, useEffect, useCallback } from 'react';
import { Building, SavedBuilding, Page } from '../types';
import { getLocationSummary, getSustainabilityAnalysis } from '../services/geminiService';

// This is the main page for creating or editing a building. It's the most complex component.

interface AddBuildingPageProps {
  onSave: (building: SavedBuilding) => void; // Callback when a building is saved
  existingBuilding?: SavedBuilding; // Optional: data for an existing building to edit
  onNavigate: (page: Page, id?: string) => void; // Navigation callback
}

// Initial state for a new building form.
const getInitialBuildingState = (existing?: SavedBuilding): Building => ({
  id: existing?.id || crypto.randomUUID(),
  name: existing?.name || 'New Eco-Home',
  continent: existing?.continent || '',
  region: existing?.region || '',
  purpose: existing?.purpose || 'Residential',
  otherPurpose: existing?.otherPurpose || '',
  floors: existing?.floors || '1-5',
  area: existing?.area || 1500,
  locationType: existing?.locationType || 'Suburban',
  materials: existing?.materials || 'Type 5: Wood-Framed',
  architecturalStyle: existing?.architecturalStyle || 'Contemporary',
  wasteReduction: existing?.wasteReduction || 'Recycling System',
  energyEfficiency: existing?.energyEfficiency || [],
  resourceEfficiency: existing?.resourceEfficiency || [],
  waterUsage: existing?.waterUsage || [],
  additionalConsiderations: existing?.additionalConsiderations || '',
});

const AddBuildingPage: React.FC<AddBuildingPageProps> = ({ onSave, existingBuilding, onNavigate }) => {
  // State for the building data being entered in the form.
  const [building, setBuilding] = useState<Building>(getInitialBuildingState(existingBuilding));
  // State for the AI-generated location summary.
  const [locationSummary, setLocationSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formStep, setFormStep] = useState(0); // Manages which part of the form is visible

  // Handler for form input changes.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBuilding(prev => ({ ...prev, [name]: name === 'area' ? parseInt(value) : value }));
  };

  // Handler for checkbox changes.
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setBuilding(prev => {
      const list = prev[name as keyof Building] as string[];
      if (checked) {
        return { ...prev, [name]: [...list, value] };
      } else {
        return { ...prev, [name]: list.filter(item => item !== value) };
      }
    });
  };

  // Fetches the location summary when the location changes.
  const fetchLocationSummary = useCallback(async () => {
    if (building.continent && building.region) {
      setIsSummaryLoading(true);
      const summary = await getLocationSummary(building.continent, building.region);
      setLocationSummary(summary);
      setIsSummaryLoading(false);
    }
  }, [building.continent, building.region]);

  // useEffect hook to call fetchLocationSummary when the component mounts if a location is already set.
  useEffect(() => {
    if (building.continent && building.region) {
      fetchLocationSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handles the final submission: analyzing and saving.
  const handleSubmit = async () => {
    if (!building.name.trim()) {
        alert("Please provide a name for your building.");
        return;
    }
    if (!building.continent || !building.region) {
        alert("Please select a continent and region for your building.");
        return;
    }
    if (building.purpose === 'Other' && !building.otherPurpose?.trim()) {
        alert("Please specify the purpose in the text field.");
        return;
    }
    setIsAnalyzing(true);
    const analysis = await getSustainabilityAnalysis(building);
    const savedBuilding: SavedBuilding = { ...building, analysis };
    onSave(savedBuilding);
    setIsAnalyzing(false);
    onNavigate(Page.ViewBuilding, savedBuilding.id); // Go to results page after saving
  };
  
  const formSteps = [
    "Basic Info", "Style & Material", "Efficiency", "Additional", "Review & Submit"
  ];
  
  const renderFormStep = () => {
    // A switch statement to render the correct part of the form based on the current step.
    switch(formStep) {
        case 0: // Basic Info
            return <>
                <label className="block mb-2 font-semibold">Building Name</label>
                <input type="text" name="name" value={building.name} onChange={handleChange} className="w-full p-2 border rounded mb-4" />
                <label className="block mb-2 font-semibold">Purpose</label>
                <select name="purpose" value={building.purpose} onChange={handleChange} className="w-full p-2 border rounded mb-4">
                    <option>Residential</option><option>Commercial</option><option>Industrial</option><option>Institutional</option><option>Educational</option><option>Assembly</option><option>Mixed-Use</option><option>Other</option>
                </select>
                {building.purpose === 'Other' && (
                    <div className="mb-4 animate-fade-in">
                        <label className="block mb-2 font-semibold">Please specify purpose:</label>
                        <input type="text" name="otherPurpose" value={building.otherPurpose} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                )}
                <label className="block mb-2 font-semibold">Floors</label>
                <select name="floors" value={building.floors} onChange={handleChange} className="w-full p-2 border rounded mb-4">
                    <option>1-5</option><option>6-10</option><option>10-15</option><option>16-20</option>
                </select>
                <label className="block mb-2 font-semibold">Area (sq ft)</label>
                <input type="number" name="area" value={building.area} onChange={handleChange} className="w-full p-2 border rounded mb-4" />
                <label className="block mb-2 font-semibold">Type of Location</label>
                <select name="locationType" value={building.locationType} onChange={handleChange} className="w-full p-2 border rounded">
                    <option>Urban</option><option>Suburban</option><option>Rural</option>
                </select>
            </>;
        case 1: // Style & Material
            return <>
                <label className="block mb-2 font-semibold">Architectural Style</label>
                <select name="architecturalStyle" value={building.architecturalStyle} onChange={handleChange} className="w-full p-2 border rounded mb-4">
                    <option>Contemporary</option><option>Neoclassical</option><option>Art Deco</option><option>Victorian</option><option>Mid-Century Modern</option><option>Tudor</option>
                </select>
                <label className="block mb-2 font-semibold">Materials Used</label>
                <select name="materials" value={building.materials} onChange={handleChange} className="w-full p-2 border rounded">
                    <option>Type 1: Fire-Resistive (concrete, steel)</option><option>Type 2: Non-Combustible (masonry, metal)</option><option>Type 3: Ordinary (masonry, wood)</option><option>Type 4: Heavy Timber</option><option>Type 5: Wood-Framed</option>
                </select>
            </>;
        case 2: // Efficiency
            return <>
                <label className="block mb-2 font-semibold">Waste Reduction</label>
                <select name="wasteReduction" value={building.wasteReduction} onChange={handleChange} className="w-full p-2 border rounded mb-4">
                    <option>Trash System</option><option>Recycling System</option><option>Composting System</option>
                </select>
                <CheckboxGroup title="Energy Efficiency" name="energyEfficiency" options={["Solar Power", "Solar Thermal", "Geothermal", "Wind/Bioenergy"]} checkedItems={building.energyEfficiency} onChange={handleCheckboxChange} />
                <CheckboxGroup title="Resource Efficiency" name="resourceEfficiency" options={["Thermal Mass", "Strategic Building Orientation", "Maximized Natural Light", "High-Performance Building Envelope"]} checkedItems={building.resourceEfficiency} onChange={handleCheckboxChange} />
                <CheckboxGroup title="Water Usage" name="waterUsage" options={["Low-Flow Fixtures", "Rainwater Harvesting"]} checkedItems={building.waterUsage} onChange={handleCheckboxChange} />
            </>;
        case 3: // Additional
             return <>
                <label className="block mb-2 font-semibold">Additional Considerations</label>
                <textarea name="additionalConsiderations" value={building.additionalConsiderations} onChange={handleChange} rows={10} className="w-full p-2 border rounded" placeholder="Mention any other green features, like green roofs, smart home technology, proximity to public transit, etc."></textarea>
            </>;
        case 4: // Review
            return <div className="space-y-2 text-gray-700">
                 {Object.entries(building).map(([key, value]) => {
                    if (key === 'id' || (key === 'otherPurpose' && building.purpose !== 'Other')) return null;
                    const displayValue = key === 'purpose' && value === 'Other' ? building.otherPurpose : (Array.isArray(value) ? value.join(', ') : String(value));
                    return (
                        <div key={key} className="flex justify-between py-1 border-b">
                            <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> 
                            <span className="text-right">{displayValue || 'N/A'}</span>
                        </div>
                    );
                })}
            </div>;
        default: return null;
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
        {/* Left Panel: Location */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Location</h2>
          <p className="text-gray-600 mb-6">Select your building's location to get tailored climate-based suggestions from our AI.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <select name="continent" value={building.continent} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg">
                <option value="">-- Continent --</option>
                <option>North America</option><option>South America</option><option>Europe</option><option>Africa</option><option>Asia</option><option>Australia</option><option>Antarctica</option>
            </select>
            <select name="region" value={building.region} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg">
                <option value="">-- Region --</option>
                <option>North</option><option>South</option><option>East</option><option>West</option><option>Central</option>
            </select>
          </div>
          <button onClick={fetchLocationSummary} disabled={!building.continent || !building.region || isSummaryLoading} className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors">
            {isSummaryLoading ? 'Loading...' : 'Get Location Insights'}
          </button>
          {locationSummary && (
            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg animate-fade-in">
              <h4 className="font-bold text-green-900">AI Location Summary:</h4>
              <p className="text-green-800">{locationSummary}</p>
            </div>
          )}
        </div>

        {/* Right Panel: Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-green-800 mb-4">{existingBuilding ? 'Edit Building Details' : 'New Building Details'}</h2>
          
          {/* Mini Nav for Form Steps */}
          <div className="mb-6 flex flex-wrap border-b border-gray-200">
            {formSteps.map((step, index) => (
                <button key={index} onClick={() => setFormStep(index)} className={`py-2 px-4 text-sm font-medium transition-colors ${formStep === index ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}>
                    {step}
                </button>
            ))}
          </div>

          <div className="min-h-[300px]">{renderFormStep()}</div>
          
          {/* Form Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button onClick={() => setFormStep(s => Math.max(0, s-1))} disabled={formStep === 0} className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg disabled:opacity-50 hover:bg-gray-400">Back</button>
            {formStep < formSteps.length - 1 ? (
              <button onClick={() => setFormStep(s => Math.min(formSteps.length - 1, s+1))} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700">Next</button>
            ) : (
              <button onClick={handleSubmit} disabled={isAnalyzing} className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400">
                {isAnalyzing ? 'Analyzing...' : 'Analyze & Save'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for creating groups of checkboxes.
const CheckboxGroup: React.FC<{title: string, name: string, options: string[], checkedItems: string[], onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({title, name, options, checkedItems, onChange}) => (
    <div className="mb-4">
        <label className="block mb-2 font-semibold">{title}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map(option => (
                <label key={option} className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" name={name} value={option} checked={checkedItems.includes(option)} onChange={onChange} className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                    <span className="ml-2 text-gray-700">{option}</span>
                </label>
            ))}
        </div>
    </div>
);

export default AddBuildingPage;