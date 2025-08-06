import { useState } from "react";
import { useScrollTrigger } from "@/hooks/use-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "AI Dashboard Pro",
    description: "Machine learning analytics platform with real-time data visualization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["React", "Python", "TensorFlow"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 2,
    title: "E-Commerce Mobile",
    description: "Next-generation shopping experience with AR try-on features",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["React Native", "Node.js", "AR.js"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 3,
    title: "Social DApp",
    description: "Decentralized social platform built on blockchain technology",
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

  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-4 text-gray-900 dark:text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of innovative projects that blend creativity with cutting-edge technology
          </p>
        </motion.div>

        {/* Project Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="project-card glass bg-white/50 dark:bg-gray-800/50 rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/30 hover:shadow-2xl group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-space font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs rounded-full ${tagColors[tag as keyof typeof tagColors] || "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-blue-600 dark:text-green-400 hover:underline font-semibold">
                    View Project
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, '_blank');
                      }}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, '_blank');
                      }}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
