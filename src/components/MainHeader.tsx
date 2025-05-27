import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';
import { useMoodleAuth } from '@/hooks/useMoodleAuth';
import { cn } from "@/lib/utils";

const MainHeader = () => {
  const { currentUser, logout } = useMoodleAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/student-courses' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
    { name: 'Testimonials', path: '/testimonials' },
  ];

  const handleNavigateToStudentLogin = () => {
    navigate('/student-login');
  };

  const handleNavigateToTeacherLogin = () => {
    navigate('/teacher-login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <BookOpen className={cn(
              "h-8 w-8 text-[#9b87f5] transition-transform duration-300",
              "group-hover:scale-110"
            )} />
            <span className="text-xl font-bold text-[#1A1F2C] group-hover:text-[#9b87f5] transition-colors">Shiksak LMS</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {/* {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-gray-600 transition-colors text-sm font-medium relative",
                  "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5",
                  "after:bottom-0 after:left-0 after:bg-[#9b87f5] after:origin-bottom-right",
                  "after:transition-transform after:duration-300 hover:after:scale-x-100",
                  "hover:after:origin-bottom-left hover:text-[#9b87f5]"
                )}
              >
                {link.name}
              </Link>
            ))} */}
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium relative transition-colors",
                    "after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0",
                    "after:bg-[#9b87f5] after:origin-bottom-right after:transition-transform after:duration-300",
                    "hover:text-[#9b87f5] hover:after:scale-x-100 hover:after:origin-bottom-left",
                    isActive
                      ? "text-[#9b87f5] after:scale-x-100"
                      : "text-gray-600 after:scale-x-0"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

          </nav>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="hidden sm:inline-block text-sm text-gray-600">
                  Welcome, {currentUser.firstname}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className={cn(
                    "hidden sm:inline-flex border-[#9b87f5] text-[#9b87f5]",
                    "hover:bg-[#9b87f5]/10 transition-all duration-300"
                  )}
                  onClick={handleNavigateToStudentLogin}
                >
                  Student Portal
                </Button>
                <Button
                  className={cn(
                    "bg-[#9b87f5] hover:bg-[#8a74f8] transition-all duration-300",
                    "transform hover:translate-y-[-2px] active:translate-y-[1px]"
                  )}
                  onClick={handleNavigateToTeacherLogin}
                >
                  Teacher Portal
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
