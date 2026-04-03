import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import InsightsSection from './components/InsightsSection';
import { BarChart3, TrendingUp, BarChart2 } from 'lucide-react';
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Header />

      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-0 overflow-x-auto">
            <button
              onClick={() => setActivePage('dashboard')}
              className={`px-3 sm:px-6 py-3 sm:py-4 font-medium border-b-2 transition-colors text-sm sm:text-base whitespace-nowrap ${
                activePage === 'dashboard'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <BarChart3 size={18} />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Dashboard</span>
              </div>
            </button>
            <button
              onClick={() => setActivePage('transactions')}
              className={`px-3 sm:px-6 py-3 sm:py-4 font-medium border-b-2 transition-colors text-sm sm:text-base whitespace-nowrap ${
                activePage === 'transactions'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <TrendingUp size={18} />
                <span>Transactions</span>
              </div>
            </button>
            <button
              onClick={() => setActivePage('insights')}
              className={`px-3 sm:px-6 py-3 sm:py-4 font-medium border-b-2 transition-colors text-sm sm:text-base whitespace-nowrap ${
                activePage === 'insights'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <BarChart2 size={18} />
                <span>Insights</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'transactions' && <Transactions />}
        {activePage === 'insights' && <InsightsSection />}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>Finance Dashboard © {new Date().getFullYear()} • Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
