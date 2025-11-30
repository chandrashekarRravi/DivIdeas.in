import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import heroIllustration from "@/assets/hero-illustration.png";
import Logo from "./Logo";
import NavLink from "./NavLink";
import CircularText from "./CircularText";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToBookCall = () => {
    const element = document.getElementById('book-call');
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Logo className="text-xl" />
            
            {/* Desktop Navigation - Centered with pill background */}
            <div className="hidden md:flex items-center gap-1 bg-card border border-border rounded-full px-2 py-2 shadow-sm">
              <NavLink href="#solutions">Services</NavLink>
              <NavLink href="#portfolio">Our Work</NavLink>
              <NavLink href="#achievements">Achievements</NavLink>
              <NavLink href="#faq">FAQs</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>

            <div className="hidden md:block">
              <Button 
                onClick={scrollToBookCall} 
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6"
              >
                Book a Call
                <span className="ml-2">→</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 cursor-target"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-4">
                <NavLink href="#solutions">Services</NavLink>
                <NavLink href="#portfolio">Our Work</NavLink>
                <NavLink href="#achievements">Achievements</NavLink>
                <NavLink href="#faq">FAQs</NavLink>
                <NavLink href="#contact">Contact</NavLink>
                <Button onClick={scrollToBookCall} className="w-full">
                  Book a Call
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-8 fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="font-display">
                  Transform Your Ideas into{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Stunning Web Applications
                  </span>
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                We design and develop high-performance, scalable, and responsive web applications tailored to your needs.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="hover-scale shadow-elegant"
                  onClick={scrollToBookCall}
                >
                  Get a Free Quote
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="hover-scale"
                  onClick={() => scrollToSection('portfolio')}
                >
                  View Our Work
                </Button>
              </div>
            </div>
            
            <div className="relative slide-up flex items-center justify-center">
              <CircularText
                text="*STARTWITH*DIVIDEAS"
                onHover="slowDown"
                spinDuration={10}
                className="absolute -top-20 right-0 z-10"
              />
              <img 
                src={heroIllustration} 
                alt="Team collaboration illustration with target goal" 
                className="w-full h-auto max-w-lg lg:max-w-xl xl:max-w-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
