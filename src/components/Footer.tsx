import { Linkedin, Github, Mail, ArrowRight, Phone } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-4 bg-muted/30 border-t border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1">
            <Logo className="text-xl mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Strategic web design and development tailored to drive results and conversions.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('solutions')} className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-target">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('portfolio')} className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-target">
                  Our Work
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('achievements')} className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-target">
                  Achievements
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-target">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-target">
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@chandra.dev.in" className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2 cursor-target">
                  <Mail className="h-4 w-4" />
                  contact@chandra.dev.in
                </a>
              </li>
              <li>
                <a href="tel:6366189346" className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2 cursor-target">
                  <Phone className="h-4 w-4" />
                  6366189346
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/chandra-shekar6366189346" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2 cursor-target">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/chandrashekar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-2 cursor-target">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay ahead with design & development tips and strategies that drive results.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email..." 
                className="bg-background"
              />
              <Button size="icon" className="rounded-full bg-accent hover:bg-accent/90 flex-shrink-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            ©{currentYear} DivIdeas. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
