import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Lock, Eye, Monitor, Moon, Sun, Globe, User, Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and system settings</p>
        </div>
        <div>
          <Button>
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account settings and personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Sarah Miller" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="sarah.miller@eduexpert.com" />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="en">English (US)</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="est">Eastern Standard Time (EST)</option>
                    <option value="cst">Central Standard Time (CST)</option>
                    <option value="mst">Mountain Standard Time (MST)</option>
                    <option value="pst">Pacific Standard Time (PST)</option>
                  </select>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label>Account Preferences</Label>
                <div className="flex items-center justify-between space-y-0 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">Public Profile</span>
                    <span className="text-xs text-muted-foreground">Your profile will be visible to other faculty members</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-y-0 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">Email Communications</span>
                    <span className="text-xs text-muted-foreground">Receive email notifications for important updates</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the appearance of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <div className="border rounded-md p-2 flex items-center justify-center hover:border-primary cursor-pointer">
                      <Sun className="h-5 w-5" />
                    </div>
                    <Label className="font-normal" htmlFor="theme-light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="border rounded-md p-2 flex items-center justify-center hover:border-primary cursor-pointer">
                      <Moon className="h-5 w-5" />
                    </div>
                    <Label className="font-normal" htmlFor="theme-dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="border rounded-md p-2 flex items-center justify-center hover:border-primary cursor-pointer">
                      <Monitor className="h-5 w-5" />
                    </div>
                    <Label className="font-normal" htmlFor="theme-system">System</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="font-size"
                    type="range"
                    min="12"
                    max="24"
                    defaultValue="16"
                    className="w-full"
                  />
                  <span className="w-12 text-center">16px</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label>Interface Density</Label>
                <div className="flex items-center justify-between space-y-0 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">Compact Mode</span>
                    <span className="text-xs text-muted-foreground">Reduce spacing in the user interface</span>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between space-y-0 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">Animations</span>
                    <span className="text-xs text-muted-foreground">Enable animations throughout the interface</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start pb-4 border-b">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium">Assignment Submissions</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Get notified when students submit assignments</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <input type="checkbox" id="submission-email" className="rounded text-primary" defaultChecked />
                      <Label htmlFor="submission-email" className="text-sm font-normal">Email</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <input type="checkbox" id="submission-push" className="rounded text-primary" defaultChecked />
                      <Label htmlFor="submission-push" className="text-sm font-normal">Push</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start pb-4 border-b">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium">Grading Reminders</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Receive reminders to grade submitted assignments</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <input type="checkbox" id="grading-email" className="rounded text-primary" defaultChecked />
                      <Label htmlFor="grading-email" className="text-sm font-normal">Email</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <input type="checkbox" id="grading-push" className="rounded text-primary" defaultChecked />
                      <Label htmlFor="grading-push" className="text-sm font-normal">Push</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start pb-4 border-b">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium">Class Updates</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Get notified about changes to class schedules</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <input type="checkbox" id="class-email" className="rounded text-primary" defaultChecked />
                      <Label htmlFor="class-email" className="text-sm font-normal">Email</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <input type="checkbox" id="class-push" className="rounded text-primary" />
                      <Label htmlFor="class-push" className="text-sm font-normal">Push</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium">System Announcements</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Important announcements from administrators</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <input type="checkbox" id="system-email" className="rounded text-primary" defaultChecked />
                      <Label htmlFor="system-email" className="text-sm font-normal">Email</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <input type="checkbox" id="system-push" className="rounded text-primary" defaultChecked />
                      <Label htmlFor="system-push" className="text-sm font-normal">Push</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label>Notification Delivery</Label>
                <div className="flex items-center justify-between space-y-0 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">Daily Digest</span>
                    <span className="text-xs text-muted-foreground">Receive a daily summary of notifications</span>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between space-y-0 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">Do Not Disturb</span>
                    <span className="text-xs text-muted-foreground">Mute notifications during specific hours</span>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <Button className="w-full md:w-auto">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label>Security Options</Label>
                <div className="flex items-center justify-between space-y-0 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">Two-Factor Authentication</span>
                    <span className="text-xs text-muted-foreground">Add an extra layer of security to your account</span>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between space-y-0 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">Login Notifications</span>
                    <span className="text-xs text-muted-foreground">Get notified when someone logs into your account</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-y-0 py-2">
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-sm font-medium">Session Timeout</span>
                    <span className="text-xs text-muted-foreground">Automatically log out after a period of inactivity</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <Button variant="destructive" className="w-full md:w-auto">
                <Eye className="mr-2 h-4 w-4" />
                Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
