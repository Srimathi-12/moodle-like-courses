import { cn } from "@/lib/utils";
import { useState } from "react";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import  SidebarFooter  from "./sidebar/SidebarFooter";


const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={cn(
                "min-h-screen transition-all duration-300 flex flex-col bg-black border-r border-border",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <SidebarHeader
                isCollapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />
            <SidebarNavigation isCollapsed={isCollapsed} />
            <SidebarFooter isCollapsed={isCollapsed} />
        </div>
    );
}

export default Sidebar;