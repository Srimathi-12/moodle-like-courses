import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  FileText,
  Home,
  Users,
  MessageSquare,
  Settings,
  Award,
  Clock,
  GraduationCap,
  HelpCircle,
  Database,
  FileTextIcon,
  FileQuestion,
  LucideFileQuestion,
  PenIcon
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import Attendance from '@/pages/TeacherAttendance';
import { Writable } from 'stream';
import { courseModules } from '@/lib/courseData';
import { generateSlug, formatSlugToTitle } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const params = useParams<{ courseSlug?: string; moduleSlug?: string }>();
  const { courseSlug } = params;
  const [showContact, setShowContact] = useState(false);

  // Course module navigation logic
  const courseModuleNavItems = courseSlug
    ? courseModules.map(module => ({
        name: module.title,
        icon: '🧩', // Using a puzzle piece icon for modules
        path: `/student/courses/${courseSlug}/${generateSlug(module.title)}`,
      }))
    : [];
  
  const currentCourseTitle = courseSlug ? formatSlugToTitle(courseSlug) : '';

  const menuItems = [
    {
      path: '/student',
      icon: <Home className="mr-3 h-5 w-5" />,
      label: 'Dashboard',
      badge: null
    },
    {
      path: '/student/courses',
      icon: <BookOpen className="mr-3 h-5 w-5" />,
      label: 'My Courses',
      badge: { count: 3, variant: 'default' as const }
    },
    {
      path: '/student/calendar',
      icon: <Calendar className="mr-3 h-5 w-5" />,
      label: 'Calendar',
      badge: { count: 2, variant: 'default' as const }
    },
    {
      path: '/student/attendance',
      icon: <Users className="mr-3 h-5 w-5" />,
      label: 'Attendance',
      badge: null
    },
    {
      path: '/student/quizzes',
      icon: <PenIcon className="mr-3 h-5 w-5" />,
      label: 'Quiz',
      badge: { count: 2, variant: 'default' as const }
    },
    {
      path: '/student/assignments',
      icon: <FileText className="mr-3 h-5 w-5" />,
      label: 'Assignments',
      badge: { count: 3, variant: 'destructive' as const }
    },
    {
      path: '/student/grades',
      icon: <Award className="mr-3 h-5 w-5" />,
      label: 'Grades',
      badge: { count: 1, variant: 'outline' as const }
    },
    {
      path: '/student/messages',
      icon: <MessageSquare className="mr-3 h-5 w-5" />,
      label: 'Messages',
      badge: { count: 5, variant: 'destructive' as const }
    },
  ];

  const moodleItems = [
    {
      path: '/student/moodle-login',
      icon: <Database className="mr-3 h-5 w-5" />,
      label: 'Moodle Login',
      badge: null
    },
    {
      path: '/student/moodle-teacher',
      icon: <Users className="mr-3 h-5 w-5" />,
      label: 'Teacher Dashboard',
      badge: null
    },
    {
      path: '/student/moodle-student',
      icon: <BookOpen className="mr-3 h-5 w-5" />,
      label: 'Student Dashboard',
      badge: null
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-blue-50 border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <div className="flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-[#1A1F2C]">Current Semester</h3>
              <p className="text-xs text-blue-600">Spring 2025</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center text-xs text-blue-600">
              <Clock className="h-3 w-3 mr-1" />
              <span>8 weeks remaining</span>
            </div>
            <Badge variant="outline" className="text-xs bg-blue-600 text-white">Active</Badge>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <SidebarLink
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              badge={item.badge}
            />
          ))}
        </nav>

        {/* Course Module Navigation Section */}
        {courseSlug && courseModuleNavItems.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <h3 className="px-2 py-1 text-sm font-medium text-[#1A1F2C]">
              {currentCourseTitle} Modules
            </h3>
            <div className="mt-2 space-y-1">
              {courseModuleNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-[#1A1F2C] hover:bg-blue-100 hover:text-blue-600'
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <Collapsible className="mt-4 border-t pt-4">
          <CollapsibleTrigger className="w-full flex items-center justify-between text-sm font-medium text-[#1A1F2C] p-2 hover:bg-blue-100 rounded-md">
            <span>Learning Resources</span>
            <span className="text-xs">+</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-2 mt-2 space-y-1">
            <Link to="/student/library" className="flex items-center px-3 py-2 text-sm text-[#1A1F2C] hover:bg-blue-100 hover:text-blue-600 rounded-md">
              <span className="ml-8">Library</span>
            </Link>
            <Link to="/student/tutorials" className="flex items-center px-3 py-2 text-sm text-[#1A1F2C] hover:bg-blue-100 hover:text-blue-600 rounded-md">
              <span className="ml-8">Tutorials</span>
            </Link>
            <Link to="/student/downloads" className="flex items-center px-3 py-2 text-sm text-[#1A1F2C] hover:bg-blue-100 hover:text-blue-600 rounded-md">
              <span className="ml-8">Downloads</span>
            </Link>
            <Link to="/student/third-party-contents" className="flex items-center px-3 py-2 text-sm text-[#1A1F2C] hover:bg-blue-100 hover:text-blue-600 rounded-md">
              <span className="ml-8">Third party contents</span>
            </Link>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="mt-4 bg-blue-100 p-3 rounded-lg">
          <div className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-[#1A1F2C]">Need Help?</h3>
              <p
                className="text-xs text-blue-600 underline cursor-pointer"
                onClick={() => setShowContact(!showContact)}
              >
                Contact support
              </p>
            </div>
          </div>

          {showContact && (
            <div className="mt-2 text-sm text-[#1A1F2C]">
              <p><strong>Email:</strong> support@shiksak.com</p>
              <p><strong>Phone:</strong> +1 800 123 4567</p>
              <p><strong>Hours:</strong> Mon–Fri, 9am–5pm</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

const SidebarLink = ({
  to,
  icon,
  label,
  isActive,
  badge
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  badge: { count: number; variant: 'default' | 'destructive' | 'outline' } | null;
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-[#1A1F2C] hover:bg-blue-100 hover:text-blue-600'
      )}
    >
      <div className="flex items-center">
        {icon}
        {label}
      </div>
      {badge && (
        <Badge variant={badge.variant} className={cn(
          isActive ? 'bg-white text-blue-600' : '',
          badge.variant === 'destructive' ? 'animate-pulse' : ''
        )}>
          {badge.count}
        </Badge>
      )}
    </Link>
  );
};

export default Sidebar;