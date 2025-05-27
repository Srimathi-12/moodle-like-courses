
import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Filter, 
  SortAsc,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for assignments
const assignmentsData = [
  {
    id: 1,
    title: "Introduction to Computer Science: Term Paper",
    course: "Introduction to Computer Science",
    dueDate: "April 20, 2025",
    status: "pending",
    description: "Write a 2000-word research paper on the impact of artificial intelligence in modern computing."
  },
  {
    id: 2,
    title: "Advanced Mathematics: Problem Set 3",
    course: "Advanced Mathematics",
    dueDate: "April 18, 2025",
    status: "overdue",
    description: "Complete problems 15-30 in Chapter 4 of the textbook covering advanced calculus concepts."
  },
  {
    id: 3,
    title: "Biology Lab Report: Cell Division",
    course: "Introduction to Biology",
    dueDate: "April 25, 2025",
    status: "pending",
    description: "Document and analyze the results from our recent lab experiment on cell mitosis."
  },
  {
    id: 4,
    title: "History Essay: Industrial Revolution",
    course: "World History: Modern Era",
    dueDate: "May 1, 2025",
    status: "pending",
    description: "Write a detailed 1500-word essay analyzing the social impacts of the Industrial Revolution."
  },
  {
    id: 5,
    title: "Advanced Mathematics: Mid-term Exam",
    course: "Advanced Mathematics",
    dueDate: "April 15, 2025",
    status: "completed",
    description: "Complete the online mid-term examination covering all material from weeks 1-6."
  },
  {
    id: 6,
    title: "Computer Science Project: Algorithm Implementation",
    course: "Introduction to Computer Science",
    dueDate: "April 10, 2025",
    status: "completed",
    description: "Implement and analyze the efficiency of three sorting algorithms discussed in class."
  }
];

const Assignments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter assignments based on search term and filter status
  const filteredAssignments = assignmentsData.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || assignment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Assignments</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search assignments..."
              className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lms-secondary"
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

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all" onClick={() => setFilterStatus('all')}>All</TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setFilterStatus('pending')}>Pending</TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setFilterStatus('completed')}>Completed</TabsTrigger>
          <TabsTrigger value="overdue" onClick={() => setFilterStatus('overdue')}>Overdue</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg mb-1">
                  {assignment.title}
                </CardTitle>
                <p className="text-sm text-gray-500">{assignment.course}</p>
              </div>
              <StatusBadge status={assignment.status} />
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{assignment.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" /> Due: {assignment.dueDate}
                </div>
                <Button variant="outline" className="text-sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-10">
          <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No assignments found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search or filters' : 'You have no assignments at the moment'}
          </p>
        </div>
      )}
    </div>
  );
};

// Helper component for status badges
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Completed
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
    case 'overdue':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Overdue
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

export default Assignments;
