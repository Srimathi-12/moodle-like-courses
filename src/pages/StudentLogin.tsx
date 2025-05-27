import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, User, Lock } from 'lucide-react';
import { cn } from "@/lib/utils";

const StudentLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [siteInfo, setSiteInfo] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  
  const fetchSiteInfo = async (currentToken) => {
    try {
      const response = await fetch(
        `https://lmsbackend.shiksak.com/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_webservice_get_site_info&wstoken=${currentToken}`
      );
      
      const data = await response.json();
      
      if (data && data.userid) {
        setSiteInfo(data);
        return data;
      } else if (data && data.error) {
        toast.error(`Error: ${data.error}`);
        return null;
      } else {
        toast.error('Could not retrieve user information.');
        return null;
      }
    } catch (error) {
      console.error("Error fetching site info:", error);
      toast.error(`Error: ${error.message}`);
      return null;
    }
  };
  
  // Function to fetch user's role
  const fetchUserRole = async (currentToken, userId) => {
    try {
      const response = await fetch(
        `https://lmsbackend.shiksak.com/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_user_get_user_roles&wstoken=${currentToken}&userid=${userId}`
      );
      
      const roleData = await response.json();
      
      if (Array.isArray(roleData)) {
        // Return the highest role if multiple roles exist
        return roleData.length > 0 ? roleData[0].shortname : 'student';
      } else if (roleData && roleData.error) {
        console.error(`Error retrieving user role: ${roleData.error}`);
        return 'student'; // Default to student if error occurs
      } else {
        console.error('Failed to retrieve user role.');
        return 'student'; // Default to student
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      return 'student'; // Default to student on error
    }
  };
  
  const fetchUserCourses = async (currentToken, userId) => {
    try {
      const response = await fetch(
        `https://lmsbackend.shiksak.com/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_enrol_get_users_courses&wstoken=${currentToken}&userid=${userId}`
      );
      
      const coursesData = await response.json();
      
      if (Array.isArray(coursesData)) {
        setCourses(coursesData);
        return coursesData;
      } else if (coursesData && coursesData.error) {
        toast.error(`Error retrieving courses: ${coursesData.error}`);
        return [];
      } else {
        toast.error('Failed to retrieve courses.');
        return [];
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error(`Error retrieving courses: ${error.message}`);
      return [];
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create form data for Moodle login request
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('service', 'moodle_mobile_app');
      
      // Make the request to get the Moodle token
      const tokenResponse = await fetch(
        'https://lmsbackend.shiksak.com/login/token.php', {
          method: 'POST',
          body: formData
        }
      );
      
      const tokenData = await tokenResponse.json();
      
      if (tokenData.token) {
        setToken(tokenData.token);
        
        // Get site info to verify the user
        const siteInfoData = await fetchSiteInfo(tokenData.token);
        
        if (siteInfoData && siteInfoData.userid) {
          // Get user courses
          const userCourses = await fetchUserCourses(tokenData.token, siteInfoData.userid);
          
          // Get user role
          const userRole = await fetchUserRole(tokenData.token, siteInfoData.userid);
          
          // Create a user object with Moodle data including role
          const moodleUser = {
            id: siteInfoData.userid,
            username: siteInfoData.username,
            email: username,
            fullname: siteInfoData.fullname,
            role: userRole, // Set the user role from API
            token: tokenData.token,
            siteInfo: siteInfoData,
            courses: Array.isArray(userCourses) ? userCourses : []
          };
          
          // Update state instead of using localStorage
          setIsAuthenticated(true);
          setCurrentUser(moodleUser);
          
          // Store user data in sessionStorage for persistence across page refreshes
          // Note: In a production app, consider more secure state management solutions
          sessionStorage.setItem('moodleUserData', JSON.stringify(moodleUser));
          sessionStorage.setItem('isAuthenticated', 'true');
          
          // Log user details to console
          console.log("User authenticated successfully:", moodleUser);
          console.log("Token:", tokenData.token);
          console.log("Site Info:", siteInfoData);
          console.log("User Role:", userRole);
          console.log("Courses:", userCourses);
          
          // Navigate based on user role and pass the user data as state
          if (userRole === 'teacher' || userRole === 'editingteacher' || userRole === 'manager' || userRole === 'admin') {
            navigate('/teacher', { 
              state: { 
                userData: moodleUser
              }
            });
          } else {
            navigate('/student', { 
              state: { 
                userData: moodleUser
              }
            });
          }
          
          toast.success(`Welcome back, ${siteInfoData.fullname}!`);
        }
      } else if (tokenData.error) {
        toast.error(`Authentication failed: ${tokenData.error}`);
        console.error("Authentication failed:", tokenData.error);
      } else {
        toast.error('Login failed. Please check your credentials.');
        console.error("Login failed: No token returned");
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-[#1A1F2C]/70 z-10"></div>
        <video 
          className="absolute min-w-full min-h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-happy-students-in-the-library-of-the-university-6394-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Learning Portal</h1>
            <p className="text-white/80">Access your courses and track your progress</p>
          </div>
          
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-md animate-scale-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your username and password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Your username"
                      className={cn(
                        "pl-10 transition-all duration-300 border-gray-300 focus:border-[#9b87f5] focus:ring-[#9b87f5]",
                        "hover:border-[#9b87f5]/50"
                      )}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Button type="button" variant="link" className="text-xs text-[#9b87f5] p-0">
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className={cn(
                        "pl-10 transition-all duration-300 border-gray-300 focus:border-[#9b87f5] focus:ring-[#9b87f5]",
                        "hover:border-[#9b87f5]/50"
                      )}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full bg-[#9b87f5] hover:bg-[#8a74f8] transition-all duration-300 transform hover:translate-y-[-2px]",
                    "active:translate-y-[1px] h-11 font-medium"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? 'Connecting to ...' : (
                    <>
                      Sign in <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <p className="text-sm text-gray-500 text-center">
                Don't have an account? <Button variant="link" className="text-[#9b87f5] p-0">Contact your institution</Button>
              </p>
              <p className="text-xs text-gray-400 text-center">
                This login connects to your learning environment
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              Back to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;