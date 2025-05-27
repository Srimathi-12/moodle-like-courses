import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarHeader({ isCollapsed, onToggleCollapse }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className={cn("flex items-center", isCollapsed && "justify-center w-full")}>
        {!isCollapsed && (
          <span className="text-xl font-bold text-white">SHIKSAK LMS</span>
        )}
        {isCollapsed && (
          <span className="text-2xl font-bold text-white">LMS</span>
        )}
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onToggleCollapse}
        className="text-white hover:bg-sidebar-primary"
      >
        {isCollapsed ? "→" : "←"}
      </Button>
    </div>
  );
}