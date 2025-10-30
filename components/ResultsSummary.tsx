
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Expense } from '../types';
import { ChartPieIcon } from './icons';

interface ResultsSummaryProps {
  emi: number;
  monthlyIncome: number;
  totalExpenses: number;
  savings: number;
  otherExpenses: Expense[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);
};

const COLORS = ['#4f46e5', '#10b981', '#ef4444', '#f97316', '#3b82f6', '#ec4899', '#8b5cf6'];

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  emi,
  monthlyIncome,
  totalExpenses,
  savings,
  otherExpenses,
}) => {
  const chartData = useMemo(() => {
    const data = [{ name: 'EMI', value: emi }];
    otherExpenses.forEach(exp => {
      data.push({ name: exp.name, value: exp.amount });
    });
    return data.filter(item => item.value > 0);
  }, [emi, otherExpenses]);
  
  const emiPercentage = monthlyIncome > 0 ? (emi / monthlyIncome) * 100 : 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
        <ChartPieIcon className="h-6 w-6 mr-3 text-indigo-500"/>
        Budget Summary
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Income</p>
          <p className="text-xl font-bold text-slate-800 dark:text-white">{formatCurrency(monthlyIncome)}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Expenses</p>
          <p className="text-xl font-bold text-red-500">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg col-span-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Savings</p>
          <p className={`text-2xl font-bold ${savings >= 0 ? 'text-green-500' : 'text-orange-500'}`}>{formatCurrency(savings)}</p>
        </div>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), "Amount"]}
              contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  borderColor: '#4b5563',
                  borderRadius: '0.5rem'
              }}
              labelStyle={{color: '#f3f4f6'}}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">Your EMI is <span className="font-bold text-indigo-500">{emiPercentage.toFixed(2)}%</span> of your income.</p>
      </div>
    </div>
  );
};
