import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navigation-items";

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
  const location = useLocation();

  return (
    <nav className="flex-1 py-4">
      <ul className="space-y-1 px-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={cn(
                "flex items-center py-2 px-4 rounded-md transition-colors",
                location.pathname === item.path 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}