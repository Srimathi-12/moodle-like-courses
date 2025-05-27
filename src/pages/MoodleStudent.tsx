
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { studentApi, MoodleCourse, MoodleAssignment } from '@/services/moodleApi';
import { useMoodleAuth } from '@/hooks/useMoodleAuth';
import { toast } from 'sonner';
import { BookOpen, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const MoodleStudent = () => {
  const { currentUser } = useMoodleAuth();
  const [courses, setCourses] = useState<MoodleCourse[]>([]);
  const [assignments, setAssignments] = useState<MoodleAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    if (currentUser) {
      if (activeTab === 'courses') {
        fetchCourses();
      } else if (activeTab === 'assignments') {
        fetchAssignments();
      }
    }
  }, [currentUser, activeTab]);

  const fetchCourses = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      const fetchedCourses = await studentApi.getCourses(currentUser.id);
      setCourses(fetchedCourses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssignments = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      const fetchedAssignments = await studentApi.getAssignments(currentUser.id);
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
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Student Dashboard</h1>
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
            <p className="text-xs text-gray-500">Student</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="courses" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            My Courses
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Assignments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          {isLoading ? (
            <div className="py-8 text-center">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={course.imageUrl || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop'}
                      alt={course.fullname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{course.fullname}</CardTitle>
                    <p className="text-sm text-gray-500">
                      Start: {formatDate(course.startdate)}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{Math.round(course.progress || 0)}%</span>
                      </div>
                      <Progress value={Math.round(course.progress || 0)} className="h-2" />
                    </div>
                    <Button className="w-full">Continue Learning</Button>
                  </CardContent>
                </Card>
              ))}

              {courses.length === 0 && (
                <div className="col-span-full py-8 text-center text-gray-500">
                  You are not enrolled in any courses
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assignments">
          {isLoading ? (
            <div className="py-8 text-center">Loading assignments...</div>
          ) : (
            <div className="space-y-4">
              {assignments.map(assignment => (
                <Card key={assignment.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-2 md:mb-0">
                        <h3 className="font-medium">{assignment.name}</h3>
                        <p className="text-sm text-gray-500">{assignment.course}</p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          Due: {formatDate(assignment.duedate)}
                        </div>

                        {assignment.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        )}

                        {assignment.status === 'pending' && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </Badge>
                        )}

                        {assignment.status === 'overdue' && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="my-2 text-sm">
                      {assignment.intro.replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>

                    <div className="mt-2 flex justify-end">
                      <Button variant="outline" size="sm">
                        {assignment.status === 'completed' ? 'View Submission' : 'Submit Assignment'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {assignments.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  You don't have any assignments
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodleStudent;
