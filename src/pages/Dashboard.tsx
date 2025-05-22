
import React from 'react';
import { useEvents } from '../contexts/EventContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, Clock, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { events } = useEvents();
  
  // Calculate metrics
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const totalAttendees = events.reduce((acc, event) => acc + event.attendees, 0);
  
  // Get the next few upcoming events
  const nextEvents = [...events]
    .filter(e => e.status === 'upcoming')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your event management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">Events in your system</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">Events planned in the future</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAttendees}</div>
            <p className="text-xs text-muted-foreground mt-1">People attending all events</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {nextEvents.map(event => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {event.date.toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees} attendees
                      </div>
                    </div>
                  </div>
                  
                  <Badge className="bg-event text-event-foreground">
                    {event.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
