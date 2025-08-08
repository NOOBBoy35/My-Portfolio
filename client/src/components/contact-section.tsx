import { useState } from "react";
import { useScrollTrigger } from "@/hooks/use-scroll";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Instagram, Facebook, Github, Linkedin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/theme-context";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/abdullah._.35?igsh=bjk5aTlpZHRlZXB1",
    color: "from-pink-500 to-rose-500",
    hoverColor: "hover:scale-125 hover:rotate-12"
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1CoNpTxccN/",
    color: "from-blue-600 to-blue-700",
    hoverColor: "hover:scale-125 hover:-rotate-12"
  },
  {
    icon: Github,
    href: "https://github.com/NOOBBoy35",
    color: "from-gray-800 to-gray-900",
    hoverColor: "hover:scale-125 hover:rotate-12"
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abdullah-mansoor-a9a424218?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:scale-125 hover:-rotate-12"
  },
  {
    icon: MessageSquare,
    href: "#contact-form",
    color: "from-green-500 to-green-600",
    hoverColor: "hover:scale-125 hover:rotate-12"
  }
];

export function ContactSection() {
  const { ref, isVisible } = useScrollTrigger(0.1);
  const { toast } = useToast();
  const { theme } = useTheme();
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
    <section id="contact" ref={ref} className={`py-16 ${theme === 'dark' ? 'terminal-bg' : 'bg-white'} relative overflow-hidden`}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {theme === 'dark' ? (
            <>
              <div className="font-mono text-green-400 text-sm md:text-base mb-2">
                <span className="text-purple-400">abdullah@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ </span>
                <span>init contact-form</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-3">
                <span className="text-green-400">$</span> Contact Terminal
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
                <span className="text-gray-500"># Type your message and press Enter to send</span>
                <br />
                <span className="text-gray-500"># All fields are required</span>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-space font-bold mb-4 text-gray-900">
                <span className="text-blue-400">&lt;</span>
                <span className="text-purple-500">code</span>
                <span className="text-blue-400">&gt;</span>
                <span className="text-yellow-400"> Let's Build </span>
                <span className="text-blue-400">&lt;/</span>
                <span className="text-purple-500">code</span>
                <span className="text-blue-400">&gt;</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-mono text-sm md:text-base">
                <span className="text-gray-500">// Ready to collaborate? Let's build something amazing together.</span>
                <br />
                <span className="text-gray-500">// Drop me a message and let's start creating!</span>
              </p>
            </>
          )}
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`space-y-6 ${theme === 'dark' ? 'bg-gray-900/70 p-6 rounded-lg border border-green-500/30' : ''}`}
            >
              <div className="text-center lg:text-left">
                <h3 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-green-400 font-mono' : 'text-gray-900 font-space'}`}>
                  {theme === 'dark' ? '> contact_info.sh' : 'Get in Touch'}
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
                      className={`social-icon w-12 h-12 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : `bg-gradient-to-br ${social.color}`} rounded-xl flex items-center justify-center shadow-lg ${social.hoverColor} transition-all duration-300`}
                    >
                      <social.icon className={`h-5 w-5 ${theme === 'dark' ? 'text-green-400' : 'text-white'}`} />
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
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-green-400' : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'}`}>
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className={`${theme === 'dark' ? 'text-gray-300 font-mono text-sm' : 'text-gray-700'}`}>
                      {theme === 'dark' ? '> dev.abdullahmansoor@gmail.com' : 'dev.abdullahmansoor@gmail.com'}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="flex items-center justify-center lg:justify-start space-x-3"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-green-400' : 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'}`}>
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className={`${theme === 'dark' ? 'text-gray-300 font-mono text-sm' : 'text-gray-700'}`}>
                      {theme === 'dark' ? '> +92 334 8486486' : '+92 334 8486486'}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="flex items-center justify-center lg:justify-start space-x-3"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-green-400' : 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'}`}>
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className={`${theme === 'dark' ? 'text-gray-300 font-mono text-sm' : 'text-gray-700'}`}>
                      {theme === 'dark' ? '> Lahore, Pakistan' : 'Lahore, Pakistan'}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`${theme === 'dark' ? 'bg-gray-900/80 border border-green-500/30' : 'glass bg-white/50 border border-white/20 dark:border-gray-700/30'} p-6 rounded-2xl`}
            >
              {theme === 'dark' && (
                <div className="font-mono text-green-400 text-sm mb-6 border-b border-green-500/20 pb-3">
                  <div className="flex items-center">
                    <span className="text-purple-400">$</span>
                    <span className="ml-2 text-white">contact_form --new-message</span>
                  </div>
                  <div className="text-gray-500 text-xs mt-1"># Fill in the details and press Enter to send</div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className={`block text-sm font-mono ${theme === 'dark' ? 'text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {theme === 'dark' ? '> Name:' : 'Your Name'}
                  </label>
                  <Input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`font-mono text-sm ${theme === 'dark' 
                      ? 'bg-gray-800 border-green-500/30 text-white focus:border-green-400 focus:ring-green-400/50' 
                      : 'bg-white/30 border-white/20 focus:ring-blue-500'}`}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className={`block text-sm font-mono ${theme === 'dark' ? 'text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {theme === 'dark' ? '> Email:' : 'Your Email'}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`font-mono text-sm ${theme === 'dark' 
                      ? 'bg-gray-800 border-green-500/30 text-white focus:border-green-400 focus:ring-green-400/50' 
                      : 'bg-white/30 border-white/20 focus:ring-blue-500'}`}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className={`block text-sm font-mono ${theme === 'dark' ? 'text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {theme === 'dark' ? '> Budget (optional):' : 'Project Budget (Optional)'}
                  </label>
                  <Input
                    name="budget"
                    type="text"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`font-mono text-sm ${theme === 'dark' 
                      ? 'bg-gray-800 border-green-500/30 text-white focus:border-green-400 focus:ring-green-400/50' 
                      : 'bg-white/30 border-white/20 focus:ring-blue-500'}`}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className={`block text-sm font-mono ${theme === 'dark' ? 'text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {theme === 'dark' ? '> Message:' : 'Your Message'}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`font-mono text-sm ${theme === 'dark' 
                      ? 'bg-gray-800 border-green-500/30 text-white focus:border-green-400 focus:ring-green-400/50' 
                      : 'bg-white/30 border-white/20 focus:ring-blue-500'}`}
                  />
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-mono text-sm py-5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                      theme === 'dark' 
                        ? 'bg-green-600 hover:bg-green-700 text-white border border-green-500/50' 
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {theme === 'dark' ? 'Sending...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {theme === 'dark' ? 'Send Message [Enter]' : 'Send Message'}
                      </>
                    )}
                  </Button>
                </div>
                
                {theme === 'dark' && (
                  <div className="text-gray-500 text-xs font-mono pt-2 border-t border-green-500/10">
                    # All fields are required
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
