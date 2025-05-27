import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { resourcesData, classesData } from "@/data/mockData";
import { 
  Search, Filter, Grid, List, Download, MoreHorizontal, 
  Plus, Upload, FileText, Video, BookOpen, 
  FileCode, File, BarChart3, Link2, Presentation
} from "lucide-react";

export default function Resources() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">Manage and share educational materials</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Link2 className="mr-2 h-4 w-4" />
            Add Link
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Resource
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4 text-blue-500" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resourcesData.filter(r => r.type === "Document").length}
            </div>
            <p className="text-xs text-muted-foreground">
              PDFs, DOCs, and other text files
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Video className="mr-2 h-4 w-4 text-red-500" />
              Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resourcesData.filter(r => r.type === "Video").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Lecture recordings and tutorials
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileCode className="mr-2 h-4 w-4 text-green-500" />
              Interactive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resourcesData.filter(r => r.type === "Interactive" || r.type === "Software").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Interactive tools and software
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="mr-2 h-4 w-4 text-purple-500" />
              Total Downloads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resourcesData.reduce((acc, curr) => acc + curr.downloads, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all resources
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:space-x-4">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
          </TabsList>

          <div className="flex w-full sm:w-auto space-x-2 mt-4 sm:mt-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search resources..." className="pl-8" />
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

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resourcesData.map((resource) => {
                    const classInfo = classesData.find(c => c.code === resource.class);
                    
                    // Icon based on resource type and format
                    const ResourceIcon = 
                      resource.type === "Document" ? FileText :
                      resource.type === "Video" ? Video :
                      resource.type === "Interactive" ? BookOpen :
                      resource.type === "Software" ? FileCode :
                      resource.type === "Presentation" ? Presentation :
                      File;
                    
                    return (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-md bg-muted flex items-center justify-center">
                              <ResourceIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{resource.title}</p>
                              <p className="text-xs text-muted-foreground">{resource.format}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {resource.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{resource.class}</TableCell>
                        <TableCell>{resource.size}</TableCell>
                        <TableCell>{resource.uploaded}</TableCell>
                        <TableCell>{resource.downloads}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center space-x-1">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
