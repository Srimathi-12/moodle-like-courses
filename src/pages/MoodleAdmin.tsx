
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { adminApi, MoodleUser, MoodleCourse } from '@/services/moodleApi';
import AddUserForm from '@/components/AddUserForm';
import { toast } from 'sonner';
import { BookOpen, Users, Plus } from 'lucide-react';

const MoodleAdmin = () => {
  const [users, setUsers] = useState<MoodleUser[]>([]);
  const [courses, setCourses] = useState<MoodleCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, [activeTab]);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'users') {
        const fetchedUsers = await adminApi.getUsers();
        setUsers(fetchedUsers);
      } else if (activeTab === 'courses') {
        const fetchedCourses = await adminApi.getCourses();
        setCourses(fetchedCourses);
      }
    } catch (error) {
      console.error(`Failed to fetch ${activeTab}:`, error);
      toast.error(`Failed to load ${activeTab}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserCreated = () => {
    setUserDialogOpen(false);
    if (activeTab === 'users') {
      fetchData();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Moodle Administration</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Courses
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">User Management</h2>
            <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to create a new Moodle user.
                  </DialogDescription>
                </DialogHeader>
                <AddUserForm onSuccess={handleUserCreated} />
              </DialogContent>
            </Dialog>
          </div>
          
          {isLoading ? (
            <div className="py-8 text-center">Loading users...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map(user => (
                <Card key={user.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <img 
                          src={user.profileimageurl || 'https://i.pravatar.cc/48'} 
                          alt={`${user.firstname} ${user.lastname}`}
                          className="h-12 w-12 rounded-full"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {user.firstname} {user.lastname}
                        </CardTitle>
                        <p className="text-sm text-gray-500">{user.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Username:</span> {user.username}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Email:</span> {user.email}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Course Management</h2>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </div>
          
          {isLoading ? (
            <div className="py-8 text-center">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map(course => (
                <Card key={course.id}>
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={course.imageUrl || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop'} 
                      alt={course.fullname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{course.fullname}</CardTitle>
                    <p className="text-sm text-gray-500">{course.shortname}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm line-clamp-2">
                        {course.summary.replace(/<\/?[^>]+(>|$)/g, "")}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodleAdmin;
