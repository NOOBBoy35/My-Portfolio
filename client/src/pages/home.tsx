import { useState, useEffect, useRef } from 'react';
import { useTheme } from "@/context/theme-context";
import { ParticleSystem } from "@/components/particle-system";
import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { SkillsSection } from "@/components/skills-section";
import { ServicesSection } from "@/components/services-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import DarkIntro from "@/components/dark-intro";

// Debug function (commented out for production)
// const debug = (...args: any[]) => {
//   console.log("[Home]", ...args);
// };

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const { theme } = useTheme();
  const prevThemeRef = useRef(theme);

  useEffect(() => {
    // Show animation when switching to dark mode
    if (theme === 'dark' && prevThemeRef.current !== 'dark') {
      setShowIntro(true);
    } else if (theme !== 'dark' && showIntro) {
      setShowIntro(false);
    }
    
    // Update the previous theme ref
    prevThemeRef.current = theme;
  }, [theme, showIntro]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen transition-all duration-500 ease-in-out">
      {showIntro && <DarkIntro onComplete={handleIntroComplete} />}
      <ScrollProgress />
      <ParticleSystem />
      <Navigation />
      <HeroSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
