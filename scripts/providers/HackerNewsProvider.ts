import { BaseProvider, Article } from './BaseProvider.js';

export class HackerNewsProvider extends BaseProvider {
  name = 'Hacker News AI';

  // AI-related keywords for filtering
  private aiKeywords = [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
    'neural network', 'llm', 'gpt', 'chatgpt', 'openai', 'claude', 'gemini',
    'anthropic', 'transformer', 'bert', 'nlp', 'computer vision', 'generative',
    'stable diffusion', 'midjourney', 'dall-e', 'copilot', 'langchain',
    'hugging face', 'pytorch', 'tensorflow', 'keras', 'scikit-learn',
    'reinforcement learning', 'supervised learning', 'unsupervised learning',
    'foundation model', 'large language model', 'multimodal', 'reasoning',
    'agents', 'rag', 'retrieval augmented', 'fine-tuning', 'prompt engineering'
  ];

  private isAIRelated(title: string, text?: string): boolean {
    const content = `${title} ${text || ''}`.toLowerCase();
    return this.aiKeywords.some(keyword => content.includes(keyword.toLowerCase()));
  }

  async fetchPosts(): Promise<Article[]> {
    try {
      // Fetch top stories IDs - increase to get more potential AI posts
      const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json');
      const topStoryIds = await topStoriesResponse.json();

      // Fetch first 50 stories to have enough for filtering
      const storyPromises = topStoryIds.slice(0, 50).map(async (id: number) => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return response.json();
      });
      
      const stories = await Promise.all(storyPromises);
      
      const aiStories = stories
        .filter(story => story && story.title && story.url)
        .filter(story => this.isAIRelated(story.title, story.text))
        .map(story => ({
          id: `hn-${story.id}`,
          title: story.title,
          description: story.text || story.title,
          url: story.url
        }));
        
      // Return up to 15 AI-related stories
      return aiStories.slice(0, 15);
    } catch (error) {
      console.error('Error fetching HackerNews AI posts:', error);
      return [];
    }
  }
}