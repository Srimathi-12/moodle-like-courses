import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
// Due to icon constraints, we'll use text or simple Unicode characters for icons.
// import { LayoutGrid, Calendar, BookOpen, FileText, Users, Library, SettingsIcon } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: '📊', path: '/dashboard' }, // Example path
  { name: 'Schedule', icon: '🗓️', path: '/schedule' },
  { name: 'My courses', icon: '📚', path: '/' }, // Current page
  { name: 'Reports', icon: '📄', path: '/reports' },
  { name: 'Teams', icon: '👥', path: '/teams' },
  { name: 'Library', icon: '🏛️', path: '/library' },
  { name: 'Settings', icon: '⚙️', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const activeItem = 'My courses'; // Example of an active item

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, itemName: string, itemPath: string) => {
    e.preventDefault(); // Prevent actual navigation for now
    if (itemName === activeItem) {
      toast({ title: "Already on Page", description: `You are currently on the ${itemName} page.` });
    } else {
      toast({ title: "Navigation Attempt", description: `Clicked on ${itemName}. Would navigate to ${itemPath}` });
    }
    // Later, this could be: navigate(itemPath);
  };

  return (
    <aside className="w-64 bg-white text-academic-dark-gray p-6 flex flex-col shadow-lg">
      <div className="text-3xl font-bold text-academic-blue mb-10">
        <span className="bg-academic-blue text-white rounded-full h-10 w-10 flex items-center justify-center mr-2">a</span>
        cademic
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-3">
              <a
                href={item.path} // Use path for semantic href
                onClick={(e) => handleNavClick(e, item.name, item.path)}
                className={`flex items-center py-2 px-3 rounded-lg transition-colors duration-200 ease-in-out
                  ${item.name === activeItem 
                    ? 'bg-academic-blue text-white shadow-md' 
                    : 'hover:bg-academic-light-blue hover:text-academic-blue'
                  }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </a>
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
