import { BaseProvider, Article } from './BaseProvider.js';

export class DevToProvider extends BaseProvider {
  name = 'Dev Community';

  async fetchPosts(): Promise<Article[]> {
    try {
      const response = await fetch('https://dev.to/api/articles?top=7');
      const articles = await response.json();
      
      return articles.map((article: any) => ({
        id: `dev-${article.id}`,
        title: article.title,
        description: article.description || article.title,
        url: article.url
      }));
    } catch (error) {
      console.error('Error fetching Dev.to posts:', error);
      return [];
    }
  }
}