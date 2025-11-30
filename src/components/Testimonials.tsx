import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Founder, TechStartup India",
    content: "Chandrashekar delivered a high-quality MERN dashboard within deadline — responsive, fast, and scalable. His attention to detail and clean code practices are exceptional.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Product Manager, E-Commerce Co.",
    content: "Working with Chandrashekar was a pleasure. He understood our requirements perfectly and delivered a beautiful, functional website that exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "CTO, Healthcare Solutions",
    content: "Excellent developer with strong technical skills. Built our patient management system with great care for security and user experience. Highly recommended!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">What Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it — hear from satisfied clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-glow transition-all duration-300 bg-card border-border cursor-target"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
