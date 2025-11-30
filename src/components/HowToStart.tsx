import { Card } from "@/components/ui/card";
import { MessageSquare, Lightbulb, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Share Your Vision",
    description: "Tell us about your project, goals, and requirements. We'll schedule a free consultation to understand your needs.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategy & Planning",
    description: "We'll create a detailed project roadmap, timeline, and proposal tailored to your specific requirements.",
  },
  {
    icon: Code,
    number: "03",
    title: "Development & Testing",
    description: "Our team builds your solution with clean code, modern design, and rigorous testing for quality assurance.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & Support",
    description: "We deploy your application and provide ongoing support to ensure everything runs smoothly.",
  },
];

const HowToStart = () => {
  return (
    <section id="how-to-start" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">How to Start with DivIdeas</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four Simple Steps to Transform Your Ideas into Reality
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <Card className="p-6 h-full bg-background border-border hover:shadow-glow transition-all duration-300 cursor-target">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToStart;
