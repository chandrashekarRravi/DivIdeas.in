const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-logo font-bold tracking-wider cursor-target ${className}`}>
      <span className="text-primary">&lt;</span>
      <span className="bg-gradient-primary bg-clip-text text-transparent">Div</span>
      <span className="text-foreground">Ideas</span>
      <span className="text-primary">/&gt;</span>
    </div>
  );
};

export default Logo;
