import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, Search, Filter, 
  BookMarked, FileText, Video 
} from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Introduction to Algebra",
    type: "Textbook",
    subject: "Mathematics",
    level: "Grade 9",
    downloads: 1234,
    icon: BookOpen
  },
  {
    id: 2,
    title: "Chemistry Lab Guide",
    type: "Document",
    subject: "Science",
    level: "Grade 10",
    downloads: 890,
    icon: FileText
  },
  {
    id: 3,
    title: "World History Timeline",
    type: "Interactive",
    subject: "History",
    level: "Grade 11",
    downloads: 567,
    icon: BookMarked
  },
  {
    id: 4,
    title: "Physics Experiments",
    type: "Video",
    subject: "Science",
    level: "Grade 12",
    downloads: 789,
    icon: Video
  }
];

export default function Library() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library</h1>
          <p className="text-muted-foreground">Browse and access educational resources</p>
        </div>
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Search resources..." />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all subjects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Most Popular Subject
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mathematics</div>
            <p className="text-xs text-muted-foreground mt-1">
              456 resources available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              New This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">
              Added in the last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {resources.map((resource) => (
                <Card key={resource.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-primary/10">
                      <resource.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{resource.type}</Badge>
                        <Badge variant="outline">{resource.subject}</Badge>
                        <Badge variant="outline">{resource.level}</Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {resource.downloads} downloads
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}