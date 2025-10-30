
import React from 'react';
import type { Expense } from '../types';
import { PlusIcon, TrashIcon, WalletIcon } from './icons';

interface BudgetEstimatorProps {
  monthlyIncome: number;
  setMonthlyIncome: (value: number) => void;
  expenses: Expense[];
  addExpense: () => void;
  updateExpense: (id: number, field: 'name' | 'amount', value: string | number) => void;
  removeExpense: (id: number) => void;
}

export const BudgetEstimator: React.FC<BudgetEstimatorProps> = ({
  monthlyIncome,
  setMonthlyIncome,
  expenses,
  addExpense,
  updateExpense,
  removeExpense,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
        <WalletIcon className="h-6 w-6 mr-3 text-indigo-500" />
        Monthly Budget
      </h2>
      
      <div>
        <label htmlFor="monthlyIncome" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Your Monthly Income
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <span className="text-gray-500 sm:text-sm">₹</span>
          </div>
          <input
            type="number"
            id="monthlyIncome"
            className="w-full pl-7 pr-12 py-2 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            placeholder="0"
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">Other Expenses</h3>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center gap-2">
              <input
                type="text"
                className="flex-grow p-2 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md text-sm"
                value={expense.name}
                onChange={(e) => updateExpense(expense.id, 'name', e.target.value)}
              />
              <div className="relative">
                 <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                 </div>
                <input
                    type="number"
                    className="w-32 p-2 pl-7 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md text-sm"
                    value={expense.amount}
                    onChange={(e) => updateExpense(expense.id, 'amount', Number(e.target.value))}
                />
              </div>
              <button onClick={() => removeExpense(expense.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addExpense}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 border border-dashed border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-4 w-4" />
          Add Expense
        </button>
      </div>
    </div>
  );
};
