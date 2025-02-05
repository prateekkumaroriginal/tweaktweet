export const BASIC_CONTEXT: string = `Give me a sentiment and engagement analysis of the post below. Give answer in json format. The fields should be:-
1. engagementPredicted: "poor", "average", "high", "very high"
2. sentiment: what is the sentiment of the post should be here.
3. bestTime: what is the best time to post should be here. Don't give any excuses like "It's difficult to determine the best time without more context". Just give a time.
4. suggestions: an array containing the suggestions for maximizing engagement.
5. suggestedText: give an example improved text with the same meaning under 280 characters.
6. tone: Describe the overall emotion the post conveys.
7. style: Define the writing style used in the post (e.g., professional, casual, humorous, persuasive, etc.).
8. suggestedHashtags: an array containing the suggeste hashtags. Maximum is 5.

Note: Start with '{' and end with '}' as plain text. Don't give it as a block of code. No other bullshit.

Here's the post:-\n
`

export const ADVANCED_CONTEXT: string = `Give me a sentiment and engagement analysis of the post below. Give answer in json format. The fields should be:-
1. engagementPredicted: "poor", "average", "high", "very high"
2. sentiment: what is the sentiment of the post should be here.
3. bestTime: what is the best time to post should be here. Don't give any excuses like "It's difficult to determine the best time without more context". Just give a time.
4. suggestions: an array containing the suggestions for maximizing engagement.
5. suggestedText: give an example improved text with the same meaning under 280 characters.
6. tone: Describe the overall emotion the post conveys.
7. style: Define the writing style used in the post (e.g., professional, casual, humorous, persuasive, etc.).
8. suggestedHashtags: an array containing the suggeste hashtags. Maximum is 5.
9. likesPredicted: Give a rough estimate of how many likes the post would achieve based on the platform and number of followers.
10. sharesPredicted: Predict how many shares the post could get based on the platform and number of followers.
11. commentsPredicted: Estimate the number of comments the post might receive based on the platform and number of followers.
12. imageAnalysis: If imageCaption exists in the input, analyze how the image (based on the caption) complements the post text and enhances the message. Return null if no imageCaption is present.


Note: Start with '{' and end with '}' as plain text. Don't give it as a block of code. No other bullshit.

Here's the post with other details in json format:-\n
`
