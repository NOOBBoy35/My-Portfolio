import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import { ChevronDown, Rocket, Play, User, Terminal } from "lucide-react";
import avatarImage from "@assets/ChatGPT Image Aug 6, 2025 at 01_50_38 PM_1754470256896.png";

export function HeroSection() {
  const { theme } = useTheme();
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
      <div className="absolute left-0 right-0 top-16 bottom-0 opacity-10 dark:opacity-0 font-mono text-xs text-black leading-relaxed p-8 overflow-hidden select-none pointer-events-none">
        <pre className="whitespace-pre-wrap">
{`// Developer Profile
const developer = {
  name: 'Abdullah Mansoor',
  skills: ['React', 'Node.js', 'Python', 'AI/ML', 'TypeScript', 'CSS', 'Figma'],
  passion: 'Building the future',
  status: 'Available for hire',
  experience: [
    { company: 'TechCorp', role: 'Frontend Engineer', years: 2 },
    { company: 'AI Labs', role: 'ML Engineer', years: 1 },
  ],
};

function createMagic() {
  return innovation + creativity + code;
}

function solveProblem(problem) {
  // Analyze and break down the problem
  const steps = plan(problem);
  // Implement solution
  return steps.map(execute).join('\n');
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
}

// Utility functions
const plan = (problem) => [/* ...steps */];
const execute = (step) => \`Step: \${step}\`;
`}
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

      {/* Light Mode: Code Background (Right Side) */}
      <div className="absolute top-16 right-0 h-[calc(100%-4rem)] w-1/2 flex items-center justify-end opacity-10 dark:opacity-0 font-mono text-xs text-black leading-relaxed p-8 overflow-hidden select-none pointer-events-none">
        <pre className="whitespace-pre-wrap text-right">
{`// Project Interface & Data
interface Project {
  id: number;
  name: string;
  techStack: string[];
  completed: boolean;
  launch(): void;
  contributors?: string[];
}

const featured: Project = {
  id: 1,
  name: 'Next Big Thing',
  techStack: ['TypeScript', 'React', 'Node.js', 'Vite', 'TailwindCSS'],
  completed: false,
  contributors: ['Alice', 'Bob', 'Charlie'],
  launch() {
    console.log('Launching project...');
  },
};

const projects: Project[] = [
  featured,
  {
    id: 2,
    name: 'AI Chatbot',
    techStack: ['Python', 'TensorFlow', 'FastAPI'],
    completed: true,
    launch() {
      console.log('AI Chatbot live!');
    },
  },
  {
    id: 3,
    name: 'Mobile App',
    techStack: ['React Native', 'Expo'],
    completed: false,
    launch() {
      console.log('Mobile App coming soon!');
    },
  },
];

// Display all project names
projects.forEach(p => console.log(p.name));
`}
        </pre>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Avatar/ID Card Container */}
          <div className="mb-8 relative">
            {/* Light Mode: 3D Avatar */}
            <div 
              ref={avatarRef}
              className="dark:hidden w-40 h-40 mx-auto mb-6 relative transition-transform duration-100"
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
              {/* Ultra-Realistic SVG Rope */}
              <div className="flex justify-center mb-6">
                <svg 
                  width="24" 
                  height="180" 
                  viewBox="0 0 24 180" 
                  className="mx-auto"
                  style={{
                    filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.4))',
                    transform: 'rotate(1.5deg)'
                  }}
                >
                  <defs>
                    {/* Rope texture pattern */}
                    <pattern id="rope-twist" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="10" stroke="#8b5a2b" strokeWidth="1" opacity="0.3" />
                      <line x1="5" y1="0" x2="5" y2="10" stroke="#a67c52" strokeWidth="1" opacity="0.3" />
                      <line x1="-5" y1="0" x2="-5" y2="10" stroke="#a67c52" strokeWidth="1" opacity="0.3" />
                    </pattern>
                    
                    {/* Rope gradient */}
                    <linearGradient id="rope-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6b4a23" />
                      <stop offset="50%" stopColor="#8b5a2b" />
                      <stop offset="100%" stopColor="#6b4a23" />
                    </linearGradient>
                    
                    {/* Rope highlight */}
                    <linearGradient id="rope-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4a76a" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#d4a76a" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#d4a76a" stopOpacity="0.4" />
                    </linearGradient>
                    
                    {/* Rope shadow */}
                    <linearGradient id="rope-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#000000" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                    </linearGradient>
                    
                    {/* Rope noise texture */}
                    <filter id="rope-noise" x="0" y="0" width="100%" height="100%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.5, 0 0 0 0 0.4, 0 0 0 0 0.3, 0 0 0 0.4 0" />
                    </filter>
                    
                    {/* Knot gradient */}
                    <radialGradient id="knot-grad" cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
                      <stop offset="0%" stopColor="#8b5a2b" />
                      <stop offset="70%" stopColor="#6b4a23" />
                      <stop offset="100%" stopColor="#4d3419" />
                    </radialGradient>
                  </defs>
                  
                  {/* Main rope body */}
                  <g>
                    {/* Base rope shape */}
                    <path 
                      d="M12,0 C12,0 16,30 12,60 C8,90 12,120 12,150 C12,160 8,170 12,170 C16,170 12,160 12,150 C12,130 16,110 12,80 C8,50 12,20 12,0 Z" 
                      fill="url(#rope-grad)" 
                      stroke="#5d3f1e" 
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Rope texture */}
                    <rect 
                      x="0" 
                      y="0" 
                      width="24" 
                      height="170" 
                      fill="url(#rope-twist)" 
                      opacity="0.8"
                    />
                    
                    {/* Rope noise */}
                    <rect 
                      x="0" 
                      y="0" 
                      width="24" 
                      height="170" 
                      fill="url(#rope-twist)" 
                      filter="url(#rope-noise)" 
                      opacity="0.6"
                    />
                    
                    {/* Rope highlight */}
                    <path 
                      d="M12,0 C12,0 16,30 12,60 C8,90 12,120 12,150 C12,160 8,170 12,170" 
                      fill="none" 
                      stroke="url(#rope-highlight)" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    
                    {/* Rope shadow */}
                    <path 
                      d="M12,0 C12,0 8,30 12,60 C16,90 12,120 12,150 C12,160 16,170 12,170" 
                      fill="none" 
                      stroke="url(#rope-shadow)" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                  
                  {/* Rope end knot */}
                  <g>
                    <ellipse 
                      cx="12" 
                      cy="155" 
                      rx="10" 
                      ry="6" 
                      fill="url(#knot-grad)"
                      stroke="#5d3f1e"
                      strokeWidth="0.8"
                    />
                    
                    {/* Knot details */}
                    <path 
                      d="M7,152 C9,150 15,150 17,152 C15,154 9,154 7,152 Z" 
                      fill="#d4a76a" 
                      opacity="0.3"
                    />
                    <path 
                      d="M7,158 C9,157 15,157 17,158 C15,159 9,159 7,158 Z" 
                      fill="#5d3f1e" 
                      opacity="0.3"
                    />
                  </g>
                </svg>
              </div>
              
              {/* ID Card */}
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
            <span className="block text-gradient animate-pulse-slow">Abdullah Mansoor</span>
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
