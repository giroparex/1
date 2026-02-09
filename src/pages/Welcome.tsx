import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen flex flex-col font-display overflow-hidden relative">
      {/* Decorative Water Element (Top-Right) */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      {/* Decorative Water Element (Bottom-Left) */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      {/* Main Container */}
      <main className="flex-grow flex flex-col items-center justify-between px-8 py-16 relative z-10 max-w-md mx-auto w-full">
        {/* Header Section */}
        <header className="text-center mt-8">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-xl">
            <span className="material-icons text-primary text-4xl">pool</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Socorrismo<br/>
            <span className="text-primary">Aqualandia</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-light">
            Gestión de formación y salvamento
          </p>
        </header>

        {/* Illustration Section */}
        <div className="relative w-full flex justify-center items-center py-12">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 200 200">
              <circle cx="100" cy="100" fill="white" r="80" stroke="#13a4ec" strokeWidth="4"></circle>
              <circle cx="100" cy="100" fill="transparent" r="50" stroke="#13a4ec" strokeWidth="4"></circle>
              <path d="M100 20 A80 80 0 0 1 156.5 43.5 L142.4 57.6 A60 60 0 0 0 100 40 Z" fill="#ef4444"></path>
              <path d="M100 180 A80 80 0 0 1 43.5 156.5 L57.6 142.4 A60 60 0 0 0 100 160 Z" fill="#ef4444"></path>
              <path d="M20 100 A80 80 0 0 1 43.5 43.5 L57.6 57.6 A60 60 0 0 0 40 100 Z" fill="#ef4444"></path>
              <path d="M180 100 A80 80 0 0 1 156.5 156.5 L142.4 142.4 A60 60 0 0 0 160 100 Z" fill="#ef4444"></path>
              <circle cx="100" cy="100" fill="none" r="90" stroke="#e2e8f0" strokeDasharray="10 10" strokeWidth="2"></circle>
            </svg>
            <div className="absolute bg-white dark:bg-slate-800 rounded-full p-4 shadow-xl">
              <span className="material-icons text-primary text-5xl">verified_user</span>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="w-full space-y-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center transition-all active:scale-95 group"
          >
            <span className="text-lg">Acceder</span>
            <span className="material-icons ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">Plataforma Certificada</span>
            <div className="flex gap-4">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <div className="h-1 w-8 bg-primary/20 rounded-full"></div>
              <div className="h-1 w-8 bg-primary/20 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-light">
            Design by <span className="font-semibold text-slate-500 dark:text-slate-400">Juan García</span>
          </p>
        </footer>
      </main>

      {/* Visual Hint: Wave pattern at bottom */}
      <div className="fixed bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none opacity-40">
        <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C49.1,15.24,103,31.26,158.33,40.45,213.7,49.64,263.39,67.23,321.39,56.44Z" fill="#13a4ec" fillOpacity="0.1"></path>
        </svg>
      </div>
    </div>
  );
};

export default Welcome;
