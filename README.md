# TeamTask - MERN Stack Task Management App

A simple task management application with JWT authentication and role-based access control.

## Features

- **Authentication**: JWT-based login/register
- **Roles**: Manager (full access) / User (assigned tasks only)
- **Tasks**: Create, assign, update status, delete
- **Dashboard**: Task statistics and recent activity
- **Team**: View team members (Manager only)

## Tech Stack

**Backend**: Node.js, Express, MongoDB, JWT  
**Frontend**: React, Redux Toolkit, Tailwind CSS, Vite

## Quick Start

### 1. Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000
```

Start server:

```bash
npm start
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 3. Access

Open `http://localhost:5173`

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/users` - Get users (Manager only)
- `GET /api/tasks` - Get tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task (Manager only)

## Project Structure

```
techtask/
├── server/          # Backend (Node.js/Express)
├── client/          # Frontend (React/Vite)
└── README.md
```
