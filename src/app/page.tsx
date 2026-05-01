import { AboutSection } from "@/sections/About";
import CompanyLogos from "@/sections/CompanyLogos";
import { ContactSection } from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Faqs from "@/sections/Faqs";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import MyApproach from "@/sections/MyApproach";
import { Playground } from "@/sections/Playground";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";

export default function Home() {
  return (
    <main className="relative pb-7">
      <Header />
      <HeroSection />
      <CompanyLogos />
      <AboutSection />
      <Experience />
      <MyApproach />
      <ProjectsSection />
      <TapeSection />
      <Playground />
      <TestimonialsSection />
      <Faqs />
      <ContactSection />
      <Footer />
    </main>
  );
}
