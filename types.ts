// types.ts: This file defines the shape of data used throughout the application.
// By creating these "types," we ensure data consistency and catch errors early.

// Defines the possible pages in our application for navigation.
export enum Page {
  Home,
  Login,
  About,
  AiModel,
  AddBuilding,
  ViewBuildings,
  ViewBuilding,
}

// Represents the data structure for a single building plan.
export interface Building {
  id: string;
  name: string;
  continent: string;
  region: string;
  purpose: string;
  otherPurpose?: string;
  floors: string;
  area: number;
  locationType: string;
  materials: string;
  architecturalStyle: string;
  wasteReduction: string;
  energyEfficiency: string[];
  resourceEfficiency: string[];
  waterUsage: string[];
  additionalConsiderations: string;
}

// Represents a single category of recommendations from the AI.
export interface RecommendationCategory {
  category: string;
  items: string[];
}

// Represents the result from the AI sustainability analysis.
export interface AnalysisResult {
  sustainabilityScore: number;
  recommendations: RecommendationCategory[];
  summary: string;
}

// Combines building data with its analysis result.
export interface SavedBuilding extends Building {
  analysis: AnalysisResult;
}