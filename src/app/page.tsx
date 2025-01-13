import { AboutSection } from "@/sections/About";
import CompanyLogos from "@/sections/CompanyLogos";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";

export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <CompanyLogos/>
      <ProjectsSection/>
      <TapeSection/>
      <TestimonialsSection/>
      <AboutSection/>
      <ContactSection/>
      <Footer/>
    </div>
  );
}
