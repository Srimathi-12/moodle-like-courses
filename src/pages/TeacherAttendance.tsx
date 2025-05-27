import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { attendanceData, classesData, studentsData } from "@/data/mockData";
import { Calendar, Search, Filter, Clock, CheckCircle, UserX, UserCheck, CalendarRange, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function Attendance() {
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM do, yyyy");
  
  // Overall attendance rate
  const overallAttendance = attendanceData.reduce((acc, record) => {
    return acc + (record.present / record.totalStudents) * 100;
  }, 0) / attendanceData.length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classesData.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.code}>
                  {classItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>Take Attendance</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
              Overall Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(overallAttendance)}%</div>
            <Progress value={Math.round(overallAttendance)} className="h-1 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserCheck className="mr-2 h-4 w-4 text-blue-500" />
              Present Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendanceData.filter(a => a.date === "2025-04-19").reduce((acc, curr) => acc + curr.present, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {attendanceData.filter(a => a.date === "2025-04-19").reduce((acc, curr) => acc + curr.totalStudents, 0)} students
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserX className="mr-2 h-4 w-4 text-destructive" />
              Absent Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendanceData.filter(a => a.date === "2025-04-19").reduce((acc, curr) => acc + curr.absent, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {attendanceData.filter(a => a.date === "2025-04-19").reduce((acc, curr) => acc + curr.excused, 0)} excused
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-amber-500" />
              Late Arrivals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendanceData.filter(a => a.date === "2025-04-19").reduce((acc, curr) => acc + curr.late, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all classes
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:space-x-4">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="this-week">This Week</TabsTrigger>
            <TabsTrigger value="this-month">This Month</TabsTrigger>
            <TabsTrigger value="custom">Custom Range</TabsTrigger>
          </TabsList>

          <div className="flex w-full sm:w-auto space-x-2 mt-4 sm:mt-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records - April 19, 2025</CardTitle>
              <CardDescription>View and manage attendance records for all classes</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead className="text-center">Present</TableHead>
                    <TableHead className="text-center">Absent</TableHead>
                    <TableHead className="text-center">Late</TableHead>
                    <TableHead className="text-center">Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.filter(a => a.date === "2025-04-19").map((record) => {
                    const classInfo = classesData.find(c => c.code === record.class);
                    const attendanceRate = Math.round((record.present / record.totalStudents) * 100);
                    
                    return (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.class}</TableCell>
                        <TableCell>{classInfo?.schedule}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">
                            {record.present}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
                            {record.absent}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">
                            {record.late}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center space-x-2">
                            <Progress value={attendanceRate} className="w-[60px]" />
                            <span className="text-sm">{attendanceRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Student Attendance - MATH401</CardTitle>
              <CardDescription>Advanced Calculus class attendance for April 19, 2025</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Overall Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsData.filter(s => s.class === "MATH401").map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>
                        <Badge variant={
                          student.id === "s1" || student.id === "s2" ? "outline" : 
                          "secondary"
                        } className={
                          student.id === "s1" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200" :
                          student.id === "s2" ? "bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200" :
                          ""
                        }>
                          {student.id === "s1" ? "Present" : 
                          student.id === "s2" ? "Late" : 
                          "Absent"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {student.id === "s1" ? "09:02 AM" : 
                         student.id === "s2" ? "09:15 AM" : 
                         "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={student.attendance} className="w-[60px]" />
                          <span className="text-sm">{student.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">History</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="this-week">
          <Card className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <CalendarRange className="h-16 w-16 text-muted-foreground" />
              <div className="text-center">
                <h3 className="text-lg font-medium">Week of April 14 - 20, 2025</h3>
                <p className="text-muted-foreground">
                  Select "Today" to view detailed attendance records
                </p>
                <Button className="mt-2" variant="outline">
                  View Weekly Report <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}