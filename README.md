# TeamTask - Enterprise Task Management System

A professional task management application built with the MERN stack, featuring JWT authentication, role-based access control, and modern responsive design.

## 🎯 Overview

TeamTask is a production-ready task management system designed for teams and organizations. It provides managers with comprehensive oversight capabilities while enabling team members to efficiently track and update their assigned tasks.

## 🚀 Features

- **Authentication & Security**: JWT-based authentication with role-based access control
- **Task Management**: Complete CRUD operations with status workflow (Todo → In Progress → Completed)
- **Role-Based Permissions**: Managers (full access) vs Users (assigned tasks only)
- **Modern UI**: Responsive design with real-time updates and loading states
- **Dashboard Analytics**: Task statistics and recent activity overview
- **Team Management**: User overview and assignment capabilities

## 🛠️ Technology Stack

**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs  
**Frontend**: React 18, Redux Toolkit, React Router, Tailwind CSS, Vite  
**Database**: MongoDB Atlas (cloud) or local MongoDB

## 📋 Prerequisites

- **Node.js** (v16.0 or higher)
- **npm** (v7.0 or higher)
- **MongoDB Atlas** account or local MongoDB
- **Git** for version control

## 🔧 Installation & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd techtask
```

### 2. Backend Setup

```bash
cd server
npm install
```

**Create `.env` file in server directory:**

```env
# Database Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters

# Application Settings
NODE_ENV=development
PORT=5000

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

**Important**:

- Replace MongoDB credentials with your actual Atlas connection string
- Generate a strong JWT secret (32+ characters recommended)
- Never commit the `.env` file to version control

**Start backend server:**

```bash
npm start
```

Expected output:

```
Server running in development mode on port 5000
MongoDB Connected: <your-cluster-url>
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Expected output:

```
VITE v6.3.5  ready in 566 ms
➜  Local:   http://localhost:5173/
```

### 4. Database Setup (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster
3. Add IP address to whitelist (0.0.0.0/0 for development)
4. Create database user with read/write permissions
5. Copy connection string and update `MONGO_URI` in `.env`

## 🌐 Access Application

Open browser and navigate to: `http://localhost:5173`



## 📁 Project Structure

```
techtask/
├── server/                 # Backend (Node.js/Express)
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers (auth, tasks)
│   ├── middleware/        # Authentication middleware
│   ├── models/           # MongoDB models (User, Task)
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── .env              # Environment variables
│   └── server.js         # Application entry point
├── client/               # Frontend (React/Vite)
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── features/     # Redux slices & API calls
│   │   ├── pages/        # Page components
│   │   └── app/          # Redux store
│   └── package.json      # Dependencies
└── README.md
```

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - User login
- `GET /api/auth/users` - Get users (Manager only)

### Tasks

- `GET /api/tasks` - Get tasks (role-filtered)
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task (Manager only)


## 🎓 Project Information

**Demonstrates Proficiency In:**

- Full-Stack MERN Development
- JWT Authentication & Authorization
- MongoDB Schema Design
- Redux State Management
- Responsive UI/UX Design
- RESTful API Development
- Security Best Practices

**Key Technologies:** MongoDB, Express.js, React, Node.js, Redux Toolkit, Tailwind CSS

---

_Enterprise-level task management system showcasing modern web development practices and production-ready architecture._
