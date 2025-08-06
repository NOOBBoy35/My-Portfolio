import { Twitter, Github, Linkedin, Dribbble } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-gray-900 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-2xl font-space font-bold text-gradient mb-4">
            [Your Name]
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Crafting digital experiences that inspire and innovate
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href="#" 
              className="text-gray-500 hover:text-blue-600 dark:hover:text-green-400 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-blue-600 dark:hover:text-green-400 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-blue-600 dark:hover:text-green-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-blue-600 dark:hover:text-green-400 transition-colors"
            >
              <Dribbble className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-600">
            © 2024 [Your Name]. All rights reserved. Made with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
