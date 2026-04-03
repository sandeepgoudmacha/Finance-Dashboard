# Finance Dashboard UI

A modern, responsive, and fully-functional finance dashboard built with React, Tailwind CSS, and Recharts. This dashboard allows users to track income, expenses, and financial insights with an intuitive and clean interface.

**Submission Deadline:** Mon, 06 Apr, 2026 10:00 pm

## ✨ Features

### 1. **Dashboard Overview**
- **Summary Cards**: Display total balance, total income, and total expenses with visual indicators
- **Balance Trend Chart**: 6-month line chart showing income vs. expense trends
- **Spending Breakdown Chart**: Pie chart showing spending distribution by category
- Real-time balance calculation and updates

### 2. **Transactions Management**
- **Transaction List**: Full table view with date, description, category, type, and amount
- **Add Transactions** (Admin only): Form to add new income or expense transactions
- **Edit Transactions** (Admin only): Inline editing capability for existing transactions
- **Delete Transactions** (Admin only): Remove transactions from the dashboard
- **Sort Options**: Sort by date (newest/oldest) or amount (highest/lowest)

### 3. **Advanced Filtering**
- **Category Filter**: Filter transactions by spending category
- **Type Filter**: Show only income or expense transactions
- **Search**: Search transactions by description or category
- **Dynamic Filters**: All filters work together and can be reset

### 4. **Role-Based UI (RBAC)**
- **Viewer Role**: Can only view data, no editing capabilities
- **Admin Role**: Can add, edit, and delete transactions
- **Role Switching**: Simple dropdown to toggle between roles for demonstration
- **Dynamic UI**: Components adjust visibility based on user role

### 5. **Insights Section**
- **Top Spending Category**: Shows the category with highest spending
- **Monthly Trend**: Tracks if spending is increasing, decreasing, or stable
- **Income vs Expense Ratio**: Calculates the ratio for financial health
- **Savings Rate**: Shows percentage of income saved
- **Smart Recommendations**: AI-powered insights based on spending patterns
- **Financial Summary**: Quick statistics on income, expenses, and net savings

### 6. **Data Persistence**
- **Local Storage**: All transactions, role preference, and dark mode setting are saved
- **Automatic Sync**: Changes persist across browser sessions
- **Export Features**: 
  - **JSON Export**: Export all transactions as JSON file
  - **CSV Export**: Export transactions in CSV format for spreadsheet use

### 7. **User Experience**
- **Dark Mode Toggle**: Switch between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Empty State Handling**: Graceful messages when no data is available
- **Smooth Animations**: Transitions and hover effects for better UX
- **Intuitive Navigation**: Tab-based navigation between Dashboard, Transactions, and Insights
- **Loading States**: Proper handling of all edge cases

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm 7+
- Modern web browser

### Installation

