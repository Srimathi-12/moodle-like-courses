
import React, { useState } from 'react';
import { Bell, BookOpen, Calendar, Clock, Film, FileText, Search, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard, { CourseProps } from '@/components/CourseCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Temporary mock data
const courses: CourseProps[] = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Jane Smith",
    category: "Computer Science",
    progress: 65,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    startDate: "Feb 10, 2023",
    duration: "8 weeks"
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    instructor: "Prof. Robert Johnson",
    category: "Mathematics",
    progress: 32,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
    startDate: "Jan 15, 2023",
    duration: "12 weeks"
  },
  {
    id: 3,
    title: "Introduction to Biology",
    instructor: "Dr. Maria Garcia",
    category: "Biology",
    progress: 78,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop",
    startDate: "Mar 1, 2023",
    duration: "10 weeks"
  },
  {
    id: 4,
    title: "World History: Modern Era",
    instructor: "Prof. James Wilson",
    category: "History",
    progress: 14,
    image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=1000&auto=format&fit=crop",
    startDate: "Apr 5, 2023",
    duration: "8 weeks"
  }
];

const upcomingEvents = [
  { id: 1, title: "Assignment Due: Computer Science Project", date: "Today, 11:59 PM", type: "assignment" },
  { id: 2, title: "Math Quiz: Calculus Fundamentals", date: "Tomorrow, 2:00 PM", type: "quiz" },
  { id: 3, title: "Live Session: Biology Lab Introduction", date: "Feb 20, 10:00 AM", type: "session" },
  { id: 4, title: "Discussion: Historical Analysis Methods", date: "Feb 22, 1:00 PM", type: "discussion" }
];

const announcements = [
  { id: 1, title: "Campus Closed for Holiday", date: "Apr 15, 2025", course: "All Courses" },
  { id: 2, title: "Computer Science Lab Session Rescheduled", date: "Apr 18, 2025", course: "Introduction to Computer Science" }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, John!</h1>
          <p className="text-gray-500">Here's what's happening with your courses today</p>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search courses, assignments..." 
            className="pl-9 w-full sm:w-[300px]" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Courses Enrolled" 
          value="12" 
          icon={<BookOpen className="h-8 w-8 text-[#9b87f5]" />} 
          change={{type: "increase", value: "2 new this month"}}
          link="/courses"
        />
        <StatsCard 
          title="Assignments Due" 
          value="5" 
          icon={<FileText className="h-8 w-8 text-amber-500" />} 
          change={{type: "urgent", value: "2 due today"}}
          link="/assignments"
        />
        <StatsCard 
          title="Upcoming Tests" 
          value="2" 
          icon={<Calendar className="h-8 w-8 text-rose-500" />} 
          change={{type: "normal", value: "Next: Apr 20"}}
          link="/calendar"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="courses" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="progress">My Progress</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Browse Courses
                </Button>
              </div>
            </div>
            
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="progress">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Overall Progress</h3>
                  
                  <div className="space-y-6">
                    {courses.map(course => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{course.title}</span>
                          <span className="text-sm text-gray-500">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#9b87f5] h-2 rounded-full transition-all duration-300 ease-in-out" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>Your schedule for the coming days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="mr-3">
                      {event.type === 'assignment' && <FileText className="h-10 w-10 p-2 bg-blue-100 text-[#9b87f5] rounded-full" />}
                      {event.type === 'quiz' && <FileText className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-full" />}
                      {event.type === 'session' && <Film className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-full" />}
                      {event.type === 'discussion' && <Bell className="h-10 w-10 p-2 bg-purple-100 text-purple-600 rounded-full" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{event.title}</h3>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" /> {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/calendar">View Calendar</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Announcements</span>
                <Badge variant="outline" className="bg-[#E5DEFF] text-[#6E59A5]">
                  New
                </Badge>
              </CardTitle>
              <CardDescription>Important updates from your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map(announcement => (
                  <div key={announcement.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">{announcement.title}</h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="text-gray-500">{announcement.date}</span>
                      <span className="text-[#6E59A5]">{announcement.course}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  change,
  link
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  change: {type: "increase" | "decrease" | "urgent" | "normal", value: string};
  link: string;
}) => {
  return (
    <Card className="hover:border-[#9b87f5]/50 transition-colors group">
      <Link to={link} className="block">
        <CardContent className="flex items-center p-6">
          <div className="mr-4 p-2 rounded-full bg-gray-100 group-hover:bg-[#E5DEFF] transition-colors">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className={`text-xs mt-1 ${
              change.type === "increase" ? "text-green-600" : 
              change.type === "decrease" ? "text-red-600" : 
              change.type === "urgent" ? "text-red-600 font-medium" : 
              "text-gray-500"
            }`}>
              {change.value}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default Dashboard;
