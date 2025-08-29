import { ArticleCard } from './ArticleCard';

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface ProviderSectionProps {
  name: string;
  articles: Article[];
}

export const ProviderSection = ({ name, articles }: ProviderSectionProps) => {
  // Show only top 6 articles in 2x3 grid
  const topArticles = articles.slice(0, 6);

  return (
    <div className="px-4 mb-8">
      <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-4 px-4">
          {name}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
        {topArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            url={article.url}
          />
        ))}
      </div>
    </div>
  );
};