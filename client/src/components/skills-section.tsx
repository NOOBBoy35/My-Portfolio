import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { Code2, Paintbrush, Database, Brain, Figma, Smartphone } from 'lucide-react';
import { useScrollTrigger } from "@/hooks/use-scroll";
import { useEffect, useRef } from 'react';
import { useTheme } from "@/context/theme-context";

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "React, Vue, Angular, TypeScript",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0
  },
  {
    icon: Database,
    title: "Backend Development", 
    description: "Node.js, Python, PostgreSQL, MongoDB, Supabase",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.1
  },
  {
    icon: Figma,
    title: "UI/UX Design",
    description: "Figma, Adobe XD, User Research",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    icon: Brain,
    title: "AI/ML",
    description: "TensorFlow, PyTorch, OpenAI APIs",
    gradient: "from-orange-500 to-red-500",
    delay: 0.3
  },
  {
    icon: Paintbrush,
    title: "Creative Work",
    description: "Digital Art, 3D Modeling, Animation",
    gradient: "from-indigo-500 to-blue-500",
    delay: 0.4
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native, Flutter, iOS, Android",
    gradient: "from-amber-500 to-yellow-500",
    delay: 0.5
  }
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = '' }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, (value) => (value as number) * 10); // Increased from 5 to 10 for more tilt
  const rotateY = useTransform(x, (value) => (value as number) * 10); // Increased from 5 to 10 for more tilt
  
  // Calculate scale based on x and y motion values
  const scale = useMotionValue(1);
  
  useEffect(() => {
    const updateScale = () => {
      const xVal = x.get();
      const yVal = y.get();
      scale.set(1 + (Math.abs(xVal) + Math.abs(yVal)) * 0.05);
    };
    
    const unsubscribeX = x.on('change', updateScale);
    const unsubscribeY = y.on('change', updateScale);
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y, scale]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const xPos = (e.clientX - centerX) / (rect.width / 2);
      const yPos = (e.clientY - centerY) / (rect.height / 2);
      
      x.set(xPos);
      y.set(yPos);
    };

    const card = cardRef.current as HTMLElement | null;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', () => {
        x.set(0);
        y.set(0);
      });
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
};

