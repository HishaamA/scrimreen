export interface Suspect {
  id: string;
  name: string;
  age: number;
  occupation: string;
  location: string;
  alibi: string;
  motive?: string;
  background: string;
  eyeColor?: string;
  height?: number;
  weight?: number;
  dateJoined?: string;
  dateOfBirth?: string;
}

export interface Evidence {
  id: string;
  type: string;
  description: string;
  location: string;
  timestamp: string;
  relatedTo: string[];
  content?: string;
  imageUrl?: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  description: string;
  lastActivity: string;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  briefing: string;
  difficulty: 1 | 2 | 3;
  culprit: string;
  type: string;
  location: string;
  suspects: Suspect[];
  evidence: Evidence[];
  locations: Location[];
  audioBriefingUrl?: string;
  solution: {
    who: string;
    why: string;
    how: string;
  };
}

export type QueryType = 'suspects' | 'evidence' | 'locations';

export interface WindowState {
  id: string;
  title: string;
  type: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimizing?: boolean;
}

export interface PythonResult {
  output?: string;
  error?: string;
  data?: any;
}