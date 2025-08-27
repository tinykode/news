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
  // Split articles into two rows
  const midPoint = Math.ceil(articles.length / 2);
  const firstRow = articles.slice(0, midPoint);
  const secondRow = articles.slice(midPoint);

  return (
    <div className="mb-8">
      <h2 className="font-serif text-lg font-semibold text-foreground mb-4 px-4">
        {name}
      </h2>
      
      {/* First row - horizontal scroll */}
      <div className="overflow-x-auto scrollbar-hide mb-3">
        <div className="flex gap-3 px-4" style={{ width: 'max-content' }}>
          {firstRow.map((article, index) => (
            <div key={article.id} className="w-48 flex-shrink-0">
              <ArticleCard
                title={article.title}
                description={article.description}
                url={article.url}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second row - horizontal scroll */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4" style={{ width: 'max-content' }}>
          {secondRow.map((article, index) => (
            <div key={article.id} className="w-48 flex-shrink-0">
              <ArticleCard
                title={article.title}
                description={article.description}
                url={article.url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};