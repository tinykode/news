import { BaseProvider, Article } from './BaseProvider.js';

interface RedditPost {
  data: {
    id: string;
    title: string;
    selftext: string;
    url: string;
    permalink: string;
    is_self: boolean;
  };
}

interface RedditResponse {
  data: {
    children: RedditPost[];
  };
}

export class RedditProvider extends BaseProvider {
  name = 'Reddit';

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchPosts(): Promise<Article[]> {
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Add a small delay to avoid rate limiting
        if (attempt > 1) {
          await this.delay(2000 * attempt);
        }

        const response = await fetch('https://www.reddit.com/r/programming/hot.json?limit=10', {
          headers: {
            'User-Agent': 'paper-feed/1.0.0 (by /u/paper-feed-bot)',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
          },
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        
        if (!response.ok) {
          console.warn(`Reddit API returned ${response.status}: ${response.statusText} (attempt ${attempt}/${maxRetries})`);
          if (attempt === maxRetries) {
            return [];
          }
          continue;
        }
        
        const data: RedditResponse = await response.json();
        
        return data.data.children
          .filter((post: RedditPost) => post.data.title && !post.data.is_self)
          .map((post: RedditPost) => ({
            id: `reddit-${post.data.id}`,
            title: post.data.title,
            description: post.data.selftext || post.data.title,
            url: post.data.url.startsWith('http') ? post.data.url : `https://reddit.com${post.data.permalink}`
          }));
      } catch (error) {
        console.error(`Error fetching Reddit posts (attempt ${attempt}/${maxRetries}):`, error);
        if (attempt === maxRetries) {
          return [];
        }
      }
    }
    
    return [];
  }
}