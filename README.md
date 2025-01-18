# Hydration Station Full-Stack Website

## Live Website 
- URL: [hydration-station.live](https://main.d30o46gfw7s3wg.amplifyapp.com
  
**Login**:
- Email: guy
- Password: 123

## Overview
The Hydration Station website is a full-stack application that tracks and displays data from hydration stations, such as the number of bottles cleaned, soap levels, filter conditions, and the number of bottles filled. This data is gathered from sensor readings and displayed on a dashboard for users to monitor hydration station metrics. 

## Repo Specific
As we transition our full-stack application to AWS, we are breaking the application into separate components for the backend and frontend. This repository specifically contains the frontend of the Hydration Station website, which is responsible for displaying data and user interactions.

## Project Structure
The project is organized into the following directories:

### Main Directories
- **app/**: Contains the main application files, including the user interface, layout, and page components.
  - **components/**: Reusable UI components like the navigation bar (`Navbar.tsx`) and station monitoring widgets (`StationMonitor.tsx`).
  - **dashboard/**: Displays metrics and data visualizations related to hydration stations (`dashboard/page.tsx`).
  - **signin/**: Handles user sign-in functionality (`signin/page.tsx`).

### Configuration Files
- **next.config.mjs**: Configuration for the Next.js framework.
- **package.json**: Lists project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration.
- **tailwind.config.ts**: Configuration for Tailwind CSS, used for styling.
