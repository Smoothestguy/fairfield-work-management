import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const HomeSection = ({ onNavigate }) => {
  // Mock data for the dashboard
  const summaryData = {
    activeJobs: 4,
    pendingExpenses: 2,
    openWorkOrders: 5,
    availableStaff: 3,
    totalJobs: 6,
    totalExpenses: 6,
    totalWorkOrders: 6,
    totalStaff: 6
  };

  // Mock recent activity data
  const recentActivity = [
    { id: 1, type: 'job', action: 'created', item: 'Hurricane Damage Assessment', user: 'Sarah Johnson', time: '2 hours ago' },
    { id: 2, type: 'expense', action: 'approved', item: 'Equipment Rental', user: 'Robert Chen', time: '4 hours ago' },
    { id: 3, type: 'workorder', action: 'completed', item: 'Water Extraction', user: 'Mike Williams', time: '1 day ago' },
    { id: 4, type: 'staff', action: 'added', item: 'Lisa Rodriguez', user: 'John Smith', time: '2 days ago' },
    { id: 5, type: 'expense', action: 'submitted', item: 'Travel Expenses', user: 'John Smith', time: '3 days ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Active Jobs"
          value={summaryData.activeJobs}
          total={summaryData.totalJobs}
          icon={
            <svg className="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          color="bg-blue-50"
          linkText="View Jobs"
          linkSection="jobs"
          onNavigate={onNavigate}
        />
        <SummaryCard
          title="Pending Expenses"
          value={summaryData.pendingExpenses}
          total={summaryData.totalExpenses}
          icon={
            <svg className="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-green-50"
          linkText="View Expenses"
          linkSection="expenses"
          onNavigate={onNavigate}
        />
        <SummaryCard
          title="Open Work Orders"
          value={summaryData.openWorkOrders}
          total={summaryData.totalWorkOrders}
          icon={
            <svg className="h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
          color="bg-yellow-50"
          linkText="View Work Orders"
          linkSection="workorders"
          onNavigate={onNavigate}
        />
        <SummaryCard
          title="Available Staff"
          value={summaryData.availableStaff}
          total={summaryData.totalStaff}
          icon={
            <svg className="h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          color="bg-purple-50"
          linkText="View Staff"
          linkSection="staff"
          onNavigate={onNavigate}
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <QuickActionButton
              text="Create Job"
              section="jobs"
              icon={
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              onNavigate={onNavigate}
            />
            <QuickActionButton
              text="Submit Expense"
              section="expenses"
              icon={
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              onNavigate={onNavigate}
            />
            <QuickActionButton
              text="Create Work Order"
              section="workorders"
              icon={
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              onNavigate={onNavigate}
            />
            <QuickActionButton
              text="Add Staff"
              section="staff"
              icon={
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              onNavigate={onNavigate}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SummaryCard = ({ title, value, total, icon, color, linkText, linkSection, onNavigate }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold">{value}</p>
              <p className="ml-1 text-sm text-gray-500">/ {total}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
            onClick={() => {
              if (onNavigate) {
                onNavigate(linkSection);
              }
            }}
          >
            {linkText} →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'job':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
      case 'expense':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'workorder':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg className="h-4 w-4 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        );
      case 'staff':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="h-4 w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getActionText = (activity) => {
    const { action, item, user } = activity;

    switch(action) {
      case 'created':
        return (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{user}</span> created a new {activity.type} <span className="font-medium text-gray-900">{item}</span>
          </p>
        );
      case 'approved':
        return (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{user}</span> approved expense <span className="font-medium text-gray-900">{item}</span>
          </p>
        );
      case 'completed':
        return (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{user}</span> completed work order <span className="font-medium text-gray-900">{item}</span>
          </p>
        );
      case 'added':
        return (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{user}</span> added new staff member <span className="font-medium text-gray-900">{item}</span>
          </p>
        );
      case 'submitted':
        return (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{user}</span> submitted expense <span className="font-medium text-gray-900">{item}</span>
          </p>
        );
      default:
        return (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{user}</span> {action} {activity.type} <span className="font-medium text-gray-900">{item}</span>
          </p>
        );
    }
  };

  return (
    <div className="flex items-start space-x-3">
      {getActivityIcon(activity.type)}
      <div className="flex-1">
        {getActionText(activity)}
        <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
      </div>
    </div>
  );
};

const QuickActionButton = ({ text, section, icon, onNavigate }) => {
  return (
    <Button
      variant="outline"
      className="w-full h-auto py-3 flex flex-col items-center justify-center gap-2"
      onClick={() => {
        if (onNavigate) {
          onNavigate(section, true); // true indicates to open the modal
        }
      }}
    >
      {icon}
      <span>{text}</span>
    </Button>
  );
};

export default HomeSection;
