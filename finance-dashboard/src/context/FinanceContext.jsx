import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample transaction data
const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2024-03-20', amount: 2500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: 2, date: '2024-03-19', amount: -450, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
  { id: 3, date: '2024-03-18', amount: -120, category: 'Utilities', type: 'expense', description: 'Electricity bill' },
  { id: 4, date: '2024-03-17', amount: 1500, category: 'Freelance', type: 'income', description: 'Project payment' },
  { id: 5, date: '2024-03-15', amount: -80, category: 'Entertainment', type: 'expense', description: 'Movie tickets' },
  { id: 6, date: '2024-03-14', amount: -200, category: 'Dining', type: 'expense', description: 'Restaurant' },
  { id: 7, date: '2024-03-13', amount: -500, category: 'Transport', type: 'expense', description: 'Gas and repairs' },
  { id: 8, date: '2024-03-12', amount: -35, category: 'Groceries', type: 'expense', description: 'Lunch items' },
  { id: 9, date: '2024-03-10', amount: -150, category: 'Shopping', type: 'expense', description: 'Clothes' },
  { id: 10, date: '2024-03-08', amount: 2500, category: 'Salary', type: 'income', description: 'Bi-weekly stipend' },
  { id: 11, date: '2024-03-07', amount: -75, category: 'Dining', type: 'expense', description: 'Café' },
  { id: 12, date: '2024-03-05', amount: -400, category: 'Shopping', type: 'expense', description: 'Electronics' },
  { id: 13, date: '2024-03-01', amount: -1200, category: 'Rent', type: 'expense', description: 'Monthly rent' },
  { id: 14, date: '2024-02-28', amount: -100, category: 'Utilities', type: 'expense', description: 'Internet' },
  { id: 15, date: '2024-02-25', amount: 2500, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: 16, date: '2024-02-20', amount: -320, category: 'Groceries', type: 'expense', description: 'Bulk shopping' },
  { id: 17, date: '2024-02-18', amount: -200, category: 'Entertainment', type: 'expense', description: 'Concert' },
];

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('role');
    return saved || 'viewer';
  });

  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    search: '',
  });

  const [sortBy, setSortBy] = useState('date-desc');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: Math.max(0, ...transactions.map(t => t.id)) + 1,
    };
    setTransactions([transaction, ...transactions]);
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions(transactions.map(t => (t.id === id ? { ...t, ...updatedData } : t)));
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const getFilteredTransactions = () => {
    let filtered = transactions;

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Filter by search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        t =>
          t.category.toLowerCase().includes(search) ||
          t.description.toLowerCase().includes(search)
      );
    }

    // Sort
    if (sortBy === 'date-desc') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'date-asc') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'amount-desc') {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'amount-asc') {
      filtered.sort((a, b) => a.amount - b.amount);
    }

    return filtered;
  };

  const getCategories = () => {
    const categories = new Set(transactions.map(t => t.category));
    return Array.from(categories).sort();
  };

  const getTotalBalance = () => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return Math.abs(
      transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    );
  };

  const getMonthlyData = () => {
    const monthlyData = {};

    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        monthlyData[monthKey].income += t.amount;
      } else {
        monthlyData[monthKey].expense += Math.abs(t.amount);
      }
    });

    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month)).slice(-6);
  };

  const getCategoryBreakdown = () => {
    const breakdown = {};

    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        breakdown[t.category] = (breakdown[t.category] || 0) + Math.abs(t.amount);
      });

    return Object.entries(breakdown)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getInsights = () => {
    const categoryBreakdown = getCategoryBreakdown();
    const monthlyData = getMonthlyData();

    const highestSpendingCategory = categoryBreakdown[0];
    let monthlyTrend = 'stable';

    if (monthlyData.length >= 2) {
      const lastMonth = monthlyData[monthlyData.length - 1];
      const previousMonth = monthlyData[monthlyData.length - 2];
      const diff = lastMonth.expense - previousMonth.expense;
      if (diff > 100) monthlyTrend = 'increasing';
      if (diff < -100) monthlyTrend = 'decreasing';
    }

    const incomeToExpenseRatio = (getTotalIncome() / (getTotalExpenses() || 1)).toFixed(2);

    return {
      highestSpendingCategory: highestSpendingCategory?.category || 'N/A',
      highestSpendingAmount: highestSpendingCategory?.amount || 0,
      monthlyTrend,
      incomeToExpenseRatio,
      savingsRate: ((1 - getTotalExpenses() / (getTotalIncome() || 1)) * 100).toFixed(1),
    };
  };

  const value = {
    transactions,
    role,
    setRole,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    darkMode,
    setDarkMode,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getFilteredTransactions,
    getCategories,
    getTotalBalance,
    getTotalIncome,
    getTotalExpenses,
    getMonthlyData,
    getCategoryBreakdown,
    getInsights,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
