import React, { useState } from 'react';
import { useAuth } from '../App';
import HomeSection from '../components/dashboard/home-section';
import JobsSection from '../components/dashboard/jobs-section';
import ExpensesSection from '../components/dashboard/expenses-section';
import WorkOrdersSection from '../components/dashboard/workorders-section';
import StaffSection from '../components/dashboard/staff-section';
import SettingsSection from '../components/dashboard/settings-section';
// Import new components
import SubcontractorList from '../components/subcontractors/SubcontractorList';
import CrewList from '../components/crews/CrewList';
import RecycleBin from '../components/recycle-bin/RecycleBin'; // Import RecycleBin
import whiteLogo from '../images/FF-WHITE-LOGO.png';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Centralized state for work orders (replace with actual data fetching/management)
  const [workOrders, setWorkOrders] = useState([
    {
      id: 1,
      title: "Roof Repair",
      assignedToId: 1,
      assignedToName: "ABC Contractors",
      status: "In Progress",
      dueDate: "2025-05-05",
      job: "Hurricane Damage Assessment",
      progress: 65,
      isDeleted: false,
      // ... other fields
    },
    {
      id: 2,
      title: "Water Extraction",
      assignedToId: 2,
      assignedToName: "Water Damage Pros",
      status: "Completed",
      dueDate: "2025-04-22",
      job: "Flood Restoration",
      progress: 100,
      isDeleted: false,
      // ... other fields
    },
    {
      id: 3,
      title: "Debris Removal",
      assignedToId: 3,
      assignedToName: "Cleanup Specialists",
      status: "Pending",
      dueDate: "2025-05-10",
      job: "Storm Debris Removal",
      progress: 0,
      isDeleted: false,
      // ... other fields
    },
     {
      id: 4,
      title: "Drywall Installation",
      assignedToId: 4,
      assignedToName: "Building Experts Inc.",
      status: "Pending",
      dueDate: "2025-05-15",
      job: "Flood Restoration",
      progress: 0,
      isDeleted: true, // Example deleted item
      // ... other fields
    },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionNavigation = (section, openModal) => {
    setActiveSection(section);
    if (openModal) {
      console.log(`Open modal for ${section} section`);
    }
  };

  // Handler for restoring a work order
  const handleRestoreWorkOrder = (id) => {
    console.log(`Restoring work order with id: ${id}`);
    setWorkOrders(prevWorkOrders =>
      prevWorkOrders.map(order =>
        order.id === id ? { ...order, isDeleted: false } : order
      )
    );
    // Add audit log entry
    const auditEntry = {
      timestamp: new Date().toISOString(),
      user: user?.name || "System", // Use logged-in user name if available
      action: "Restored Work Order",
      details: `Restored work order ID: ${id}`
    };
    setWorkOrders(prevWorkOrders =>
      prevWorkOrders.map(order =>
        order.id === id ? { ...order, auditLog: [...(order.auditLog || []), auditEntry] } : order
      )
    );
  };

  // Handler for deleting a work order (passed down to WorkOrdersSection)
   const handleDeleteWorkOrder = (id) => {
    // Add confirmation dialog here in a real application
    console.log(`Soft deleting work order with id: ${id}`);
    // Add audit log entry before setting state
    const auditEntry = {
      timestamp: new Date().toISOString(),
      user: user?.name || "System",
      action: "Deleted Work Order",
      details: `Soft deleted work order ID: ${id}`
    };
    setWorkOrders(prevWorkOrders =>
      prevWorkOrders.map(order =>
        order.id === id ? { ...order, isDeleted: true, auditLog: [...(order.auditLog || []), auditEntry] } : order
      )
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        // Pass relevant data to HomeSection if needed for charts
        return <HomeSection onNavigate={handleSectionNavigation} />;
      case 'jobs':
        return <JobsSection />;
      case 'expenses':
        return <ExpensesSection />;
      case 'workorders':
        // Pass workOrders state and delete handler down
        return <WorkOrdersSection workOrders={workOrders} setWorkOrders={setWorkOrders} handleDeleteWorkOrder={handleDeleteWorkOrder} />;
      case 'subcontractors':
        return <SubcontractorList />;
      case 'crews':
        return <CrewList />;
      case 'recyclebin': // Add case for recycle bin
        return <RecycleBin allWorkOrders={workOrders} onRestoreWorkOrder={handleRestoreWorkOrder} />;
      case 'staff':
        return <StaffSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <HomeSection onNavigate={handleSectionNavigation} />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 z-40 p-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-label="Open menu"
        >
          {/* Hamburger Icon */}
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      ></div>

      {/* Mobile sidebar */}
      <div className={`sidebar-mobile ${sidebarOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between mb-8">
          {/* Logo */}
          <div className="flex items-center">
            <img src={whiteLogo} alt="Fairfield Group Logo" className="h-20 w-auto" />
          </div>
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-1">
          {/* Existing Sidebar Items */}
          <SidebarItem active={activeSection === 'home'} onClick={() => { setActiveSection('home'); setSidebarOpen(false); }} text="Home" />
          <SidebarItem active={activeSection === 'jobs'} onClick={() => { setActiveSection('jobs'); setSidebarOpen(false); }} text="Jobs" />
          <SidebarItem active={activeSection === 'expenses'} onClick={() => { setActiveSection('expenses'); setSidebarOpen(false); }} text="Expenses" />
          <SidebarItem active={activeSection === 'workorders'} onClick={() => { setActiveSection('workorders'); setSidebarOpen(false); }} text="Work Orders" />

          {/* New Sidebar Items */}
          <SidebarItem
            active={activeSection === 'subcontractors'}
            onClick={() => { setActiveSection('subcontractors'); setSidebarOpen(false); }}
            icon={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
                  </svg>}
            text="Subcontractors"
          />
          <SidebarItem
            active={activeSection === 'crews'}
            onClick={() => { setActiveSection('crews'); setSidebarOpen(false); }}
            icon={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>}
            text="Crews"
          />

          <SidebarItem active={activeSection === 'staff'} onClick={() => { setActiveSection('staff'); setSidebarOpen(false); }} text="Staff" />
          <SidebarItem active={activeSection === 'recyclebin'} onClick={() => { setActiveSection('recyclebin'); setSidebarOpen(false); }} text="Recycle Bin" />
          <SidebarItem active={activeSection === 'settings'} onClick={() => { setActiveSection('settings'); setSidebarOpen(false); }} text="Settings" />
        </nav>
        <div className="mt-auto pt-6">
          {/* Logout Button */}
          <button onClick={logout} className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
            {/* Logout Icon */}
            Logout
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="sidebar">
        <div className="flex items-center justify-center mb-8">
          {/* Logo */}
          <img src={whiteLogo} alt="Fairfield Group Logo" className="h-25 w-auto" />
        </div>
        <nav className="space-y-1">
          {/* Existing Sidebar Items */}
          <SidebarItem active={activeSection === 'home'} onClick={() => setActiveSection('home')} text="Home" />
          <SidebarItem active={activeSection === 'jobs'} onClick={() => setActiveSection('jobs')} text="Jobs" />
          <SidebarItem active={activeSection === 'expenses'} onClick={() => setActiveSection('expenses')} text="Expenses" />
          <SidebarItem active={activeSection === 'workorders'} onClick={() => setActiveSection('workorders')} text="Work Orders" />

          {/* New Sidebar Items */}
          <SidebarItem
            active={activeSection === 'subcontractors'}
            onClick={() => setActiveSection('subcontractors')}
            icon={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
                  </svg>}
            text="Subcontractors"
          />
          <SidebarItem
            active={activeSection === 'crews'}
            onClick={() => setActiveSection('crews')}
            icon={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>}
            text="Crews"
          />

          {/* Existing Sidebar Items */}
          <SidebarItem active={activeSection === 'staff'} onClick={() => setActiveSection('staff')} text="Staff" />
          {/* Add Recycle Bin to desktop sidebar */}
          <SidebarItem active={activeSection === 'recyclebin'} onClick={() => setActiveSection('recyclebin')} text="Recycle Bin" />
          <SidebarItem active={activeSection === 'settings'} onClick={() => setActiveSection('settings')} text="Settings" />
        </nav>
        <div className="mt-auto pt-6">
          {/* Logout Button */}
          <button onClick={logout} className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
            {/* Logout Icon */}
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="header flex-col md:flex-row space-y-2 md:space-y-0">
          {/* Header Content */}
          <h1 className="text-xl md:text-2xl font-bold">Welcome, {user?.name || 'User'}</h1>
          <div className="text-xs md:text-sm text-gray-500">
            {/* Date Display */}
          </div>
        </div>

        {renderSection()}
      </div>
    </div>
  );
};

// SidebarItem component remains the same
const SidebarItem = ({ active, onClick, icon, text }) => {
  // Add placeholder icons if missing
  const defaultIcon = <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <span className="mr-3">{icon || defaultIcon}</span>
      {text}
    </button>
  );
};

export default Dashboard;
