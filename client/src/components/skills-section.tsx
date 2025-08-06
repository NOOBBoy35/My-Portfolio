import { useScrollTrigger } from "@/hooks/use-scroll";
import { motion } from "framer-motion";

const skills = [
  {
    icon: "⚛️",
    title: "Frontend",
    description: "Crafting beautiful, interactive user experiences with modern frameworks",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: "⚙️",
    title: "Backend",
    description: "Building robust, scalable server architectures and APIs",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Creating intuitive, stunning designs that users love",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: "🧠",
    title: "AI/ML",
    description: "Developing intelligent systems that learn and adapt",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: "🎭",
    title: "Creative Art",
    description: "Blending technology with artistic expression and creativity",
    gradient: "from-indigo-500 to-blue-500"
  }
];

export function SkillsSection() {
  const { ref, isVisible } = useScrollTrigger(0.1);

  return (
    <section id="about" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900 relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-space font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          What I <span className="text-gradient">Create</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 100 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="skill-card text-center group cursor-pointer"
            >
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${skill.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                <span className="text-3xl">{skill.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
