import React, { useState, useEffect } from 'react';
import { Page, SavedBuilding } from './types';
import * as db from './services/databaseService';

// Import all page components
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AboutPage from './components/AboutPage';
import AiModelPage from './components/AiModelPage';
import AddBuildingPage from './components/AddBuildingPage';
import MyBuildingsPage from './components/MyBuildingsPage';
import BuildingViewPage from './components/BuildingViewPage';

// This is the main component that orchestrates the entire application.
// It manages the current page, the list of buildings, and the currently selected building.

const App: React.FC = () => {
  // State to track the currently displayed page. Defaults to Home.
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  // State to hold all the buildings saved by the user.
  const [buildings, setBuildings] = useState<SavedBuilding[]>([]);
  // State to hold the ID of the building being viewed or edited.
  const [activeBuildingId, setActiveBuildingId] = useState<string | null>(null);

  // useEffect hook to load saved buildings from our mock database (localStorage) when the app starts.
  useEffect(() => {
    setBuildings(db.getBuildings());
  }, []);
  
  // Handles navigation between pages. It can also accept an ID for context (e.g., to view a specific building).
  const handleNavigate = (page: Page, id?: string) => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
    setCurrentPage(page);
    if (id) {
      setActiveBuildingId(id);
    } else {
      setActiveBuildingId(null);
    }
  };
  
  // Handles saving a new or edited building.
  const handleSaveBuilding = (building: SavedBuilding) => {
    db.saveBuilding(building); // Save to our mock DB
    setBuildings(db.getBuildings()); // Refresh the list of buildings in the state
  };

  // Function to render the correct page component based on the `currentPage` state.
  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage onNavigate={handleNavigate} />;
      case Page.Login:
        return <LoginPage />;
      case Page.About:
        return <AboutPage />;
      case Page.AiModel:
        return <AiModelPage />;
      case Page.AddBuilding:
        // If there's an activeBuildingId, we are editing. Otherwise, we are adding a new one.
        const existingBuilding = activeBuildingId ? buildings.find(b => b.id === activeBuildingId) : undefined;
        return <AddBuildingPage onSave={handleSaveBuilding} existingBuilding={existingBuilding} onNavigate={handleNavigate} />;
      case Page.ViewBuildings:
        return <MyBuildingsPage buildings={buildings} onNavigate={handleNavigate} />;
      case Page.ViewBuilding:
        const buildingToView = buildings.find(b => b.id === activeBuildingId);
        // Ensure we found a building before trying to render the view page.
        if (buildingToView) {
          return <BuildingViewPage building={buildingToView} onNavigate={handleNavigate} />;
        }
        // If no building is found (e.g., bad ID), go back to the list.
        setCurrentPage(Page.ViewBuildings);
        return null;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigate} />
      <main className="animate-fade-in">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;