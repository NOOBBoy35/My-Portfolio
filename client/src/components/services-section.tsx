import { useScrollTrigger } from "@/hooks/use-scroll";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Code, Palette, Bot, Star, Smartphone, Lightbulb } from "lucide-react";
import { useEffect, useRef } from 'react';
import { useTheme } from "@/context/theme-context";

const services = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Complete web applications from concept to deployment, using cutting-edge technologies.",
    features: ["React/Next.js", "Node.js APIs", "Database Design", "Cloud Deployment"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that converts visitors into customers with stunning interfaces.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational AI that enhances customer experience and automates support.",
    features: ["Chatbots", "ML Models", "Data Analysis", "Automation"],
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Star,
    title: "Brand Identity",
    description: "Complete visual identity packages that make your brand unforgettable.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that users love to use.",
    features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"],
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Lightbulb,
    title: "Tech Consulting",
    description: "Strategic technology advice to accelerate your business growth and innovation.",
    gradient: "from-teal-500 to-cyan-500"
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
  const rotateX = useTransform<number, number>(y, (value) => value * 10);
  const rotateY = useTransform<number, number>(x, (value) => value * 10);
  
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

export function ServicesSection() {
  const { ref, isVisible } = useScrollTrigger(0.1);
  const { theme } = useTheme();

  return (
    <section id="services" className="py-20 bg-white dark:terminal-bg transition-colors duration-300 relative overflow-hidden" ref={ref}>
      {/* Background Grid Pattern */}
      {theme === 'dark' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-10 gap-2 w-full h-full p-4">
            {[...Array(100)].map((_, i) => (
              <div 
                key={i}
                className={`h-full w-full rounded-sm transition-opacity duration-300 ${theme === 'dark' ? 'bg-green-400 opacity-5 hover:opacity-20' : 'opacity-0'}`}
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
            background-color: #10B981;
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
                <div className="font-mono text-sm md:text-base text-green-400 mb-1">
                  <span className="text-purple-400">abdullah@portfolio</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">$ </span>
                  <span>cat services.json</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                  Services I Offer
                </h2>
              </>
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                <span className="text-blue-500">
                  {'<Services '}
                  <span className="text-purple-500">I</span>
                  {'={'}
                  <span className="text-green-500">"offer"</span>
                  {' />'}
                </span>
              </h2>
            )}
          </motion.div>
          <motion.div 
            className={`text-sm p-4 rounded-lg border-l-4 ${
              theme === 'dark' 
                ? 'border-green-500 bg-gray-900/80 text-gray-300 font-mono' 
                : 'border-blue-500 bg-gray-100 text-gray-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {theme === 'dark' ? (
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="text-purple-400 mr-2">$</span>
                  <span>echo "Tailored solutions for your business"</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-purple-400 mr-2">$</span>
                  <span>echo "Custom-built components for success"</span>
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  # Each service is designed to meet your specific needs
                </div>
              </div>
            ) : (
              <>
                <span className="text-blue-500">/**</span>
                <p className="ml-4">* Comprehensive solutions tailored to your business needs</p>
                <p className="ml-4">* Each service is a custom-built component for your success</p>
                <p className="ml-4">*/</p>
              </>
            )}
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 100 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 1, delay: index * 0.15 }}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div 
                  className={`relative h-full p-6 rounded-lg overflow-hidden group transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-black/30 border border-green-500/50 hover:border-green-400/80' 
                      : 'bg-white border-l-4 shadow-sm hover:shadow-md'
                  }`}
                  style={{
                    ...(theme === 'dark' ? {
                      boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
                      transition: 'box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
                    } : {}),
                    ...(theme !== 'dark' ? {
                      borderLeftColor: service.gradient.includes('from-') 
                        ? `var(--${service.gradient.split(' ')[0].replace('from-', '')})` 
                        : service.gradient
                    } : {})
                  }}
                >
                  <div className="absolute top-2 right-2 text-xs text-gray-400 dark:text-gray-600">
                    <span className="text-blue-500">const</span>
                    <span className="text-purple-500">
                      {' '}{service.title.replace(/\s+/g, '').toLowerCase()}
                    </span>
                    <span className="text-gray-600"> = () =&gt; {'{ }'}</span>
                  </div>
                  
                  <div className="mt-8 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center relative z-10`}>
                      <service.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  {/* Enhanced glow effect for dark mode */}
                  {theme === 'dark' && (
                    <>
                      {/* Bottom glow */}
                      <div className="absolute -bottom-1 -left-1 -right-1 h-1/3 bg-gradient-to-t from-green-500/30 via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-lg blur-sm"></div>
                      {/* Side glows */}
                      <div className="absolute -left-1 -right-1 bottom-0 h-1/4 bg-gradient-to-b from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      {/* Corner glows */}
                      <div className="absolute -bottom-1 -left-1 w-1/3 h-1/3 bg-gradient-to-tr from-transparent via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      <div className="absolute -bottom-1 -right-1 w-1/3 h-1/3 bg-gradient-to-tl from-transparent via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </>
                  )}
                  <div className="relative z-10">
                    <h3 className="text-xl font-mono font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-500 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-sans">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    {service.features && (
                      <div className="space-y-2 mb-4 relative z-10">
                        <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                          <span className="text-blue-500">//</span> Features
                        </div>
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={feature}
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: index * 0.1 + (featureIndex * 0.05)
                            }}
                            viewport={{ once: true }}
                          >
                            <span className="text-gray-400 dark:text-gray-600">-</span>
                            <code className="text-xs bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded text-gray-700 dark:text-gray-300 font-mono">
                              {feature}
                            </code>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-600">
                      {'};'}
                    </div>
                    

                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
