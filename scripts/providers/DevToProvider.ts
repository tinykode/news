import { shuffleArray } from '../utils.js';
import { BaseProvider, Article } from './BaseProvider.js';

interface DevToArticle {
  id: number;
  title: string;
  description?: string;
  url: string;
  tag_list: string[];
}

export class DevToProvider extends BaseProvider {
  name = 'Dev Community AI';

  // AI-related tags and keywords for filtering
  private aiTags = [
    'ai', 'machinelearning', 'deeplearning', 'chatgpt', 'openai', 'llm',
    'artificialintelligence', 'ml', 'nlp', 'computervision', 'tensorflow',
    'pytorch', 'huggingface', 'langchain', 'gpt', 'claude', 'gemini'
  ];

  private aiKeywords = [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
    'neural network', 'llm', 'gpt', 'chatgpt', 'openai', 'claude', 'gemini',
    'anthropic', 'transformer', 'bert', 'nlp', 'computer vision', 'generative',
    'stable diffusion', 'midjourney', 'dall-e', 'copilot', 'langchain',
    'hugging face', 'pytorch', 'tensorflow', 'keras', 'fine-tuning',
    'prompt engineering', 'rag', 'retrieval augmented', 'foundation model'
  ];

  private isAIRelated(title: string, description: string, tags?: string[]): boolean {
    const content = `${title} ${description}`.toLowerCase();
    
    // Check if any AI tags are present
    if (tags && tags.some(tag => this.aiTags.includes(tag.toLowerCase()))) {
      return true;
    }
    
    // Check if any AI keywords are in title or description
    return this.aiKeywords.some(keyword => content.includes(keyword.toLowerCase()));
  }

  async fetchPosts(): Promise<Article[]> {
    try {
      // Fetch articles with AI-related tags first
      const aiTagsQuery = this.aiTags.slice(0, 5).join(',');
      const taggedResponse = await fetch(`https://dev.to/api/articles?tag=${aiTagsQuery}&top=100`);
      const taggedArticles: DevToArticle[] = await taggedResponse.json();
      
      // Also fetch general top articles and filter for AI content
      const generalResponse = await fetch('https://dev.to/api/articles?top=100');
      const generalArticles: DevToArticle[] = await generalResponse.json();
      
      const allArticles: DevToArticle[] = [...taggedArticles, ...generalArticles];
      
      // Remove duplicates and filter for AI content
      const uniqueArticles = Array.from(
        new Map(allArticles.map((article: DevToArticle) => [article.id, article])).values()
      );
      
      const aiArticles = shuffleArray(uniqueArticles)
        .filter((article: DevToArticle) => 
          this.isAIRelated(article.title, article.description || '', article.tag_list)
        )
        .map((article: DevToArticle) => ({
          id: `dev-${article.id}`,
          title: article.title,
          description: article.description || article.title,
          url: article.url
        }));
        
      return aiArticles;
    } catch (error) {
      console.error('Error fetching Dev.to AI posts:', error);
      return [];
    }
  }
}