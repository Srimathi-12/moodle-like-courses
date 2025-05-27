import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-[#9b87f5]" />
              <span className="text-xl font-bold text-[#1A1F2C]">Shiksak LMS</span>
            </Link>
            <p className="text-gray-600">
              Empowering education through innovative technology and personalized learning experiences.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-600 hover:text-[#9b87f5]">Features</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-[#9b87f5]">About</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-[#9b87f5]">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-[#9b87f5]">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#9b87f5]">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#9b87f5]">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#9b87f5]">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#9b87f5]">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">support@shiksak.com</li>
              <li className="text-gray-600">+1 (555) 123-4567</li>
              <li className="text-gray-600">
                123 Education Street<br />
                Learning City, ED 12345
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Shiksak LMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
