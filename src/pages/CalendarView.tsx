
import React, { useState } from 'react';
import { useEvents } from '../contexts/EventContext';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

const CalendarView = () => {
  const { events } = useEvents();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get events for the selected day
  const eventsForSelectedDay = events.filter(
    event => event.date.toDateString() === date.toDateString()
  );

  // Custom day renderer for the calendar
  const renderDay = (day: Date) => {
    const dayEvents = events.filter(
      event => event.date.toDateString() === day.toDateString()
    );
    
    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {dayEvents.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full flex justify-center">
            <div className="h-1.5 w-1.5 bg-event rounded-full" />
          </div>
        )}
      </div>
    );
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">View your events in a calendar</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day) => day && setDate(day)}
              className="rounded-md border"
              components={{
                Day: ({ date, ...props }) => (
                  <button
                    {...props}
                    className={`${props.className} h-9 w-9 p-0 font-normal aria-selected:opacity-100`}
                  >
                    {renderDay(date)}
                  </button>
                ),
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Events for {format(date, 'MMMM d, yyyy')}
              </h2>
            </div>

            <div className="space-y-4">
              {eventsForSelectedDay.length > 0 ? (
                eventsForSelectedDay.map(event => (
                  <div 
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="border rounded-md p-4 hover:border-event cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-3">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            {event.attendees} attendees
                          </div>
                        </div>
                      </div>
                      
                      <Badge 
                        className={`${
                          event.status === 'upcoming' 
                            ? 'bg-blue-500' 
                            : event.status === 'ongoing' 
                            ? 'bg-green-500' 
                            : event.status === 'completed' 
                            ? 'bg-gray-500' 
                            : 'bg-red-500'
                        } text-white`}
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No events for this day</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Select another day or add new events
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedEvent && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                {selectedEvent.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(selectedEvent.date, 'MMMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {selectedEvent.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {selectedEvent.category}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Organizer</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.organizer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Attendees</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.attendees}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default CalendarView;
