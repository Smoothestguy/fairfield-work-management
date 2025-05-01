import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

// Mock data for charts (replace with actual data fetching/processing)
const workOrderStatusData = [
  { name: 'Pending', value: 1 }, // Based on the 3 sample work orders
  { name: 'In Progress', value: 1 },
  { name: 'Completed', value: 1 },
  { name: 'On Hold', value: 0 },
  { name: 'Cancelled', value: 0 },
];

const jobProgressData = [
  { name: 'Hurricane Damage', progress: 65 },
  { name: 'Flood Restoration', progress: 100 },
  { name: 'Storm Debris', progress: 0 },
  { name: 'Fire Cleanup', progress: 20 }, // Added mock data
  { name: 'Structural Assess.', progress: 80 }, // Added mock data
];

const COLORS = ['#FFBB28', '#0088FE', '#00C49F', '#FF8042', '#8884d8']; // Yellow, Blue, Green, Orange, Gray

const HomeSection = ({ onNavigate }) => {
  // Mock data for the dashboard summary cards
  const summaryData = {
    activeJobs: 4,
    pendingExpenses: 2,
    openWorkOrders: 2, // Updated based on chart data (Pending + In Progress)
    availableStaff: 3,
    totalJobs: 5, // Updated based on chart data
    totalExpenses: 6,
    totalWorkOrders: 3, // Updated based on chart data
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
        {/* Date Display */}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Existing Summary Cards ... */}
        <SummaryCard title="Active Jobs" value={summaryData.activeJobs} total={summaryData.totalJobs} color="bg-blue-50" linkText="View Jobs" linkSection="jobs" onNavigate={onNavigate} />
        <SummaryCard title="Pending Expenses" value={summaryData.pendingExpenses} total={summaryData.totalExpenses} color="bg-green-50" linkText="View Expenses" linkSection="expenses" onNavigate={onNavigate} />
        <SummaryCard title="Open Work Orders" value={summaryData.openWorkOrders} total={summaryData.totalWorkOrders} color="bg-yellow-50" linkText="View Work Orders" linkSection="workorders" onNavigate={onNavigate} />
        <SummaryCard title="Available Staff" value={summaryData.availableStaff} total={summaryData.totalStaff} color="bg-purple-50" linkText="View Staff" linkSection="staff" onNavigate={onNavigate} />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Work Order Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Work Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workOrderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {workOrderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Progress Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Job Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobProgressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="progress" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions (Can be kept or modified) */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
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

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {/* Quick Action Buttons ... */}
                <QuickActionButton text="Create Job" section="jobs" icon={/* Icon */} onNavigate={onNavigate} />
                <QuickActionButton text="Submit Expense" section="expenses" icon={/* Icon */} onNavigate={onNavigate} />
                <QuickActionButton text="Create Work Order" section="workorders" icon={/* Icon */} onNavigate={onNavigate} />
                <QuickActionButton text="Add Staff" section="staff" icon={/* Icon */} onNavigate={onNavigate} />
              </div>
            </CardContent>
          </Card>
      </div>

    </div>
  );
};

// SummaryCard, ActivityItem, QuickActionButton components remain the same
// ... (Paste the existing component definitions here) ...

const SummaryCard = ({ title, value, total, icon, color, linkText, linkSection, onNavigate }) => {
  // Placeholder Icon
  const defaultIcon = <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon || defaultIcon}
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
    // Placeholder Icons
    const icons = {
        job: <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
        expense: <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        workorder: <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
        staff: <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    };
    const colors = {
        job: "bg-blue-100",
        expense: "bg-green-100",
        workorder: "bg-yellow-100",
        staff: "bg-purple-100"
    };
    return (
      <div className={`${colors[type] || 'bg-gray-100'} p-2 rounded-full`}>
        {icons[type] || <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
      </div>
    );
  };

  const getActionText = (activity) => {
    const { action, item, user } = activity;
    return (
      <p className="text-sm text-gray-600">
        <span className="font-medium text-gray-900">{user}</span> {action} {activity.type} <span className="font-medium text-gray-900">{item}</span>
      </p>
    );
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
  // Placeholder Icon
  const defaultIcon = <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
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
      {icon || defaultIcon}
      <span>{text}</span>
    </Button>
  );
};

export default HomeSection;
