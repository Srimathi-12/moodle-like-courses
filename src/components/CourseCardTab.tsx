import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export interface CourseProps {
  id: string | number;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  image: string;
  startDate: string;
  duration: string;
}

interface CourseCardTabProps {
  course: CourseProps;
}

const CourseCardTab: React.FC<CourseCardTabProps> = ({ course }) => {
  return (
    <Card className="overflow-hidden hover:border-[#9b87f5]/50 transition-all duration-300 h-full flex flex-col w-full max-w-[300px]">
      <div className="h-32 overflow-hidden relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <Badge className="bg-[#9b87f5] hover:bg-[#8a74e8]">{course.category}</Badge>
        </div>
      </div>

      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold mb-1 line-clamp-2 text-sm">{course.title}</h3>
        <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>

        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>{course.startDate}</span>
          <span>{course.duration}</span>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium">{course.progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-[#9b87f5] h-1.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/courses/${course.id}`}>
            Continue Learning
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCardTab;