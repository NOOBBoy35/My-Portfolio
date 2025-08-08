import { useState } from "react";
import { useScrollTrigger } from "@/hooks/use-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";

const projects = [
  {
    id: 1,
    title: "Therapy AI",
    description: "AI-powered therapy platform for mental health support",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["React", "Python", "TensorFlow"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 2,
    title: "Summarise X",
    description: "AI-powered summarization/translation tool for efficient content analysis",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["React Native", "Node.js", "AR.js"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 3,
    title: "WingMate",
    description: "A user-friendly flight booking platform designed to simplify searching, comparing, and reserving domestic and international flights.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["Web3", "Solidity", "Vue.js"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 4,
    title: "Creative AI Studio",
    description: "AI-powered design tool for generating artwork and illustrations",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["Stable Diffusion", "FastAPI", "Svelte"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 5,
    title: "Team Sync Pro",
    description: "Real-time collaboration platform with video conferencing and file sharing",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["WebRTC", "Socket.io", "Express"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 6,
    title: "Smart Home Hub",
    description: "IoT-powered home automation system with voice control and AI",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["Raspberry Pi", "MQTT", "Flutter"],
    githubUrl: "#",
    liveUrl: "#"
  }
];

const tagColors = {
  "React": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  "Python": "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  "TensorFlow": "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  "React Native": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  "Node.js": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  "AR.js": "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  "Web3": "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  "Solidity": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  "Vue.js": "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  "Stable Diffusion": "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
  "FastAPI": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  "Svelte": "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  "WebRTC": "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
  "Socket.io": "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  "Express": "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400",
  "Raspberry Pi": "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  "MQTT": "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  "Flutter": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
};

export function ProjectsSection() {
  const { ref, isVisible } = useScrollTrigger(0.1);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { theme } = useTheme();

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:terminal-bg transition-colors duration-300 relative overflow-hidden" ref={ref}>
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
                  <span>cat projects.json</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                  Featured Projects
                </h2>
              </>
            ) : (
              <>
                <span className="text-blue-500">// projects.js</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                  <span className="text-blue-500">
                    {'<Projects '}
                    <span className="text-purple-500">showcase</span>
                    {'={'}
                    <span className="text-green-500">"featured"</span>
                    {' />'}
                  </span>
                </h2>
              </>
            )}
          </motion.div>
          <motion.div 
            className={`text-sm p-4 rounded-lg ${
              theme === 'dark'
                ? 'bg-gray-900/80 text-gray-300 font-mono border-l-4 border-green-500'
                : 'text-gray-600 bg-gray-100 border-l-4 border-blue-500'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {theme === 'dark' ? (
              <div className="space-y-1">
                <div className="flex items-baseline">
                  <span className="text-purple-400 mr-2">$</span>
                  <span>echo "Showcasing innovative projects that blend creativity with technology"</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-purple-400 mr-2">$</span>
                  <span>echo "Each project solves real-world problems with unique solutions"</span>
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  # Click on any project to learn more
                </div>
              </div>
            ) : (
              <>
                <span className="text-blue-500">/**</span>
                <p className="ml-4">* A showcase of innovative projects that blend creativity with cutting-edge technology</p>
                <p className="ml-4">* Each project is a unique solution to real-world problems</p>
                <p className="ml-4">*/</p>
              </>
            )}
          </motion.div>
        </div>

        {/* Project Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => {
            const gradient = [
              'from-blue-500 to-cyan-500',
              'from-green-500 to-emerald-500',
              'from-purple-500 to-pink-500',
              'from-orange-500 to-red-500',
              'from-indigo-500 to-blue-500',
              'from-amber-500 to-yellow-500'
            ][index % 6];
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
                onClick={() => setSelectedProject(project)}
              >
                <div 
                  className={`relative h-full rounded-lg overflow-hidden group transition-all duration-300 cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-black/30 border border-green-500/50 hover:border-green-400/80'
                      : 'bg-white shadow-sm hover:shadow-md border-l-4'
                  }`}
                  style={theme !== 'dark' ? {
                    borderLeftColor: gradient.includes('from-') 
                      ? `var(--${gradient.split(' ')[0].replace('from-', '')})` 
                      : gradient,
                    borderLeftWidth: '4px',
                    borderLeftStyle: 'solid'
                  } : {}}
                >
                  <div className="absolute top-2 right-2 text-xs text-gray-400 dark:text-gray-600">
                    <span className="text-blue-500">const</span>
                    <span className="text-purple-500">
                      {' '}{project.title.replace(/\s+/g, '').toLowerCase()}
                    </span>
                    <span className="text-gray-600"> = () =&gt; {'{ }'}</span>
                  </div>
                  
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`px-2 py-1 text-xs rounded-full ${tagColors[tag as keyof typeof tagColors] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                      <button 
                        className="text-blue-600 dark:text-green-400 hover:underline font-medium text-sm flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.liveUrl, '_blank');
                        }}
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </button>
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, '_blank');
                          }}
                          className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="px-8 py-4 glass bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white font-semibold rounded-full hover:scale-110 transition-all duration-300"
          >
            <FolderOpen className="mr-2 h-5 w-5" />
            View All Projects
          </Button>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-space font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full ${tagColors[tag as keyof typeof tagColors] || "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                    variant="outline"
                    className="flex-1"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                  <Button
                    onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-green-500 dark:to-orange-500"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
