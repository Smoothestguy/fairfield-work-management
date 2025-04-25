import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const JobsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
        <Button>Create New Job</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <JobCard 
          title="Hurricane Damage Assessment"
          status="In Progress"
          location="Lake Charles, LA"
          dueDate="May 15, 2025"
          priority="High"
        />
        <JobCard 
          title="Flood Restoration"
          status="Pending"
          location="New Orleans, LA"
          dueDate="June 1, 2025"
          priority="Medium"
        />
        <JobCard 
          title="Fire Damage Cleanup"
          status="Completed"
          location="Baton Rouge, LA"
          dueDate="April 10, 2025"
          priority="Low"
        />
        <JobCard 
          title="Storm Debris Removal"
          status="In Progress"
          location="Lafayette, LA"
          dueDate="May 20, 2025"
          priority="Medium"
        />
        <JobCard 
          title="Structural Assessment"
          status="Pending"
          location="Shreveport, LA"
          dueDate="May 25, 2025"
          priority="High"
        />
        <JobCard 
          title="Water Damage Restoration"
          status="In Progress"
          location="Alexandria, LA"
          dueDate="May 18, 2025"
          priority="Medium"
        />
      </div>
    </div>
  );
};

const JobCard = ({ title, status, location, dueDate, priority }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-500';
      case 'in progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(status)}`}></span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span>{status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span>{location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Due Date:</span>
            <span>{dueDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Priority:</span>
            <span className={getPriorityColor(priority)}>{priority}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-end">
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsSection;
