import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

const JobsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Hurricane Damage Assessment",
      status: "In Progress",
      location: "Lake Charles, LA",
      dueDate: "May 15, 2025",
      priority: "High",
      description: "Comprehensive assessment of structural damage caused by Hurricane Laura. Includes roof inspection, water damage evaluation, and structural integrity analysis.",
      client: "Louisiana State Emergency Management",
      assignedTo: ["John Smith", "Sarah Johnson"],
      budget: "$25,000",
      startDate: "April 20, 2025",
      notes: "Access to certain areas may be restricted due to ongoing cleanup efforts."
    },
    {
      id: 2,
      title: "Flood Restoration",
      status: "Pending",
      location: "New Orleans, LA",
      dueDate: "June 1, 2025",
      priority: "Medium",
      description: "Restoration of residential properties affected by recent flooding. Services include water extraction, drying, sanitization, and structural repairs.",
      client: "New Orleans Housing Authority",
      assignedTo: ["Mike Williams", "Emily Davis"],
      budget: "$42,000",
      startDate: "May 10, 2025",
      notes: "Multiple properties involved. Coordination with local authorities required."
    },
    {
      id: 3,
      title: "Fire Damage Cleanup",
      status: "Completed",
      location: "Baton Rouge, LA",
      dueDate: "April 10, 2025",
      priority: "Low",
      description: "Cleanup and restoration of commercial property after fire damage. Includes smoke and soot removal, odor elimination, and structural repairs.",
      client: "Baton Rouge Business Center",
      assignedTo: ["Robert Chen", "Lisa Rodriguez"],
      budget: "$18,500",
      startDate: "March 25, 2025",
      notes: "All work completed ahead of schedule. Final inspection passed on April 8."
    },
    {
      id: 4,
      title: "Storm Debris Removal",
      status: "In Progress",
      location: "Lafayette, LA",
      dueDate: "May 20, 2025",
      priority: "Medium",
      description: "Removal and disposal of debris from recent thunderstorms. Includes clearing of fallen trees, branches, and other storm-related debris from public and private properties.",
      client: "Lafayette Parish Government",
      assignedTo: ["John Smith", "Mike Williams"],
      budget: "$32,000",
      startDate: "May 5, 2025",
      notes: "Heavy equipment required for several locations. Traffic management plan in place."
    },
    {
      id: 5,
      title: "Structural Assessment",
      status: "Pending",
      location: "Shreveport, LA",
      dueDate: "May 25, 2025",
      priority: "High",
      description: "Comprehensive structural assessment of municipal buildings following minor earthquake. Evaluation of foundation integrity, load-bearing walls, and overall structural safety.",
      client: "City of Shreveport",
      assignedTo: ["Sarah Johnson", "Robert Chen"],
      budget: "$15,000",
      startDate: "May 15, 2025",
      notes: "Priority assessment for schools and emergency services buildings."
    },
    {
      id: 6,
      title: "Water Damage Restoration",
      status: "In Progress",
      location: "Alexandria, LA",
      dueDate: "May 18, 2025",
      priority: "Medium",
      description: "Restoration of residential properties affected by water damage from broken water main. Services include water extraction, drying, dehumidification, and repairs.",
      client: "Alexandria Housing Department",
      assignedTo: ["Emily Davis", "Lisa Rodriguez"],
      budget: "$28,500",
      startDate: "May 2, 2025",
      notes: "Coordination with city water department required. Multiple residential units affected."
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    status: "Pending",
    location: "",
    dueDate: "",
    priority: "Medium",
    description: "",
    client: "",
    assignedTo: [],
    budget: "",
    startDate: "",
    notes: ""
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
      priority: "Medium",
      description: "",
      client: "",
      assignedTo: [],
      budget: "",
      startDate: "",
      notes: ""
    });
    setIsModalOpen(false);
  };

  const openStatusModal = (job) => {
    setSelectedJob(job);
    setUpdatedStatus(job.status);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = () => {
    const updatedJobs = jobs.map(job =>
      job.id === selectedJob.id ? { ...job, status: updatedStatus } : job
    );
    setJobs(updatedJobs);
    setSelectedJob({ ...selectedJob, status: updatedStatus });
    setIsStatusModalOpen(false);
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
            job={job}
            onViewDetails={() => {
              setSelectedJob(job);
              setIsDetailsModalOpen(true);
            }}
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

      {/* Job Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={selectedJob?.title || "Job Details"}
      >
        {selectedJob && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{selectedJob.title}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                selectedJob.status === "Completed" ? "bg-green-100 text-green-800" :
                selectedJob.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {selectedJob.status}
              </span>
            </div>

            <div className="border-t pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedJob.description}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Client</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedJob.client}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedJob.location}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedJob.startDate}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedJob.dueDate}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Priority</dt>
                  <dd className={`text-sm col-span-2 ${
                    selectedJob.priority === "High" ? "text-red-500" :
                    selectedJob.priority === "Medium" ? "text-yellow-500" :
                    "text-green-500"
                  }`}>
                    {selectedJob.priority}
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Budget</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedJob.budget}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    {selectedJob.assignedTo.join(", ")}
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedJob.notes}</dd>
                </div>
              </dl>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close
              </Button>
              <Button onClick={() => openStatusModal(selectedJob)}>Update Status</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Status Update Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Update Job Status"
      >
        {selectedJob && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Update the status for <span className="font-medium text-gray-900">{selectedJob.title}</span>
            </p>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsStatusModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleStatusUpdate}>Update Status</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const JobCard = ({ job, onViewDetails }) => {
  const { title, status, location, dueDate, priority } = job;

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
          <Button variant="outline" size="sm" onClick={onViewDetails}>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsSection;
