import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const ExpensesSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
        <Button>Submit New Expense</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ExpenseCard 
          title="Travel Expenses"
          amount="$1,250.75"
          job="Hurricane Damage Assessment"
          status="Pending Approval"
          submittedBy="John Smith"
          date="April 20, 2025"
        />
        <ExpenseCard 
          title="Equipment Rental"
          amount="$3,500.00"
          job="Flood Restoration"
          status="Approved"
          submittedBy="Sarah Johnson"
          date="April 15, 2025"
        />
        <ExpenseCard 
          title="Supplies"
          amount="$875.25"
          job="Fire Damage Cleanup"
          status="Paid"
          submittedBy="Mike Williams"
          date="April 5, 2025"
        />
        <ExpenseCard 
          title="Contractor Payment"
          amount="$4,200.00"
          job="Storm Debris Removal"
          status="Approved"
          submittedBy="Sarah Johnson"
          date="April 18, 2025"
        />
        <ExpenseCard 
          title="Fuel Costs"
          amount="$320.50"
          job="Structural Assessment"
          status="Pending Approval"
          submittedBy="John Smith"
          date="April 22, 2025"
        />
        <ExpenseCard 
          title="Accommodation"
          amount="$950.00"
          job="Water Damage Restoration"
          status="Paid"
          submittedBy="Mike Williams"
          date="April 10, 2025"
        />
      </div>
    </div>
  );
};

const ExpenseCard = ({ title, amount, job, status, submittedBy, date }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid': return 'bg-green-500';
      case 'approved': return 'bg-blue-500';
      case 'pending approval': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className="text-xl font-bold">{amount}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Job:</span>
            <span>{job}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)} mr-2`}></span>
              <span>{status}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Submitted By:</span>
            <span>{submittedBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span>{date}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-end">
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesSection;
