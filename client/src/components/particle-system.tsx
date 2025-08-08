import { useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-context";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export function ParticleSystem() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const particles: HTMLElement[] = [];
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    // Clear existing particles
    container.innerHTML = "";

    // Generate particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      
      // Random positioning and timing
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.animationDuration = (Math.random() * 10 + 15) + "s";
      
      // Theme-based colors
      if (theme === "dark") {
        const colors = ["rgba(0, 255, 65, 0.8)", "rgba(255, 107, 53, 0.8)"];
        particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
      } else {
        const colors = ["rgba(0, 102, 255, 0.8)", "rgba(0, 212, 255, 0.8)"];
        particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
      }
      
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [theme]);

  return (
    <div 
      ref={canvasRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      id="particles-container"
    />
  );
}
