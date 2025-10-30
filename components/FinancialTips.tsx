
import React, { useState, useCallback } from 'react';
import { generateFinancialTips } from '../services/geminiService';
import { SparklesIcon } from './icons';

interface FinancialTipsProps {
  income: number;
  emi: number;
  otherExpenses: number;
  totalExpenses: number;
  savings: number;
}

export const FinancialTips: React.FC<FinancialTipsProps> = (props) => {
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetTips = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setTips([]);
    try {
      const result = await generateFinancialTips(
        props.income,
        props.emi,
        props.otherExpenses,
        props.totalExpenses,
        props.savings
      );
      // Split by newline and filter out empty strings
      const formattedTips = result.split('\n').map(tip => tip.trim()).filter(tip => tip.length > 0);
      setTips(formattedTips);
    } catch (e) {
      setError("Failed to fetch tips. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [props.income, props.emi, props.otherExpenses, props.totalExpenses, props.savings]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
        <SparklesIcon className="h-6 w-6 mr-3 text-indigo-500" />
        AI Financial Tips
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Get personalized tips from Gemini to help improve your financial health based on your current budget.
      </p>
      
      <button
        onClick={handleGetTips}
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Get AI Tips'
        )}
      </button>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      
      {tips.length > 0 && (
        <div className="mt-6 space-y-3">
            {tips.map((tip, index) => (
                <div key={index} className="p-3 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">
                      <SparklesIcon />
                    </div>
                    <p className="ml-3 text-sm text-indigo-800 dark:text-indigo-200">{tip}</p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};
