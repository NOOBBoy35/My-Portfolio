import { useState } from "react";
import { useScrollTrigger } from "@/hooks/use-scroll";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Instagram, Facebook, Github, Linkedin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  {
    icon: Instagram,
    href: "#",
    color: "from-pink-500 to-rose-500",
    hoverColor: "hover:scale-125 hover:rotate-12"
  },
  {
    icon: Facebook,
    href: "#",
    color: "from-blue-600 to-blue-700",
    hoverColor: "hover:scale-125 hover:-rotate-12"
  },
  {
    icon: Github,
    href: "#",
    color: "from-gray-800 to-gray-900",
    hoverColor: "hover:scale-125 hover:rotate-12"
  },
  {
    icon: Linkedin,
    href: "#",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:scale-125 hover:-rotate-12"
  },
  {
    icon: MessageSquare,
    href: "#",
    color: "from-green-500 to-green-600",
    hoverColor: "hover:scale-125 hover:rotate-12"
  }
];

export function ContactSection() {
  const { ref, isVisible } = useScrollTrigger(0.1);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });

    setFormData({ name: "", email: "", budget: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-4 text-gray-900 dark:text-white">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together that will make an impact.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-space font-semibold text-gray-900 dark:text-white mb-6">
                  Get in Touch
                </h3>
                
                {/* Social Media Icons */}
                <div className="flex justify-center lg:justify-start space-x-6 mb-8">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className={`social-icon w-16 h-16 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center shadow-2xl ${social.hoverColor} transition-all duration-300`}
                    >
                      <social.icon className="h-6 w-6 text-white" />
                    </motion.a>
                  ))}
                </div>

                {/* Contact Methods */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center justify-center lg:justify-start space-x-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">hello@yourname.dev</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="flex items-center justify-center lg:justify-start space-x-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="flex items-center justify-center lg:justify-start space-x-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">San Francisco, CA</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass bg-white/50 dark:bg-gray-900/50 p-8 rounded-2xl border border-white/20 dark:border-gray-700/30"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="glass bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30 focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="glass bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30 focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500"
                  />
                </div>
                <div>
                  <Input
                    name="budget"
                    type="text"
                    placeholder="Project Budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="glass bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30 focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="glass bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/30 focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-green-500 dark:to-orange-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
