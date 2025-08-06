import { Twitter, Github, Linkedin, Dribbble } from "lucide-react";
import avatarImage from "@assets/ChatGPT Image Aug 6, 2025 at 01_50_38 PM_1754470256896.png";

export function Footer() {
  return (
    <footer className="py-12 bg-gray-900 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700 mb-3">
              <img 
                src={avatarImage} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-2xl font-space font-bold text-gradient">
              [Your Name]
            </div>
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
