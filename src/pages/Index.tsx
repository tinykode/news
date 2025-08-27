import { ProviderSection } from '../components/ProviderSection';
import { mockProviders } from '../data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="font-serif text-2xl font-semibold text-foreground">
            Daily Dev
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Curated developer content from across the web
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="py-6">
        {mockProviders.map((provider) => (
          <ProviderSection
            key={provider.name}
            name={provider.name}
            articles={provider.articles}
          />
        ))}
      </main>
    </div>
  );
};

export default Index;
