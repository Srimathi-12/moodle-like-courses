import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronDown,
  Filter, 
  Search,
  SortAsc
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for courses with grades
const courseGradesData = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Jane Smith",
    currentGrade: "A",
    percentage: 92,
    status: "Excellent",
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    instructor: "Prof. Robert Johnson",
    currentGrade: "B+",
    percentage: 87,
    status: "Good",
  },
  {
    id: 3,
    title: "Introduction to Biology",
    instructor: "Dr. Maria Garcia",
    currentGrade: "A-",
    percentage: 90,
    status: "Excellent",
  },
  {
    id: 4,
    title: "World History: Modern Era",
    instructor: "Prof. James Wilson",
    currentGrade: "C",
    percentage: 75,
    status: "Satisfactory",
  }
];

// Mock data for detailed course grades
const detailedGradeItems = [
  {
    id: 1,
    courseId: 1,
    title: "Week 1 Quiz",
    type: "Quiz",
    dueDate: "Feb 15, 2023",
    maxPoints: 10,
    earnedPoints: 9,
    percentage: 90,
    weight: "10%",
    status: "Graded"
  },
  {
    id: 2,
    courseId: 1,
    title: "Programming Assignment 1",
    type: "Assignment",
    dueDate: "Feb 22, 2023",
    maxPoints: 50,
    earnedPoints: 47,
    percentage: 94,
    weight: "15%",
    status: "Graded"
  },
  {
    id: 3,
    courseId: 1,
    title: "Midterm Examination",
    type: "Exam",
    dueDate: "Mar 15, 2023",
    maxPoints: 100,
    earnedPoints: 91,
    percentage: 91,
    weight: "30%",
    status: "Graded"
  },
  {
    id: 4,
    courseId: 1,
    title: "Programming Assignment 2",
    type: "Assignment",
    dueDate: "Apr 5, 2023",
    maxPoints: 50,
    earnedPoints: 48,
    percentage: 96,
    weight: "15%",
    status: "Graded"
  },
  {
    id: 5,
    courseId: 1,
    title: "Final Project",
    type: "Project",
    dueDate: "May 1, 2023",
    maxPoints: 100,
    earnedPoints: 0,
    percentage: 0,
    weight: "30%",
    status: "Not Submitted"
  }
];

const getGradeColor = (grade: string) => {
  const firstChar = grade.charAt(0);
  
  if (firstChar === 'A') return 'bg-green-100 text-green-800';
  if (firstChar === 'B') return 'bg-blue-100 text-blue-800';
  if (firstChar === 'C') return 'bg-yellow-100 text-yellow-800';
  if (firstChar === 'D') return 'bg-orange-100 text-orange-800';
  if (firstChar === 'F') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};

const getStatusColor = (status: string) => {
  if (status === 'Excellent') return 'bg-green-100 text-green-800';
  if (status === 'Good') return 'bg-blue-100 text-blue-800';
  if (status === 'Satisfactory') return 'bg-yellow-100 text-yellow-800';
  if (status === 'Needs Improvement') return 'bg-orange-100 text-orange-800';
  if (status === 'Failing') return 'bg-red-100 text-red-800';
  if (status === 'Not Submitted') return 'bg-gray-100 text-gray-800';
  if (status === 'Graded') return 'bg-purple-100 text-purple-800';
  return 'bg-gray-100 text-gray-800';
};

const Grades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filter courses based on search term
  const filteredCourses = courseGradesData.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get detailed grades for selected course
  const courseDetails = selectedCourse 
    ? detailedGradeItems.filter(item => item.courseId === selectedCourse)
    : [];
  
  const selectedCourseInfo = selectedCourse 
    ? courseGradesData.find(course => course.id === selectedCourse)
    : null;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 text-[#1A1F2C]">Grades</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b87f5]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <SortAsc className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="overview">Course Overview</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedCourse}>Course Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card 
                key={course.id} 
                className={`overflow-hidden cursor-pointer hover:border-[#9b87f5] transition-colors ${
                  selectedCourse === course.id ? 'border-[#9b87f5] ring-2 ring-[#9b87f5]/20' : ''
                }`}
                onClick={() => {
                  setSelectedCourse(course.id);
                  setActiveTab('details');
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-[#9b87f5]" />
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </div>
                    <Badge className={`${getGradeColor(course.currentGrade)}`}>
                      {course.currentGrade}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Current Grade</span>
                      <span className="text-sm font-medium">{course.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#9b87f5] h-2 rounded-full" 
                        style={{ width: `${course.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge className={`${getStatusColor(course.status)}`}>
                      {course.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="text-[#9b87f5] border-[#9b87f5]">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-10">
              <Award className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No courses found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search or filters' : 'You are not enrolled in any courses at the moment'}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="details" className="mt-0">
          {selectedCourseInfo && (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Button 
                      variant="ghost" 
                      className="mb-2 flex items-center text-[#9b87f5] hover:text-[#7E69AB] hover:bg-[#E5DEFF] p-0"
                      onClick={() => {
                        setSelectedCourse(null);
                        setActiveTab('overview');
                      }}
                    >
                      <ChevronDown className="h-4 w-4 mr-1 rotate-90" />
                      <span>Back to Overview</span>
                    </Button>
                    <h2 className="text-xl font-bold mb-1">{selectedCourseInfo.title}</h2>
                    <p className="text-sm text-gray-500">{selectedCourseInfo.instructor}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-3xl font-bold text-[#9b87f5]">{selectedCourseInfo.currentGrade}</h3>
                    <p className="text-sm text-gray-500">{selectedCourseInfo.percentage}%</p>
                  </div>
                </div>
              </div>

              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle>Grade Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#F1F0FB] p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Current Grade</div>
                      <div className="text-2xl font-bold">{selectedCourseInfo.currentGrade} ({selectedCourseInfo.percentage}%)</div>
                    </div>
                    <div className="bg-[#F1F0FB] p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="text-2xl font-bold">{selectedCourseInfo.status}</div>
                    </div>
                    <div className="bg-[#F1F0FB] p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Completed Items</div>
                      <div className="text-2xl font-bold">
                        {courseDetails.filter(item => item.status === 'Graded').length}/{courseDetails.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Grade Details</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="quiz">Quizzes</SelectItem>
                    <SelectItem value="assignment">Assignments</SelectItem>
                    <SelectItem value="exam">Exams</SelectItem>
                    <SelectItem value="project">Projects</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right">Weight</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseDetails.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.dueDate}</TableCell>
                        <TableCell>
                          {item.status === 'Graded' 
                            ? `${item.earnedPoints}/${item.maxPoints} (${item.percentage}%)` 
                            : '-'}
                        </TableCell>
                        <TableCell className="text-right">{item.weight}</TableCell>
                        <TableCell className="text-right">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status === 'Graded' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Grades;
