import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Moon, Sun, Download } from 'lucide-react';

const Header = () => {
  const { role, setRole, darkMode, setDarkMode, getTotalBalance, transactions } = useFinance();

  const handleExport = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    let csv = 'Date,Description,Category,Type,Amount\n';
    transactions.forEach(t => {
      csv += `${t.date},"${t.description}","${t.category}",${t.type},${t.amount}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const balance = getTotalBalance();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Financial Dashboard</h1>
            <p className="text-blue-100 mt-1 text-sm sm:text-base">Track your income and expenses</p>
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <div className="text-right">
              <p className="text-xs sm:text-sm text-blue-100">Current Balance</p>
              <p className={`text-2xl sm:text-3xl font-bold ${balance >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {balance >= 0 ? '+' : '-'}${Math.abs(balance).toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs sm:text-sm font-medium whitespace-nowrap">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select bg-white/30 dark:bg-white/20 text-slate-900 dark:text-white border border-white/40 dark:border-white/30 flex-1 sm:flex-none text-sm rounded-lg hover:bg-white/50 dark:hover:bg-white/30 hover:border-white/60 dark:hover:border-white/50 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="viewer" className="bg-white text-slate-900">Viewer</option>
              <option value="admin" className="bg-white text-slate-900">Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleExport}
              className="flex items-center gap-1 px-2 sm:px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-xs sm:text-sm flex-1 sm:flex-none justify-center sm:justify-start"
              title="Export as JSON"
            >
              <Download size={16} />
              <span>JSON</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1 px-2 sm:px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-xs sm:text-sm flex-1 sm:flex-none justify-center sm:justify-start"
              title="Export as CSV"
            >
              <Download size={16} />
              CSV
            </button>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
