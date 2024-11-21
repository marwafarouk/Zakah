import React, { useState } from 'react';
import { Target } from 'lucide-react';
import type { Target as TargetType } from '../types';
import { CURRENCIES } from '../config';

interface TargetManagerProps {
  targets: TargetType[];
  onUpdateTargets: (targets: TargetType[]) => void;
}

export function TargetManager({ targets, onUpdateTargets }: TargetManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [amounts, setAmounts] = useState<Record<string, string>>(
    Object.fromEntries(
      CURRENCIES.map(curr => [
        curr.code,
        (targets.find(t => t.currency === curr.code)?.amount || 0).toString()
      ])
    )
  );

  const handleSave = () => {
    const newTargets = Object.entries(amounts).map(([currency, amount]) => ({
      currency,
      amount: parseFloat(amount) || 0
    }));
    onUpdateTargets(newTargets);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors mb-6 flex items-center justify-center gap-2"
      >
        <Target size={24} />
        Set Target Amounts
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Target Amounts</h2>
      <div className="space-y-4">
        {CURRENCIES.map((curr) => (
          <div key={curr.code} className="flex gap-3 items-center">
            <span className="text-lg font-medium w-24">{curr.code}:</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                {curr.symbol}
              </span>
              <input
                type="number"
                value={amounts[curr.code]}
                onChange={(e) => setAmounts(prev => ({
                  ...prev,
                  [curr.code]: e.target.value
                }))}
                className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter target amount"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setIsEditing(false)}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
        >
          Save Targets
        </button>
      </div>
    </div>
  );
}