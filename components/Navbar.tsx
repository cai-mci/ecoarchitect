import React from 'react';
import { Page } from '../types';

// This component defines the navigation bar at the top of every page.
// It's a "presentational" component; it displays UI but doesn't manage app state itself.

interface NavbarProps {
  // A function passed from the parent (App.tsx) to change the current page.
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* App Title/Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => onNavigate(Page.Home)} className="flex items-center space-x-2 group">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 group-hover:animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.711 3.882L10.53 1.053a1.5 1.5 0 00-1.06 0L2.289 3.882A1.5 1.5 0 001 5.28V14.5a1.5 1.5 0 001.289 1.4A16.889 16.889 0 0010 18.5a16.889 16.889 0 007.711-2.618A1.5 1.5 0 0019 14.5V5.28a1.5 1.5 0 00-1.289-1.398zM10 16.5c-4.32 0-6.93-1.63-7.5-2.43V5.69l7-2.48a.5.5 0 01.354 0l7 2.48v8.38c-.57.8-3.18 2.43-7.5 2.43z" />
                <path d="M12.94 6.06a.5.5 0 00-.707-.707L9.5 8.086 7.768 6.354a.5.5 0 10-.707.707L8.793 8.793l-1.732 1.732a.5.5 0 00.707.707L9.5 9.5l1.732 1.732a.5.5 0 00.707-.707L10.207 8.793l2.733-2.733z" />
              </svg>
              <span className="text-2xl font-bold text-green-800">Eco Architect</span>
            </button>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink onClick={() => onNavigate(Page.Home)}>Home</NavLink>
              <NavLink onClick={() => onNavigate(Page.About)}>About</NavLink>
              <NavLink onClick={() => onNavigate(Page.AiModel)}>Our AI Model</NavLink>
              <NavLink onClick={() => onNavigate(Page.Login)}>Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// A helper component to style the navigation links consistently.
const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-green-700 hover:bg-green-100 hover:text-green-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </button>
);

export default Navbar;
