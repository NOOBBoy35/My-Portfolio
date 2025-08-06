import { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { Button } from "@/components/ui/button";
import { ChevronDown, Rocket, Play, User, Terminal } from "lucide-react";
import avatarImage from "@assets/ChatGPT Image Aug 6, 2025 at 01_50_38 PM_1754470256896.png";

export function HeroSection() {
  const { theme } = useTheme();
  const mousePosition = useMousePosition();
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const avatarRef = useRef<HTMLDivElement>(null);
  const idCardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const fullText = "A creative force at the intersection of code, design, and AI.";

  // Typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Cursor blinking
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Avatar mouse following (Light Mode)
  useEffect(() => {
    if (theme === "light" && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (mousePosition.x - centerX) * 0.1;
      const deltaY = (mousePosition.y - centerY) * 0.1;
      
      avatarRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  }, [mousePosition, theme]);

  // ID Card dragging (Dark Mode)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (theme === "dark") {
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && idCardRef.current && theme === "dark") {
        const maxMove = 50;
        const limitedX = Math.max(-maxMove, Math.min(maxMove, (e.clientX - dragOffset.x) * 0.5));
        const limitedY = Math.max(-maxMove, Math.min(maxMove, (e.clientY - dragOffset.y) * 0.5));
        
        idCardRef.current.style.transform = `translate(${limitedX}px, ${limitedY}px) rotate(${limitedX * 0.1}deg)`;
      }
    };

    const handleMouseUp = () => {
      if (isDragging && idCardRef.current) {
        setIsDragging(false);
        setTimeout(() => {
          if (idCardRef.current) {
            idCardRef.current.style.transform = "translate(0px, 0px) rotate(0deg)";
          }
        }, 100);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, theme]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden code-bg dark:terminal-bg">
      {/* Light Mode: Code Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-0 font-mono text-xs text-gray-600 leading-relaxed p-8 overflow-hidden select-none">
        <pre className="whitespace-pre-wrap">
{`const developer = {
  name: 'Creative Developer',
  skills: ['React', 'Node.js', 'Python', 'AI/ML'],
  passion: 'Building the future',
  status: 'Available for hire'
};

function createMagic() {
  return innovation + creativity + code;
}

// Building dreams one line at a time...
class Portfolio extends Component {
  render() {
    return (
      <div className="stunning-portfolio">
        <Hero animation="cinematic" />
        <Skills interactive={true} />
        <Projects showcase="interactive" />
        <Contact cta="Let's work together" />
      </div>
    );
  }
}`}
        </pre>
      </div>

      {/* Dark Mode: Terminal Background */}
      <div className="absolute inset-0 opacity-0 dark:opacity-10 font-mono text-xs text-green-400 leading-relaxed p-8 overflow-hidden select-none">
        <pre className="whitespace-pre-wrap">
{`$ whoami
creative-developer

$ cat skills.txt
> Frontend Development (React, Vue, Angular)
> Backend Development (Node.js, Python, Go)
> AI/ML Engineering (TensorFlow, PyTorch)
> DevOps & Cloud (AWS, Docker, Kubernetes)
> UI/UX Design (Figma, Adobe Suite)

$ ls projects/
awesome-web-app.js
ai-chatbot.py
mobile-app/
design-system/
api-server.go

$ status
● Online and available for new projects
● Passionate about cutting-edge tech
● Always learning, always building

$ git log --oneline
a1b2c3d Added stunning portfolio features
d4e5f6g Implemented advanced animations
g7h8i9j Created interactive components
j0k1l2m Built responsive design system

$ echo "Let's build something amazing together!"
Let's build something amazing together!

$ _`}
        </pre>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Avatar/ID Card Container */}
          <div className="mb-8 relative">
            {/* Light Mode: 3D Avatar */}
            <div 
              ref={avatarRef}
              className="dark:hidden w-32 h-32 mx-auto mb-6 relative transition-transform duration-100"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 neon-glow glass border-4 border-white/30 overflow-hidden animate-float">
                <img 
                  src={avatarImage} 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Dark Mode: Hanging ID Card */}
            <div className="hidden dark:block">
              <div className="flex justify-center mb-6">
                {/* Ribbon */}
                <div className="w-1 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg"></div>
              </div>
              <div 
                ref={idCardRef}
                onMouseDown={handleMouseDown}
                className="w-64 h-40 mx-auto glass bg-gray-900/80 border border-gray-700/50 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-16 bg-gradient-to-br from-green-400 to-orange-400 rounded-sm flex items-center justify-center overflow-hidden">
                    <img 
                      src={avatarImage} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-green-400 font-mono text-sm">ID: DEV-001</div>
                    <div className="text-white font-semibold">Creative Developer</div>
                    <div className="text-gray-400 text-xs mt-1">Full-Stack • AI/ML</div>
                    <div className="text-gray-500 text-xs mt-2">Access Level: ∞</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-space font-bold mb-6">
            <span className="block text-gray-900 dark:text-white mb-2">Hi, I'm</span>
            <span className="block text-gradient animate-pulse-slow">[Your Name]</span>
          </h1>

          <div className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
            <span>
              {typedText}
              {showCursor && <span className="typing-cursor">|</span>}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-green-500 dark:to-orange-500 text-white font-semibold rounded-full hover:scale-110 transition-all duration-300 shadow-2xl">
              <Rocket className="mr-2 h-5 w-5" />
              Let's Create Something Amazing
            </Button>
            <Button 
              variant="outline"
              className="px-8 py-4 glass bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white font-semibold rounded-full hover:scale-110 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch My Work
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce-slow">
            <ChevronDown className="mx-auto h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
