
import { GoogleGenAI } from "@google/genai";

const API_KEY = AIzaSyDD-ZYkq7gi_XsR_tDFAQTPqC4udSd4NAc;

if (!API_KEY) {
  // In a real app, you might show an error to the user or disable AI features.
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateFinancialTips = async (
  income: number,
  emi: number,
  otherExpenses: number,
  totalExpenses: number,
  savings: number
): Promise<string> => {
  try {
    const prompt = `
      Based on the following financial data, provide 3 concise and actionable financial tips to improve savings.
      The user's goal is to manage their budget better. Format the output as a clean, easy-to-read list. Do not use markdown for list items (e.g. no dashes or asterisks).
      
      Financial Data:
      - Monthly Income: ${income.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      - Monthly Loan EMI: ${emi.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      - Other Monthly Expenses: ${otherExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      - Total Monthly Expenses: ${totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      - Monthly Savings: ${savings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}

      Tips:
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error generating financial tips:", error);
    return "Sorry, I couldn't generate tips at the moment. Please check your API key and try again.";
  }
};
