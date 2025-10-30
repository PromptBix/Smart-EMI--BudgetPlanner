
import React, { useState, useMemo, useCallback } from 'react';
import { EMICalculator } from './components/EMICalculator';
import { BudgetEstimator } from './components/BudgetEstimator';
import { ResultsSummary } from './components/ResultsSummary';
import { FinancialTips } from './components/FinancialTips';
import type { Expense } from './types';

const App: React.FC = () => {
  // EMI Calculator State
  const [principal, setPrincipal] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Budget Estimator State
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, name: 'Rent', amount: 20000 },
    { id: 2, name: 'Groceries', amount: 8000 },
    { id: 3, name: 'Utilities', amount: 4000 },
  ]);

  const { emi, totalPayment, totalInterest } = useMemo(() => {
    if (principal <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };

    const monthlyRate = interestRate / 12 / 100;
    const numberOfMonths = tenureYears * 12;

    if (numberOfMonths <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };

    if (interestRate <= 0) {
        const calculatedEmi = principal / numberOfMonths;
        return { emi: calculatedEmi, totalPayment: principal, totalInterest: 0 };
    }
    
    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    const totalPaymentValue = emiValue * numberOfMonths;
    const totalInterestValue = totalPaymentValue - principal;

    return {
        emi: emiValue,
        totalPayment: totalPaymentValue,
        totalInterest: totalInterestValue
    };
  }, [principal, interestRate, tenureYears]);

  const otherExpensesTotal = useMemo(() => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }, [expenses]);

  const totalExpenses = useMemo(() => {
    return emi + otherExpensesTotal;
  }, [emi, otherExpensesTotal]);

  const savings = useMemo(() => {
    return monthlyIncome - totalExpenses;
  }, [monthlyIncome, totalExpenses]);
  
  const addExpense = useCallback(() => {
    setExpenses(prev => [...prev, { id: Date.now(), name: 'New Expense', amount: 0 }]);
  }, []);

  const updateExpense = useCallback((id: number, field: 'name' | 'amount', value: string | number) => {
    setExpenses(prev => prev.map(exp => {
      if (exp.id === id) {
        if (field === 'amount' && typeof value === 'number') {
          return { ...exp, amount: value >= 0 ? value : 0 };
        }
        if (field === 'name' && typeof value === 'string') {
          return { ...exp, name: value };
        }
      }
      return exp;
    }));
  }, []);

  const removeExpense = useCallback((id: number) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  }, []);

  return (
    <div className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">Smart EMI & Budget Planner</h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Calculate your loan payments and manage your monthly budget with ease.</p>
      </header>
      
      <main className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-8">
          <EMICalculator
            principal={principal}
            setPrincipal={setPrincipal}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            tenureYears={tenureYears}
            setTenureYears={setTenureYears}
            emi={emi}
            totalInterest={totalInterest}
            totalPayment={totalPayment}
          />
          <BudgetEstimator
            monthlyIncome={monthlyIncome}
            setMonthlyIncome={setMonthlyIncome}
            expenses={expenses}
            addExpense={addExpense}
            updateExpense={updateExpense}
            removeExpense={removeExpense}
          />
        </div>
        
        <div className="space-y-8">
          <ResultsSummary
            emi={emi}
            monthlyIncome={monthlyIncome}
            totalExpenses={totalExpenses}
            savings={savings}
            otherExpenses={expenses}
          />
          <FinancialTips
            income={monthlyIncome}
            emi={emi}
            otherExpenses={otherExpensesTotal}
            totalExpenses={totalExpenses}
            savings={savings}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
