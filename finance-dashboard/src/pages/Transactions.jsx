import React, { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import FilterPanel from '../components/FilterPanel';
import TransactionTable from '../components/TransactionTable';

const Transactions = () => {
  return (
    <div className="space-y-6 sm:space-y-8 pb-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">Transactions</h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400\">Manage and track all your financial transactions</p>
      </div>

      <div className="animate-fadeIn">
        <TransactionForm />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:gap-8">
        <div className="animate-slideInLeft" style={{animationDelay: '0.2s'}}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="lg:col-span-1">
              <FilterPanel />
            </div>
            <div className="lg:col-span-3">
              <TransactionTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
