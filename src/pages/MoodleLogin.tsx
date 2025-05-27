
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useMoodleAuth } from '@/hooks/useMoodleAuth';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import MoodleApiConfig from '@/components/MoodleApiConfig';
// import { loadMoodleConfig } from '@/services/moodleApi';
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AlertCircle } from "lucide-react";

// const MoodleLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isMoodleConfigured, setIsMoodleConfigured] = useState(loadMoodleConfig());
//   const [connectionError, setConnectionError] = useState<string | null>(null);
//   const { login, isLoading, isAuthenticated, currentUser } = useMoodleAuth();
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     // If already authenticated, redirect based on role
//     if (isAuthenticated && currentUser) {
//       redirectBasedOnRole(currentUser.role);
//     }
//   }, [isAuthenticated, currentUser]);
  
//   const redirectBasedOnRole = (role: string) => {
//     if (role === 'admin') {
//       navigate('/moodle-admin');
//     } else if (role === 'teacher') {
//       navigate('/moodle-teacher');
//     } else {
//       navigate('/moodle-student');
//     }
//   };
  
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setConnectionError(null);
    
//     if (!username || !password) {
//       toast.error('Please enter both username and password');
//       return;
//     }
    
//     try {
//       await login(username, password);
//       // Redirect is handled in the useEffect
//     } catch (error) {
//       console.error('Login failed:', error);
//       setConnectionError('Failed to connect to Moodle. Please check your credentials and try again.');
//     }
//   };
  
//   const handleMoodleConfigured = () => {
//     setIsMoodleConfigured(true);
//     setConnectionError(null);
//   };
  
//   return (
//     <div className="container mx-auto max-w-md px-4 py-12">
//       <h1 className="text-2xl font-bold text-center mb-8">Moodle LMS Integration</h1>
      
