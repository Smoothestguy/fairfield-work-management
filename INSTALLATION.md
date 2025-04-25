# Fairfield Work Management System - Installation Guide

This guide will walk you through the steps to install and run the Fairfield Response Group Work Management System on your computer.

## Prerequisites

1. **Node.js**: Install Node.js v16 or higher
   - Download from: https://nodejs.org/
   - Verify installation: `node -v` and `npm -v`

2. **Git** (optional): For cloning the repository
   - Download from: https://git-scm.com/downloads
   - Verify installation: `git --version`

## Installation Steps

### 1. Download or Clone the Repository

#### Option 1: Download the ZIP file
- Download the ZIP file containing the project
- Extract it to a location on your computer

#### Option 2: Clone using Git
```bash
git clone https://github.com/fairfield-response/work-management.git
cd fairfield-work-management-fixed
```

### 2. Install Dependencies

Open a terminal or command prompt in the project directory and run:

```bash
npm install
```

This will install all the required dependencies, including React, React Router, Tailwind CSS, and other packages.

### 3. Start the Development Server

Once the dependencies are installed, start the development server:

```bash
npm start
```

This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

### 4. Login to the Application

Use the following demo credentials to log in:
- Email: admin@fairfieldresponse.com
- Password: Admin123!

## Troubleshooting

### If you encounter Tailwind CSS issues:

1. Make sure you have the correct versions of the dependencies:
   ```bash
   npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
   ```

2. Verify that the PostCSS configuration is correct:
   ```bash
   # Check if postcss.config.js exists and has the correct content
   cat postcss.config.js
   ```

3. Clear your browser cache or try in incognito mode

### If the application doesn't start:

1. Check for errors in the terminal
2. Verify that port 3000 is not in use by another application
3. Try running with the verbose flag:
   ```bash
   npm start -- --verbose
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder that you can deploy to a web server.

## Additional Information

- The application is designed to work in both online and offline modes
- All data is stored locally when offline and synced when connection is restored
- The UI is responsive and works on both desktop and mobile devices

For more detailed documentation, refer to the README.md file in the project directory.
