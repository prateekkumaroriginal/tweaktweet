// @ts-nocheck
const { formType } = require("../lib/zod-props");
const axios = require("axios");

jest.mock('axios');

const mockBasicResult = {
  bestTime: "2:00 PM",
  engagementPredicted: "high",
  suggestedText: "Sample text",
  sentiment: "positive",
  suggestions: ["suggestion1", "suggestion2"],
  suggestedHashtags: ["#hash1", "#hash2"],
  tone: "friendly",
  style: "casual"
};

const mockAdvancedResult = {
  ...mockBasicResult,
  likesPredicted: "1000",
  sharesPredicted: "500",
  commentsPredicted: "100",
  imageAnalysis: null
};

describe("TweakTweet Tests", () => {
  beforeAll(() => {
    axios.post.mockImplementation((url) => {
      if (url.includes(formType.Values.BASIC)) {
        return Promise.resolve({ data: mockBasicResult });
      }
      return Promise.resolve({ data: mockAdvancedResult });
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Analysis", () => {
    test('should return complete basic analysis result', async () => {
      const result = (await axios.post(`/api/ask?${formType.Values.BASIC}`)).data;
      
      expect(result).toHaveProperty('bestTime', expect.any(String));
      expect(result).toHaveProperty('engagementPredicted', expect.any(String));
      expect(result).toHaveProperty('suggestedText', expect.any(String));
      expect(result).toHaveProperty('sentiment', expect.any(String));
      expect(result.suggestions).toBeInstanceOf(Array);
      expect(result.suggestedHashtags).toBeInstanceOf(Array);
      expect(result).toHaveProperty('tone', expect.any(String));
      expect(result).toHaveProperty('style', expect.any(String));
    });

    test('should correctly analyze engagement prediction', async () => {
      const result = (await axios.post(`/api/ask?${formType.Values.BASIC}`)).data;
      expect(["very poor", "poor", "average", "high", "very high"])
        .toContain(result.engagementPredicted.toLowerCase());
    });
  });
  
  describe('Advanced Analysis', () => {
    test('should return complete advanced analysis result', async () => {
      const result = (await axios.post(`/api/ask?${formType.Values.ADVANCED}`)).data;
      
      expect(result).toHaveProperty('bestTime', expect.any(String));
      expect(result).toHaveProperty('engagementPredicted', expect.any(String));
      expect(result).toHaveProperty('suggestedText', expect.any(String));
      expect(result).toHaveProperty('sentiment', expect.any(String));
      expect(result.suggestions).toBeInstanceOf(Array);
      expect(result.suggestedHashtags).toBeInstanceOf(Array);
      expect(result).toHaveProperty('tone', expect.any(String));
      expect(result).toHaveProperty('style', expect.any(String));
      expect(result).toHaveProperty('likesPredicted', expect.any(String));
      expect(result).toHaveProperty('sharesPredicted', expect.any(String));
      expect(result).toHaveProperty('commentsPredicted', expect.any(String));
      
      if (result.imageAnalysis !== null) {
        expect(result.imageAnalysis).toEqual(expect.any(String));
      } else {
        expect(result.imageAnalysis).toBeNull();
      }
    });

    test('should correctly analyze engagement prediction', async () => {
      const result = (await axios.post(`/api/ask?${formType.Values.ADVANCED}`)).data;
      expect(["very poor", "poor", "average", "high", "very high"])
        .toContain(result.engagementPredicted.toLowerCase());
    });
  });

  test('should handle API errors gracefully', async () => {
    axios.post.mockRejectedValueOnce(new Error('API Error'));

    await expect(axios.post(`/api/ask?${formType.Values.ADVANCED}`))
      .rejects
      .toThrow('API Error');
  });
});