# AI Paper Feed 🤖

An AI-focused news aggregator that curates the latest and most interesting posts about artificial intelligence, machine learning, and large language models from multiple sources.

## 🚀 Features

- **Multi-source AI content**: Aggregates AI-related posts from Hacker News, Reddit AI communities, and Dev.to
- **Smart filtering**: Uses keyword matching and tag filtering to ensure only AI/ML content is displayed
- **Real-time updates**: Fresh content fetched regularly from multiple providers
- **Clean interface**: Modern, responsive design built with React and shadcn/ui

## 📊 Data Sources

### Hacker News AI
- Filters top stories for AI-related content using comprehensive keyword matching
- Keywords include: AI, machine learning, neural networks, LLM, GPT, ChatGPT, OpenAI, Claude, etc.

### Reddit AI Communities
- Fetches from AI-focused subreddits: MachineLearning, artificial, ChatGPT, OpenAI, LocalLLaMA, singularity, deeplearning
- Configurable subreddit selection with preset configurations for different AI focuses

### Dev Community AI
- Filters Dev.to articles for AI-related tags and content
- Searches both tagged AI content and filters general articles for AI keywords

## 🛠 Technologies

This project is built with:

- **Frontend**: React, TypeScript, Vite
- **UI**: shadcn-ui, Tailwind CSS
- **Data Fetching**: Node.js scripts with multiple provider architecture
- **Deployment**: Lovable platform

## 🚀 Quick Start

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Fetch latest AI posts
npm run prepare:posts

# Start development server
npm run dev
```

## 📝 Configuration

### Reddit Provider Options

```typescript
// Default AI-focused subreddits
new RedditRSSProvider()

// Pre-configured options
RedditRSSProvider.createLLMFocused()    // LLM-specific communities
RedditRSSProvider.createAIResearch()    // Research-focused communities  
RedditRSSProvider.createGeneralAI()     // General AI discussions

// Custom subreddits
new RedditRSSProvider(['ChatGPT', 'OpenAI', 'ClaudeAI'])
```

### Adding New Providers

The architecture supports easy addition of new AI content providers. Simply extend the `BaseProvider` class and implement the `fetchPosts()` method with appropriate AI content filtering.

## 🔄 Content Updates

Posts are fetched via the `prepare:posts` script, which:
1. Calls each provider to fetch AI-related content
2. Applies filtering based on keywords and tags
3. Removes duplicates and shuffles for diversity
4. Saves results to `public/assets/posts.json`

## 📱 Deployment

### Via Lovable
1. Open [Lovable Project](https://lovable.dev/projects/403e6340-ac73-44c7-90fb-09b169e8f852)
2. Click Share → Publish

### Custom Domain
Navigate to Project > Settings > Domains and click Connect Domain.
[Learn more about custom domains](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