//       {!isMoodleConfigured ? (
//         <MoodleApiConfig onConfigured={handleMoodleConfigured} />
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle>Login to Moodle</CardTitle>
//             <CardDescription>
//               Enter your Moodle credentials to access the LMS
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {connectionError && (
//               <Alert variant="destructive" className="mb-4">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>{connectionError}</AlertDescription>
//               </Alert>
//             )}
            
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Enter your username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   disabled={isLoading}
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   disabled={isLoading}
//                 />
//               </div>
              
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? 'Logging in...' : 'Login'}
//               </Button>
//             </form>
//           </CardContent>
//           <CardFooter className="flex flex-col space-y-2">
//             <p className="text-sm text-gray-500 text-center">
//               Demo credentials: admin/password, teacher/password, student/password
//             </p>
//             <Button 
//               variant="outline" 
//               size="sm" 
//               onClick={() => setIsMoodleConfigured(false)}
//               className="self-center"
//             >
//               Change Moodle Configuration
//             </Button>
//           </CardFooter>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default MoodleLogin;
import React, { useState } from 'react';

function MoodleConnect() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [siteInfo, setSiteInfo] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getMoodleToken = async () => {
    setIsLoading(true);
    setStatus('Authenticating...');
    
    try {
      // Create form data for the request
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      formData.append('service', 'moodle_mobile_app');
      
      // Make the request to get the token
      const tokenResponse = await fetch(
        'https://lmsbackend.shiksak.com/login/token.php', {
          method: 'POST',
          body: formData
        }
      );
      
      const tokenData = await tokenResponse.json();
      console.log("Token response:", tokenData);
      
      if (tokenData.token) {
        setToken(tokenData.token);
        setStatus('Token obtained successfully!');
        // Now get the site info with the token
        await fetchSiteInfo(tokenData.token);
        // After getting site info, fetch the user's courses
        await fetchUserCourses(tokenData.token);
      } else if (tokenData.error) {
        setStatus(`❌ Authentication failed: ${tokenData.error}`);
        setIsLoading(false);
      } else {
        setStatus('❌ Unable to obtain token. Check credentials.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during token request:", error);
      setStatus(`❌ Error during authentication: ${error.message}`);
      setIsLoading(false);
    }
  };

  const fetchSiteInfo = async (currentToken) => {
    try {
      const response = await fetch(
        `https://lmsbackend.shiksak.com/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_webservice_get_site_info&wstoken=${currentToken}`
      );
      const data = await response.json();
      console.log("Site info response:", data);

      if (data && data.siteurl) {
        setStatus('✅ Connected to successfully!');
        setSiteInfo(data);
        return data; // Return site info for potential use in other functions
      } else if (data && data.error) {
        setStatus(`❌ Error: ${data.error}`);
        setSiteInfo(null);
        return null;
      } else {
        setStatus('❌ Failed to connect. Check credentials.');
        setSiteInfo(null);
        return null;
      }
    } catch (error) {
      console.error("Error fetching site info:", error);
      setStatus(`❌ Error: ${error.message}`);
      setSiteInfo(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserCourses = async (currentToken) => {
    setLoadingCourses(true);
    try {
      // First, get the user ID if it's not already available
      let userId = siteInfo?.userid;
      
      if (!userId) {
        const siteInfoData = await fetchSiteInfo(currentToken);
        if (siteInfoData) {
          userId = siteInfoData.userid;
        } else {
          throw new Error("Could not get user ID");
        }
      }

      // Fetch the user's courses using the userid
      const response = await fetch(
        `https://lmsbackend.shiksak.com/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_enrol_get_users_courses&wstoken=${currentToken}&userid=${userId}`
      );
      
      const coursesData = await response.json();
      console.log("Courses response:", coursesData);

      if (Array.isArray(coursesData)) {
        setCourses(coursesData);
        setStatus(`✅ Retrieved ${coursesData.length} courses successfully!`);
      } else if (coursesData && coursesData.error) {
        setStatus(`❌ Error retrieving courses: ${coursesData.error}`);
      } else {
        setStatus('❌ Failed to retrieve courses. Check permissions.');
      }
    } catch (error) {
      console.error("Error fetching user courses:", error);
      setStatus(`❌ Error retrieving courses: ${error.message}`);
    } finally {
      setLoadingCourses(false);
    }
  };

  // Alternative direct connection with token (from original code)
  const checkMoodleConnection = async () => {
    if (!token) {
      setStatus('❌ Please enter a token first');
      return;
    }
    
    setIsLoading(true);
    setStatus('Connecting...');
    
    try {
      await fetchSiteInfo(token);
      if (siteInfo) {
        await fetchUserCourses(token);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h2>Login</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleInputChange}
          style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
          style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
        />
      </div>
      
      <button
        onClick={getMoodleToken}
        disabled={isLoading || !credentials.username || !credentials.password}
        style={{ 
          padding: '10px 16px', 
          backgroundColor: '#0066cc', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: isLoading || !credentials.username || !credentials.password ? 'not-allowed' : 'pointer',
          opacity: isLoading || !credentials.username || !credentials.password ? 0.7 : 1
        }}
      >
        {isLoading ? 'Connecting...' : 'Login'}
      </button>

      <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <h3>Or Connect with Token</h3>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Enter Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ padding: '8px', flexGrow: 1, marginRight: '10px' }}
          />
          <button
            onClick={checkMoodleConnection}
            disabled={isLoading}
            style={{ 
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            Connect
          </button>
        </div>
      </div>

      {status && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          borderRadius: '4px',
          backgroundColor: status.includes('❌') ? '#ffebee' : status.includes('✅') ? '#e8f5e9' : '#e3f2fd',
          color: status.includes('❌') ? '#c62828' : status.includes('✅') ? '#2e7d32' : '#0277bd'
        }}>
          {status}
        </div>
      )}

      {siteInfo && (
        <div style={{ marginTop: '20px', background: '#f1f1f1', padding: '16px', borderRadius: '8px' }}>
          <h3>📋 Site Information</h3>
          <p><strong>Site Name:</strong> {siteInfo.sitename}</p>
          <p><strong>Site URL:</strong> {siteInfo.siteurl}</p>
          <p><strong>Username:</strong> {siteInfo.username}</p>
          <p><strong>User Full Name:</strong> {siteInfo.fullname}</p>
          <p><strong>User ID:</strong> {siteInfo.userid}</p>
          <p><strong>Download Files:</strong> {siteInfo.downloadfiles ? 'Yes' : 'No'}</p>
        </div>
      )}

      {loadingCourses && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Loading courses...</p>
        </div>
      )}

      {courses.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>📚 My Courses</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
            {courses.map(course => (
              <div key={course.id} style={{ 
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{course.fullname}</h4>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                  <strong>Short Name:</strong> {course.shortname}
                </p>
                {course.summary && (
                  <p style={{ 
                    margin: '10px 0', 
                    fontSize: '14px',
                    maxHeight: '80px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    <strong>Summary:</strong> {course.summary.replace(/<[^>]*>?/gm, '')}
                  </p>
                )}
                <div style={{ 
                  marginTop: '10px', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  color: '#777'
                }}>
                  <span>ID: {course.id}</span>
                  {course.progress !== undefined && (
                    <span>Progress: {course.progress}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodleConnect;