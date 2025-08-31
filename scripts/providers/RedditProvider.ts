import { BaseProvider, Article } from './BaseProvider.js';

export class RedditProvider extends BaseProvider {
  name = 'Reddit';

  async fetchPosts(): Promise<Article[]> {
    try {
      const response = await fetch('https://www.reddit.com/r/programming/hot.json?limit=10', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      console.log(response);
      const data = await response.json();
      
      return data.data.children
        .filter((post: any) => post.data.title && !post.data.is_self)
        .map((post: any) => ({
          id: `reddit-${post.data.id}`,
          title: post.data.title,
          description: post.data.selftext || post.data.title,
          url: post.data.url.startsWith('http') ? post.data.url : `https://reddit.com${post.data.permalink}`
        }));
    } catch (error) {
      console.error('Error fetching Reddit posts:', error);
      return [];
    }
  }
}