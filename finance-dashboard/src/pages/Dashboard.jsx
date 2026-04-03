import React from 'react';
import { useFinance } from '../context/FinanceContext';
import SummaryCard from '../components/SummaryCard';
import { BalanceTrendChart, SpendingBreakdownChart } from '../components/Charts';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  const { getTotalBalance, getTotalIncome, getTotalExpenses, getMonthlyData, getCategoryBreakdown } = useFinance();

  const balance = getTotalBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const monthlyData = getMonthlyData();
  const categoryData = getCategoryBreakdown();

  return (
    <div className="space-y-6 sm:space-y-8 pb-6">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Overview</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Your financial summary and insights at a glance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <SummaryCard
          title="Total Balance"
          amount={balance}
          icon={DollarSign}
          description={balance > 0 ? 'Positive balance' : 'Negative balance'}
        />
        <SummaryCard
          title="Total Income"
          amount={income}
          icon={TrendingUp}
          description={`from ${monthlyData.length || 0} months`}
        />
        <SummaryCard
          title="Total Expenses"
          amount={expenses}
          icon={TrendingDown}
          description={`Average: $${expenses === 0 ? 0 : Math.round(expenses / (monthlyData.length || 1))}`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
          <BalanceTrendChart data={monthlyData} />
        </div>
        <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <SpendingBreakdownChart data={categoryData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
