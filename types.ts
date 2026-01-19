export interface User {
  phoneNumber: string;
  name: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: 'credit' | 'debit';
}

export type Screen = 'auth' | 'dashboard' | 'game' | 'wallet' | 'rewards' | 'profile' | 'spin';

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TriviaResponse {
  question: string;
  options: string[];
  correctAnswer: string;
}
