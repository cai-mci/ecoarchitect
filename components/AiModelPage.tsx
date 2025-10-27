
import React from 'react';

// This page explains the source of the AI's knowledge.
// It's important for transparency and building user trust.

const AiModelPage: React.FC = () => {
  // The list of sources the AI is trained on.
  const sources = [
    { name: "Living Building Challenge", url: "https://living-future.org/lbc/" },
    { name: "Passive House", url: "https://passivehouse.com/02_informations/01_whatisapassivehouse/01_whatisapassivehouse.htm" },
    { name: "LEED by USGBC", url: "https://www.usgbc.org/leed" },
    { name: "CEMEX Ventures on Green Architecture", url: "https://www.cemexventures.com/green-sustainable-architecture/" },
    { name: "Barker Associates on Sustainable Architecture", url: "https://www.barker-associates.co.uk/service/architecture/what-is-sustainable-architecture/" },
    { name: "AIA on Sustainability in Practice", url: "https://www.aia.org/resource-center/putting-sustainability-into-practice" },
    { name: "GSA on Sustainable Design", url: "https://www.gsa.gov/real-estate/design-and-construction/sustainability/sustainable-design" },
  ];

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-center text-4xl font-extrabold text-green-800 mb-6">
            Our AI Model
          </h1>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            This is a specialized AI assistant designed to provide expert information on sustainable architecture and green building practices. Its knowledge is strictly derived from a curated list of leading industry resources, ensuring the information is accurate, relevant, and based on established standards and practices. The AI does not use general web knowledge and will only answer questions based on the content of the sources listed below.
          </p>

          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Knowledge Sources
          </h2>
          <ul className="space-y-3">
            {sources.map((source) => (
              <li key={source.name}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 hover:underline font-medium transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AiModelPage;
