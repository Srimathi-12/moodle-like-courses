import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Due to icon constraints, we'll use text or simple Unicode characters for icons.
// import { LayoutGrid, Calendar, BookOpen, FileText, Users, Library, SettingsIcon } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: '📊', path: '/dashboard' }, // Path can be updated if /dashboard page is created
  { name: 'Schedule', icon: '🗓️', path: '/schedule' },
  { name: 'My courses', icon: '📚', path: '/' }, // Main page
  { name: 'Reports', icon: '📄', path: '/reports' },
  { name: 'Teams', icon: '👥', path: '/teams' },
  { name: 'Library', icon: '🏛️', path: '/library' },
  { name: 'Settings', icon: '⚙️', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation(); // Get current location

  return (
    <aside className="w-64 bg-white text-academic-dark-gray p-6 flex flex-col shadow-lg">
      <div className="text-3xl font-bold text-academic-blue mb-10">
        {/* Ensure Link wraps the logo if it should navigate home, or keep as div if not clickable */}
        <Link to="/" className="flex items-center">
          <span className="bg-academic-blue text-white rounded-full h-10 w-10 flex items-center justify-center mr-2">a</span>
          cademic
        </Link>
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-3">
              <Link
                to={item.path}
                className={`flex items-center py-2 px-3 rounded-lg transition-colors duration-200 ease-in-out
                  ${location.pathname === item.path
                    ? 'bg-academic-blue text-white shadow-md'
                    : 'hover:bg-academic-light-blue hover:text-academic-blue'
                  }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="flex items-center p-3 bg-academic-light-blue rounded-lg">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="https://github.com/shadcn.png" alt="Bessie Designer" />
            <AvatarFallback>BD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-gray-800">Bessie</p>
            <p className="text-xs text-academic-dark-gray">Designer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
