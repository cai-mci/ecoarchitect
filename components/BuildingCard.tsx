
import React from 'react';
import { SavedBuilding } from '../types';
import ScoreCircle from './ScoreCircle';

// This component is a card that shows a preview of a saved building.
// It's used on the "My Buildings" page to list all projects.

interface BuildingCardProps {
  building: SavedBuilding;
  onView: () => void; // Function to call when the user clicks to view details.
}

const BuildingCard: React.FC<BuildingCardProps> = ({ building, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <ScoreCircle score={building.analysis.sustainabilityScore} />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-2xl font-bold text-green-800 mb-2">{building.name}</h3>
          <p className="text-gray-600 mb-4">{building.analysis.summary}</p>
          <button
            onClick={onView}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;
