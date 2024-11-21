import React from 'react';
import type { Donation, FamilyMember, Target } from '../types';
import { CURRENCIES } from '../config';

interface ProgressChartProps {
  donations: Donation[];
  familyMembers: FamilyMember[];
  selectedCurrency: string;
  targets: Target[];
}

export function ProgressChart({ donations, familyMembers, selectedCurrency, targets }: ProgressChartProps) {
  const currency = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];
  const currencyDonations = donations.filter(d => d.currency === selectedCurrency);
  const target = targets.find(t => t.currency === selectedCurrency)?.amount || 0;
  
  const total = currencyDonations.reduce((sum, d) => sum + d.amount, 0);
  const progress = target > 0 ? Math.min((total / target) * 100, 100) : 0;
  
  const contributionsByMember = familyMembers.map(member => ({
    ...member,
    total: currencyDonations
      .filter(d => d.contributor === member.id)
      .reduce((sum, d) => sum + d.amount, 0)
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {currency.name} Progress
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Current: {currency.symbol}{total.toFixed(2)}</span>
          <span>Target: {currency.symbol}{target.toFixed(2)}</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center mt-2 text-sm font-medium text-gray-600">
          {progress.toFixed(1)}% Complete
        </div>
      </div>
      
      <div className="space-y-4">
        {contributionsByMember.map(member => (
          <div key={member.id} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: member.color }}
            />
            <span className="text-lg text-gray-700">{member.name}</span>
            <span className="text-lg text-gray-500 ml-auto">
              {currency.symbol}{member.total.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}