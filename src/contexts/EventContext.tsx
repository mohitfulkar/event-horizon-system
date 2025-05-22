
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string;
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  category: 'conference' | 'workshop' | 'meetup' | 'webinar' | 'other';
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Omit<Event, 'id'>>) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// Sample data for initial events
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring the latest innovations',
    date: new Date(2025, 5, 15), // June 15, 2025
    location: 'San Francisco Convention Center',
    organizer: 'Tech Events Inc.',
    attendees: 500,
    status: 'upcoming',
    category: 'conference'
  },
  {
    id: '2',
    title: 'Web Development Workshop',
    description: 'Hands-on workshop for modern web development techniques',
    date: new Date(2025, 5, 25), // June 25, 2025
    location: 'Online',
    organizer: 'Code Masters',
    attendees: 50,
    status: 'upcoming',
    category: 'workshop'
  },
  {
    id: '3',
    title: 'AI Meetup Group',
    description: 'Monthly meetup to discuss advancements in artificial intelligence',
    date: new Date(2025, 6, 5), // July 5, 2025
    location: 'Tech Hub Downtown',
    organizer: 'AI Enthusiasts',
    attendees: 75,
    status: 'upcoming',
    category: 'meetup'
  },
  {
    id: '4',
    title: 'Product Design Webinar',
    description: 'Learn about the latest trends in product design',
    date: new Date(2025, 5, 10), // June 10, 2025
    location: 'Online',
    organizer: 'Design Innovation Group',
    attendees: 200,
    status: 'upcoming',
    category: 'webinar'
  },
  {
    id: '5',
    title: 'Startup Pitch Night',
    description: 'Entrepreneurs pitch their startups to potential investors',
    date: new Date(2025, 6, 12), // July 12, 2025
    location: 'Innovation Center',
    organizer: 'Venture Capital Partners',
    attendees: 150,
    status: 'upcoming',
    category: 'other'
  }
];

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(sampleEvents);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, event: Partial<Omit<Event, 'id'>>) => {
    setEvents(prev => prev.map(e => 
      e.id === id ? { ...e, ...event } : e
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const getEvent = (id: string) => {
    return events.find(e => e.id === id);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, getEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  
  return context;
};
