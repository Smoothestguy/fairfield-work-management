import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

const JobsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Hurricane Damage Assessment",
      status: "In Progress",
      location: "Lake Charles, LA",
      dueDate: "May 15, 2025",
      priority: "High"
    },
    {
      id: 2,
      title: "Flood Restoration",
      status: "Pending",
      location: "New Orleans, LA",
      dueDate: "June 1, 2025",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Fire Damage Cleanup",
      status: "Completed",
      location: "Baton Rouge, LA",
      dueDate: "April 10, 2025",
      priority: "Low"
    },
    {
      id: 4,
      title: "Storm Debris Removal",
      status: "In Progress",
      location: "Lafayette, LA",
      dueDate: "May 20, 2025",
      priority: "Medium"
    },
    {
      id: 5,
      title: "Structural Assessment",
      status: "Pending",
      location: "Shreveport, LA",
      dueDate: "May 25, 2025",
      priority: "High"
    },
    {
      id: 6,
      title: "Water Damage Restoration",
      status: "In Progress",
      location: "Alexandria, LA",
      dueDate: "May 18, 2025",
      priority: "Medium"
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    status: "Pending",
    location: "",
    dueDate: "",
    priority: "Medium"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      id: jobs.length + 1,
      ...newJob
    };
    setJobs([job, ...jobs]);
    setNewJob({
      title: "",
      status: "Pending",
      location: "",
      dueDate: "",
      priority: "Medium"
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Jobs</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          Create New Job
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            title={job.title}
            status={job.status}
            location={job.location}
            dueDate={job.dueDate}
            priority={job.priority}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Job"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Job Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={newJob.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={newJob.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter location"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-sm font-medium">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              required
              value={newJob.dueDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newJob.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-medium">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={newJob.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Job</Button>
          </div>
        </form>
      </Modal>
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
