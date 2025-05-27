
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CourseCard, { CourseProps } from '@/components/CourseCard';
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

// Temporary mock data - more courses for the catalog
const allCourses: CourseProps[] = [
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
  },
  {
    id: 5,
    title: "Introduction to Psychology",
    instructor: "Dr. Emily Chen",
    category: "Psychology",
    progress: 0,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
    startDate: "May 1, 2023",
    duration: "10 weeks"
  },
  {
    id: 6,
    title: "English Literature: Shakespeare",
    instructor: "Prof. Sarah Thompson",
    category: "Literature",
    progress: 0,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000&auto=format&fit=crop",
    startDate: "Jun 15, 2023",
    duration: "6 weeks"
  },
  {
    id: 7,
    title: "Introduction to Economics",
    instructor: "Dr. Michael Brown",
    category: "Economics",
    progress: 0,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
    startDate: "Jul 1, 2023",
    duration: "8 weeks"
  },
  {
    id: 8,
    title: "Physics: Mechanics and Waves",
    instructor: "Prof. David Lee",
    category: "Physics",
    progress: 0,
    image: "https://images.unsplash.com/photo-1636466497217-06fe2bc6e6d5?q=80&w=1000&auto=format&fit=crop",
    startDate: "Aug 10, 2023",
    duration: "12 weeks"
  }
];

const myCourses = allCourses.filter(course => course.progress > 0);
const availableCourses = allCourses.filter(course => course.progress === 0);

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredMyCourses = myCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const filteredAvailableCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['all', ...new Set(allCourses.map(course => course.category))];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Courses</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="enrolled">My Courses ({filteredMyCourses.length})</TabsTrigger>
          <TabsTrigger value="available">Available Courses ({filteredAvailableCourses.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled">
          {filteredMyCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMyCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No courses found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available">
          {filteredAvailableCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAvailableCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No courses found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
