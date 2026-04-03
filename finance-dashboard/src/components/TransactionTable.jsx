import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Trash2, Edit2, Save, X } from 'lucide-react';

const TransactionTable = () => {
  const { getFilteredTransactions, deleteTransaction, updateTransaction, role } = useFinance();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  const transactions = getFilteredTransactions();

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditData(transaction);
  };

  const handleSave = () => {
    if (editData) {
      updateTransaction(editingId, editData);
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleFieldChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (transactions.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">
          No transactions found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto">
      <div className="overflow-x-auto -mx-6 -my-4">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
              <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                Date
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                Description
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                Category
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                Type
              </th>
              <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                Amount
              </th>
              {role === 'admin' && (
                <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              editingId === transaction.id ? (
                <tr key={transaction.id} className="border-b border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20">
                  <td className="py-3 px-4">
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) => handleFieldChange('date', e.target.value)}
                      className="input text-xs sm:text-sm max-w-24 sm:max-w-xs"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={editData.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      className="input text-xs sm:text-sm max-w-24 sm:max-w-xs"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={editData.category}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      className="input text-xs sm:text-sm max-w-24 sm:max-w-xs"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <select
                    value={editData.type}
                    onChange={(e) => handleFieldChange('type', e.target.value)}
                    className="select text-sm max-w-xs"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-right">
                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) => handleFieldChange('amount', parseFloat(e.target.value))}
                    className="input text-sm max-w-xs text-right"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleSave}
                      className="p-1 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-1 bg-slate-500 hover:bg-slate-600 text-white rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr
                key={transaction.id}
                className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <td className="py-3 px-4 text-slate-900 dark:text-slate-100">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                  {transaction.description}
                </td>
                <td className="py-3 px-4">
                  <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    {transaction.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={
                      transaction.type === 'income' ? 'badge-success' : 'badge-danger'
                    }
                  >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                </td>
                <td
                  className={`py-3 px-4 text-right font-semibold ${
                    transaction.amount >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.amount >= 0 ? '+' : '-'}$
                  {Math.abs(transaction.amount).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                {role === 'admin' && (
                  <td className="py-3 px-4 text-center">
                    <div className="flex gap-1 sm:gap-2 justify-center flex-wrap">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs sm:text-sm"
                        title="Edit transaction"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="p-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs sm:text-sm"
                        title="Delete transaction"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            )
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TransactionTable;
