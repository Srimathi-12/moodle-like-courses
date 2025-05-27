import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download } from "lucide-react";

const downloads = [
  {
    title: "Mathematics Study Guide",
    type: "PDF",
    size: "2.4 MB",
    downloads: 1234,
    category: "Study Materials"
  },
  {
    title: "Physics Formula Sheet",
    type: "PDF",
    size: "1.8 MB",
    downloads: 987,
    category: "Reference"
  },
  {
    title: "Chemistry Lab Manual",
    type: "PDF",
    size: "3.2 MB",
    downloads: 756,
    category: "Laboratory"
  }
];

export default function Downloads() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Downloads</h1>
        <p className="text-muted-foreground">Access and download educational resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Latest Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Added this week
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {downloads.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{item.type}</Badge>
                        <Badge variant="outline">{item.category}</Badge>
                        <span className="text-sm text-muted-foreground">{item.size}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
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