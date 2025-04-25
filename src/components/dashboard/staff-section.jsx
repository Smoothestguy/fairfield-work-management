import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

const StaffSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "John Smith",
      position: "Field Technician",
      status: "Available",
      skills: ["Water Damage", "Structural Assessment"],
      email: "john.smith@fairfieldresponse.com",
      phone: "(555) 123-4567"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Project Manager",
      status: "Assigned",
      skills: ["Team Leadership", "Client Relations"],
      email: "sarah.johnson@fairfieldresponse.com",
      phone: "(555) 234-5678"
    },
    {
      id: 3,
      name: "Mike Williams",
      position: "Equipment Specialist",
      status: "On Leave",
      skills: ["Heavy Machinery", "Electrical Systems"],
      email: "mike.williams@fairfieldresponse.com",
      phone: "(555) 345-6789"
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Administrative Assistant",
      status: "Available",
      skills: ["Documentation", "Scheduling"],
      email: "emily.davis@fairfieldresponse.com",
      phone: "(555) 456-7890"
    },
    {
      id: 5,
      name: "Robert Chen",
      position: "Safety Officer",
      status: "Assigned",
      skills: ["Risk Assessment", "OSHA Compliance"],
      email: "robert.chen@fairfieldresponse.com",
      phone: "(555) 567-8901"
    },
    {
      id: 6,
      name: "Lisa Rodriguez",
      position: "Client Liaison",
      status: "Available",
      skills: ["Customer Service", "Needs Assessment"],
      email: "lisa.rodriguez@fairfieldresponse.com",
      phone: "(555) 678-9012"
    }
  ]);

  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    status: "Available",
    skills: "",
    email: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const staff = {
      id: staffMembers.length + 1,
      ...newStaff,
      skills: newStaff.skills.split(',').map(skill => skill.trim())
    };
    setStaffMembers([staff, ...staffMembers]);
    setNewStaff({
      name: "",
      position: "",
      status: "Available",
      skills: "",
      email: "",
      phone: ""
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Staff</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          Add Staff Member
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {staffMembers.map(staff => (
          <StaffCard
            key={staff.id}
            name={staff.name}
            position={staff.position}
            status={staff.status}
            skills={staff.skills}
            email={staff.email}
            phone={staff.phone}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Staff Member"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={newStaff.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter full name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="position" className="block text-sm font-medium">
              Position
            </label>
            <input
              id="position"
              name="position"
              type="text"
              required
              value={newStaff.position}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter position"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={newStaff.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={newStaff.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="skills" className="block text-sm font-medium">
              Skills (comma separated)
            </label>
            <input
              id="skills"
              name="skills"
              type="text"
              required
              value={newStaff.skills}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Water Damage, Structural Assessment"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newStaff.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="On Leave">On Leave</option>
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
            <Button type="submit">Add Staff Member</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const StaffCard = ({ name, position, status, skills, email, phone }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'available': return 'bg-green-500';
      case 'assigned': return 'bg-blue-500';
      case 'on leave': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)} mr-2`}></span>
            <span className="text-sm">{status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Position:</span>
            <span>{position}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Skills:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <span className="text-muted-foreground">Contact:</span>
            <div className="mt-1">
              <div className="text-xs">{email}</div>
              <div className="text-xs">{phone}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-end">
          <Button variant="outline" size="sm">View Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffSection;
