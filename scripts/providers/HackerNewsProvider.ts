import { BaseProvider, Article } from './BaseProvider.js';

export class HackerNewsProvider extends BaseProvider {
  name = 'Hacker News';

  async fetchPosts(): Promise<Article[]> {
    try {
      // Fetch top stories IDs
      const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json');
      const topStoryIds = await topStoriesResponse.json();

      // Fetch first 20 stories details
      const storyPromises = topStoryIds.slice(0, 20).map(async (id: number) => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return response.json();
      });
      
      const stories = await Promise.all(storyPromises);
      
      return stories
        .filter(story => story && story.title && story.url)
        .map(story => ({
          id: `hn-${story.id}`,
          title: story.title,
          description: story.text, // HN doesn't have descriptions, use title
          url: story.url
        }));
    } catch (error) {
      console.error('Error fetching HackerNews posts:', error);
      return [];
    }
  }
}