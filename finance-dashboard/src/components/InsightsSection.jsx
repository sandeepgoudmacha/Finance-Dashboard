import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { TrendingUp, Target, AlertCircle } from 'lucide-react';

const InsightsSection = () => {
  const { getInsights, getTotalIncome, getTotalExpenses } = useFinance();
  const insights = getInsights();

  const formattedIncome = getTotalIncome().toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const formattedExpenses = getTotalExpenses().toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const getTrendColor = (trend) => {
    if (trend === 'increasing') return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    if (trend === 'decreasing') return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'increasing') return 'Increasing';
    if (trend === 'decreasing') return 'Decreasing';
    return 'Stable';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Financial Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Highest Spending Category */}
        <div className="card border-2 border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">
                Top Spending Category
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {insights.highestSpendingCategory}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                ${Math.round(insights.highestSpendingAmount)}/period
              </p>
            </div>
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <AlertCircle className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className={`card border-2 ${getTrendColor(insights.monthlyTrend)}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">
                Monthly Trend
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                {insights.monthlyTrend}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {getTrendIcon(insights.monthlyTrend)} Spending is {insights.monthlyTrend}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${
              insights.monthlyTrend === 'increasing' ? 'bg-red-100 dark:bg-red-900' :
              insights.monthlyTrend === 'decreasing' ? 'bg-green-100 dark:bg-green-900' :
              'bg-blue-100 dark:bg-blue-900'
            }`}>
              <TrendingUp className={`${
                insights.monthlyTrend === 'increasing' ? 'text-red-600 dark:text-red-400' :
                insights.monthlyTrend === 'decreasing' ? 'text-green-600 dark:text-green-400' :
                'text-blue-600 dark:text-blue-400'
              }`} size={20} />
            </div>
          </div>
        </div>

        {/* Income to Expense Ratio */}
        <div className="card border-2 border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">
                Income vs Expense
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {insights.incomeToExpenseRatio}x
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {insights.incomeToExpenseRatio > 1 ? 'More income than expenses' : 'More expenses than income'}
              </p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Target className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="card border-2 border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">
                Savings Rate
              </p>
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                {isNaN(insights.savingsRate) ? '0' : insights.savingsRate}%
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Of your income saved
              </p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Financial Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Total Income:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">{formattedIncome}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Total Expenses:</span>
              <span className="font-semibold text-red-600 dark:text-red-400">{formattedExpenses}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-600 dark:text-slate-400">Net Savings:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {(getTotalIncome() - getTotalExpenses()).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Recommendations</h4>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {insights.monthlyTrend === 'increasing' && (
              <li className="flex gap-2 items-start">
                <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Your spending is increasing. Consider reviewing your budget.</span>
              </li>
            )}
            {insights.monthlyTrend === 'decreasing' && (
              <li className="flex gap-2 items-start">
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Great! Your spending is decreasing. Keep it up!</span>
              </li>
            )}
            {insights.savingsRate > 30 && (
              <li className="flex gap-2 items-start">
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Excellent savings rate! You're building wealth.</span>
              </li>
            )}
            {insights.savingsRate < 10 && (
              <li className="flex gap-2 items-start">
                <span className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Low savings rate. Try to increase your savings.</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;
