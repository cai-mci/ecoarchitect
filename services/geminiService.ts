import { GoogleGenAI, Type } from "@google/genai";
import { Building, AnalysisResult } from '../types';

// This file centralizes all communication with the Google Gemini API.
// It simplifies API calls and keeps the AI logic separate from UI components.

// A constant list of approved sources for the AI model. This restricts the AI's knowledge base.
const AI_SOURCES = [
  "https://living-future.org/lbc/",
  "https://passivehouse.com/02_informations/01_whatisapassivehouse/01_whatisapassivehouse.htm",
  "https://www.usgbc.org/leed",
  "https://www.cemexventures.com/green-sustainable-architecture/",
  "https://www.barker-associates.co.uk/service/architecture/what-is-sustainable-architecture/",
  "https://www.aia.org/resource-center/putting-sustainability-into-practice",
  "https://www.gsa.gov/real-estate/design-and-construction/sustainability/sustainable-design"
];

// Initialize the Gemini AI client.
// It's crucial that the API_KEY is set in the environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Generates a brief summary of climate and sustainability factors for a given location.
 * @param continent The continent where the building is located.
 * @param region The region (North, South, East, West) within the continent.
 * @returns A string containing the AI-generated summary.
 */
export const getLocationSummary = async (continent: string, region: string): Promise<string> => {
  try {
    const prompt = `Based on general climate knowledge, provide a short summary of key weather conditions and sustainability considerations for building projects in the ${region} region of ${continent}. Mention factors like sun exposure for solar panels, temperature extremes for insulation, and the importance of integrating with public transportation if applicable. Keep it to one paragraph.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching location summary:", error);
    return "Could not retrieve location-specific recommendations at this time. Please consider general best practices for your region.";
  }
};

/**
 * Performs a full sustainability analysis on a building plan using the Gemini API.
 * @param buildingData The complete details of the building plan.
 * @returns An AnalysisResult object with the score, recommendations, and summary.
 */
export const getSustainabilityAnalysis = async (buildingData: Building): Promise<AnalysisResult> => {
  const finalPurpose = buildingData.purpose === 'Other' ? buildingData.otherPurpose : buildingData.purpose;
  
  const prompt = `
    You are an expert sustainable architecture analyst. Your knowledge is strictly limited to the following sources:
    ${AI_SOURCES.join('\n')}
    
    Do not use any other information. Analyze the following building plan and provide a sustainability score and categorized recommendations.

    Building Details:
    - Building Name: ${buildingData.name}
    - Location: ${buildingData.region}, ${buildingData.continent}
    - Purpose: ${finalPurpose}
    - Floors: ${buildingData.floors}
    - Total Area: ${buildingData.area} sq ft
    - Location Type: ${buildingData.locationType}
    - Architectural Style: ${buildingData.architecturalStyle}
    - Primary Materials: ${buildingData.materials}
    - Waste Reduction: ${buildingData.wasteReduction}
    - Energy Efficiency Measures: ${buildingData.energyEfficiency.join(', ') || 'None specified'}
    - Resource Efficiency Measures: ${buildingData.resourceEfficiency.join(', ') || 'None specified'}
    - Water Usage Measures: ${buildingData.waterUsage.join(', ') || 'None specified'}
    - Additional Considerations: ${buildingData.additionalConsiderations || 'None'}

    Based *only* on the provided sources, return a JSON object with the specified structure. The recommendations must be sorted into the four distinct categories provided in the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sustainabilityScore: { 
              type: Type.INTEGER, 
              description: "An integer score from 0 to 100 representing the building's eco-friendliness." 
            },
            recommendations: {
              type: Type.ARRAY,
              description: "A list of actionable recommendations, categorized for clarity.",
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { 
                    type: Type.STRING,
                    description: "The category of the recommendations (e.g., 'Energy Efficiency', 'Water Conservation', 'Materials & Resources', 'Site & Location')."
                  },
                  items: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of specific recommendations within this category."
                  }
                },
                required: ["category", "items"]
              }
            },
            summary: { 
              type: Type.STRING, 
              description: "A brief, one-paragraph summary of the building's sustainability profile." 
            },
          },
          required: ["sustainabilityScore", "recommendations", "summary"],
        }
      }
    });

    // The response text is a JSON string, so we parse it into an object.
    return JSON.parse(response.text) as AnalysisResult;
  } catch (error) {
    console.error("Error fetching sustainability analysis:", error);
    // Provide a default error response if the API call fails
    return {
      sustainabilityScore: 0,
      recommendations: [
        { category: "Error", items: ["There was an error analyzing your building. Please try again.", "Ensure all fields are filled out correctly."] }
      ],
      summary: "Could not complete analysis due to an error.",
    };
  }
};