# Fairfield Response Group Work Management System

A comprehensive work management system designed for disaster recovery and emergency services operations.

## Overview

The Fairfield Response Group Work Management System is a modern web application that helps manage field operations, track jobs, and coordinate resources during emergency response situations. The system includes five core modules:

1. **Job Tracking**: Create and manage jobs with status tracking, timeline visualization, and document attachments
2. **Expense Management**: Track expenses, submit receipts, manage budgets, and generate financial reports
3. **Work Order Distribution**: Create work orders, assign to subcontractors, and track progress
4. **Job Assignment**: Assign staff based on skills and availability, manage schedules
5. **User Access/Permissions**: Control access with role-based permissions

## Features

- **Responsive Design**: Works on both desktop and mobile devices
- **Offline Functionality**: Continue working in areas with limited connectivity
- **Modern UI**: Clean, intuitive interface with real-time updates
- **Security**: Built with HIPAA and GDPR compliance in mind

## Technology Stack

- **Frontend**: React.js with Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: Tailwind CSS with custom components

## Getting Started

See the [Installation Guide](./INSTALLATION.md) for detailed instructions on how to install and run the application.

## Demo Credentials

- **Email**: admin@fairfieldresponse.com
- **Password**: Admin123!

## Project Structure

```
fairfield-work-management/
├── public/                  # Static files
├── src/                     # Source code
│   ├── components/          # UI components
│   │   ├── dashboard/       # Dashboard section components
│   │   └── ui/              # Reusable UI components
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   ├── App.js               # Main application component
│   ├── index.js             # Application entry point
│   ├── index.css            # Custom CSS styles
│   └── tailwind.css         # Tailwind CSS imports
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── INSTALLATION.md          # Installation instructions
```

## Screenshots

The application includes the following main screens:
- Login Screen
- Dashboard
- Jobs Management
- Expenses Management
- Work Orders Management
- Staff Management
- Settings

## License

This project is proprietary software owned by Fairfield Response Group.

## Support

For support or questions, please contact support@fairfieldresponse.com
