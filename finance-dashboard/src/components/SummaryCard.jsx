import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';

const SummaryCard = ({ title, amount, icon: Icon, trend, description }) => {
  const isPositive = amount >= 0;
  const amountDisplay = Math.abs(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="card group hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </p>
          <h3 className={`text-2xl sm:text-3xl font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} group-hover:scale-110 transition-transform origin-left`}>
            {isPositive ? '+' : '-'}{amountDisplay}
          </h3>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
              {description}
            </p>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 ${isPositive ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
          <Icon className={`${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} size={24} />
        </div>
      </div>
      {trend && (
        <div className={`mt-4 text-xs sm:text-sm ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <div className="flex items-center gap-1">
            {trend.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{trend.text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
