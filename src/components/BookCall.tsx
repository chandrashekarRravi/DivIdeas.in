import { Button } from "@/components/ui/button";

const BookCall = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="book-call" className="bg-gradient-to-b from-background to-primary/5 py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center space-y-6">
          <h2 className="text-4xl lg:text-5xl font-semibold text-foreground">
            Start Building
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to transform your ideas into reality? Let's create something amazing together.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="hover-scale shadow-elegant"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToContact}
              className="hover-scale"
            >
              Book Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCall;
