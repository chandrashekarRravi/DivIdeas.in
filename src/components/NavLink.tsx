interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-2 rounded-full hover:bg-muted/50 cursor-target"
    >
      {children}
    </a>
  );
};

export default NavLink;
