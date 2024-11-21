import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import type { FamilyMember } from '../types';
import { MEMBER_COLORS } from '../config';

interface MemberManagerProps {
  members: FamilyMember[];
  onUpdateMembers: (members: FamilyMember[]) => void;
}

export function MemberManager({ members, onUpdateMembers }: MemberManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [names, setNames] = useState(members.map(m => m.name));

  const handleAddMember = () => {
    if (members.length >= MEMBER_COLORS.length) return;
    setNames([...names, `Member ${members.length + 1}`]);
  };

  const handleRemoveMember = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSave = () => {
    const newMembers = names.map((name, index) => ({
      id: (index + 1).toString(),
      name,
      color: MEMBER_COLORS[index]
    }));
    onUpdateMembers(newMembers);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors mb-6 flex items-center justify-center gap-2"
      >
        <UserPlus size={24} />
        Manage Family Members
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Family Members</h2>
      <div className="space-y-4">
        {names.map((name, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter name"
            />
            {names.length > 1 && (
              <button
                onClick={() => handleRemoveMember(index)}
                className="px-3 text-red-500 hover:text-red-700"
              >
                <X size={24} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        {names.length < MEMBER_COLORS.length && (
          <button
            onClick={handleAddMember}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Add Member
          </button>
        )}
        <button
          onClick={handleSave}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}