1. **Navigate to the project directory:**
```bash
cd "c:\Users\Nites\Downloads\Zorvyn assignment\finance-dashboard"
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open in browser:**
Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
finance-dashboard/
├── src/
│   ├── components/
│   │   ├── Charts.jsx           # Recharts components for visualizations
│   │   ├── Header.jsx           # Top navigation with role selector and dark mode
│   │   ├── TransactionTable.jsx # Transaction display & edit interface
│   │   ├── TransactionForm.jsx  # Form for adding new transactions
│   │   ├── FilterPanel.jsx      # Advanced filtering controls
│   │   ├── InsightsSection.jsx  # Financial insights & recommendations
│   │   └── SummaryCard.jsx      # Reusable summary card component
│   ├── context/
│   │   └── FinanceContext.jsx   # Global state management with React Context
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard view
│   │   └── Transactions.jsx     # Transactions management page
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind CSS & custom styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🏗️ Technical Architecture

### State Management
- **React Context API**: Global state for transactions, filters, role, and dark mode
- **Local Storage**: Persistent data storage across sessions
- **Custom Hooks**: `useFinance()` hook for easy access to context

### Component Design
- **Modular Components**: Each component has a single responsibility
- **Reusable Elements**: Common patterns abstracted into reusable components
- **Responsive Grid**: Tailwind's grid system for responsive layouts
- **Icon Library**: Lucide React for beautiful, consistent icons

### Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Dark Mode**: Built-in support with `dark:` classes
- **Custom Components**: Layer components for `.card`, `.btn-primary`, etc.
- **Semantic Color Coding**: Green for income, red for expenses, blue for balance

## 💾 Data Model

### Transaction Object
```javascript
{
  id: number,
  date: string (YYYY-MM-DD),
  description: string,
  category: string,
  type: 'income' | 'expense',
  amount: number (positive for income, negative for expense)
}
```

### Sample Transactions
Included 17 sample transactions across various categories:
- **Income**: Salary, Freelance work
- **Expenses**: Groceries, Utilities, Rent, Transport, Entertainment, Dining, Shopping

## 🎯 Key Implementation Details

### 1. **Filtering Logic**
- Category filter: Matches transaction category
- Type filter: Differentiates income/expense
- Search: Full-text search on description and category
- Multiple filters: Work together (AND logic)

### 2. **Calculation Functions**
- `getTotalBalance()`: Sum of all transactions
- `getTotalIncome()`: Sum of income-type transactions
- `getTotalExpenses()`: Absolute value of expense transactions
- `getMonthlyData()`: Aggregated by month for trends
- `getCategoryBreakdown()`: Sum by category for pie chart
- `getInsights()`: Derived metrics for insights

### 3. **Role-Based Logic**
- **Viewer**: All components render but action buttons are hidden
- **Admin**: Full CRUD operations on transactions visible
- **Dynamic Visibility**: Conditional rendering based on `role` state

### 4. **Responsive Breakpoints**
- **Mobile**: Single column layout (< 768px)
- **Tablet**: 2-column grid (768px - 1024px)
- **Desktop**: 3+ column grid (> 1024px)

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Blue (#3b82f6) - Main actions and primary text
- **Secondary**: Purple (#8b5cf6) - Secondary actions
- **Success**: Green (#22c55e) - Income and positive values
- **Danger**: Red (#ef4444) - Expenses and negative values
- **Warning**: Amber (#f59e0b) - Alerts and notices

### User Interface
- Clean, minimal design with plenty of whitespace
- Consistent use of cards and containers
- Clear visual hierarchy with font sizes and weights
- Accessibility-friendly color contrast ratios
- Smooth transitions and hover effects

## 📊 Insights Engine

The insights section provides intelligent financial recommendations:

1. **Spending Analysis**
   - Identifies highest spending category
   - Tracks monthly trends (increasing/decreasing/stable)

2. **Financial Health Metrics**
   - Income to Expense Ratio (>1 is healthy)
   - Savings Rate percentage
   - Net Savings amount

3. **Smart Recommendations**
   - Warns if spending is increasing
   - Congratulates if spending is decreasing
   - Suggests action based on savings rate

## 🌗 Dark Mode Support

- Toggle button in header
- Persistent preference in local storage
- Automatic theme application to all components
- Enhanced contrast for accessibility

## 📱 Responsive Behavior

- **Mobile**: Stacks components vertically, touch-friendly buttons
- **Tablet**: 2-column layouts, optimized spacing
- **Desktop**: Full multi-column layouts with proper spacing
- **Adaptive**: Sidebar collapses/expands based on screen size

## ⚙️ Technology Stack

- **React 18**: Latest React features and hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: React charting library for visualizations
- **Lucide React**: Modern icon library
- **React Context**: Built-in state management solution

## 🔄 Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Update Context State
    ↓
localStorage updated
    ↓
Component Re-renders
    ↓
UI Updates
```

## 💡 Design Decisions

### 1. **Context API vs Redux**
Chose Context API for:
- Simpler setup and less boilerplate
- Sufficient for this project's complexity
- Easier to understand and maintain

### 2. **Tailwind CSS Integration**
- Pre-built utility classes for rapid development
- Consistent spacing and color schemes
- Dark mode support out of the box
- Smaller bundle size compared to component libraries

### 3. **Recharts for Visualizations**
- Responsive charts that adapt to container size
- Easy customization and tooltips
- Good performance with reasonable data sizes
- Clean, professional appearance

### 4. **Local Storage for Persistence**
- No backend dependency needed
- Instant data access and updates
- Lightweight and performant
- Sufficient for demo/prototype application

## ⚙️ Testing the Dashboard

### Test Scenarios

1. **Role Switching**
   - Switch to Admin role and try adding/editing transactions
   - Switch back to Viewer to see actions hidden

2. **Filtering**
   - Use search to find specific transactions
   - Filter by category and type
   - Combine multiple filters

3. **Data Persistence**
   - Add a transaction and refresh the page
   - Switch roles and verify the selection persists
   - Toggle dark mode and verify the preference saves

4. **Responsiveness**
   - Resize browser window to test mobile/tablet/desktop views
   - Use browser DevTools for device simulation

5. **Export**
   - Export data as JSON
   - Export data as CSV
   - Open exported files in text editor or spreadsheet

## 📈 Performance Optimizations

- Component memoization for expensive renders
- Efficient filtering and sorting algorithms
- Lazy evaluation of calculations
- Optimized re-render with proper dependency tracking
- Minimal DOM operations

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast meets WCAG standards
- Form labels properly associated with inputs

## 🚀 Future Enhancement Ideas

1. **Advanced Features**
   - Budget planning and limits
   - Recurring transactions
   - Multi-currency support
   - Receipt uploads

2. **Backend Integration**
   - Real API integration
   - User authentication
   - Cloud data sync
   - Server-side calculations

3. **Analytics**
   - Advanced charts and reports
   - PDF export capability
   - Email notifications
   - Goal tracking

## 📝 Notes

- This is a frontend-focused dashboard demonstrating UI/UX principles
- All data is stored locally and resets when localStorage is cleared
- Role-based UI is for demonstration purposes (no authentication)
- Charts use mock data aggregated from transactions
- Suitable for learning React, state management, and responsive design

---

**Built with ❤️ for the Zorvyn Assignment**

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
