
import React from 'react';
import { SavedBuilding, Page } from '../types';
import BuildingCard from './BuildingCard';

// This page displays a grid of all the buildings the user has saved.

interface MyBuildingsPageProps {
  buildings: SavedBuilding[];
  onNavigate: (page: Page, id?: string) => void;
}

const MyBuildingsPage: React.FC<MyBuildingsPageProps> = ({ buildings, onNavigate }) => {
  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-2">My Buildings</h1>
        <p className="text-lg text-gray-600 mb-8">
          Review your saved projects and their sustainability analysis.
        </p>
        
        {buildings.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {buildings.map(building => (
              <BuildingCard
                key={building.id}
                building={building}
                // When a card is clicked, navigate to the detailed view for that specific building.
                onView={() => onNavigate(Page.ViewBuilding, building.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">No buildings found.</h2>
            <p className="text-gray-500 mt-2 mb-6">
              Get started by adding a new building to analyze its sustainability.
            </p>
            <button
              onClick={() => onNavigate(Page.AddBuilding)}
              className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Your First Building
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBuildingsPage;
