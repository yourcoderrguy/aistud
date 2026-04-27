import { create } from 'zustand';

// Define the exact shape of the data the AI will return
interface StudySessionData {
  summary?: string;
  flashcards?: Array<{ id: number; front: string; back: string }>;
  questions?: Array<{ id: number; question: string; options: string[]; correctAnswer: string }>;
}

interface StudyStore {
  activeSession: StudySessionData | null;
  sessionType: 'summary' | 'flashcards' | 'quiz' | null;
  setSession: (type: 'summary' | 'flashcards' | 'quiz', data: StudySessionData) => void;
  clearSession: () => void;
}

export const useStudyStore = create<StudyStore>((set) => ({
  activeSession: null,
  sessionType: null,
  
  // Call this when the Python server returns the AI data
  setSession: (type, data) => set({ sessionType: type, activeSession: data }),
  
  // Call this when the user leaves the result screen to free up phone memory
  clearSession: () => set({ activeSession: null, sessionType: null }),
}));