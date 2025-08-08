import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@/context/theme-context";

// Debug function (commented out for production)
// const debug = (...args: any[]) => {
//   console.log("[DarkIntro]", ...args);
// };

interface DarkIntroProps {
  onComplete: () => void;
}

const DarkIntro: React.FC<DarkIntroProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  // debug("Component mounted with theme:", theme);
  const [phase, setPhase] = useState<"typing" | "erasing" | "complete">("typing");
  const [text, setText] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const welcomeMessage = "Welcome to the dark side";

  useEffect(() => {
    if (phase === "typing") {
      if (text.length < welcomeMessage.length) {
        timeoutRef.current = setTimeout(() => {
          setText(welcomeMessage.slice(0, text.length + 1));
        }, 100);
      } else {
        timeoutRef.current = setTimeout(() => setPhase("erasing"), 1500);
      }
    } else if (phase === "erasing") {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50);
      } else {
        setPhase("complete");
      }
    }

    return () => {
      if (phase !== "complete" && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, phase]);

  useEffect(() => {
    if (phase === "complete") {
      timeoutRef.current = setTimeout(() => {
        localStorage.setItem("hasVisited", "true");
        onComplete();
      }, 500);
    }
  }, [phase, onComplete]);

  useEffect(() => {
    if (theme === 'dark') {
      setShouldRender(true);
    } else {
      setShouldRender(false);
      onComplete();
    }
  }, [theme, onComplete]);

  if (phase === "complete") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-terminal transition-all duration-1000">
        {/* Keep the background visible during the transition */}
      </div>
    );
  }

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-1000">
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-sm"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `matrix-rain ${3 + Math.random() * 2}s linear ${Math.random() * 3}s infinite`,
            }}
          >
            {Array.from({ length: 10 }).map((_, j) => (
              <div key={j} className="block">
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="relative z-10 text-center">
        <div className="text-4xl md:text-6xl font-bold font-mono text-green-400">
          {text}
          <span className="inline-block w-1 h-12 ml-2 bg-green-500 animate-pulse" />
        </div>
        
        <div className="mt-8 text-cyan-400 font-mono text-lg opacity-70">
          {text.length > 0 && `> Initializing creative matrix...`}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes matrix-rain {
            0% {
              transform: translateY(-100%);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
        `
      }} />
    </div>
  );
};

export default DarkIntro;
