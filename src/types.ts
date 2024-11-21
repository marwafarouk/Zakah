export interface Donation {
  id: string;
  amount: number;
  date: string;
  description: string;
  contributor: string;
  currency: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  color: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface Target {
  amount: number;
  currency: string;
}