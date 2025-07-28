# WonderKid Admin Dashboard

This is a comprehensive admin dashboard for the WonderKid platform, featuring separate views for Teachers and the App Team. It's built with React, Redux Toolkit, and Tailwind CSS, and uses a mock Node.js/Express backend for data.

## Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/en/) (which includes npm)

## Installation

1.  **Clone the repository or download the source code.**

2.  **Install backend dependencies:**
    Navigate to the project's root directory in your terminal and run:
    ```bash
    npm install
    ```

## Running the Application

You will need to run two separate processes in two different terminal windows: one for the backend API and one for the frontend server.

### 1. Start the Backend Server

In your first terminal, from the project root, run:
```bash
npm install
npm start
```
This will start the mock API server. By default, it runs on `http://localhost:4000`. You should see a message confirming that the server is running.

### 2. Start the Frontend Server

In your second terminal, from the project root, run:
```bash
npm run dev
```

The server will provide a URL where you can access the application, typically `http://localhost:8080`.

### 3. Access the App

Open your web browser and navigate to the URL provided by `http-server` (e.g., `http://localhost:8080`). You should now see the WonderKid Admin Dashboard.

