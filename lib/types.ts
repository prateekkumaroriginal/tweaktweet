export type basicAnalysisResult = {
  bestTime: string;
  engagementPredicted: string;
  suggestedText: string;
  sentiment: string;
  suggestions: string[];
}

export type advancedAnalysisResult = basicAnalysisResult & {
  likesPredicted: string;
  tone: string;
}