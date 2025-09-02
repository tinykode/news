interface ArticleCardProps {
  title: string;
  description: string;
  url: string;
}

export const ArticleCard = ({ title, description, url }: ArticleCardProps) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-card rounded-lg shadow-paper hover:shadow-paper-hover transition-smooth cursor-pointer p-4 h-36 flex flex-col justify-between border border-border/30 relative overflow-hidden"
      style={{ backgroundImage: 'var(--paper-texture)' }}
    >
      <h3 className="font-serif font-semibold text-sm leading-tight text-card-foreground group-hover:text-primary transition-colors line-clamp-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mt-2" dangerouslySetInnerHTML={{__html: description}} />
    </div>
  );
};