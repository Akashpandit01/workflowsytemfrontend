<div align="center">

<img src="YOUR_LOGO_URL" width="120"/>

# WorkflowX Frontend

### Collaborative Workflow Orchestration System Frontend

<p>
Modern realtime workflow management frontend built using React.js, Bootstrap, Socket.IO, and premium responsive UI design.
</p>

<br/>

<img src="https://img.shields.io/badge/React.js-Frontend-61DAFB?style=for-the-badge&logo=react"/>
<img src="https://img.shields.io/badge/Vite-Build_Tool-purple?style=for-the-badge&logo=vite"/>
<img src="https://img.shields.io/badge/Bootstrap-UI_Framework-7952B3?style=for-the-badge&logo=bootstrap"/>
<img src="https://img.shields.io/badge/Socket.IO-Realtime-black?style=for-the-badge&logo=socketdotio"/>
<img src="https://img.shields.io/badge/Axios-API_Client-5A29E4?style=for-the-badge"/>

<br/>
<br/>

<a href="https://workflowsytemfrontend.vercel.app/">
  <img src="https://img.shields.io/badge/Live_App-Vercel-black?style=for-the-badge&logo=vercel"/>
</a>

<a href="https://github.com/Akashpandit01/workflowsytemfrontend/tree/main/workflowsytemfrontends">
  <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/>
</a>

</div>

---

# Project Introduction

WorkflowX Frontend is a modern React-based interface for collaborative workflow orchestration and project management.

The frontend provides:

* realtime collaboration
* task management
* execution visualization
* workflow simulation
* dependency handling
* premium dark/light UI experience

The application communicates with the backend using REST APIs and Socket.IO realtime events.

---

# Main Features

## Authentication

* User Signup
* User Login
* JWT token persistence
* Protected routes

---

## Dashboard

* Create projects
* Open projects
* Generate invite links
* Navigate simulations

---

## Project Workspace

* Create tasks
* Edit tasks
* Retry failed tasks
* Dependency selection
* Task history view
* Status updates
* Execution plan visualization

---

## Workflow Simulation

* Simulate daily execution
* Available hour input
* Execution order generation
* Blocked task tracking
* Skipped task tracking

---

## Realtime Features

Implemented using Socket.IO.

Realtime updates:

* task-created
* task-updated
* retry-attempted

---

## Premium UI Features

* Dark/Light theme toggle
* Responsive design
* Glassmorphism cards
* Gradient buttons
* Smooth animations
* Modern dashboard layout

---

# Tech Stack

| Technology       | Purpose                |
| ---------------- | ---------------------- |
| React.js         | Frontend Framework     |
| React Router     | Routing                |
| Axios            | API Requests           |
| Bootstrap        | UI Styling             |
| Socket.IO Client | Realtime Communication |
| React Icons      | Icons                  |
| Vite             | Build Tool             |

---

# Frontend Architecture

```text id="wglr6n"
Pages
  ↓
Components
  ↓
Context API
  ↓
Axios Services
  ↓
Backend APIs
```

---

# Folder Structure

```text id="2u1n2h"
frontend/
 ├── src/
 │   ├── components/
 │   ├── context/
 │   ├── pages/
 │   ├── routes/
 │   ├── services/
 │   ├── socket/
 │   ├── styles/
 │   ├── App.jsx
 │   └── main.jsx
```

---

# Main Pages

## Home Page

Landing page with premium UI.

## Login / Signup

Authentication pages.

## Dashboard

Project management workspace.

## Project Page

Task orchestration interface.

## Simulation Page

Workflow simulation dashboard.

---

# Installation

## Clone Repository

```bash id="ngtl5v"
git clone YOUR_GITHUB_LINK
```

---

# Install Dependencies

```bash id="0n8l89"
npm install
```

---

# Run Frontend

```bash id="bl9mp8"
npm run dev
```

---

# Environment Configuration

Update backend API URL inside:

```text id="a6ax9f"
src/services/api.js
```

Example:

```js id="d3nxln"
baseURL:
  "https://your-backend.onrender.com/api"
```

---

# Authentication Flow

```text id="ut0k0q"
Login
  ↓
JWT Token Generated
  ↓
Stored in localStorage
  ↓
Axios Interceptor Adds Token
  ↓
Protected API Access
```

---

# Theme System

The frontend supports:

* Dark Mode
* Light Mode

Theme state is stored in:

* localStorage

---

# Realtime Workflow

```text id="pj5qg5"
Task Update
   ↓
Socket.IO Event
   ↓
Frontend Receives Update
   ↓
UI Instantly Updates
```

---

# Deployment

## Frontend Deployment

Deployed on Vercel.

## Backend API

Connected with Render backend.

---

# Future Improvements

* Drag & Drop Kanban Board
* Notifications
* Advanced Charts
* Analytics Dashboard
* Team Activity Feed
* Calendar Integration

---

# Learning Outcomes

This project improved understanding of:

* React architecture
* realtime frontend systems
* responsive UI design
* Socket.IO integration
* workflow visualization
* frontend state management

---

# Author

## Akash Pandit

Full Stack MERN Developer
