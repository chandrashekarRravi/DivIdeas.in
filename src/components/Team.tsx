import { Linkedin, ExternalLink } from "lucide-react";
import teamPhoto from "@/assets/chandrashekar-photo.jpg";

const Team = () => {
  return (
    <section id="team" className="py-32">
      <div className="mx-auto max-w-5xl border-t px-6">
        <span className="text-sm text-muted-foreground -ml-6 -mt-3.5 block w-max bg-background px-6">
          Team
        </span>
        <div className="mt-24 gap-4 sm:grid sm:grid-cols-2">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold sm:text-4xl text-foreground">
              Meet the Expert
            </h2>
          </div>
          <div className="mt-6 sm:mt-0">
            <p className="text-muted-foreground">
              Dedicated to crafting exceptional web experiences with a focus on clean code, modern design, and scalable solutions tailored to your needs.
            </p>
          </div>
        </div>
        <div className="mt-24 flex justify-center">
          <div className="group overflow-hidden max-w-sm">
            <img 
              className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl" 
              src={teamPhoto} 
              alt="Chandrashekar R - Full-Stack MERN Developer" 
              loading="lazy"
            />
            <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
              <div className="flex justify-between">
                <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider text-foreground">
                  Chandrashekar R
                </h3>
                <span className="text-xs text-muted-foreground">_01</span>
              </div>
              <div className="mt-1">
                <span className="inline-block translate-y-6 text-sm transition duration-300 group-hover:translate-y-0 text-muted-foreground">
                  Full-Stack MERN Developer
                </span>
                <div className="mt-2 flex gap-4 translate-y-8 transition-all duration-500 group-hover:translate-y-0">
                  <a 
                    href="https://linkedin.com/in/chandra-shekar6366189346" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm tracking-wide transition-colors hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a 
                    href="#portfolio" 
                    className="inline-flex items-center gap-1 text-sm tracking-wide transition-colors hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
