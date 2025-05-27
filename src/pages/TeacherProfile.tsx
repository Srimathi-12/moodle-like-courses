import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { teacherProfile } from "@/data/mockData";
import { Calendar, Mail, MapPin, Phone, Save, UploadCloud, User, Pencil, Info, Plus, CheckCircle } from "lucide-react";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and information</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional Info</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription>
                View and update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-28 w-28">
                    <AvatarImage src={teacherProfile.avatar} alt={teacherProfile.name} />
                    <AvatarFallback>{teacherProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={teacherProfile.name} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="title">Job Title</Label>
                      <Input id="title" defaultValue={teacherProfile.role} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" defaultValue={teacherProfile.department} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={teacherProfile.email} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={teacherProfile.phone} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" defaultValue="01/15/1985" />
                    </div>
                  </div>
                  
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue={teacherProfile.address} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
              <CardDescription>
                Professional bio and personal introduction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue={teacherProfile.bio}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Your academic background and qualifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherProfile.education.map((education, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{education.degree}</h4>
                      <p className="text-sm text-muted-foreground">{education.institution}, {education.year}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>
                  Professional certifications and licenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherProfile.certifications.map((certification, index) => (
                    <div key={index} className="flex items-center justify-between space-x-4 pb-3 border-b last:border-0 last:pb-0">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-full bg-green-100">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-sm font-medium">{certification}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
                <CardDescription>
                  Your specialized teaching subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {teacherProfile.expertise.map((area, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expertise
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Your primary contact details</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{teacherProfile.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-green-100">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{teacherProfile.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-amber-100">
                <MapPin className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">Knowledge City</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-purple-100">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employee ID</p>
                <p className="font-medium">T-10085432</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
