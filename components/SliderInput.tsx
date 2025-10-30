
import React from 'react';

interface SliderInputProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  formatValue?: (value: number) => string;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  unit,
  formatValue,
}) => {
  const displayValue = formatValue ? formatValue(value) : value;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
        <div className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {displayValue} {unit && <span>{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
};
