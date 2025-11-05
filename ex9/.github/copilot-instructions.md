# AI Agent Instructions for MicroLearn Project

## Project Overview
This is a micro-learning platform built with a MERN stack (MongoDB, Express.js, React, Node.js) architecture. The project consists of two main components:

- Frontend (`/frontend`): React application built with Vite
- Backend (`/server`): Express.js server with MongoDB database

## Architecture and Data Flow

### Backend Structure
- Express server (`server/server.js`) runs on port 5001
- MongoDB connection at `mongodb://localhost:27017/microlearn`
- RESTful API routes:
  - `/api/lessons`: Lesson management
  - `/api/quizzes`: Quiz management

### Data Models
1. Lesson Model (`server/models/Lesson.js`):
   ```javascript
   {
     title: String,
     content: String
   }
   ```

2. Quiz Model (`server/models/Quiz.js`):
   ```javascript
   {
     lessonId: String,
     question: String,
     options: [String],
     answer: String
   }
   ```

## Development Workflow

### Setup and Running
1. Backend:
   ```bash
   cd server
   npm install
   npm start  # Runs on port 5001
   ```

2. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev  # Runs Vite dev server
   ```

### Key Dependencies
- Frontend: Vite + React (with HMR)
- Backend: Express.js, Mongoose
- Database: MongoDB

## Development Patterns

### API Integration
- Frontend components make HTTP requests to the backend API endpoints
- Cross-Origin Resource Sharing (CORS) is enabled on the backend
- Backend routes are modular and located in `server/routes/`

### Component Structure
- React components are function-based
- UI components follow a simple, clean styling approach using inline styles
- Components are organized by feature in `frontend/src/components/`

### Error Handling
- MongoDB connection errors are logged with ❌ prefix
- Successful connections are logged with ✅ prefix

## Important Files
- `server/server.js`: Main server configuration and setup
- `frontend/src/App.jsx`: Main React application component
- `server/routes/`: API route definitions
- `server/models/`: Mongoose schema definitions

## Common Tasks
1. Adding a new API endpoint:
   - Create route handler in appropriate file under `server/routes/`
   - Register route in `server/server.js`

2. Creating a new React component:
   - Add component file in `frontend/src/components/`
   - Import and use in parent component

3. Database Operations:
   - Use Mongoose models defined in `server/models/`
   - Follow existing schema patterns for consistency