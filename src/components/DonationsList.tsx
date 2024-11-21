import React from 'react';
import type { Donation, FamilyMember } from '../types';
import { CURRENCIES } from '../config';

interface DonationsListProps {
  donations: Donation[];
  familyMembers: FamilyMember[];
}

export function DonationsList({ donations, familyMembers }: DonationsListProps) {
  const getMemberColor = (contributorId: string) => {
    return familyMembers.find(member => member.id === contributorId)?.color || 'gray';
  };

  const formatAmount = (amount: number, currency: string) => {
    const curr = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];
    return `${curr.symbol}${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Recent Donations</h2>
      <div className="space-y-4">
        {donations.length === 0 ? (
          <p className="text-gray-500 text-center py-4 text-lg">No donations recorded yet</p>
        ) : (
          donations.map((donation) => (
            <div
              key={donation.id}
              className="border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-xl text-gray-800">
                    {formatAmount(donation.amount, donation.currency)}
                  </p>
                  <p className="text-gray-600 text-lg">{donation.description}</p>
                </div>
                <div className="text-right">
                  <span
                    className="inline-block px-4 py-2 rounded-full text-lg font-medium"
                    style={{ backgroundColor: getMemberColor(donation.contributor) }}
                  >
                    {familyMembers.find(m => m.id === donation.contributor)?.name}
                  </span>
                  <p className="text-gray-500 text-base mt-2">{donation.date}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}