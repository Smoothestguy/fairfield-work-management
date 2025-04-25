import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const SettingsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <input 
                  id="name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  defaultValue="Admin User" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input 
                  id="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  defaultValue="admin@fairfieldresponse.com" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <input 
                  id="phone" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  defaultValue="(555) 123-4567" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium">Position</label>
                <input 
                  id="position" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  defaultValue="System Administrator" 
                />
              </div>
              <Button>Save Profile</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                <input 
                  id="current-password" 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                <input 
                  id="new-password" 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                <input 
                  id="confirm-password" 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                />
              </div>
              <Button>Change Password</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive text messages for urgent updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium mb-1">Language</label>
                <select 
                  id="language" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue="en"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium mb-1">Timezone</label>
                <select 
                  id="timezone" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue="America/New_York"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="offline-mode" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                  defaultChecked 
                />
                <label htmlFor="offline-mode" className="text-sm font-medium">Enable Offline Mode</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="data-saving" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                />
                <label htmlFor="data-saving" className="text-sm font-medium">Data Saving Mode</label>
              </div>
              
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsSection;
