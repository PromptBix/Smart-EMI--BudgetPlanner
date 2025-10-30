
import React from 'react';
import { SliderInput } from './SliderInput';
import { CalculatorIcon } from './icons';

interface EMICalculatorProps {
  principal: number;
  setPrincipal: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  tenureYears: number;
  setTenureYears: (value: number) => void;
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);
};

export const EMICalculator: React.FC<EMICalculatorProps> = ({
  principal,
  setPrincipal,
  interestRate,
  setInterestRate,
  tenureYears,
  setTenureYears,
  emi,
  totalInterest,
  totalPayment,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
        <CalculatorIcon className="h-6 w-6 mr-3 text-indigo-500" />
        EMI Calculator
      </h2>
      <div className="space-y-6">
        <SliderInput
          label="Loan Amount"
          min={10000}
          max={20000000}
          step={10000}
          value={principal}
          onChange={setPrincipal}
          formatValue={formatCurrency}
        />
        <SliderInput
          label="Interest Rate"
          min={1}
          max={20}
          step={0.1}
          value={interestRate}
          onChange={setInterestRate}
          unit="%"
        />
        <SliderInput
          label="Loan Tenure"
          min={1}
          max={30}
          step={1}
          value={tenureYears}
          onChange={setTenureYears}
          unit="Years"
        />
      </div>
      <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
        <div className="flex justify-between items-center text-lg">
          <span className="text-slate-500 dark:text-slate-400">Monthly EMI</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400 text-2xl">{formatCurrency(emi)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 dark:text-slate-400">Total Interest Payable</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">{formatCurrency(totalInterest)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 dark:text-slate-400">Total Payment</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">{formatCurrency(totalPayment)}</span>
        </div>
      </div>
    </div>
  );
};
