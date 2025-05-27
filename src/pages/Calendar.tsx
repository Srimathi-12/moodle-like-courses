import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, User } from 'lucide-react';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Sample events for demonstration
  const events = [
    {
      id: 1,
      title: "Introduction to Computer Science Lecture",
      date: new Date(2025, 3, 15, 10, 0),
      duration: "1 hour",
      location: "Room 101",
      instructor: "Dr. Jane Smith"
    },
    {
      id: 2,
      title: "Advanced Mathematics Group Study",
      date: new Date(2025, 3, 16, 14, 0),
      duration: "2 hours",
      location: "Library Study Room B",
      instructor: "Self-organized"
    },
    {
      id: 3,
      title: "Biology Lab Session",
      date: new Date(2025, 3, 17, 9, 0),
      duration: "3 hours",
      location: "Science Building, Lab 3",
      instructor: "Dr. Maria Garcia"
    }
  ];

  // Filter events for the selected date
  const selectedDateEvents = events.filter(event =>
    date && event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Academic Calendar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Browse your academic schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'No Date Selected'}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length
                ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''} scheduled`
                : 'No events scheduled for this date'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="space-y-4">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map(event => (
                      <div key={event.id} className="flex items-start p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        <div className="mr-4 min-w-16 text-center">
                          <div className="font-semibold">
                            {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="text-xs text-gray-500">{event.duration}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{event.title}</h3>
                          <div className="mt-1 text-sm text-gray-600 space-y-1">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              <span>{event.instructor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    No events scheduled for this date
                  </div>
                )}
              </TabsContent>

              <TabsContent value="list">
                <div className="space-y-2">
                  {selectedDateEvents.length > 0 ? (
                    selectedDateEvents
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map(event => (
                        <div key={event.id} className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-2">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              <span>{event.instructor}</span>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      No events scheduled for this date
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
