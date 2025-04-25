import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const WorkOrdersSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Work Orders</h2>
        <Button>Create Work Order</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <WorkOrderCard 
          title="Roof Repair"
          assignedTo="ABC Contractors"
          status="In Progress"
          dueDate="May 5, 2025"
          job="Hurricane Damage Assessment"
          progress={65}
        />
        <WorkOrderCard 
          title="Water Extraction"
          assignedTo="Water Damage Pros"
          status="Completed"
          dueDate="April 22, 2025"
          job="Flood Restoration"
          progress={100}
        />
        <WorkOrderCard 
          title="Debris Removal"
          assignedTo="Cleanup Specialists"
          status="Pending"
          dueDate="May 10, 2025"
          job="Storm Debris Removal"
          progress={0}
        />
        <WorkOrderCard 
          title="Structural Support"
          assignedTo="Building Experts Inc."
          status="In Progress"
          dueDate="May 12, 2025"
          job="Structural Assessment"
          progress={30}
        />
        <WorkOrderCard 
          title="Drywall Replacement"
          assignedTo="Interior Solutions"
          status="Pending"
          dueDate="May 15, 2025"
          job="Water Damage Restoration"
          progress={0}
        />
        <WorkOrderCard 
          title="Smoke Damage Cleaning"
          assignedTo="Restoration Masters"
          status="In Progress"
          dueDate="May 8, 2025"
          job="Fire Damage Cleanup"
          progress={45}
        />
      </div>
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
