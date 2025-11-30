import { Card } from "@/components/ui/card";
import { Trophy, Users, Code2, Star } from "lucide-react";

const stats = [
  {
    icon: Trophy,
    number: "5+",
    label: "Projects Delivered",
    description: "Successfully completed",
  },
  {
    icon: Users,
    number: "6+",
    label: "Happy Clients",
    description: "Across the globe",
  },
  {
    icon: Code2,
    number: "100K+",
    label: "Lines of Code",
    description: "Clean & scalable",
  },
  {
    icon: Star,
    number: "4.6",
    label: "Client Rating",
    description: "Average satisfaction",
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">Our Achievements</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Numbers That Speak for Our Commitment to Excellence
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-8 text-center bg-card border-border hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group cursor-target"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <h3 className="text-xl font-semibold mb-1">{stat.label}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
