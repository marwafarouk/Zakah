import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { FamilyMember, Currency } from '../types';
import { CURRENCIES } from '../config';

interface DonationFormProps {
  onAddDonation: (amount: number, description: string, contributor: string, currency: string) => void;
  familyMembers: FamilyMember[];
}

export function DonationForm({ onAddDonation, familyMembers }: DonationFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [contributor, setContributor] = useState(familyMembers[0]?.id || '');
  const [currency, setCurrency] = useState<string>(CURRENCIES[0].code);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !contributor || !currency) return;
    
    onAddDonation(Number(amount), description, contributor, currency);
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Donation</h2>
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Who are you?
          </label>
          <select
            value={contributor}
            onChange={(e) => setContributor(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What was this donation for?"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <PlusCircle size={24} />
          Add Donation
        </button>
      </div>
    </form>
  );
}