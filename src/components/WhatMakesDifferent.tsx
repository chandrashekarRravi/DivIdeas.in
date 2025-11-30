import { Card } from "@/components/ui/card";
import { Target, Users, TrendingUp, Award } from "lucide-react";

const differences = [
  {
    icon: Target,
    title: "Results-Driven Approach",
    description: "We don't just build websites — we create solutions that solve real business problems and deliver measurable results.",
  },
  {
    icon: Users,
    title: "Client-Centric Process",
    description: "Your success is our priority. We maintain transparent communication and involve you at every stage of development.",
  },
  {
    icon: TrendingUp,
    title: "Scalability First",
    description: "Every solution we build is designed to grow with your business, ensuring long-term value and adaptability.",
  },
  {
    icon: Award,
    title: "Proven Excellence",
    description: "Track record of successful projects across startups and enterprises, delivering quality that exceeds expectations.",
  },
];

const WhatMakesDifferent = () => {
  return (
    <section id="what-makes-different" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">What Makes Us Different</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Excellence Built on Innovation, Reliability, and Results
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {differences.map((difference, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:shadow-glow transition-all duration-300 group cursor-target"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <difference.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">{difference.title}</h3>
                  <p className="text-muted-foreground text-lg">{difference.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatMakesDifferent;
