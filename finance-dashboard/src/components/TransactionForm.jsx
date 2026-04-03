import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Plus, X } from 'lucide-react';

const TransactionForm = () => {
  const { addTransaction, role, getCategories } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: 'Other',
    type: 'expense',
    amount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount !== 0) {
      addTransaction({
        ...formData,
        amount: formData.type === 'expense' ? -Math.abs(formData.amount) : Math.abs(formData.amount),
      });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: 'Other',
        type: 'expense',
        amount: 0,
      });
      setShowForm(false);
    }
  };

  if (role !== 'admin') {
    return null;
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="btn-primary flex items-center gap-2 mb-6"
      >
        <Plus size={20} />
        Add Transaction
      </button>
    );
  }

  return (
    <div className="card mb-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Transaction</h3>
        <button
          onClick={() => setShowForm(false)}
          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="input"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input"
              placeholder="e.g., Grocery shopping"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input"
              placeholder="e.g., Groceries"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="select"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <button type="submit" className="btn-primary flex-1 sm:flex-none">
            Add Transaction
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
