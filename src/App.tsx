
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
// import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";
import Attendance from "./pages/Attendance";
import Messages from "./pages/Messages";
import Features from "./pages/Features";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import MoodleLogin from "./pages/MoodleLogin";
import MoodleAdmin from "./pages/MoodleAdmin";
import MoodleTeacher from "./pages/MoodleTeacher";
import MoodleStudent from "./pages/MoodleStudent";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import Library from "./pages/Library";
import Tutorials from "./pages/Tutorials";
import Downloads from "./pages/Downloads";
import ThirdPartyContents from "./pages/ThirdPartyContents";
import Homepage from "./pages/HomePage";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherClasses from "./pages/TeacherClasses";
import TeacherAssignment from "./pages/TeacherAssignment";
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherAnalytics from "./pages/TeacherAnalytics";
import TeacherLibrary from "./pages/TeacherLibrary";
import SectionPage from "./pages/SectionPage";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherCourses from "./pages/TeacherCourses";
import StudentCourses from "./pages/StudentCourses"
import TeacherResource from "./pages/TeacherResources";
import TeacherSetting from "./pages/TeacherSetting";
import TeacherLayout from "./pages/TeacherLayout";
import CourseFeature from "./pages/CourseDetail";
import StudentCourseMain from "./pages/StudentCourseMain";
import CourseOverviewPage from "./pages/CourseOverviewPage";
import ModulePage from "./pages/ModulePage"; 
import { MoodleAuthProvider } from "./hooks/useMoodleAuth";
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MoodleAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student-courses" element={<StudentCourses />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/teacher-login" element={<TeacherLogin />} />


            <Route path="/student" element={<Index />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              {/* <Route path="courses" element={<Courses />} /> */}
              {/* <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="course-feature/:courseid" element={<CourseFeature />} /> */}
              <Route path="courses" element={<StudentCourseMain/>}/>
              <Route path="courses/:courseSlug" element={<CourseOverviewPage />} />
              <Route path="courses/:courseSlug/:moduleSlug" element={<ModulePage />} /> {/* ADDED MODULE ROUTE */}
              <Route path="assignments" element={<Assignments />} />
              <Route path="grades" element={<Grades />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="messages" element={<Messages />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="library" element={<Library />} />
              <Route path="tutorials" element={<Tutorials />} />
              <Route path="downloads" element={<Downloads />} />
              <Route path="third-party-contents" element={<ThirdPartyContents />} />
              <Route path="moodle-login" element={<MoodleLogin />} />
              <Route path="moodle-admin" element={<MoodleAdmin />} />
              <Route path="moodle-teacher" element={<MoodleTeacher />} />
              <Route path="moodle-student" element={<MoodleStudent />} />
            </Route>
            <Route path="/studentDetail" element={<Index />}>
              <Route path="section" element={<SectionPage />} />
            </Route>


            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<Navigate to="/teacher/dashboard" replace />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="classes" element={<TeacherClasses />} />
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="assignments" element={<TeacherAssignment />} />
              <Route path="library" element={<TeacherLibrary />} />
              <Route path="analytics" element={<TeacherAnalytics />} />
              <Route path="attendance" element={<TeacherAttendance />} />
              <Route path="resources" element={<TeacherResource />} />
              <Route path="profile" element={<TeacherProfile />} />
              <Route path="settings" element={<TeacherSetting />} />
            </Route>


            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </MoodleAuthProvider>
  </QueryClientProvider>
);

export default App;
