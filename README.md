# Hydration Station Full-Stack Website

## Live Website 
- URL: hydration-station.live
  
**Login**:
- Email: guy
- Password: 123

## Overview
The Hydration Station website is a full-stack application that tracks and displays data from hydration stations, such as the number of bottles cleaned, soap levels, filter conditions, and the number of bottles filled. This data is gathered from sensor readings and displayed on a dashboard for users to monitor hydration station metrics.

## Features
- User authentication and role-based access control for different types of users (Admin, User, etc.).
- Dashboard to display sensor data in real-time using data visualizations.
- API endpoints for handling sensor data (GET, POST, PUT, DELETE).
- Built using React, Next.js, TypeScript, and Node.js.
- Uses d3.js for graph visualization on the dashboard.

## Project Structure
The project is organized into the following directories:

### Main Directories
- **app/**: Contains the main application files, including the user interface, layout, and page components.
  - **components/**: Reusable UI components like the navigation bar (`Navbar.tsx`) and station monitoring widgets (`StationMonitor.tsx`).
  - **dashboard/**: Displays metrics and data visualizations related to hydration stations (`dashboard/page.tsx`).
  - **signin/**: Handles user sign-in functionality (`signin/page.tsx`).
- **context/**: Contains context providers for managing global state (`StationContext.tsx`).
- **pages/api/**: Contains API routes for interacting with the hydration station database.
  - **get.ts**: Handles GET requests to fetch hydration station data.
  - **post.ts**: Handles POST requests to add new sensor data.
  - **delete.ts**: Handles DELETE requests to remove data.
  - **put.ts**: Handles PUT requests to update sensor information.
- **lib/**: Contains database connection setup (`db.ts`).
- **controllers/**: Includes business logic related to handling sensor data (`commands.ts`).

### Configuration Files
- **next.config.mjs**: Configuration for the Next.js framework.
- **package.json**: Lists project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration.
- **tailwind.config.ts**: Configuration for Tailwind CSS, used for styling.

## Installation 
If using web url, skip to Usage section.
To get started with the Hydration Station project, follow the steps below:

### Prerequisites
- Node.js (v14 or higher)
- npm or Yarn

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd hydrationstation-app
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory with the required database connection information.

4. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the website in the browser.

## Usage
- After signing in, users can navigate to the dashboard to view the current status of the hydration stations.
- The dashboard fetches real-time data from the database and displays it using visualizations.

## API Endpoints
The application provides several API endpoints to interact with the hydration station data:
- **GET /api/get**: Fetch sensor data for a hydration station.
- **POST /api/post**: Add new sensor data.
- **PUT /api/put**: Update sensor information.
- **DELETE /api/delete**: Remove existing sensor data.

## Technologies Used
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express (for API endpoints)
- **Database**: PostgreSQL (configured via `lib/db.ts`)
- **Visualization**: d3.js for displaying sensor data in graphical format

## Future Improvements
- Implement more granular role-based access control.
- Integrate real-time WebSocket communication for live updates without page reloads.
- Potentially migrate to AWS
- Fully implement d3.js data visualization


