import React, { useState } from 'react';
import { SavedBuilding, Page, RecommendationCategory } from '../types';
import ScoreCircle from './ScoreCircle';

// This page shows the detailed analysis results for a single building.

interface BuildingViewPageProps {
  building: SavedBuilding;
  onNavigate: (page: Page, id?: string) => void;
}

const BuildingViewPage: React.FC<BuildingViewPageProps> = ({ building, onNavigate }) => {
  if (!building) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold">Building not found.</h2>
      </div>
    );
  }

  const { name, analysis, ...details } = building;
  const locationString = `${details.region}, ${details.continent}`;

  return (
    <div className="min-h-screen bg-stone-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-4xl font-extrabold text-green-800 mb-4 md:mb-0">{name}</h1>
          <button
            onClick={() => onNavigate(Page.AddBuilding, building.id)}
            className="bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
            Edit Building
          </button>
        </div>

        {/* Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1 flex flex-col items-center bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Sustainability Score</h2>
            <ScoreCircle score={analysis.sustainabilityScore} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">AI Recommendations</h2>
            <div className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <RecommendationAccordion key={index} category={rec} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Building Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg">
            <DetailItem label="Location" value={locationString} icon="location" />
            <DetailItem label="Purpose" value={details.purpose === 'Other' ? details.otherPurpose! : details.purpose} icon="purpose" />
            <DetailItem label="Floors" value={String(details.floors)} icon="floors" />
            <DetailItem label="Area" value={`${details.area} sq ft`} icon="area" />
            <DetailItem label="Location Type" value={details.locationType} icon="locationType" />
            <DetailItem label="Architectural Style" value={details.architecturalStyle} icon="style" />
            <DetailItem label="Materials" value={details.materials} icon="materials" />
            <DetailItem label="Waste Reduction" value={details.wasteReduction} icon="waste" />
            <DetailItem label="Energy Efficiency" value={details.energyEfficiency.join(', ') || 'N/A'} icon="energy" />
            <DetailItem label="Resource Efficiency" value={details.resourceEfficiency.join(', ') || 'N/A'} icon="resource" />
            <DetailItem label="Water Usage" value={details.waterUsage.join(', ') || 'N/A'} icon="water" />
            <div className="md:col-span-2 lg:col-span-3">
                <DetailItem label="Additional Considerations" value={details.additionalConsiderations || 'N/A'} icon="additional" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Accordion component for displaying categorized recommendations
const RecommendationAccordion: React.FC<{ category: RecommendationCategory }> = ({ category }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border rounded-lg overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 bg-green-50 hover:bg-green-100 focus:outline-none">
                <span className="font-bold text-green-800">{category.category}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-green-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <ul className="p-4 space-y-3 bg-white">
                    {category.items.map((rec, index) => (
                        <li key={index} className="flex items-start">
                            <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-3 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-600">{rec}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// A map of icons for the detail items
// FIX: Wrapped adjacent JSX elements in fragments (<>) to fix parsing error.
const icons: { [key: string]: JSX.Element } = {
    location: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
    purpose: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    floors: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 4v-4m0 4h18v-4m0 4v-4m-2-4v4m-14-4v4m14-4V3M3 7v4m0-4h18V3H3v4zm2-2h2m12 0h2M7 5h2m4 0h2" />,
    area: <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z" clipRule="evenodd" />,
    locationType: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    style: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    materials: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    waste: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    energy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    resource: <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />,
    water: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" /></>,
    additional: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
};

// A helper component to display a label, value, and icon.
const DetailItem: React.FC<{ label: string, value: string, icon: string }> = ({ label, value, icon }) => (
  <div className="flex items-start gap-4">
      <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[icon] || icons.additional}
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="text-lg text-gray-800">{value}</p>
      </div>
  </div>
);

export default BuildingViewPage;