
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { MoodleUser, UserRole, callMoodleApi, loadMoodleConfig } from '@/services/moodleApi';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: MoodleUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const MoodleAuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<MoodleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if config is loaded
    if (!loadMoodleConfig()) {
      setIsLoading(false);
      return;
    }

    // Check for existing session
    const savedUser = localStorage.getItem('moodleCurrentUser');
    
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('moodleCurrentUser');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For a more realistic demo, we'll simulate authentication with fixed test accounts
      // In a real implementation, this would call Moodle's authentication endpoints
      
      let user: MoodleUser;
      
      if (username === 'admin' && password === 'password') {
        user = createMockUser(username, 'Admin', 'User', 'admin@example.com', 'admin');
      } else if (username === 'teacher' && password === 'password') {
        user = createMockUser(username, 'Teacher', 'User', 'teacher@example.com', 'teacher');
      } else if (username === 'student' && password === 'password') {
        user = createMockUser(username, 'Student', 'User', 'student@example.com', 'student');
      } else {
        // In a real implementation, we would call the Moodle login API
        try {
          const response = await callMoodleApi<any>('core_user_get_users_by_field', {
            field: 'username',
            values: [username]
          });
          
          if (!response || response.length === 0) {
            throw new Error('User not found');
          }
          
          // Determine role based on username as a fallback
          const role: UserRole = username.includes('admin') 
            ? 'admin' 
            : username.includes('teacher') 
              ? 'teacher' 
              : 'student';
          
          user = {
            id: response[0].id,
            username: response[0].username,
            firstname: response[0].firstname,
            lastname: response[0].lastname,
            email: response[0].email,
            role,
            profileimageurl: response[0].profileimageurl
          };
        } catch (error) {
          // If API call fails, we throw an error to indicate login failure
          console.error('Moodle API authentication failed:', error);
          throw new Error('Invalid username or password');
        }
      }
      
      setCurrentUser(user);
      localStorage.setItem('moodleCurrentUser', JSON.stringify(user));
      toast.success(`Welcome back, ${user.firstname}!`);
      
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('moodleCurrentUser');
    toast.info('You have been logged out');
  };

  // Helper function to create mock users for demo purposes
  const createMockUser = (
    username: string, 
    firstname: string, 
    lastname: string, 
    email: string, 
    role: UserRole
  ): MoodleUser => {
    return {
      id: Math.floor(Math.random() * 1000) + 1,
      username,
      firstname,
      lastname,
      email,
      role,
      profileimageurl: `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=random`
    };
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useMoodleAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useMoodleAuth must be used within a MoodleAuthProvider');
  }
  
  return context;
};
