export type basicAnalysisResult = {
  bestTime: string;
  engagementPredicted: string;
  suggestedText: string;
  sentiment: string;
  suggestions: string[];
  suggestedHashtags: string[];
  tone: string;
  style: string;
}

export type advancedAnalysisResult = basicAnalysisResult & {
  likesPredicted: string;
  sharesPredicted: string;
  commentsPredicted: string;
  imageAnalysis: string | null;
}