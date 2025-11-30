import { Card } from "@/components/ui/card";
import { Code2, Database, Layout, Lock, Settings, Zap } from "lucide-react";
import webDevImage from "@/assets/web-development-service.png";
import seoImage from "@/assets/seo-service.png";

const mainServices = [
  {
    image: webDevImage,
    title: "Web Development",
    description: "Build modern, fast, and mobile-responsive user interfaces with cutting-edge technologies.",
    alt: "Modern responsive web development portfolio showcasing various website designs"
  },
  {
    image: seoImage,
    title: "SEO",
    description: "Optimize your website for search engines and increase organic traffic with proven strategies.",
    alt: "SEO services including analytics and optimization"
  }
];

const detailedServices = [
  {
    icon: Layout,
    title: "Responsive React.js Frontend",
    description: "Build modern, fast, and mobile-responsive user interfaces with React.js and Tailwind CSS.",
  },
  {
    icon: Database,
    title: "Full-Stack MERN Applications",
    description: "End-to-end development using MongoDB, Express.js, React.js, and Node.js for scalable solutions.",
  },
  {
    icon: Code2,
    title: "RESTful API Development",
    description: "Design and develop robust, secure, and well-documented RESTful APIs for your applications.",
  },
  {
    icon: Lock,
    title: "Authentication Systems",
    description: "Implement secure authentication with JWT, OAuth, and session management for user safety.",
  },
  {
    icon: Settings,
    title: "Admin Dashboards & Portfolios",
    description: "Create powerful admin panels and stunning portfolio websites with modern UI/UX.",
  },
  {
    icon: Zap,
    title: "Bug Fixes & UI Enhancements",
    description: "Quick fixes, performance optimization, and UI improvements for existing applications.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">Services We Provide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Clean Code. Modern UI. Scalable Solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {mainServices.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-background border-border group overflow-hidden cursor-target"
            >
              <div className="mb-6 flex justify-center">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden group-hover:scale-150 group-hover:z-50 transition-all duration-500 group-hover:shadow-2xl">
                  <img 
                    src={service.image} 
                    alt={service.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-center">{service.title}</h3>
              <p className="text-muted-foreground text-center">{service.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedServices.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-background border-border group cursor-target"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
