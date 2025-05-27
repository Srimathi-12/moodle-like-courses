import React, { useState, useEffect } from 'react';
import {
  Bell, BookOpen, Calendar, Clock, Film, FileText, Search, Filter, Plus,
  MoreHorizontal
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import {
  PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AssignmentGraph from "../components/AssignmentGraph";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [browseSearchQuery, setBrowseSearchQuery] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [browseCourses, setBrowseCourses] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showBrowseDialog, setShowBrowseDialog] = useState(false);
  const [pendingAssignments, setPendingAssignments] = useState(0);
  const [assignmentEvents, setAssignmentEvents] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState('titleAsc');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [progressFilter, setProgressFilter] = useState('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [totalAvailableCourses, setTotalAvailableCourses] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const ATTENDANCE_COLORS = ['#0D9488', '#DC2626', '#FACC15', '#6D28D9'];

  const gradesData = [
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
  ].sort((a, b) => b.percentage - a.percentage);

  const generateRandomAttendanceData = () => {
    let present = Math.floor(Math.random() * 60) + 30;
    let absent = Math.floor(Math.random() * 15) + 5;
    let late = Math.floor(Math.random() * 10) + 2;
    let excused = 100 - (present + absent + late);

    if (excused < 0) {
      const remainder = Math.abs(excused);
      excused = 0;
      const categories = [
        { name: "present", value: present },
        { name: "absent", value: absent },
        { name: "late", value: late }
      ];
      let distributed = 0;
      for (let i = 0; i < remainder; i++) {
        categories[i % categories.length].value--;
        distributed++;
        if (distributed === remainder) break;
      }
      present = categories[0].value;
      absent = categories[1].value;
      late = categories[2].value;
    }

    const currentSum = present + absent + late + excused;
    if (currentSum !== 100) {
      const diff = 100 - currentSum;
      const largestIndex = [present, absent, late, excused].indexOf(Math.max(present, absent, late, excused));
      switch (largestIndex) {
        case 0: present += diff; break;
        case 1: absent += diff; break;
        case 2: late += diff; break;
        case 3: excused += diff; break;
      }
    }

    return [
      { name: "Present", value: present },
      { name: "Absent", value: absent },
      { name: "Late", value: late },
      { name: "Excused", value: excused },
    ];
  };

  useEffect(() => {
    setAttendanceData(generateRandomAttendanceData());
    const userDataFromState = location.state?.userData;
    const userDataFromStorage = JSON.parse(sessionStorage.getItem('moodleUserData') || 'null');
    const user = userDataFromState || userDataFromStorage;

    if (user) {
      setUserData(user);
      if (Array.isArray(user.courses)) {
        const formattedCourses = user.courses.map((course: any, index: number) => ({
          id: course.id,
          title: course.fullname || course.shortname,
          instructor: course.instructor || "Not specified",
          category: course.category || "General",
          progress: Math.round(course.progress ?? Math.floor(Math.random() * 100)),
          image: course.overviewfiles?.[0]?.fileurl ||
            `https://source.unsplash.com/random/800x600/?course,${index}`,
          startDate: course.startdate ? new Date(course.startdate * 1000).toLocaleDateString() : "Not specified",
          duration: course.enddate ? `${Math.ceil((course.enddate - course.startdate) / (60 * 60 * 24 * 7))}` : "Ongoing"
        }));
        setUserCourses(formattedCourses);
        setFilteredCourses(formattedCourses);
        setBrowseCourses(formattedCourses);

        const randomAdditionalCourses = Math.floor(Math.random() * 10) + 15;
        setTotalAvailableCourses(formattedCourses.length + randomAdditionalCourses);

        const sampleEvents = formattedCourses.map((course: any, index: number) => {
          const types = ['assignment', 'quiz', 'session', 'discussion'];
          const eventType = types[Math.floor(Math.random() * types.length)];
          const offsetDays = Math.floor(Math.random() * 7);
          const eventDate = new Date();
          eventDate.setDate(eventDate.getDate() + offsetDays);

          const randomHour = Math.floor(Math.random() * 12) + 9;
          const displayHour = randomHour % 12 === 0 ? 12 : randomHour % 12;
          const period = randomHour >= 12 ? 'PM' : 'AM';
          const minuteOptions = ['00', '15', '30', '45'];
          const randomMinute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
          const timeString = `${displayHour}:${randomMinute} ${period}`;

          let isCompleted = false;
          if (eventType === 'assignment') {
            const now = new Date();
            if (eventDate < now) {
              isCompleted = Math.random() > 0.3;
            } else {
              isCompleted = false;
            }
          }

          const eventTitle: any = {
            assignment: `Assignment Due: ${course.title}`,
            quiz: `Quiz: ${course.title} Progress Check`,
            session: `Live Session: ${course.title}`,
            discussion: `Discussion: ${course.title} Forum`
          };

          return {
            id: index + 1,
            title: eventTitle[eventType],
            date: eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ',' + timeString,
            type: eventType,
            completed: isCompleted,
          };
        });

        setUpcomingEvents(sampleEvents);

        const assignEvents = sampleEvents.filter(e => e.type === 'assignment');
        const pending = assignEvents.filter(e => !e.completed).length;
        setAssignmentEvents(assignEvents);
        setPendingAssignments(pending);

        const sampleAnnouncements = formattedCourses.map((course: any, index: number) => {
          const templates = [
            "Important Update",
            "Session Rescheduled",
            "Assignment Reminder",
            "New Discussion Forum Opened"
          ];
          const announcementType = templates[Math.floor(Math.random() * templates.length)];
          const offsetDays = Math.floor(Math.random() * 5);
          const announcementDate = new Date();
          announcementDate.setDate(announcementDate.getDate() + offsetDays);

          let title = "";
          switch (announcementType) {
            case "Important Update":
              title = `Imp. Update for ${course.title}`;
              break;
            case "Session Rescheduled":
              title = `Session Rescheduled for ${course.title}`;
              break;
            case "Assignment Reminder":
              title = `Reminder: Assignment Due for ${course.title}`;
              break;
            case "New Discussion Forum Opened":
              title = `New Discussion Forum Opened for ${course.title}`;
              break;
            default:
              title = `Announcement for ${course.title}`;
              break;
          }

          return {
            id: index + 1,
            title,
            date: announcementDate.toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            }),
            course: course.title
          };
        });

        if (sampleAnnouncements.length === 0) {
          sampleAnnouncements.push({
            id: 1,
            title: "No announcements available",
            date: new Date().toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            }),
            course: "All courses"
          });
        }

        setAnnouncements(sampleAnnouncements);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    let filtered = [...userCourses];

    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }

    if (progressFilter !== 'all') {
      if (progressFilter === 'inProgress') {
        filtered = filtered.filter(course => course.progress > 0 && course.progress < 100);
      } else if (progressFilter === 'notStarted') {
        filtered = filtered.filter(course => course.progress === 0);
      } else if (progressFilter === 'completed') {
        filtered = filtered.filter(course => course.progress === 100);
      }
    }

    if (!showCompleted) {
      filtered = filtered.filter(course => course.progress < 100);
    }

    setFilteredCourses(filtered);
  }, [searchQuery, categoryFilter, progressFilter, showCompleted, userCourses]);

  useEffect(() => {
    let filtered = [...userCourses];

    if (browseSearchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(browseSearchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(browseSearchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(browseSearchQuery.toLowerCase())
      );
    }

    switch (sortOrder) {
      case 'titleAsc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'progressHigh':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'progressLow':
        filtered.sort((a, b) => a.progress - b.progress);
        break;
      case 'dateNewest':
        filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case 'dateOldest':
        filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      default:
        break;
    }

    setBrowseCourses(filtered);
  }, [browseSearchQuery, sortOrder, userCourses]);

  const uniqueCategories = ['all', ...new Set(userCourses.map(course => course.category))];

  const stats = {
    coursesEnrolled: userCourses.length,
    assignmentsDue: pendingAssignments,
    upcomingTests: upcomingEvents.filter(e => e.type === 'quiz').length
  };

  const resetFilters = () => {
    setCategoryFilter('all');
    setProgressFilter('all');
    setShowCompleted(true);
    setSearchQuery("");
    setBrowseSearchQuery("");
    setSortOrder('titleAsc');
    setShowFilterDialog(false);
  };

  const handleCourseSelect = (courseId: any) => {
    setShowBrowseDialog(false);
    navigate(`/courses/${courseId}`);
  };

  const handleSortChange = (sortType: string) => {
    setSortOrder(sortType);
  };

  const handleBrowseSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrowseSearchQuery(e.target.value);
  };

  const resetBrowseSearch = () => {
    setBrowseSearchQuery("");
  };

  const handlePieChartClick = () => {
    navigate('/courses');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-6-2 border-[#9687f5] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const pieChartData = [
    { name: "Enrolled", value: stats.coursesEnrolled },
    { name: "Available", value: Math.max(totalAvailableCourses - stats.coursesEnrolled, 0) }
  ];
  const PIECHART_COLORS = ['#0D9488', '#F97316'];

  return (
    <>
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search courses, assignments..."
          className="pl-9 w-full sm:w-[300px]"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          className="rounded-lg shadow-sm border border-gray-200 pb-4 border-b-4 border-blue-600"
          title="Courses Enrolled"
          value={stats.coursesEnrolled.toString()}
          icon={<BookOpen className="h-6 w-6 text-[#0D9488]" />}
          change={{ type: "increase", value: "Active enrollment" }}
          link="/courses"
          isCoursesCard={true}
        >
          <div
            className="w-full flex items-center justify-between mt-2 cursor-pointer transition-all duration-200 hover:scale-105"
            onClick={handlePieChartClick}
          >
            <div className="flex-shrink-0" style={{ fontSize: '12px' }}>
              <div className="flex items-center mb-1">
                <span className="inline-block w-2 h-2 rounded-full mr-1" style={{
                  backgroundColor: PIECHART_COLORS[0]
                }}></span>
                <span className="text-[#0D9488] font-medium">Enrolled</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full mr-1" style={{
                  backgroundColor: PIECHART_COLORS[1]
                }}></span>
                <span className="text-[#F97316] font-medium">Available</span>
              </div>
            </div>
            <ResponsiveContainer width="75%" height={90}>
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={42}
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell key="enrolled" fill={PIECHART_COLORS[0]} />
                  <Cell key="available" fill={PIECHART_COLORS[1]} />
                </Pie>
                <Tooltip
                  formatter={(value, name) =>
                    [`${value} course${value === 1 ? '' : 's'}`, name]
                  }
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </StatsCard>

        <StatsCard
          className="pb-4 rounded-lg shadow-sm border border-gray-200 border-b-4 border-blue-600"
          title="Assignments Due"
          value={stats.assignmentsDue.toString()}
          icon={<FileText className="h-6 w-6 text-amber-500" />}
          change={{
            type: stats.assignmentsDue > 0 ? "urgent" : "normal", value:
              stats.assignmentsDue > 0 ? "Yes" : "No"
          }}
          link="/assignments"
          isCoursesCard={false}
        >
          <AssignmentGraph
            assignments={assignmentEvents}
            pending={pendingAssignments}
            className="h-[80px]"
          />
        </StatsCard>

        <StatsCard
          className="pb-4 rounded-lg shadow-sm border border-gray-200 border-b-4 border-blue-600"
          title="Upcoming Tests"
          value={stats.upcomingTests.toString()}
          icon={<Calendar className="h-6 w-6 text-rose-500" />}
          change={{
            type: "normal", value: stats.upcomingTests > 0 ? `Next: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : "No tests scheduled"
          }}
          link="/calendar"
          isCoursesCard={false}
        >
          <></>
        </StatsCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-lg shadow-sm border border-gray-200 pb-4 border-b-4 border-blue-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif font-bold text-blue-600 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Attendance Summary
                </CardTitle>
                <CardDescription className="font-serif">Your attendance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0 text-sm space-y-1">
                    {attendanceData.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center">
                        <span className="inline-block w-2 h-8 rounded-full mr-2" style={{
                          backgroundColor: ATTENDANCE_COLORS[index]
                        }}></span>
                        <span className="font-medium text-gray-700">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                  <ResponsiveContainer width="60%" height={90}>
                    <RechartsPieChart>
                      <Pie
                        data={attendanceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={42}
                        paddingAngle={2}
                        labelLine={false}
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={ATTENDANCE_COLORS[index % ATTENDANCE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-lg shadow-sm border border-gray-200 pb-4 border-b-4 border-blue-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif font-bold text-blue-600 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Grades Scored
                </CardTitle>
                <CardDescription className="font-serif">Your current grades across courses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={gradesData}
                    margin={{
                      top: 5, right: 10, left: 0, bottom: 5,
                    }}
                  >
                    <XAxis dataKey="currentGrade" dy={10} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Bar dataKey="percentage" fill="#BB86FC" barSize={15} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-600">My Courses</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                  onClick={() => setShowFilterDialog(true)}>
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowBrowseDialog(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Browse Courses
                </Button>
              </div>
            </div>
            {
              filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">No Courses Found</h3>
                    <p className="text-gray-500 mb-4">No courses match your current filters or search criteria.</p>
                    <Button onClick={resetFilters}>Clear Filters</Button>
                  </CardContent>
                </Card>
              )
            }
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-2 border-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-serif font-bold text-blue-600 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Events
              </CardTitle>
              <CardDescription className="font-serif">Your schedule for the coming days</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex p-3 rounded-lg border border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md">
                      <div className="mr-3 flex-shrink-0">
                        {event.type === 'assignment' && <FileText className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-full shadow-sm" />}
                        {event.type === 'quiz' && <FileText className="h-10 w-10 p-2 bg-amber-100 text-amber-600 rounded-full shadow-sm" />}
                        {event.type === 'session' && <Film className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-full shadow-sm" />}
                        {event.type === 'discussion' && <Bell className="h-10 w-10 p-2 bg-purple-100 text-purple-600 rounded-full shadow-sm" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm font-serif text-gray-800">{event.title}</h3>
                        <p className="text-xs text-gray-600 flex items-center mt-1 font-sans">
                          <Clock className="h-3 w-3 mr-1 text-gray-500" /> {event.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500 font-serif">No upcoming events.</p>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full font-serif" asChild>
                <Link to="/calendar">View Calendar</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center font-serif font-bold text-blue-600">
                <span className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-blue-600" />
                  Announcements
                </span>
                {announcements.length > 0 && (
                  <Badge variant="outline" className="bg-gradient-to-r from-pink-100 to-rose-100 text-rose-700 font-bold animate-pulse">
                    New
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="font-serif">Important updates from your courses</CardDescription>
            </CardHeader>
            <CardContent>
              {announcements.length > 0 ? (
                <div className="space-y-4">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm font-serif text-gray-800">{announcement.title}</h3>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-blue-600 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between mt-2 text-xs font-sans">
                        <span className="text-gray-600">{announcement.date}</span>
                        <span className="text-[#6E59A5] font-semibold">{announcement.course}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500 font-serif">No announcements at this time.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Filter Courses</DialogTitle>
            <DialogDescription className="font-serif">
              Customize how your courses are displayed
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium font-serif">Category</h4>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="font-serif">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="font-serif">
                  {uniqueCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium font-serif">Progress Status</h4>
              <Select value={progressFilter} onValueChange={setProgressFilter}>
                <SelectTrigger className="font-serif">
                  <SelectValue placeholder="Select progress status" />
                </SelectTrigger>
                <SelectContent className="font-serif">
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="notStarted">Not Started (0%)</SelectItem>
                  <SelectItem value="inProgress">In Progress (1-99%)</SelectItem>
                  <SelectItem value="completed">Completed (100%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showCompleted"
                checked={showCompleted}
                onCheckedChange={checked => setShowCompleted(checked === true)}
              />
              <label
                htmlFor="showCompleted"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-serif"
              >
                Show Completed Courses
              </label>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={resetFilters} className="font-serif">
              Reset All
            </Button>
            <Button onClick={() => setShowFilterDialog(false)} className="font-serif">
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBrowseDialog} onOpenChange={setShowBrowseDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">Browse All Courses</DialogTitle>
            <DialogDescription className="font-serif">
              Explore all available courses in your learning platform
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center my-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses by title, instructor..."
                className="pl-9 font-serif"
                value={browseSearchQuery}
                onChange={handleBrowseSearchChange}
              />
              {browseSearchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={resetBrowseSearch}
                >
                  ×
                </Button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="font-serif">
                  <Filter className="h-4 w-4 mr-1" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="font-serif">
                <DropdownMenuItem onClick={() => handleSortChange('titleAsc')}>
                  Title (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('titleDesc')}>
                  Title (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('progressHigh')}>
                  Progress (High to Low)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('progressLow')}>
                  Progress (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('dateNewest')}>
                  Start Date (Newest)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('dateOldest')}>
                  Start Date (Oldest)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            {browseCourses.map(course => (
              <div
                key={course.id}
                className="border rounded-lg p-4 hover:border-[#9b87f5] transition-colors cursor-pointer"
                onClick={() => handleCourseSelect(course.id)}
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium font-serif">{course.title}</h3>
                    <p className="text-sm text-gray-500 font-serif">{course.instructor}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs font-serif">
                        {course.category}
                      </Badge>
                      <span className="text-xs text-gray-500 font-serif">
                        Progress: {course.progress}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-[#9b87f5] h-1.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${Math.round(course.progress)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {browseCourses.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <h3 className="lg:text-lg font-medium mb-2 font-serif">No Courses Found</h3>
              <p className="text-gray-500 mb-4 font-serif">No courses match your current search criteria.</p>
              <Button onClick={resetBrowseSearch} className="font-serif">Clear Search</Button>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowBrowseDialog(false)} className="font-serif">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {
        process.env.NODE_ENV === 'development' && (
          <Card className="mt-6 p-4 border-dashed border-orange-300 bg-orange-50">
            <details>
              <summary className="font-medium text-orange-700 cursor-pointer font-serif">Debug Information</summary>
              <div className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-40 font-serif">
                <p><strong>User ID:</strong> {userData?.id}</p>
                <p><strong>Full Name:</strong> {userData?.fullname}</p>
                <p><strong>Username:</strong> {userData?.username}</p>
                <p><strong>Role:</strong> {userData?.role}</p>
                <p><strong>Token:</strong> {userData?.token?.substring(0, 20)}...</p>
                <p><strong>Courses:</strong> {userCourses.length}</p>
              </div>
            </details>
          </Card>
        )
      }
    </>
  );
};

export default Dashboard;
