import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { DonationForm } from './components/DonationForm';
import { DonationsList } from './components/DonationsList';
import { ProgressChart } from './components/ProgressChart';
import { MemberManager } from './components/MemberManager';
import { TargetManager } from './components/TargetManager';
import type { Donation, FamilyMember, Target } from './types';
import { CURRENCIES, DEFAULT_MEMBERS } from './config';

function App() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [members, setMembers] = useState<FamilyMember[]>(DEFAULT_MEMBERS);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0].code);
  const [targets, setTargets] = useState<Target[]>(
    CURRENCIES.map(curr => ({ currency: curr.code, amount: 0 }))
  );

  const handleAddDonation = (amount: number, description: string, contributor: string, currency: string) => {
    const newDonation: Donation = {
      id: Date.now().toString(),
      amount,
      description,
      contributor,
      currency,
      date: new Date().toLocaleDateString()
    };
    setDonations(prev => [newDonation, ...prev]);
    setSelectedCurrency(currency);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 justify-center">
            <Heart className="text-rose-500" size={36} />
            <h1 className="text-3xl font-bold text-gray-800">Family Charity Tracker</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <MemberManager
              members={members}
              onUpdateMembers={setMembers}
            />
            <TargetManager
              targets={targets}
              onUpdateTargets={setTargets}
            />
            <DonationForm
              onAddDonation={handleAddDonation}
              familyMembers={members}
            />
            <ProgressChart
              donations={donations}
              familyMembers={members}
              selectedCurrency={selectedCurrency}
              targets={targets}
            />
          </div>
          <div>
            <DonationsList
              donations={donations}
              familyMembers={members}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;