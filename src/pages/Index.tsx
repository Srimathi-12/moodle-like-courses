import React from 'react';
import Layout from '@/components/Layout';
import HeaderDashboard from '@/components/HeaderDashboard';
import CourseCard from '@/components/CourseCard';
import ProgressSection from '@/components/ProgressSection';
import LectureItem from '@/components/LectureItem';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react'; // Allowed icon
import { toast } from "@/hooks/use-toast";

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const courses = [
  { title: 'Cinema 4D', description: 'Elements design for web sites and mobile apps', progressValue: 8, progressMax: 12, gradientClass: 'from-purple-50 via-pink-50 to-rose-50' },
  { title: 'UI/UX Design', description: 'From concept to prototype', progressValue: 4, progressMax: 15, gradientClass: 'from-blue-50 via-indigo-50 to-purple-50' },
  { title: 'Graphic design', description: 'Digital computer graphics', progressValue: 1, progressMax: 10, gradientClass: 'from-sky-50 via-cyan-50 to-teal-50' },
].map(course => ({ ...course, slug: generateSlug(course.title) }));

const popularLections = [
  { title: 'Human centered design', duration: '1h 30 min', imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg', imageFallback: 'HC' },
  { title: 'E-learning & digital cultures', duration: '45 min', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg', imageFallback: 'ED' },
  { title: 'SQL: nothing superfluous', duration: '1h 15 min', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', imageFallback: 'SN' },
];

const Index = () => {
  return (
    <Layout>
      <HeaderDashboard />

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">My courses</h2>
          <Button 
            variant="link" 
            className="text-academic-blue hover:text-opacity-80"
            onClick={() => toast({ title: "View All Courses", description: "This would display all your courses."})}
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} slug={course.slug} />
          ))}
           {/* Add Course Card */}
           <button 
            onClick={() => toast({ title: "Add Course Clicked", description: "Functionality to add a new course can be implemented here." })}
            className="p-6 rounded-xl border-2 border-dashed border-academic-gray flex flex-col items-center justify-center text-academic-dark-gray hover:border-academic-blue hover:text-academic-blue transition-colors cursor-pointer min-h-[200px] bg-academic-soft-bg/50 w-full focus:outline-none focus:ring-2 focus:ring-academic-blue focus:ring-opacity-50"
          >
            <Plus className="h-10 w-10 mb-2" />
            <span className="font-medium">Add Course</span>
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressSection />
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Popular lections</h2>
            <Button 
              variant="link" 
              className="text-academic-blue hover:text-opacity-80"
              onClick={() => toast({ title: "View All Lections", description: "This would display all popular lections."})}
            >
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {popularLections.map((lection, index) => (
              <LectureItem key={index} {...lection} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
