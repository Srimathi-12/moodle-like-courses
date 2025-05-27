import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { classesData, studentsData } from "@/data/mockData";
import { Search, Filter, Grid, List, MoreHorizontal, Plus, FilePlus, UserPlus, Archive } from "lucide-react";

export default function Classes() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">Manage your classes and students</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Class
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:space-x-4 mb-4">
          <TabsList className="mb-4 sm:mb-0">
            <TabsTrigger value="all">All Classes</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <div className="flex w-full sm:w-auto space-x-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search classes..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Grid className="mr-2 h-4 w-4" />
                  <span>View</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Grid className="mr-2 h-4 w-4" />
                  <span>Grid View</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <List className="mr-2 h-4 w-4" />
                  <span>List View</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {classesData.map((classItem) => (
              <Card key={classItem.id} className="overflow-hidden">
                <div className="h-2 bg-primary"></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{classItem.name}</h3>
                      <p className="text-sm text-muted-foreground">{classItem.code} • {classItem.grade}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Class</DropdownMenuItem>
                        <DropdownMenuItem>Class Settings</DropdownMenuItem>
                        <DropdownMenuItem>Archive Class</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Students</p>
                        <p className="font-medium">{classItem.totalStudents}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Average</p>
                        <p className="font-medium">{classItem.average}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Room</p>
                        <p className="font-medium">{classItem.room}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Progress</p>
                        <p className="font-medium">{classItem.progress}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-1">Course Progress</p>
                    <Progress value={classItem.progress} />
                  </div>
                  
                  <div className="mt-6 flex space-x-2">
                    <Button className="flex-1">Open Class</Button>
                    <Button variant="outline" size="icon">
                      <FilePlus className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classesData.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">{classItem.name}</TableCell>
                  <TableCell>{classItem.code}</TableCell>
                  <TableCell>{classItem.grade}</TableCell>
                  <TableCell>{classItem.schedule}</TableCell>
                  <TableCell>{classItem.totalStudents}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={classItem.progress} className="w-[80px]" />
                      <span className="text-sm">{classItem.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Open</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="archived">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Archive className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No archived classes</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              You don't have any archived classes for this semester.
            </p>
            <Button variant="outline">View Past Semesters</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
