
import { SavedBuilding } from '../types';

// This file simulates a database using the browser's localStorage.
// In a real application, this would be replaced with calls to a backend server (e.g., using AWS and MongoDB).
// For this frontend-only app, localStorage provides a way to persist data.

const DB_KEY = 'ecoArchitectBuildings';

/**
 * Retrieves all saved buildings from localStorage.
 * @returns An array of SavedBuilding objects.
 */
export const getBuildings = (): SavedBuilding[] => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Retrieves a single building by its ID.
 * @param id The unique identifier of the building.
 * @returns The SavedBuilding object if found, otherwise undefined.
 */
export const getBuildingById = (id: string): SavedBuilding | undefined => {
  const buildings = getBuildings();
  return buildings.find(b => b.id === id);
};

/**
 * Saves or updates a building in localStorage.
 * If a building with the same ID exists, it's replaced. Otherwise, it's added.
 * @param building The building data to save.
 */
export const saveBuilding = (building: SavedBuilding): void => {
  const buildings = getBuildings();
  const existingIndex = buildings.findIndex(b => b.id === building.id);

  if (existingIndex > -1) {
    // Update existing building
    buildings[existingIndex] = building;
  } else {
    // Add new building
    buildings.push(building);
  }

  localStorage.setItem(DB_KEY, JSON.stringify(buildings));
};
