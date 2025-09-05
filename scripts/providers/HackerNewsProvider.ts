import { BaseProvider, Article } from './BaseProvider.js';

interface HNStory {
  objectID: string;
  title: string;
  url?: string;
  points?: number;
  num_comments?: number;
  story_text?: string;
  author: string;
  created_at: string;
  created_at_i: number;
  story_id: number;
  updated_at: string;
  children?: number[];
  _tags: string[];
  _highlightResult?: {
    title?: {
      value: string;
      matchLevel: string;
      matchedWords: string[];
      fullyHighlighted?: boolean;
    };
    author?: {
      value: string;
      matchLevel: string;
      matchedWords: string[];
    };
    url?: {
      value: string;
      matchLevel: string;
      matchedWords: string[];
      fullyHighlighted?: boolean;
    };
    story_text?: {
      value: string;
      matchLevel: string;
      matchedWords: string[];
    };
  };
}

interface HNSearchResponse {
  hits: HNStory[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  query: string;
  params: string;
  exhaustive?: {
    nbHits: boolean;
    typo: boolean;
  };
  exhaustiveNbHits?: boolean;
  exhaustiveTypo?: boolean;
}

export class HackerNewsProvider extends BaseProvider {
  name = 'Hacker News AI';

  private get24HoursAgoTimestamp(): number {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    return Math.floor(twentyFourHoursAgo.getTime() / 1000);
  }

  private cleanHtmlText(html: string): string {
    // Remove HTML tags and decode HTML entities
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&#x2F;/g, '/') // Decode forward slashes
      .replace(/&#34;/g, '"') // Decode quotes
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
  }

  async fetchPosts(): Promise<Article[]> {
    try {
      const timestamp24hAgo = this.get24HoursAgoTimestamp();
      
      // Use HN Algolia Search API to get AI-related stories from the last 24 hours
      const searchUrl = `https://hn.algolia.com/api/v1/search_by_date?` +
        `query=ai&` +
        `tags=story&` +
        `numericFilters=created_at_i>${timestamp24hAgo}&`;

      const response = await fetch(searchUrl);
      const data: HNSearchResponse = await response.json();

      if (!data.hits) {
        console.warn('No hits returned from HN API');
        return [];
      }

      // Filter out stories without URLs and sort by points (descending)
      const aiStories = data.hits
        .filter((story: HNStory) => story.url && story.title)
        // filter unique by urls
        .filter((story: HNStory, index: number, self: HNStory[]) =>
          index === self.findIndex((s) => s.url?.split('?')[0] === story.url?.split('?')[0])
        )
        .sort((a: HNStory, b: HNStory) => (b.points || 0) - (a.points || 0))
        .slice(0, 20) // Take top 20 by points
        .map((story: HNStory) => {
          let description = `${story.points || 0} points • ${story.num_comments || 0} comments`;
          
          // If there's story_text, clean it and use it as description
          if (story.story_text) {
            const cleanText = this.cleanHtmlText(story.story_text);
            if (cleanText && cleanText.length > 10) {
              description = cleanText.length > 150 
                ? cleanText.substring(0, 150) + '...' 
                : cleanText;
            }
          }

          return {
            id: `hn-${story.objectID}`,
            title: story.title,
            description,
            url: story.url as string
          };
        });

      console.log(`Found ${aiStories.length} AI stories from HackerNews in the last 24 hours`);
      return aiStories;
    } catch (error) {
      console.error('Error fetching HackerNews AI posts:', error);
      return [];
    }
  }
}