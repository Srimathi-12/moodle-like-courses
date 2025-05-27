import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMoodleAuth } from '@/hooks/useMoodleAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, User, Lock } from 'lucide-react';
import { cn } from "@/lib/utils";

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, currentUser } = useMoodleAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated && currentUser?.role === 'teacher') {
      navigate('/teacher');
    }
  }, [isAuthenticated, currentUser, navigate]);
  
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
    
  //   try {
  //     await login(email, password);
  //     // Redirect is handled in the useEffect
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     toast.error('Login failed. Please check your credentials.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
    
      try {
        // Simulate successful login
        const mockUser = {
          email,
          role: 'teacher',
          name: 'Demo Teacher',
        };
    
        // Store mock auth data (if needed)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
    
        // Navigate to student dashboard
        navigate('/teacher');
      } catch (error) {
        toast.error('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C]/90 to-[#9b87f5]/40 z-10"></div>
        <video 
          className="absolute min-w-full min-h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-teacher-giving-a-lesson-in-class-5794-large.mp4" type="video/mp4" />
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
            <h1 className="text-3xl font-bold text-white mb-2">Teacher Portal</h1>
            <p className="text-white/80">Access your teaching materials and student data</p>
          </div>
          
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-md animate-scale-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your email to access your teaching dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="teacher@example.com"
                      className={cn(
                        "pl-10 transition-all duration-300 border-gray-300 focus:border-[#9b87f5] focus:ring-[#9b87f5]",
                        "hover:border-[#9b87f5]/50"
                      )}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  {isLoading ? 'Signing in...' : (
                    <>
                      Sign in <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <p className="text-sm text-gray-500 text-center">
                Need an account? <Button variant="link" className="text-[#9b87f5] p-0">Apply to teach</Button>
              </p>
              {/* <p className="text-xs text-gray-400 text-center">
                For demo purposes, you can use any email address.
              </p> */}
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

export default TeacherLogin;