import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#14b8a6', '#06b6d4', '#10b981', '#f97316'];

const isDarkMode = () => {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
};

const getChartColors = () => {
  const dark = isDarkMode();
  return {
    gridStroke: dark ? '#374151' : '#e5e7eb',
    axisStroke: dark ? '#6b7280' : '#4b5563',
    axisText: dark ? '#d1d5db' : '#374151',
    tooltipBg: dark ? '#1f2937' : '#ffffff',
    tooltipBorder: dark ? '#4b5563' : '#e5e7eb',
    tooltipText: dark ? '#f3f4f6' : '#1f2937',
    labelText: dark ? '#f3f4f6' : '#1f2937',
  };
};

export const BalanceTrendChart = ({ data }) => {
  const colors = getChartColors();
  
  return (
    <div className="card">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Balance Trend (6 Months)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.gridStroke} />
          <XAxis
            dataKey="month"
            stroke={colors.axisStroke}
            style={{ fontSize: '12px', fill: colors.axisText }}
          />
          <YAxis stroke={colors.axisStroke} style={{ fontSize: '12px', fill: colors.axisText }} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.tooltipBg,
              border: `1px solid ${colors.tooltipBorder}`,
              borderRadius: '8px',
              color: colors.tooltipText,
            }}
          />
          <Legend wrapperStyle={{ color: colors.axisStroke }} />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981' }}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444' }}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SpendingBreakdownChart = ({ data }) => {
  const colors = getChartColors();
  
  if (data.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Spending Breakdown
        </h3>
        <div className="flex items-center justify-center h-64 text-slate-500">
          <p>No spending data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ category, amount }) => `${category}: $${amount}`}
            labelStyle={{ fontSize: '12px', fill: colors.labelText }}
            outerRadius={100}
            fill="#8884d8"
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value}`}
            contentStyle={{
              backgroundColor: colors.tooltipBg,
              border: `1px solid ${colors.tooltipBorder}`,
              borderRadius: '8px',
              color: colors.tooltipText,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {data.map((category, index) => (
          <div key={category.category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-slate-700 dark:text-slate-300">
              {category.category}: ${category.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
