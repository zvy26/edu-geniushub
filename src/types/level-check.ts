export interface WritingTopic {
  topic: string;
}

export interface EssaySubmission {
  topic: string;
  essay: string;
  timeSpent: number;
}

export interface EssayEvaluation {
  overallBand: string;
  taskAchievement: string;
  coherenceCohesion: string;
  lexicalResource: string;
  grammaticalRange: string;
  feedback: string;
  suggestions: string[];
  wordCount: number;
  submissionId: string;
}