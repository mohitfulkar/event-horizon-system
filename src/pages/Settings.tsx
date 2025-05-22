
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Account settings saved successfully');
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification settings saved successfully');
  };

  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Appearance settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your event system settings</p>
      </div>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAccount} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Event Manager Admin" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@eventmanager.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-05:00 Eastern Time (US & Canada)" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="calendar-sync">Sync with Calendar</Label>
                    <Switch
                      id="calendar-sync"
                      checked={calendarSync}
                      onCheckedChange={setCalendarSync}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow the system to sync events with your external calendar
                  </p>
                </div>
                
                <Button type="submit" className="mt-4">
                  Save Account Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotifications} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="notifications-enabled">Enable Notifications</Label>
                    <Switch
                      id="notifications-enabled"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about event updates and changes
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Notification Types</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch id="new-event" defaultChecked />
                      <Label htmlFor="new-event">New events</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="event-updates" defaultChecked />
                      <Label htmlFor="event-updates">Event updates</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="event-reminders" defaultChecked />
                      <Label htmlFor="event-reminders">Event reminders</Label>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="mt-4">
                  Save Notification Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your event management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAppearance} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch
                      id="dark-mode"
                      checked={darkModeEnabled}
                      onCheckedChange={setDarkModeEnabled}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for the application interface
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-view">Default Calendar View</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-center" type="button">Day</Button>
                    <Button variant="outline" className="justify-center bg-secondary" type="button">Week</Button>
                    <Button variant="outline" className="justify-center" type="button">Month</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="items-per-page">Items Per Page</Label>
                  <Input type="number" id="items-per-page" defaultValue="10" />
                </div>
                
                <Button type="submit" className="mt-4">
                  Save Appearance Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
