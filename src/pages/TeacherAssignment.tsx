import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { assignmentsData, classesData } from "@/data/mockData";
import { Search, Filter, Plus, Clock, FileText, CheckCircle2, MoreHorizontal, Calendar, Eye } from "lucide-react";
import { format } from "date-fns";

export default function Assignments() {
  // Get counts for each assignment status
  const activeCount = assignmentsData.filter(a => a.status === "Active").length;
  const upcomingCount = assignmentsData.filter(a => a.status === "Upcoming").length;
  const gradedCount = assignmentsData.filter(a => a.status === "Graded").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">Create, manage, and grade assignments</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4 text-primary" />
              Active Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCount}</div>
            <p className="text-xs text-muted-foreground">
              {assignmentsData.filter(a => a.status === "Active").reduce((acc, curr) => acc + curr.submissions, 0)} submissions received
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-amber-500" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCount}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled for release
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              Graded Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradedCount}</div>
            <p className="text-xs text-muted-foreground">
              Average score: {assignmentsData.find(a => a.status === "Graded")?.avgScore || 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:space-x-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>

          <div className="flex w-full sm:w-auto space-x-2 mt-4 sm:mt-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assignments..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignmentsData.map((assignment) => {
                  const classInfo = classesData.find(c => c.code === assignment.class);
                  const submissionRate = Math.round((assignment.submissions / assignment.totalStudents) * 100);
                  
                  return (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.class}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {format(new Date(assignment.dueDate), "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          assignment.type === "Exam" ? "destructive" :
                          assignment.type === "Project" ? "default" :
                          "secondary"
                        }>
                          {assignment.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          assignment.status === "Active" ? "outline" :
                          assignment.status === "Graded" ? "default" :
                          "secondary"
                        } className={assignment.status === "Graded" ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" : ""}>
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={submissionRate} className="w-[60px]" />
                          <span className="text-sm whitespace-nowrap">{assignment.submissions}/{assignment.totalStudents}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center space-x-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Grade</DropdownMenuItem>
                              <DropdownMenuItem>Extend deadline</DropdownMenuItem>
                              <DropdownMenuItem>Clone</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}