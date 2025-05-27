
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Download, 
  FileText, 
  Film, 
  MessageSquare, 
  Users, 
  User,
  CheckCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CourseProps } from '@/components/CourseCard';

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

// Course modules mock data
const modules = [
  {
    id: 1,
    title: "Getting Started",
    items: [
      { id: 1, title: "Course Introduction", type: "video", duration: "10:25", completed: true },
      { id: 2, title: "Course Materials Overview", type: "document", duration: "5 pages", completed: true },
      { id: 3, title: "Setting Up Your Environment", type: "video", duration: "15:10", completed: true }
    ]
  },
  {
    id: 2,
    title: "Basic Concepts",
    items: [
      { id: 4, title: "Introduction to Programming", type: "video", duration: "20:15", completed: true },
      { id: 5, title: "Variables and Data Types", type: "video", duration: "18:30", completed: false },
      { id: 6, title: "Basic Operators", type: "document", duration: "8 pages", completed: false },
      { id: 7, title: "Week 1 Quiz", type: "quiz", duration: "10 questions", completed: false }
    ]
  },
  {
    id: 3,
    title: "Control Structures",
    items: [
      { id: 8, title: "Conditional Statements", type: "video", duration: "22:45", completed: false },
      { id: 9, title: "Loops and Iterations", type: "video", duration: "25:10", completed: false },
      { id: 10, title: "Practice Exercises", type: "assignment", duration: "3 tasks", completed: false }
    ]
  }
];

// Announcements mock data
const announcements = [
  {
    id: 1,
    title: "Welcome to the Course!",
    content: "Hello everyone! Welcome to Introduction to Computer Science. I'm excited to have you all in this course. Please take some time to review the syllabus and course materials.",
    date: "Feb 10, 2023",
    author: "Dr. Jane Smith"
  },
  {
    id: 2,
    title: "Week 1 Quiz Deadline Extended",
    content: "Due to technical difficulties, I've extended the deadline for Week 1 Quiz until February 15th. Please make sure to complete it by then.",
    date: "Feb 12, 2023",
    author: "Dr. Jane Smith"
  }
];

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || "1");
  const course = courses.find(c => c.id === courseId) || courses[0];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Course Header */}
        <div className="md:w-2/3">
          <div className="h-64 rounded-lg overflow-hidden mb-4">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center mb-2">
            <Badge className="mr-2 bg-lms-accent">{course.category}</Badge>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> Started: {course.startDate}
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-500 flex items-center">
              <Clock className="h-4 w-4 mr-1" /> Duration: {course.duration}
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 mr-2 text-lms-secondary" />
            <span className="font-medium">{course.instructor}</span>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </div>
        
        {/* Course Info Card */}
        <div className="md:w-1/3">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Course Information</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <BookOpen className="h-5 w-5 mr-3 text-lms-secondary" />
                  <div>
                    <p className="text-sm font-medium">Total Modules</p>
                    <p className="text-sm text-gray-500">{modules.length} modules</p>
                  </div>
                </div>
                
                <div className="flex">
                  <FileText className="h-5 w-5 mr-3 text-lms-secondary" />
                  <div>
                    <p className="text-sm font-medium">Total Lessons</p>
                    <p className="text-sm text-gray-500">
                      {modules.reduce((total, module) => total + module.items.length, 0)} lessons
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Users className="h-5 w-5 mr-3 text-lms-secondary" />
                  <div>
                    <p className="text-sm font-medium">Students Enrolled</p>
                    <p className="text-sm text-gray-500">245 students</p>
                  </div>
                </div>
                
                <div className="flex">
                  <MessageSquare className="h-5 w-5 mr-3 text-lms-secondary" />
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-sm text-gray-500">English</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Calendar className="h-5 w-5 mr-3 text-lms-secondary" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-gray-500">February 12, 2023</p>
                  </div>
                </div>
                
                <Separator />
                
                <Button className="w-full bg-lms-primary hover:bg-lms-secondary">Continue Learning</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Course Tabs */}
      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="curriculum">
          <div className="space-y-6">
            {modules.map((module, index) => (
              <div key={module.id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Module {index + 1}: {module.title}</h3>
                    <p className="text-sm text-gray-500">{module.items.length} lessons</p>
                  </div>
                  <span className="text-sm">
                    {module.items.filter(item => item.completed).length}/{module.items.length} completed
                  </span>
                </div>
                
                <div className="divide-y">
                  {module.items.map(item => (
                    <div key={item.id} className="p-4 flex items-center">
                      <div className="mr-4">
                        {item.type === 'video' && <Film className="h-8 w-8 p-1.5 bg-red-100 text-red-600 rounded-full" />}
                        {item.type === 'document' && <FileText className="h-8 w-8 p-1.5 bg-blue-100 text-blue-600 rounded-full" />}
                        {item.type === 'quiz' && <FileText className="h-8 w-8 p-1.5 bg-amber-100 text-amber-600 rounded-full" />}
                        {item.type === 'assignment' && <FileText className="h-8 w-8 p-1.5 bg-green-100 text-green-600 rounded-full" />}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <h4 className="font-medium">{item.title}</h4>
                          {item.completed && (
                            <CheckCircle className="ml-2 h-4 w-4 text-lms-accent" />
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="capitalize">{item.type}</span>
                          <span className="mx-2">•</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        {item.completed ? 'Review' : 'Start'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="announcements">
          <div className="space-y-6">
            {announcements.map(announcement => (
              <Card key={announcement.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <span className="text-sm text-gray-500">{announcement.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{announcement.content}</p>
                  <div className="text-sm text-gray-500">Posted by: {announcement.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="discussions">
          <div className="text-center py-12">
            <p className="text-gray-500">No discussions have been started for this course yet.</p>
            <Button className="mt-4">Start a Discussion</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetail;
