import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import WhyChoose from "@/components/WhyChoose";
import Services from "@/components/Services";
import HowToStart from "@/components/HowToStart";
import Portfolio from "@/components/Portfolio";
import WhatMakesDifferent from "@/components/WhatMakesDifferent";
import About from "@/components/About";
import Team from "@/components/Team";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";
import TargetCursor from "@/components/TargetCursor";

const Index = () => {
  return (
    <>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <main className="min-h-screen">
        <Hero />
        <Solutions />
        <WhyChoose />
        <Services />
        <HowToStart />
        <Portfolio />
        <WhatMakesDifferent />
        <About />
        <Team />
        <Achievements />
        <Testimonials />
        <FAQ />
        <BookCall />
        <Footer />
      </main>
    </>
  );
};

export default Index;
