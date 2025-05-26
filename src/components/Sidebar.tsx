
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { courseModules } from '@/lib/courseData';
import { generateSlug, formatSlugToTitle } from '@/lib/utils';

const baseNavItems = [
  { name: 'Dashboard', icon: '📊', path: '/dashboard' },
  { name: 'Schedule', icon: '🗓️', path: '/schedule' },
  { name: 'My courses', icon: '📚', path: '/' },
  { name: 'Reports', icon: '📄', path: '/reports' },
  { name: 'Teams', icon: '👥', path: '/teams' },
  { name: 'Library', icon: '🏛️', path: '/library' },
  { name: 'Settings', icon: '⚙️', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const params = useParams<{ courseSlug?: string; moduleSlug?: string }>();
  const { courseSlug } = params;

  const courseModuleNavItems = courseSlug
    ? courseModules.map(module => ({
        name: module.title,
        icon: '🧩', // Using a puzzle piece icon for modules
        path: `/course/${courseSlug}/${generateSlug(module.title)}`,
      }))
    : [];
  
  const currentCourseTitle = courseSlug ? formatSlugToTitle(courseSlug) : '';

  return (
    <aside className="w-64 bg-white text-academic-dark-gray p-6 flex flex-col shadow-lg">
      <div className="text-3xl font-bold text-academic-blue mb-10">
        <Link to="/" className="flex items-center">
          <span className="bg-academic-blue text-white rounded-full h-10 w-10 flex items-center justify-center mr-2">a</span>
          cademic
        </Link>
      </div>
      <nav className="flex-grow overflow-y-auto">
        <ul>
          {baseNavItems.map((item) => {
            let isLinkActive;
            if (item.path === '/') { // For "My courses"
              isLinkActive = location.pathname === '/' || location.pathname.startsWith('/course/');
            } else {
              isLinkActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            }
            return (
              <li key={item.name} className="mb-3">
                <Link
                  to={item.path}
                  className={`flex items-center py-2 px-3 rounded-lg transition-colors duration-200 ease-in-out
                    ${isLinkActive
                      ? 'bg-academic-blue text-white shadow-md'
                      : 'hover:bg-academic-light-blue hover:text-academic-blue'
                    }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {courseSlug && courseModuleNavItems.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {currentCourseTitle} Modules
            </h3>
            <ul>
              {courseModuleNavItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    to={item.path}
                    className={`flex items-center py-2 px-3 rounded-lg transition-colors duration-200 ease-in-out text-sm
                      ${location.pathname === item.path
                        ? 'bg-academic-blue text-white shadow-sm' // Slightly different active style for modules
                        : 'text-gray-700 hover:bg-academic-light-blue hover:text-academic-blue'
                      }`}
                  >
                    <span className="mr-3 text-md">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      <div className="mt-auto pt-6">
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
