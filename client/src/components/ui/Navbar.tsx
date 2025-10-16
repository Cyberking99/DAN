import React, { useState } from "react";
import { FileText, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // adjust import path if your Button is elsewhere

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => (window.location.href = "/")}>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">DAN</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#why-us" className="text-gray-700 hover:text-gray-900 transition-colors">
              Why Us
            </a>
            <a href="#faq" className="text-gray-700 hover:text-gray-900 transition-colors">
              FAQ
            </a>
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-6"
            >
              Launch App
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 pb-4 animate-slide-down">
          <div className="flex flex-col space-y-4 mt-4">
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#why-us"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Why Us
            </a>
            <a
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              FAQ
            </a>

            <Button
              onClick={() => {
                setIsOpen(false);
                window.location.href = "/dashboard";
              }}
              className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-6 w-full"
            >
              Launch App
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
