import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

const WorkOrdersSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [workOrders, setWorkOrders] = useState([
    {
      id: 1,
      title: "Roof Repair",
      assignedTo: "ABC Contractors",
      status: "In Progress",
      dueDate: "May 5, 2025",
      job: "Hurricane Damage Assessment",
      progress: 65,
      description: "Repair and replacement of damaged roof sections on residential property. Includes shingle replacement, flashing repair, and gutter realignment.",
      location: "123 Oak Street, Lake Charles, LA",
      startDate: "April 25, 2025",
      estimatedHours: 40,
      completedHours: 26,
      materials: ["Asphalt shingles", "Roofing nails", "Flashing", "Underlayment", "Sealant"],
      specialInstructions: "Homeowner has requested minimal disruption during early morning hours. Access through side gate.",
      contactPerson: "John Smith (Site Supervisor)",
      contactPhone: "(555) 123-4567",
      notes: "Weather delays possible. Coordinate with insurance adjuster for final inspection."
    },
    {
      id: 2,
      title: "Water Extraction",
      assignedTo: "Water Damage Pros",
      status: "Completed",
      dueDate: "April 22, 2025",
      job: "Flood Restoration",
      progress: 100,
      description: "Complete water extraction and drying of flooded basement in residential property. Includes moisture testing, sanitization, and dehumidification.",
      location: "456 Bayou Drive, New Orleans, LA",
      startDate: "April 15, 2025",
      estimatedHours: 24,
      completedHours: 22,
      materials: ["Industrial dehumidifiers", "Air movers", "Moisture meters", "Antimicrobial solution", "PPE"],
      specialInstructions: "Property has elderly resident. Ensure clear pathways and minimal noise when possible.",
      contactPerson: "Sarah Johnson (Project Manager)",
      contactPhone: "(555) 987-6543",
      notes: "All work completed and verified. Final moisture readings within acceptable range. Customer satisfaction confirmed."
    },
    {
      id: 3,
      title: "Debris Removal",
      assignedTo: "Cleanup Specialists",
      status: "Pending",
      dueDate: "May 10, 2025",
      job: "Storm Debris Removal",
      progress: 0,
      description: "Removal of storm debris from residential and commercial properties in Lafayette area. Includes tree limbs, damaged fencing, and miscellaneous debris.",
      location: "Multiple locations in Lafayette Parish",
      startDate: "May 8, 2025",
      estimatedHours: 60,
      completedHours: 0,
      materials: ["Heavy equipment", "Chainsaws", "Trucks", "Dumpsters", "Safety equipment"],
      specialInstructions: "Coordinate with local authorities for road access. Prioritize emergency service routes.",
      contactPerson: "Mike Williams (Operations Manager)",
      contactPhone: "(555) 234-5678",
      notes: "Awaiting final permits from city. Equipment being mobilized for immediate start once approved."
    },
    {
      id: 4,
      title: "Structural Support",
      assignedTo: "Building Experts Inc.",
      status: "In Progress",
      dueDate: "May 12, 2025",
      job: "Structural Assessment",
      progress: 30,
      description: "Installation of temporary structural supports in municipal building following earthquake damage. Includes beam reinforcement and foundation stabilization.",
      location: "City Hall, 789 Main Street, Shreveport, LA",
      startDate: "May 2, 2025",
      estimatedHours: 50,
      completedHours: 15,
      materials: ["Steel beams", "Concrete", "Hydraulic jacks", "Bracing materials", "Measuring equipment"],
      specialInstructions: "Building remains partially occupied. Work must be coordinated with city officials to minimize disruption.",
      contactPerson: "Robert Chen (Structural Engineer)",
      contactPhone: "(555) 345-6789",
      notes: "Initial assessment complete. First phase of support installation underway. Daily progress reports required."
    },
    {
      id: 5,
      title: "Drywall Replacement",
      assignedTo: "Interior Solutions",
      status: "Pending",
      dueDate: "May 15, 2025",
      job: "Water Damage Restoration",
      progress: 0,
      description: "Removal and replacement of water-damaged drywall in multiple residential units. Includes insulation replacement and painting.",
      location: "Riverside Apartments, 321 River Road, Alexandria, LA",
      startDate: "May 10, 2025",
      estimatedHours: 80,
      completedHours: 0,
      materials: ["Drywall sheets", "Joint compound", "Insulation", "Paint", "Primer", "Fasteners"],
      specialInstructions: "Work to be performed during business hours only. Residents will remain in units during repairs.",
      contactPerson: "Emily Davis (Property Manager)",
      contactPhone: "(555) 456-7890",
      notes: "Awaiting final moisture testing to confirm drying complete before beginning work. Materials ordered and scheduled for delivery."
    },
    {
      id: 6,
      title: "Smoke Damage Cleaning",
      assignedTo: "Restoration Masters",
      status: "In Progress",
      dueDate: "May 8, 2025",
      job: "Fire Damage Cleanup",
      progress: 45,
      description: "Comprehensive cleaning of smoke and soot damage throughout commercial office building. Includes HVAC cleaning, surface restoration, and odor elimination.",
      location: "Baton Rouge Business Center, 555 Commerce Ave, Baton Rouge, LA",
      startDate: "April 28, 2025",
      estimatedHours: 70,
      completedHours: 32,
      materials: ["Specialized cleaning agents", "HEPA vacuums", "Air scrubbers", "Ozone generators", "PPE"],
      specialInstructions: "Building closed to public during remediation. Coordinate with IT department for server room access.",
      contactPerson: "Lisa Rodriguez (Facilities Director)",
      contactPhone: "(555) 567-8901",
      notes: "First and second floors complete. Working on third floor currently. Air quality tests showing significant improvement."
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
            workOrder={order}
            onViewDetails={() => {
              setSelectedWorkOrder(order);
              setIsDetailsModalOpen(true);
            }}
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

      {/* Work Order Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={selectedWorkOrder?.title || "Work Order Details"}
      >
        {selectedWorkOrder && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{selectedWorkOrder.title}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                selectedWorkOrder.status === "Completed" ? "bg-green-100 text-green-800" :
                selectedWorkOrder.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {selectedWorkOrder.status}
              </span>
            </div>

            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className={`h-4 rounded-full ${
                  selectedWorkOrder.progress === 100 ? "bg-green-500" :
                  selectedWorkOrder.progress > 50 ? "bg-blue-500" :
                  selectedWorkOrder.progress > 0 ? "bg-yellow-500" :
                  "bg-gray-300"
                }`}
                style={{ width: `${selectedWorkOrder.progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm font-medium">{selectedWorkOrder.progress}% Complete</div>

            <div className="border-t pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.description}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Related Job</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.job}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.assignedTo}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.location}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.startDate}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.dueDate}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Hours</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    {selectedWorkOrder.completedHours} of {selectedWorkOrder.estimatedHours} hours completed
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Materials</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    <ul className="list-disc pl-5">
                      {selectedWorkOrder.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Special Instructions</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.specialInstructions}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.contactPerson}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Contact Phone</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.contactPhone}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.notes}</dd>
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
              <Button>Update Status</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const WorkOrderCard = ({ workOrder, onViewDetails }) => {
  const { title, assignedTo, status, dueDate, job, progress } = workOrder;

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
          <Button variant="outline" size="sm" onClick={onViewDetails}>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkOrdersSection;
