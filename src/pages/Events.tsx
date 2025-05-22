
import React, { useState } from 'react';
import { useEvents, Event } from '../contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, CalendarDays, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

const EventForm = ({
  event,
  onSubmit,
  onCancel
}: {
  event?: Event;
  onSubmit: (formData: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [date, setDate] = useState(event?.date.toISOString().split('T')[0] || '');
  const [location, setLocation] = useState(event?.location || '');
  const [organizer, setOrganizer] = useState(event?.organizer || '');
  const [attendees, setAttendees] = useState(event?.attendees.toString() || '0');
  const [status, setStatus] = useState<Event['status']>(event?.status || 'upcoming');
  const [category, setCategory] = useState<Event['category']>(event?.category || 'other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      date: new Date(date),
      location,
      organizer,
      attendees: parseInt(attendees),
      status,
      category
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="organizer">Organizer</Label>
          <Input
            id="organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="attendees">Expected Attendees</Label>
          <Input
            id="attendees"
            type="number"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={(value: Event['status']) => setStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={category}
            onValueChange={(value: Event['category']) => setCategory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="meetup">Meetup</SelectItem>
              <SelectItem value="webinar">Webinar</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Event</Button>
      </div>
    </form>
  );
};

const Events = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('all');

  const handleAddSubmit = (formData: Omit<Event, 'id'>) => {
    addEvent(formData);
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (formData: Omit<Event, 'id'>) => {
    if (currentEvent) {
      updateEvent(currentEvent.id, formData);
      setIsEditDialogOpen(false);
      setCurrentEvent(undefined);
    }
  };

  const handleEdit = (event: Event) => {
    setCurrentEvent(event);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const filteredEvents = activeTab === 'all' 
    ? events 
    : events.filter(event => event.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Manage your events</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-event hover:bg-event-hover">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <EventForm 
              onSubmit={handleAddSubmit} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredEvents.map(event => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {format(event.date, 'MMMM d, yyyy')}
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
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleEdit(event)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
                </CardContent>
              </Card>
            ))}
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No events found</h3>
                <p className="text-muted-foreground mt-1">
                  {activeTab === 'all' 
                    ? "You don't have any events yet" 
                    : `You don't have any ${activeTab} events`}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {currentEvent && (
            <EventForm
              event={currentEvent}
              onSubmit={handleEditSubmit}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setCurrentEvent(undefined);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
