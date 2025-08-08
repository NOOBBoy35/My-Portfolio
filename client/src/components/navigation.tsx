import { useTheme } from "@/context/theme-context";
import { Sun, Moon, Menu, X, Code2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#hero", label: "Home", icon: "</>" },
    { href: "#about", label: "About", icon: "{ }" },
    { href: "#services", label: "Services", icon: "( )" },
    { href: "#projects", label: "Projects", icon: "[ ]" },
    { href: "#contact", label: "Contact", icon: "</>" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-white/20 dark:border-gray-800/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <Code2 className="h-7 w-7 text-blue-500 dark:text-green-400 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-space font-black bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              DevPort
            </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-1 bg-white/50 dark:bg-gray-900/50 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-inner w-full justify-between">
              {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-full group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute -left-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 dark:text-green-400">
                  {item.icon}
                </span>
                <span className="relative group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors">
                  {item.label}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-green-50 dark:from-blue-900/30 dark:to-green-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3 justify-center">
            {/* Theme Toggle */}
            <motion.div 
              onClick={toggleTheme}
              className="relative w-14 h-8 rounded-full p-1 cursor-pointer bg-gradient-to-r from-blue-100 to-green-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 flex items-center"
              initial={false}
              animate={{
                background: theme === 'dark' 
                  ? 'linear-gradient(to right, #1e40af, #065f46)' 
                  : 'linear-gradient(to right, #dbeafe, #dcfce7)'
              }}
              transition={{ type: 'spring', stiffness: 700, damping: 30 }}
            >
              <motion.div
                className="w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md flex items-center justify-center"
                layout
                transition={{
                  type: 'spring',
                  stiffness: 700,
                  damping: 30
                }}
              >
                {theme === 'light' ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-300" />
                )}
              </motion.div>
              <div className="absolute left-1 right-1 top-0 bottom-0 flex items-center justify-between px-1 pointer-events-none">
                <Sun className="h-3.5 w-3.5 text-yellow-500 opacity-70" />
                <Moon className="h-3.5 w-3.5 text-blue-300 opacity-70" />
              </div>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden glass bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 dark:border-gray-800/30">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
