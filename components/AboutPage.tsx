
import React from 'react';

// This page provides information about the Eco Architect project.
// It uses a simple layout with sections to explain different aspects of the app.

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800">
            About Eco Architect
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Fusing technology and sustainable design to build a better world.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <InfoSection title="Inspiration">
            Our inspiration comes from the urgent need to address climate change through smarter, more sustainable construction. We believe that by making sustainable architectural principles accessible to everyone, from students to professional architects, we can empower a new generation of builders to create structures that are not only beautiful but also harmonious with our planet.
          </InfoSection>

          <InfoSection title="What It Does">
            Eco Architect is an AI-powered platform that analyzes building plans for their environmental impact. Users can input various parameters of their project—such as materials, location, and energy systems—and our specialized AI provides a comprehensive sustainability score out of 100. More importantly, it offers actionable, context-aware recommendations for improvement, all based on leading industry standards like LEED and Passive House.
          </InfoSection>

          <InfoSection title="How We Built It">
            This application is a modern web app built with React and TypeScript for a robust and type-safe frontend. We use Tailwind CSS for a sleek, responsive, and mobile-first design. The core of our analysis is powered by the Google Gemini API, which we've provided with a curated set of expert sources on sustainable architecture to ensure high-quality, relevant feedback.
          </InfoSection>

          <InfoSection title="What's Next">
            We're just getting started! Future plans include expanding our AI's knowledge base with more specialized sources, integrating detailed cost-benefit analysis for green technologies, allowing 3D model uploads for more accurate analysis, and fostering a community where users can share their sustainable designs and ideas.
          </InfoSection>
        </div>
      </div>
    </div>
  );
};

// A helper component to create a styled section with a title and content.
const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-green-700 mb-4">{title}</h2>
    <p className="text-gray-700 leading-relaxed">
      {children}
    </p>
  </div>
);


export default AboutPage;
