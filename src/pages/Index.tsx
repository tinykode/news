import { ProviderSection } from '../components/ProviderSection';
import { useState, useEffect } from 'react';

const Index = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/posts.json')
      .then(response => response.json())
      .then(data => {
        setProviders(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading latest posts...</div>
      </div>
    );
  }

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
        {providers.map((provider: any) => (
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
