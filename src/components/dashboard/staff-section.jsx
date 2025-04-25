import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

const StaffSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "John Smith",
      position: "Field Technician",
      status: "Available",
      skills: ["Water Damage", "Structural Assessment", "Roof Repair", "Debris Removal"],
      email: "john.smith@fairfieldresponse.com",
      phone: "(555) 123-4567",
      department: "Field Operations",
      hireDate: "March 15, 2020",
      certifications: ["IICRC Water Restoration Technician", "OSHA 30-Hour", "First Aid/CPR"],
      currentAssignment: "Hurricane Damage Assessment - Lake Charles, LA",
      supervisor: "Robert Chen",
      emergencyContact: "Mary Smith - (555) 987-6543",
      bio: "John has over 10 years of experience in disaster response and restoration. Specializes in structural assessment and water damage restoration.",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      availability: "Monday-Friday, 7am-5pm"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Project Manager",
      status: "Assigned",
      skills: ["Team Leadership", "Client Relations", "Project Planning", "Budget Management"],
      email: "sarah.johnson@fairfieldresponse.com",
      phone: "(555) 234-5678",
      department: "Project Management",
      hireDate: "June 5, 2018",
      certifications: ["PMP", "Agile Certified Practitioner", "FEMA Incident Command"],
      currentAssignment: "Flood Restoration - New Orleans, LA",
      supervisor: "Michael Thompson",
      emergencyContact: "David Johnson - (555) 876-5432",
      bio: "Sarah is an experienced project manager with a background in emergency management. She excels at coordinating complex restoration projects and managing client expectations.",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
      availability: "Monday-Friday, 8am-6pm"
    },
    {
      id: 3,
      name: "Mike Williams",
      position: "Equipment Specialist",
      status: "On Leave",
      skills: ["Heavy Machinery", "Electrical Systems", "Equipment Maintenance", "Vehicle Operation"],
      email: "mike.williams@fairfieldresponse.com",
      phone: "(555) 345-6789",
      department: "Operations",
      hireDate: "January 10, 2019",
      certifications: ["Heavy Equipment Operator", "Electrical Safety", "CDL Class A"],
      currentAssignment: "On Medical Leave",
      supervisor: "Robert Chen",
      emergencyContact: "Jennifer Williams - (555) 765-4321",
      bio: "Mike specializes in heavy equipment operation and maintenance. He has extensive experience with disaster cleanup operations and electrical systems troubleshooting.",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
      availability: "On Medical Leave until June 1, 2025"
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Administrative Assistant",
      status: "Available",
      skills: ["Documentation", "Scheduling", "Office Management", "Data Entry"],
      email: "emily.davis@fairfieldresponse.com",
      phone: "(555) 456-7890",
      department: "Administration",
      hireDate: "August 22, 2021",
      certifications: ["Microsoft Office Specialist", "QuickBooks Certified User"],
      currentAssignment: "Headquarters - Administrative Support",
      supervisor: "Lisa Rodriguez",
      emergencyContact: "James Davis - (555) 654-3210",
      bio: "Emily provides administrative support for field operations and manages office scheduling. She excels at organizing documentation and maintaining efficient office workflows.",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      availability: "Monday-Friday, 9am-5pm"
    },
    {
      id: 5,
      name: "Robert Chen",
      position: "Safety Officer",
      status: "Assigned",
      skills: ["Risk Assessment", "OSHA Compliance", "Safety Training", "Hazard Identification"],
      email: "robert.chen@fairfieldresponse.com",
      phone: "(555) 567-8901",
      department: "Safety & Compliance",
      hireDate: "May 3, 2017",
      certifications: ["Certified Safety Professional", "OSHA Authorized Trainer", "Hazardous Materials Specialist"],
      currentAssignment: "Structural Assessment - Shreveport, LA",
      supervisor: "Michael Thompson",
      emergencyContact: "Grace Chen - (555) 543-2109",
      bio: "Robert oversees all safety protocols and ensures OSHA compliance across job sites. He conducts regular safety audits and provides training to all field personnel.",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      availability: "Monday-Friday, 7am-6pm, On-call weekends"
    },
    {
      id: 6,
      name: "Lisa Rodriguez",
      position: "Client Liaison",
      status: "Available",
      skills: ["Customer Service", "Needs Assessment", "Conflict Resolution", "Contract Negotiation"],
      email: "lisa.rodriguez@fairfieldresponse.com",
      phone: "(555) 678-9012",
      department: "Client Relations",
      hireDate: "October 15, 2019",
      certifications: ["Customer Service Excellence", "Negotiation Specialist", "Crisis Communication"],
      currentAssignment: "Headquarters - Client Support",
      supervisor: "Michael Thompson",
      emergencyContact: "Carlos Rodriguez - (555) 432-1098",
      bio: "Lisa serves as the primary point of contact for clients. She excels at understanding client needs and ensuring their concerns are addressed throughout the project lifecycle.",
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
      availability: "Monday-Friday, 8am-5pm"
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
            staff={staff}
            onViewProfile={() => {
              setSelectedStaff(staff);
              setIsProfileModalOpen(true);
            }}
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

      {/* Staff Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Staff Profile"
      >
        {selectedStaff && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src={selectedStaff.profileImage}
                alt={selectedStaff.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold">{selectedStaff.name}</h3>
                <p className="text-gray-600">{selectedStaff.position}</p>
                <div className="flex items-center justify-center sm:justify-start mt-2">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    selectedStaff.status === "Available" ? "bg-green-500" :
                    selectedStaff.status === "Assigned" ? "bg-blue-500" :
                    "bg-yellow-500"
                  }`}></span>
                  <span className="text-sm">{selectedStaff.status}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedStaff.department}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    <a href={`mailto:${selectedStaff.email}`} className="text-blue-600 hover:underline">
                      {selectedStaff.email}
                    </a>
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    <a href={`tel:${selectedStaff.phone}`} className="text-blue-600 hover:underline">
                      {selectedStaff.phone}
                    </a>
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Hire Date</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedStaff.hireDate}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Current Assignment</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedStaff.currentAssignment}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Supervisor</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedStaff.supervisor}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Availability</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedStaff.availability}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Emergency Contact</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedStaff.emergencyContact}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Skills</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {selectedStaff.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Certifications</dt>
                  <dd className="text-sm text-gray-900 col-span-2">
                    <ul className="list-disc pl-5">
                      {selectedStaff.certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Bio</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedStaff.bio}</dd>
                </div>
              </dl>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsProfileModalOpen(false)}
              >
                Close
              </Button>
              <Button>Edit Profile</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const StaffCard = ({ staff, onViewProfile }) => {
  const { name, position, status, skills, email, phone } = staff;

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
              {skills.slice(0, 2).map((skill, index) => (
                <span
                  key={index}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 2 && (
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                  +{skills.length - 2} more
                </span>
              )}
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
          <Button variant="outline" size="sm" onClick={onViewProfile}>View Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffSection;
