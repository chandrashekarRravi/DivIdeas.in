import { Card } from "@/components/ui/card";
import { CheckCircle2, Rocket, Shield, Zap } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "We understand deadlines. Your project will be delivered on time, every time, without compromising quality.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Clean, maintainable code with thorough testing ensures your application runs smoothly and scales effortlessly.",
  },
  {
    icon: Rocket,
    title: "Modern Tech Stack",
    description: "We use the latest technologies and best practices to build future-proof solutions that grow with your business.",
  },
  {
    icon: CheckCircle2,
    title: "Dedicated Support",
    description: "From concept to deployment and beyond, we're with you every step of the way with responsive communication.",
  },
];

const WhyChoose = () => {
  return (
    <section id="why-choose" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">Why Choose DivIdeas?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertise That Drives Success, Every Single Time
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card border-border group cursor-target"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <reason.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
