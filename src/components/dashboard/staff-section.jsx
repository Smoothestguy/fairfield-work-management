import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const StaffSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Staff</h2>
        <Button>Add Staff Member</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StaffCard 
          name="John Smith"
          position="Field Technician"
          status="Available"
          skills={["Water Damage", "Structural Assessment"]}
          email="john.smith@fairfieldresponse.com"
          phone="(555) 123-4567"
        />
        <StaffCard 
          name="Sarah Johnson"
          position="Project Manager"
          status="Assigned"
          skills={["Team Leadership", "Client Relations"]}
          email="sarah.johnson@fairfieldresponse.com"
          phone="(555) 234-5678"
        />
        <StaffCard 
          name="Mike Williams"
          position="Equipment Specialist"
          status="On Leave"
          skills={["Heavy Machinery", "Electrical Systems"]}
          email="mike.williams@fairfieldresponse.com"
          phone="(555) 345-6789"
        />
        <StaffCard 
          name="Emily Davis"
          position="Administrative Assistant"
          status="Available"
          skills={["Documentation", "Scheduling"]}
          email="emily.davis@fairfieldresponse.com"
          phone="(555) 456-7890"
        />
        <StaffCard 
          name="Robert Chen"
          position="Safety Officer"
          status="Assigned"
          skills={["Risk Assessment", "OSHA Compliance"]}
          email="robert.chen@fairfieldresponse.com"
          phone="(555) 567-8901"
        />
        <StaffCard 
          name="Lisa Rodriguez"
          position="Client Liaison"
          status="Available"
          skills={["Customer Service", "Needs Assessment"]}
          email="lisa.rodriguez@fairfieldresponse.com"
          phone="(555) 678-9012"
        />
      </div>
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
