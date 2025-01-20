const CONTEXT: string = `Give me a sentiment and engagement analysis of the post below. Give answer in json format. The fields should be:-
1. engagementPredicted: "very poor", "poor", "average", "high", "very high"
2. sentiment: what is the sentiment of the post should be here.
3. bestTime: what is the best time to post should be here. Don't give any excuses like "It's difficult to determine the best time without more context". Just give a time.
4. suggestions: an array containing the suggestions for maximizing engagement.
5. suggestedText: give an example improved text with the same meaning under 280 characters.

Note: Start with '{' and end with '}' as plain text. Don't give it as a block of code. No other bullshit.

Here's the post:-\n
`

export default CONTEXT;