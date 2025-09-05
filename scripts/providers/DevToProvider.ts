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

  async fetchPosts(): Promise<Article[]> {
    try {
      // Fetch articles with AI-related tags first
      const taggedResponse = await fetch(`https://dev.to/api/articles/latest?tag=ai&top=1`);
      const taggedArticles: DevToArticle[] = await taggedResponse.json();

      const aiArticles = taggedArticles
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