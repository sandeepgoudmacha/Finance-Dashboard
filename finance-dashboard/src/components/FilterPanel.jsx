import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Search, FilterX } from 'lucide-react';

const FilterPanel = () => {
  const { filters, setFilters, sortBy, setSortBy, getCategories } = useFinance();
  const categories = getCategories();

  const handleReset = () => {
    setFilters({
      category: 'all',
      type: 'all',
      search: '',
    });
    setSortBy('date-desc');
  };

  const isFiltered =
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.search !== '' ||
    sortBy !== 'date-desc';

  return (
    <div className="card space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Filters</h3>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 whitespace-nowrap"
          >
            <FilterX size={16} />
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Search */}
        <div className="sm:col-span-2">
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search description or category..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="input pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="select"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Sort */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select"
          >
            <option value="date-desc">Most Recent</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
