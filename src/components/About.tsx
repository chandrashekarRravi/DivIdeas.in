import { Button } from "@/components/ui/button";
import { Download, Linkedin, Mail } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-6 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
          
          <div className="space-y-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            <p>
              Hi, I'm <span className="font-semibold text-foreground">Chandrashekar R</span> — a Full-Stack MERN Developer 
              passionate about creating clean, scalable, and user-friendly web applications.
            </p>
            <p>
              I've worked with startups and government projects, delivering reliable, modern digital solutions 
              that solve real-world problems. My expertise spans the entire web development stack, from designing 
              beautiful user interfaces to building robust backend systems.
            </p>
            <p>
              Whether you need a responsive website, a complex web application, or technical consultation, 
              I'm here to help turn your vision into reality with clean code and modern best practices.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Button size="lg" className="group">
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              Download Resume
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a 
                href="https://linkedin.com/in/chandra-shekar6366189346" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn Profile
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a 
                href="mailto:contact@chandra.dev.in"
                className="flex items-center"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                50+
              </div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                30+
              </div>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                3+
              </div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
