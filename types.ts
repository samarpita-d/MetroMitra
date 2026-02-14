
export type Language = 'en' | 'hi';

export enum CrowdCategory {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface MetroStation {
  id: string;
  nameEn: string;
  nameHi: string;
  line: string;
}

export interface CrowdReport {
  id: string;
  stationId: string;
  timestamp: string;
  crowdLevel: number;
  imageUrl?: string;
  authenticityScore: number;
  userId: string;
}

export interface UserProfile {
  id: string;
  username: string;
  trustScore: number;
  totalPoints: number;
  contributions: number;
  rank: number;
}

export type View = 'dashboard' | 'check' | 'report' | 'leaderboard' | 'insights' | 'profile';
