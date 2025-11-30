import { Card } from "@/components/ui/card";
import { Sparkles, Shield, TrendingUp } from "lucide-react";
import innovativeIllustration from "@/assets/innovative-illustration.png";

const solutions = [
  {
    icon: Sparkles,
    title: "Custom Web Solutions",
    description: "Tailored applications built specifically for your unique business needs and growth objectives.",
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "Enterprise-grade security and reliability that you can trust with your critical business operations.",
  },
  {
    icon: TrendingUp,
    title: "Built to Scale",
    description: "Future-proof architecture designed to grow seamlessly alongside your expanding business.",
  },
];

const Solutions = () => {
  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 fade-in">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Innovative Solutions Built for Your Success</h2>
            <p className="text-xl text-muted-foreground">
              Discover our comprehensive service offerings — expertly crafted to deliver unmatched reliability, seamless scalability, and measurable outcomes that drive your business forward.
            </p>
          </div>
          <div className="flex justify-center">
            <img 
              src={innovativeIllustration} 
              alt="Innovative ideas and technology illustration" 
              className="w-full max-w-lg hover-scale"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className="p-8 text-center bg-background border-border hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group cursor-target"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <solution.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{solution.title}</h3>
              <p className="text-muted-foreground text-lg">{solution.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
