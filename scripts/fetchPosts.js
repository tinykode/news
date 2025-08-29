import { writeFileSync } from 'fs';
import { HackerNewsProvider } from './providers/HackerNewsProvider.js';
import { RedditProvider } from './providers/RedditProvider.js';
import { DevToProvider } from './providers/DevToProvider.js';

const providers = [
  new HackerNewsProvider(),
  new RedditProvider(),
  new DevToProvider()
];

async function fetchAllPosts() {
  const results = [];
  
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