# Taskflow - Multi-Tenant Project Management Platform

Taskflow is a full-stack project management application built for teams that work across multiple workspaces, projects, tasks, chats, and client contracts.

The goal of this project is to show how a real SaaS-style collaboration platform can be built using the MERN stack with authentication, role-based access control, workspace management, analytics, AI chat, and document workflows.

## Project Story

The idea for Taskflow came from a simple problem: most teams do not work in just one place. A freelancer may handle multiple clients, a startup may have different departments, and an agency may manage several projects at the same time.

Using separate tools for tasks, team chat, contracts, invoices, and AI support can quickly become confusing. I wanted to build one clean platform where a user can create a workspace, invite members, manage projects, assign tasks, communicate with the team, create contracts, and use an AI assistant from the same dashboard.

Taskflow was created as a practical learning project, but it is structured like a real product. It focuses on clean user flows, secure sessions, database relationships, reusable components, and scalable backend APIs.

## What Taskflow Does

- Allows users to sign up and log in using email/password or Google OAuth
- Creates a default workspace for every new user
- Supports multiple workspaces for different teams or clients
- Lets users create projects and tasks inside a workspace
- Provides task filtering by status, priority, assignee, project, and due date
- Includes role-based permissions for Owner, Admin, and Member users
- Lets workspace owners invite other members
- Shows workspace analytics such as total, overdue, and completed tasks
- Includes team chat for workspace members
- Includes an AI assistant powered by Google Gemini
- Supports contract creation, signing, finalization, and PDF download
- Uses cookie-based sessions for authentication

## Key Features

### Authentication

- Email and password login
- Google OAuth login
- Cookie-based session handling
- Protected frontend routes
- Logout and session clearing

### Workspace Management

- Create and manage multiple workspaces
- Automatically create a default workspace after registration
- Invite members using workspace invite codes
- Edit workspace details
- Delete workspace with related data cleanup

### Role-Based Access Control

Taskflow uses permissions to control what each user can do.

| Role | Description |
| --- | --- |
| Owner | Full access to workspace settings, members, projects, and tasks |
| Admin | Can manage projects, tasks, members, and settings |
| Member | Can view workspace data and work with assigned tasks |

### Projects and Tasks

- Create, edit, and delete projects
- Create, edit, and delete tasks
- Track task status and priority
- Assign tasks to workspace members
- Filter and paginate task lists
- View recent projects and recent tasks on the dashboard

### Team Chat

- Workspace-level chat
- User-specific sender information
- Persistent messages stored in MongoDB

### AI Chat Assistant

- Google Gemini integration
- User-specific AI chat history
- Conversation history stored in the database
- Clear chat history option

### Contracts

- Create contracts from templates
- Add multiple parties
- Capture signatures
- Finalize contracts
- Download finalized contract PDFs

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI style components
- React Router
- TanStack Query
- Axios

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Passport.js
- Cookie Session
- Zod validation

### External Services

- Google OAuth
- Google Gemini API
- SMTP email support

## Project Structure

```text
Taskflow/
├── backend/
│   ├── src/
│   │   ├── config/          # App, database, passport, and HTTP config
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Auth, async, and error middlewares
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API route definitions
│   │   ├── seeders/         # Database seed scripts
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helpers and reusable utilities
│   │   ├── validation/      # Zod validation schemas
│   │   └── index.ts         # Backend entry point
│   ├── package.json
│   └── tsconfig.json
│
├── client/
│   ├── src/
│   │   ├── components/      # Reusable UI and feature components
│   │   ├── context/         # Auth and query providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── layout/          # App and base layouts
│   │   ├── lib/             # API client and helpers
│   │   ├── page/            # Page-level screens
│   │   ├── routes/          # Frontend routing
│   │   └── main.tsx         # Frontend entry point
│   ├── package.json
│   └── vite.config.ts
│
├── vercel.json
├── LICENSE.md
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Yashraj-sherke/Taskflow.git
cd Taskflow
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Open a second terminal from the project root:

```bash
cd client
npm install
```

### 4. Configure Backend Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=8000
NODE_ENV=development
BASE_PATH=/api

MONGO_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow_db"

SESSION_SECRET="your_session_secret"
SESSION_EXPIRES_IN="1d"

GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

FRONTEND_ORIGIN=http://localhost:5173
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:5173/google/oauth/callback

GEMINI_API_KEY=<your_gemini_api_key>

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
EMAIL_FROM="Taskflow <no-reply@taskflow.local>"
```

### 5. Configure Frontend Environment Variables

Create a `.env` file inside the `client` folder.

```env
VITE_API_BASE_URL="http://localhost:8000/api"
```

### 6. Seed Required Roles

The app needs Owner, Admin, and Member roles before users can register and manage workspaces correctly.

Run this from the `backend` folder:

```bash
npm run seed
```

### 7. Run the Backend

From the `backend` folder:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:8000
```

### 8. Run the Frontend

From the `client` folder:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Useful Scripts

### Backend

```bash
npm run dev      # Start backend in development mode
npm run build    # Build TypeScript backend
npm run start    # Run built backend
npm run seed     # Seed roles and permissions
```

### Frontend

```bash
npm run dev      # Start Vite development server
npm run build    # Build frontend for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## API Overview

Main backend route prefix:

```text
/api
```

Important route groups:

| Area | Route Prefix |
| --- | --- |
| Auth | `/api/auth` |
| User | `/api/user` |
| Workspace | `/api/workspace` |
| Members | `/api/member` |
| Projects | `/api/project` |
| Tasks | `/api/task` |
| AI Chat | `/api/ai` |
| Team Chat | `/api/workspace-chat` |
| Contracts | `/api/contract` |

## Testing Notes

The project has been smoke-tested with a dummy account for:

- Registration
- Login
- Current user session
- Workspace loading
- Workspace analytics
- Project creation and listing
- Task creation and listing
- Members page
- Team chat
- AI chat history
- Contract creation and listing
- Settings page permission handling

Both builds were also verified:

```bash
cd backend
npm run build

cd ../client
npm run build
```

## What I Learned

While building Taskflow, I worked with:

- Designing a multi-tenant database structure
- Handling authentication with both local login and Google OAuth
- Managing secure sessions with cookies
- Building protected routes in React
- Creating reusable frontend components
- Implementing role-based permissions
- Writing service-based backend logic
- Using MongoDB transactions for safer data creation
- Integrating AI and PDF/document workflows into a real app

## Why This Project Matters

Taskflow is more than a CRUD app. It demonstrates how different parts of a real business application connect together:

- Users need authentication
- Teams need workspaces
- Workspaces need roles and permissions
- Projects need tasks
- Teams need communication
- Businesses need contracts
- Modern apps can benefit from AI assistance

This makes Taskflow a strong portfolio project for showing full-stack development, product thinking, and practical backend/frontend integration.

## Future Improvements

- Add automated unit and integration tests
- Add real-time chat using WebSockets
- Add email invite delivery
- Add invoice management and payment tracking
- Add file attachments for tasks and contracts
- Add more detailed analytics dashboards
- Improve AI rate-limit handling and user feedback
- Add Docker setup for easier deployment

## Author

Yashraj Sherke

- GitHub: [@Yashraj-sherke](https://github.com/Yashraj-sherke)

## License

This project is licensed under the terms included in [LICENSE.md](LICENSE.md).
