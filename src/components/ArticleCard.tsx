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
      className="group bg-card rounded-lg shadow-paper hover:shadow-paper-hover transition-all duration-200 cursor-pointer p-4 h-32 flex flex-col justify-between border border-border/50"
    >
      <h3 className="font-serif font-semibold text-sm leading-tight text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mt-2">
        {description}
      </p>
    </div>
  );
};