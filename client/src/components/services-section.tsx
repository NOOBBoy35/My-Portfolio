import { useScrollTrigger } from "@/hooks/use-scroll";
import { motion } from "framer-motion";
import { Code, Palette, Bot, Star, Smartphone, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Complete web applications from concept to deployment, using cutting-edge technologies.",
    price: "From $5,000",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that converts visitors into customers with stunning interfaces.",
    price: "From $3,000",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational AI that enhances customer experience and automates support.",
    price: "From $2,500",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Star,
    title: "Brand Identity",
    description: "Complete visual identity packages that make your brand unforgettable.",
    price: "From $4,000",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that users love to use.",
    price: "From $8,000",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Lightbulb,
    title: "Tech Consulting",
    description: "Strategic technology advice to accelerate your business growth and innovation.",
    price: "From $200/hr",
    gradient: "from-teal-500 to-cyan-500"
  }
];

export function ServicesSection() {
  const { ref, isVisible } = useScrollTrigger(0.1);

  return (
    <section id="services" ref={ref} className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-space font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          <span className="text-gradient">Services</span> I Offer
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 100 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 1, delay: index * 0.15 }}
              className="service-card glass bg-white/50 dark:bg-gray-900/50 p-8 rounded-2xl border border-white/20 dark:border-gray-700/30 hover:shadow-2xl"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-space font-semibold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {service.description}
              </p>
              <div className="text-blue-600 dark:text-green-400 font-semibold">
                {service.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
