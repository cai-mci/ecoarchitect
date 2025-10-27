import React from 'react';
import { Page } from '../types';

// This is the landing page of the application.

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const leafPattern = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cg fill='%23bbf7d0' fill-opacity='0.6'%3e%3cpath transform='translate(25 25) rotate(45)' d='M0 0 C-10 10, -10 30, 0 40 C10 30, 10 10, 0 0 Z'/%3e%3cpath transform='translate(75 75) rotate(225)' d='M0 0 C-10 10, -10 30, 0 40 C10 30, 10 10, 0 0 Z'/%3e%3c/g%3e%3c/svg%3e\")";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundImage: leafPattern }}>
      <div className="bg-white/90 p-10 rounded-xl shadow-2xl text-center max-w-3xl backdrop-blur-sm">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">
          Build a Greener Tomorrow with Eco Architect
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Leverage the power of AI to analyze and improve the sustainability of your building designs. Get instant feedback, a comprehensive score, and actionable recommendations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Button to navigate to the "Add Building" page */}
          <button
            onClick={() => onNavigate(Page.AddBuilding)}
            className="w-full sm:w-auto bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            Add a New Building
          </button>
          {/* Button to navigate to the "View Buildings" page */}
          <button
            onClick={() => onNavigate(Page.ViewBuildings)}
            className="w-full sm:w-auto bg-gray-200 text-green-800 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-300 transition-transform transform hover:scale-105 shadow-lg"
          >
            View My Buildings
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;