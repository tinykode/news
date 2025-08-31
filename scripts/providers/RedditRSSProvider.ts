import { BaseProvider, Article } from './BaseProvider.js';

export class RedditRSSProvider extends BaseProvider {
  name = 'Reddit';
  
  // Default subreddits to fetch from
  private subreddits = [
    'programming',
    'webdev', 
    'javascript',
    'reactjs',
    'Frontend'
  ];
  
  constructor(subreddits?: string[]) {
    super();
    if (subreddits && subreddits.length > 0) {
      this.subreddits = subreddits;
    }
  }
  
  // Static factory methods for common configurations
  static createProgrammingFocused(): RedditRSSProvider {
    return new RedditRSSProvider(['programming', 'webdev', 'javascript', 'reactjs', 'Frontend']);
  }
  
  static createTechNews(): RedditRSSProvider {
    return new RedditRSSProvider(['technology', 'programming', 'MachineLearning', 'artificial', 'startups']);
  }
  
  static createFullStack(): RedditRSSProvider {
    return new RedditRSSProvider(['programming', 'webdev', 'Frontend', 'backend', 'devops', 'docker']);
  }
  
  // Method to get current subreddits
  getSubreddits(): string[] {
    return [...this.subreddits];
  }
  
  // Method to add a subreddit
  addSubreddit(subreddit: string): void {
    if (!this.subreddits.includes(subreddit)) {
      this.subreddits.push(subreddit);
    }
  }
  
  // Method to remove a subreddit
  removeSubreddit(subreddit: string): void {
    const index = this.subreddits.indexOf(subreddit);
    if (index > -1) {
      this.subreddits.splice(index, 1);
    }
  }

  async fetchPosts(): Promise<Article[]> {
    try {
      const allArticles: Article[] = [];
      
      // Fetch posts from all configured subreddits
      const fetchPromises = this.subreddits.map(subreddit => 
        this.fetchFromSubreddit(subreddit)
      );
      
      const subredditResults = await Promise.allSettled(fetchPromises);
      
      // Combine all successful results
      subredditResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          allArticles.push(...result.value);
        } else {
          console.warn(`Failed to fetch from r/${this.subreddits[index]}:`, result.reason);
        }
      });
      
      // Sort by a mix of recency and randomness to get diverse content
      const shuffledArticles = this.shuffleArray(allArticles);
      
      // Return top 10 unique articles
      const uniqueArticles = this.removeDuplicates(shuffledArticles);
      return uniqueArticles.slice(0, 10);
    } catch (error) {
      console.error('Error fetching Reddit RSS posts:', error);
      return [];
    }
  }
  
  private async fetchFromSubreddit(subreddit: string): Promise<Article[]> {
    try {
      // Use RSS feed instead of JSON API as it's less likely to be blocked
      const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.rss?limit=5`, {
        headers: {
          'User-Agent': 'paper-feed/1.0.0 (RSS Reader)',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        }
      });
      
      if (!response.ok) {
        console.warn(`Reddit RSS for r/${subreddit} returned ${response.status}: ${response.statusText}`);
        return [];
      }
      
      const rssText = await response.text();
      
      // Parse Atom feed (Reddit uses Atom, not RSS)
      const articles: Article[] = [];
      const entryRegex = /<entry>(.*?)<\/entry>/gs;
      const matches = rssText.matchAll(entryRegex);
      
      for (const match of matches) {
        const entryContent = match[1];
        
        const titleMatch = entryContent.match(/<title[^>]*>(.*?)<\/title>/);
        const linkMatch = entryContent.match(/<link[^>]*href="([^"]+)"/);
        const contentMatch = entryContent.match(/<content[^>]*>(.*?)<\/content>/s);
        const idMatch = entryContent.match(/<id[^>]*>(.*?)<\/id>/);
        
        if (titleMatch && linkMatch) {
          // Extract Reddit post ID from ID field
          const id = idMatch?.[1] || '';
          const postIdMatch = id.match(/\/([a-z0-9]+)\/?$/);
          const postId = postIdMatch?.[1] || Math.random().toString(36).substr(2, 9);
          
          // Clean up title and content
          const title = titleMatch[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
          let description = title;
          
          if (contentMatch) {
            description = contentMatch[1]
              .replace(/<[^>]*>/g, '')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&')
              .trim();
            
            if (description.length > 200) {
              description = description.substring(0, 197) + '...';
            }
          }
          
          articles.push({
            id: `reddit-${subreddit}-${postId}`,
            title: `[r/${subreddit}] ${title}`,
            description: description || title,
            url: linkMatch[1]
          });
        }
        
        if (articles.length >= 5) break;
      }
      
      return articles;
    } catch (error) {
      console.error(`Error fetching Reddit RSS posts from r/${subreddit}:`, error);
      return [];
    }
  }
  
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  private removeDuplicates(articles: Article[]): Article[] {
    const seen = new Set<string>();
    return articles.filter(article => {
      // Use title as the deduplication key (without subreddit prefix)
      const normalizedTitle = article.title.replace(/^\[r\/\w+\]\s*/, '').toLowerCase();
      if (seen.has(normalizedTitle)) {
        return false;
      }
      seen.add(normalizedTitle);
      return true;
    });
  }
}
