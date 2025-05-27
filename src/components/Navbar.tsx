
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  Calendar,
  Home,
  Menu,
  Search,
  User,
  MessageSquare,
  X,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
  };

  // Optional: Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-600 text-white shadow-md"> {/* Changed background color to blue-600 */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
            <Link to="/student" className="flex items-center">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">Shiksak LMS</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/student">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-white hover:bg-blue-700 hover:text-white", // Changed hover color to blue-700
                        location.pathname === "/student" && "bg-blue-700 font-medium" // Changed active color to blue-700
                      )}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent text-white hover:bg-blue-700 hover:text-white", // Changed hover color to blue-700
                      location.pathname.includes('/student/courses') && "bg-blue-700 font-medium" // Changed active color to blue-700
                    )}
                  >
                    Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/student/courses"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-600/50 to-blue-700 p-6 no-underline outline-none focus:shadow-md" // Changed gradient colors to blue
                          >
                            <BookOpen className="h-6 w-6 mb-2" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              My Courses
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Access all your enrolled courses and learning materials
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link to="/student/courses" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900">
                          <div className="text-sm font-medium leading-none">All Courses</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-700">
                            View all available courses
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/student/assignments" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900">
                          <div className="text-sm font-medium leading-none">Assignments</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-700">
                            View and submit your assignments
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/student/grades" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900">
                          <div className="text-sm font-medium leading-none">Grades</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-700">
                            Check your course grades and progress
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/student/calendar">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-white hover:bg-blue-700 hover:text-white", // Changed hover color to blue-700
                        location.pathname === "/student/calendar" && "bg-blue-700 font-medium" // Changed active color to blue-700
                      )}
                    >
                      Calendar
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/student/messages">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-white hover:bg-blue-700 hover:text-white", // Changed hover color to blue-700
                        location.pathname === "/student/messages" && "bg-blue-700 font-medium" // Changed active color to blue-700
                      )}
                    >
                      Messages
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="icon"
                className="text-white relative"
                onClick={toggleNotifications}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                  3
                </span>
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl z-50 border border-gray-200 overflow-hidden">
                  <div className="p-4 bg-[#f8f8ff] border-b text-sm font-semibold text-gray-800">
                    Notifications
                  </div>
                  <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                    <li className="p-4 hover:bg-[#f3f3fd] transition cursor-pointer">
                      <p className="text-black font-medium">📌 Assignment due</p>
                      <p className="text-sm text-gray-500">Tomorrow in <b>Mathematics</b></p>
                    </li>
                    <li className="p-4 hover:bg-[#f3f3fd] transition cursor-pointer">
                      <p className="text-black font-medium">📝 New quiz posted</p>
                      <p className="text-sm text-gray-500">In <b>Science</b> - Check it out now</p>
                    </li>
                    <li className="p-4 hover:bg-[#f3f3fd] transition cursor-pointer">
                      <p className="text-black font-medium">🎓 Live session</p>
                      <p className="text-sm text-gray-500">Scheduled at 5 PM today</p>
                    </li>
                  </ul>
                  <div className="p-3 text-center bg-[#f8f8ff] border-t">
                    <button
                      onClick={() => {
                        console.log("View all notifications");
                        setShowNotifications(false);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition" // Changed button color to blue
                    >
                      View All
                    </button>
                  </div>
                </div>
              )}
            </div>


            <Link to="/student/messages">
              <Button variant="ghost" size="icon" className="text-white relative">
                <MessageSquare />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                  5
                </span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white rounded-full bg-blue-700"> {/* Changed background color to blue-700 */}
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center p-2 gap-2 border-b">
                  <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white"> {/* Changed background color to blue-700 */}
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">John Doe</span>
                    <span className="text-xs text-gray-500">student@example.com</span>
                  </div>
                </div>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <Link to="/student/profile" className="flex w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/student/settings" className="flex w-full">Settings</Link>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <Link to="/" className="flex w-full">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-100 text-[#1A1F2C] border-b border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/student"
              className={`block px-3 py-2 rounded-md ${location.pathname === '/student' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Dashboard
              </div>
            </Link>
            <Link
              to="/student/courses"
              className={`block px-3 py-2 rounded-md ${location.pathname.includes('/student/courses') ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Courses
              </div>
            </Link>
            <Link
              to="/student/calendar"
              className={`block px-3 py-2 rounded-md ${location.pathname === '/student/calendar' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Calendar
              </div>
            </Link>
            <Link
              to="/student/messages"
              className={`block px-3 py-2 rounded-md ${location.pathname === '/student/messages' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Messages
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;