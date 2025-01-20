# TweakTweet

TweakTweet is a powerful tool designed to help users maximize engagement on their social media posts. Whether you’re a content creator, marketer, or casual user, TweakTweet uses advanced analytics to provide real-time insights, sentiment analysis, and actionable suggestions to optimize your content.

## Features

- **Sentiment Analysis**: Understand the emotional tone of your posts.
- **Engagement Predictions**: Get insights on the predicted performance of your content.
- **Text Suggestions**: Receive suggestions to improve clarity, tone, and engagement.
- **Optimal Posting Times**: Learn the best times to post for maximum visibility.
- **User-Friendly Interface**: A clean and intuitive design to simplify post optimization.

## Tech Stack

- **Frontend**: React.js, Next.js, TailwindCSS
- **Backend**: Next.js
- **APIs**: Gemini 1.5 Flash
- **Deployment**: Vercel

## Getting Started

Follow these steps to set up and run TweakTweet locally.

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prateekkumaroriginal/tweaktweet.git
   cd tweaktweet
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   NEXT_APP_GEMINI_API_KEY="Your Gemini API Key"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

### Usage

1. Open the application in your browser.
2. Enter your post content and optionally specify additional details (e.g., number of followers).
3. Review the analysis and apply suggested tweaks to improve your post.
4. Use the "Best Posting Time" feature to schedule your post effectively.

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your fork and submit a pull request.

## Acknowledgments

- **OpenAI**: For inspiration and development assistance.
- **Gemini:** Using Gemini for making API calls.
