import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

const WorkOrdersSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workOrders, setWorkOrders] = useState([
    {
      id: 1,
      title: "Roof Repair",
      assignedTo: "ABC Contractors",
      status: "In Progress",
      dueDate: "May 5, 2025",
      job: "Hurricane Damage Assessment",
      progress: 65
    },
    {
      id: 2,
      title: "Water Extraction",
      assignedTo: "Water Damage Pros",
      status: "Completed",
      dueDate: "April 22, 2025",
      job: "Flood Restoration",
      progress: 100
    },
    {
      id: 3,
      title: "Debris Removal",
      assignedTo: "Cleanup Specialists",
      status: "Pending",
      dueDate: "May 10, 2025",
      job: "Storm Debris Removal",
      progress: 0
    },
    {
      id: 4,
      title: "Structural Support",
      assignedTo: "Building Experts Inc.",
      status: "In Progress",
      dueDate: "May 12, 2025",
      job: "Structural Assessment",
      progress: 30
    },
    {
      id: 5,
      title: "Drywall Replacement",
      assignedTo: "Interior Solutions",
      status: "Pending",
      dueDate: "May 15, 2025",
      job: "Water Damage Restoration",
      progress: 0
    },
    {
      id: 6,
      title: "Smoke Damage Cleaning",
      assignedTo: "Restoration Masters",
      status: "In Progress",
      dueDate: "May 8, 2025",
      job: "Fire Damage Cleanup",
      progress: 45
    }
  ]);

  // Available jobs for the dropdown
  const availableJobs = [
    "Hurricane Damage Assessment",
    "Flood Restoration",
    "Fire Damage Cleanup",
    "Storm Debris Removal",
    "Structural Assessment",
    "Water Damage Restoration"
  ];

  // Available contractors for the dropdown
  const availableContractors = [
    "ABC Contractors",
    "Water Damage Pros",
    "Cleanup Specialists",
    "Building Experts Inc.",
    "Interior Solutions",
    "Restoration Masters",
    "Emergency Response Team",
    "Quality Construction Co."
  ];

  const [newWorkOrder, setNewWorkOrder] = useState({
    title: "",
    assignedTo: "",
    status: "Pending",
    dueDate: "",
    job: "",
    progress: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workOrder = {
      id: workOrders.length + 1,
      ...newWorkOrder,
      progress: newWorkOrder.status === "Completed" ? 100 : (newWorkOrder.status === "In Progress" ? 30 : 0)
    };
    setWorkOrders([workOrder, ...workOrders]);
    setNewWorkOrder({
      title: "",
      assignedTo: "",
      status: "Pending",
      dueDate: "",
      job: "",
      progress: 0
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Work Orders</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          Create Work Order
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {workOrders.map(order => (
          <WorkOrderCard
            key={order.id}
            title={order.title}
            assignedTo={order.assignedTo}
            status={order.status}
            dueDate={order.dueDate}
            job={order.job}
            progress={order.progress}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Work Order"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Work Order Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={newWorkOrder.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter work order title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="job" className="block text-sm font-medium">
              Related Job
            </label>
            <select
              id="job"
              name="job"
              required
              value={newWorkOrder.job}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a job</option>
              {availableJobs.map((job, index) => (
                <option key={index} value={job}>{job}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="assignedTo" className="block text-sm font-medium">
              Assign To
            </label>
            <select
              id="assignedTo"
              name="assignedTo"
              required
              value={newWorkOrder.assignedTo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a contractor</option>
              {availableContractors.map((contractor, index) => (
                <option key={index} value={contractor}>{contractor}</option>
              ))}
            </select>
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
              value={newWorkOrder.dueDate}
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
              value={newWorkOrder.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
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
            <Button type="submit">Create Work Order</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const WorkOrderCard = ({ title, assignedTo, status, dueDate, job, progress }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-500';
      case 'in progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
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
            <span className="text-muted-foreground">Assigned To:</span>
            <span>{assignedTo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span>{status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Due Date:</span>
            <span>{dueDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Job:</span>
            <span>{job}</span>
          </div>
          <div className="mt-2">
            <span className="text-muted-foreground text-xs">Progress:</span>
            <div className="w-full bg-secondary h-2 rounded-full mt-1">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right text-xs mt-1">{progress}%</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-end">
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkOrdersSection;
