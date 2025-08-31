import { writeFileSync } from 'fs';
import { HackerNewsProvider } from './providers/HackerNewsProvider.js';
import { RedditRSSProvider } from './providers/RedditRSSProvider.js';
import { DevToProvider } from './providers/DevToProvider.js';

import { Article } from './providers/BaseProvider.js';

const providers = [
  new HackerNewsProvider(),
  new RedditRSSProvider(),
  new DevToProvider()
];

async function fetchAllPosts() {
  const results: { name: string; articles: Article[] }[] = [];

  for (const provider of providers) {
    try {
      console.log(`Fetching posts from ${provider.name}...`);
      const posts = await provider.getTopPosts();
      results.push({
        name: provider.name,
        articles: posts
      });
      console.log(`✓ Fetched ${posts.length} posts from ${provider.name}`);
    } catch (error) {
      console.error(`✗ Error fetching from ${provider.name}:`, error);
    }
  }
  
  const outputPath = 'public/assets/posts.json';
  writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Data saved to ${outputPath}`);
  console.log(`Total providers: ${results.length}`);
}

fetchAllPosts().catch(console.error);