export function SkillsSection() {
  const { ref, isVisible } = useScrollTrigger(0.1);
  const { theme } = useTheme();

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:terminal-bg transition-colors duration-300 font-mono relative overflow-hidden" ref={ref}>
      {/* Background Grid Pattern */}
      {theme === 'dark' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-10 gap-2 w-full h-full p-4">
            {[...Array(100)].map((_, i) => (
              <div 
                key={i}
                className="h-full w-full bg-terminal-green rounded opacity-10 hover:opacity-20 transition-opacity duration-300"
                style={{ animation: `fadeIn 0.3s ease-out ${i * 0.03}s both` }}
              />
            ))}
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 0.2; transform: scale(1); }
          }
          .bg-terminal-green {
            background-color: #10B981; /* Terminal green color */
          }
        `
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-left mb-16 max-w-4xl mx-auto px-4">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {theme === 'dark' ? (
              <>
                <div className="font-mono flex items-center text-sm text-green-400 mb-1">
                  <span className="text-purple-400">abdullah@portfolio</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">$</span>
                  <span className="ml-2">cat skills.json</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                  What I Do
                </h2>
              </>
            ) : (
              <>
                <span className="text-blue-500">// skills.js</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                  <span className="text-blue-500">
                    {'<Skills '}
                    <span className="text-purple-500">expertise</span>
                    {'={'}
                    <span className="text-green-500">"full-stack"</span>
                    {' />'}
                  </span>
                </h2>
              </>
            )}
          </motion.div>
          <motion.div 
            className={`text-sm p-4 rounded-lg border-l-4 backdrop-blur-sm ${
              theme === 'dark' 
                ? 'bg-gray-900/70 border-green-500 text-gray-300 font-mono' 
                : 'bg-gray-100 border-blue-500 text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {theme === 'dark' ? (
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <span>I specialize in creating beautiful, functional, and user-centered digital experiences.</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <span>With a focus on clean code and thoughtful design,</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <span>I bring ideas to life in the browser.</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs mt-4">
                  <span># Continuously learning and expanding my skill set</span>
                </div>
              </div>
            ) : (
              <>
                <span className="text-blue-500">/**</span>
                <p className="ml-4 text-gray-700">* Technologies and tools I work with to bring ideas to life</p>
                <p className="ml-4 text-gray-700">* Continuously learning and expanding my skill set</p>
                <p className="ml-4 text-blue-500">*/</p>
              </>
            )}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: skill.delay }}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div 
                  className={`relative h-full p-6 rounded-lg shadow-sm overflow-hidden group transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-black/30 backdrop-blur-sm border border-green-400/30 hover:border-green-400/60' 
                    : 'bg-white'
                }`}
                  style={{
                    ...(theme !== 'dark' && {
                      borderLeftColor: skill.gradient.includes('from-') 
                        ? `var(--${skill.gradient.split(' ')[0].replace('from-', '')})` 
                        : skill.gradient,
                      borderLeftWidth: '4px',
                      borderLeftStyle: 'solid'
                    })
                  }}
                >
                  <div className="absolute top-2 right-2 text-xs text-gray-400 dark:text-gray-600">
                    <span className="text-blue-500">const</span>
                    <span className="text-purple-500">
                      {' '}{skill.title.replace(/\s+/g, '').toLowerCase()}
                    </span>
                    <span className="text-gray-600"> = () =&gt; {'{ }'}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${skill.gradient} text-white`}>
                      <skill.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{skill.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{skill.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap gap-1">
                        {skill.description.split(', ').map((tech, i) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, delay: skill.delay + 0.1 + (i * 0.05) }}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.6),transparent_40%)] opacity-0"></div>
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-0" 
                    style={{ 
                      background: `linear-gradient(135deg, ${skill.gradient.replace('from-', '').replace('to-', '')})`
                    }}
                  ></div>
                  {/* Edge highlight */}
                  {/* Glow effect - only in dark mode */}
                  {theme === 'dark' && (
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <div className="absolute -bottom-1 left-0 right-0 h-1/3 bg-gradient-to-t from-green-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  {/* Subtle border that changes based on theme */}
                  <div className={`absolute inset-0 rounded-lg ${theme === 'dark' ? 'border border-white/10' : 'border border-gray-100'}`}></div>
                </div>
                </TiltCard>
              </motion.div>
            )
            )}
        </div>

        {/* Stats Section */}
        <motion.div 
          className={`mt-20 rounded-3xl p-6 md:p-8 shadow-lg ${theme === 'dark' ? 'bg-gray-900/80 backdrop-blur-sm' : 'bg-white'}`}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {theme === 'dark' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Projects Terminal */}
              <div className="font-mono text-gray-300 bg-gray-900/80 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="flex items-center bg-gray-800/50 p-3 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">$</span>
                    <div>
                      <span className="text-blue-400">echo</span> "<span className="text-yellow-300">Projects</span>"
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-400 my-2">10+</div>
                  <div className="text-green-400 text-xs">projects completed</div>
                </div>
              </div>

              {/* Experience Terminal */}
              <div className="font-mono text-gray-300 bg-gray-900/80 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="flex items-center bg-gray-800/50 p-3 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">$</span>
                    <div>
                      <span className="text-blue-400">echo</span> "<span className="text-yellow-300">Experience</span>"
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-400 my-2">1+</div>
                  <div className="text-green-400 text-xs">years experience</div>
                </div>
              </div>

              {/* Clients Terminal */}
              <div className="font-mono text-gray-300 bg-gray-900/80 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="flex items-center bg-gray-800/50 p-3 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">$</span>
                    <div>
                      <span className="text-blue-400">echo</span> "<span className="text-yellow-300">Clients</span>"
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-400 my-2">2</div>
                  <div className="text-green-400 text-xs">happy clients</div>
                </div>
              </div>

              {/* Coffee Terminal */}
              <div className="font-mono text-gray-300 bg-gray-900/80 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="flex items-center bg-gray-800/50 p-3 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">$</span>
                    <div>
                      <span className="text-blue-400">echo</span> "<span className="text-yellow-300">Coffee</span>"
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-400 my-2">∞</div>
                  <div className="text-green-400 text-xs">cups of coffee</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10+", label: "Projects Completed" },
                { number: "1+", label: "Years Experience" },
                { number: "2", label: "Happy Clients" },
                { number: "∞", label: "Cups of Coffee" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}