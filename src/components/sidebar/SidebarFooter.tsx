import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SidebarLogoutButton = ({ isCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can also clear tokens or auth data here if needed
    navigate('/');
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className={cn(
        "w-full text-white hover:bg-sidebar-primary flex items-center",
        isCollapsed && "justify-center"
      )}
    >
      <LogOut className="h-5 w-5" />
      {!isCollapsed && <span className="ml-2">Logout</span>}
    </Button>
  );
};

export default SidebarLogoutButton;

