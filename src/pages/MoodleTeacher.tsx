
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { teacherApi, MoodleCourse, MoodleAssignment } from '@/services/moodleApi';
import { useMoodleAuth } from '@/hooks/useMoodleAuth';
import { toast } from 'sonner';
import { BookOpen, FileText, User, Calendar, Plus } from 'lucide-react';

const MoodleTeacher = () => {
  const { currentUser } = useMoodleAuth();
  const [courses, setCourses] = useState<MoodleCourse[]>([]);
  const [assignments, setAssignments] = useState<MoodleAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  
  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);
  
  useEffect(() => {
    if (selectedCourseId) {
      fetchAssignments(selectedCourseId);
    }
  }, [selectedCourseId]);
  
  const fetchCourses = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      const fetchedCourses = await teacherApi.getCourses(currentUser.id);
      setCourses(fetchedCourses);
      
      if (fetchedCourses.length > 0 && !selectedCourseId) {
        setSelectedCourseId(fetchedCourses[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchAssignments = async (courseId: number) => {
    setIsLoading(true);
    try {
      const fetchedAssignments = await teacherApi.getAssignments(courseId);
      setAssignments(fetchedAssignments);
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
      toast.error('Failed to load assignments');
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };
  
  if (!currentUser) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Teacher Dashboard</h1>
        <div className="flex items-center">
          <div className="mr-3">
            <img 
              src={currentUser.profileimageurl || 'https://i.pravatar.cc/32'} 
              alt={`${currentUser.firstname} ${currentUser.lastname}`}
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div>
            <p className="font-medium text-sm">
              {currentUser.firstname} {currentUser.lastname}
            </p>
            <p className="text-xs text-gray-500">Teacher</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                My Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && courses.length === 0 ? (
                <div className="py-4 text-center">Loading courses...</div>
              ) : (
                <div className="space-y-2">
                  {courses.map(course => (
                    <Button
                      key={course.id}
                      variant={selectedCourseId === course.id ? "default" : "outline"}
                      className="w-full justify-start text-left"
                      onClick={() => setSelectedCourseId(course.id)}
                    >
                      {course.fullname}
                    </Button>
                  ))}
                  
                  {courses.length === 0 && (
                    <div className="py-4 text-center text-gray-500">
                      No courses found
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Course Content
                </div>
                {selectedCourseId && (
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Assignment
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedCourseId ? (
                <div className="py-6 text-center text-gray-500">
                  Select a course to view its content
                </div>
              ) : isLoading ? (
                <div className="py-6 text-center">Loading assignments...</div>
              ) : (
                <div className="space-y-4">
                  {assignments.length > 0 ? (
                    assignments.map(assignment => (
                      <div key={assignment.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{assignment.name}</h3>
                            <p className="text-sm text-gray-500">Due: {formatDate(assignment.duedate)}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Submissions
                          </Button>
                        </div>
                        <p className="mt-2 text-sm">
                          {assignment.intro.replace(/<\/?[^>]+(>|$)/g, "")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-gray-500">
                      No assignments found for this course
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MoodleTeacher;
