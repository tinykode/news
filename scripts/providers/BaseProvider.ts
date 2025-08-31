export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
}

export abstract class BaseProvider {
  abstract name: string;
  
  abstract fetchPosts(): Promise<Article[]>;
  
  async getTopPosts(): Promise<Article[]> {
    const posts = await this.fetchPosts();
    return posts.slice(0, 10);
  }
}