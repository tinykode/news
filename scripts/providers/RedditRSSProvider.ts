import { BaseProvider, Article } from './BaseProvider.js';

export class RedditRSSProvider extends BaseProvider {
  name = 'Reddit';

  async fetchPosts(): Promise<Article[]> {
    try {
      // Use RSS feed instead of JSON API as it's less likely to be blocked
      const response = await fetch('https://www.reddit.com/r/programming/hot.rss?limit=10', {
        headers: {
          'User-Agent': 'paper-feed/1.0.0 (RSS Reader)',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        }
      });
      
      if (!response.ok) {
        console.warn(`Reddit RSS returned ${response.status}: ${response.statusText}`);
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
            id: `reddit-${postId}`,
            title: title,
            description: description || title,
            url: linkMatch[1]
          });
        }
        
        if (articles.length >= 10) break;
      }
      
      return articles;
    } catch (error) {
      console.error('Error fetching Reddit RSS posts:', error);
      return [];
    }
  }
}
