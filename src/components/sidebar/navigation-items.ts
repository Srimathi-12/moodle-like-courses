import { 
  Home, BookOpen, Users, Calendar, 
  FileText, FolderOpen, User, Settings, 
  BarChart
} from "lucide-react";

export const navItems = [
  { icon: Home, label: "Dashboard", path: "/teacher/dashboard" },
  { icon: Users, label: "Classes", path: "/teacher/classes" },
  { icon: Users, label: "Courses", path: "/teacher/courses" },
  { icon: FileText, label: "Assignments", path: "/teacher/assignments" },
  { icon: Calendar, label: "Attendance", path: "/teacher/attendance" },
  { icon: BarChart, label: "Analytics", path: "/teacher/analytics" },
  { icon: BookOpen, label: "Resources", path: "/teacher/resources" },
  { icon: FolderOpen, label: "Library", path: "/teacher/library" },
  { icon: User, label: "Profile", path: "/teacher/profile" },
  { icon: Settings, label: "Settings", path: "/teacher/settings" },
];
