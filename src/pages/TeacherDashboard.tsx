import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, BookOpen, Calendar, Clock, FileText, 
  MapPin, Presentation, BarChart, TrendingUp, Users, CheckCircle 
} from "lucide-react";
import { analyticsData, classesData } from "@/data/mockData";
import { format } from "date-fns";

export default function Dashboard() {
  const today = new Date();
  const formattedDate = format(today, "EEEE, MMMM do, yyyy");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Announcements
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classesData.reduce((acc, curr) => acc + curr.totalStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {classesData.length} classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(classesData.reduce((acc, curr) => acc + curr.average, 0) / classesData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">↑ 2%</span> from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.attendanceStats.overallAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assignment Completion</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.studentPerformance.assignmentCompletion}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">↑ 5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Your Classes</CardTitle>
            <CardDescription>
              You have {classesData.length} active classes this semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classesData.slice(0, 3).map((classItem) => (
                <div key={classItem.id} className="flex items-center p-4 rounded-lg border">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{classItem.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{classItem.code}</span>
                      <span className="mx-2">•</span>
                      <span>{classItem.grade}</span>
                      <span className="mx-2">•</span>
                      <span>{classItem.totalStudents} students</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{classItem.progress}%</span>
                      </div>
                      <Progress value={classItem.progress} className="h-1" />
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-4">View</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">View All Classes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Your schedule for the next few days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.upcomingEvents.slice(0, 4).map((event, index) => (
                <div key={index} className="flex items-start pb-4 last:pb-0 last:border-0 border-b">
                  <div className="mr-3">
                    {event.type === 'class' && <BookOpen className="h-5 w-5 text-blue-500" />}
                    {event.type === 'meeting' && <Users className="h-5 w-5 text-purple-500" />}
                    {event.type === 'assignment' && <FileText className="h-5 w-5 text-orange-500" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">View Full Calendar</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest actions and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start pb-4 last:pb-0 last:border-0 border-b">
                  <div className="mr-3">
                    {activity.type === 'Assignment' && <FileText className="h-5 w-5 text-orange-500" />}
                    {activity.type === 'Grading' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {activity.type === 'Resource' && <BookOpen className="h-5 w-5 text-blue-500" />}
                    {activity.type === 'Attendance' && <Users className="h-5 w-5 text-purple-500" />}
                    {activity.type === 'Feedback' && <Presentation className="h-5 w-5 text-amber-500" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">{activity.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{activity.time}</span>
                      {activity.class && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{activity.class}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              Student performance across your classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Average Grades by Class</h4>
                <div className="space-y-2">
                  {analyticsData.studentPerformance.averageGrades.map((item) => (
                    <div key={item.class} className="flex items-center">
                      <div className="w-24 flex-shrink-0 text-sm">{item.class}</div>
                      <div className="flex-1 ml-2">
                        <Progress value={item.grade} className="h-2" />
                      </div>
                      <div className="ml-2 text-sm font-medium">{item.grade}%</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Students at Risk</h4>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                    {analyticsData.studentPerformance.studentsAtRisk} students
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Detailed Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
