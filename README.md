# TaskFlow API

A full-stack task management application built with Node.js, Express, React, and MongoDB.

## 📋 Project Overview

TaskFlow API is a complete full-stack application for managing tasks with authentication, authorization, and role-based access control.

**Stack:**
- Backend: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcryptjs, Zod, Helmet, Morgan, Swagger
- Frontend: React (Vite), Axios, React Router DOM

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key_here
```

4. Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📁 Project Structure

```
TaskFlow API/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app setup
│   │   ├── server.js              # Server entry point
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js  # Auth logic
│   │   │   ├── taskController.js  # Task CRUD
│   │   │   └── adminController.js # Admin routes
│   │   ├── models/
│   │   │   ├── User.js            # User schema
│   │   │   └── Task.js            # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Auth endpoints
│   │   │   ├── taskRoutes.js      # Task endpoints
│   │   │   └── adminRoutes.js     # Admin endpoints
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js      # JWT verification
│   │   │   ├── roleMiddleware.js      # Role-based access
│   │   │   ├── validateMiddleware.js  # Request validation
│   │   │   └── errorMiddleware.js     # Error handling
│   │   ├── validators/
│   │   │   ├── authValidation.js  # Auth schemas
│   │   │   └── taskValidation.js  # Task schemas
│   │   └── docs/
│   │       └── swagger.js         # Swagger docs
│   ├── .env.example               # Example env variables
│   ├── package.json
│   └── postman_collection.json   # Postman API collection
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app with router
│   │   ├── api.js                # Axios instance
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Register page
│   │   │   └── Dashboard.jsx     # Task dashboard
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user (returns JWT token)

### Tasks (Protected Routes)
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks` - Get user's tasks
- `GET /api/v1/tasks/:id` - Get specific task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Admin (Admin Only)
- `GET /api/v1/admin/users` - Get all users
- `DELETE /api/v1/admin/users/:id` - Delete user

## 📚 API Documentation

Swagger documentation available at:
```
http://localhost:5000/api-docs
```

## 🧪 Testing

### Using Postman
1. Import `backend/postman_collection.json` into Postman
2. Set `{{token}}` variable in environment after login
3. Test all endpoints

### Example requests:

**Register:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

**Create Task:**
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My Task","description":"Do something"}'
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication with 7-day expiry
- ✅ Role-based access control (USER/ADMIN)
- ✅ Input validation with Zod
- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Password never returned in responses

## 🎨 Frontend Features

- ✅ User registration and login
- ✅ JWT token stored in localStorage
- ✅ Protected dashboard route
- ✅ Create, read, update, delete tasks
- ✅ Automatic token attachment to API requests
- ✅ Error message display
- ✅ Logout functionality

## 📝 User Roles

- **USER**: Can manage their own tasks
- **ADMIN**: Can view all users and delete users

## 🛠 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/taskflow |
| JWT_SECRET | JWT signing secret | your_secret_key_here |

## 📦 Dependencies

### Backend
- express (v5.2.1)
- mongoose (v9.6.3)
- bcryptjs (v3.0.3)
- jsonwebtoken (v9.0.3)
- zod (v4.4.3)
- helmet (v8.2.0)
- morgan (v1.10.1)
- cors (v2.8.6)
- swagger-ui-express (v5.0.1)
- swagger-jsdoc (v6.3.0)

### Frontend
- react (v19.2.6)
- react-dom (v19.2.6)
- react-router-dom (v7.16.0)
- axios (v1.16.1)
- vite (v8.0.12)

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist includes your machine
- Ensure `.env` file exists with proper variables

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check CORS is enabled in Express app
- Verify axios baseURL is `http://localhost:5000/api/v1`

### Token expired
- Log out and log in again
- JWT tokens expire after 7 days

## 📄 License

ISC

## 👨‍💻 Author

TaskFlow Team

---

**Built with ❤️ using Node.js, Express, React, and MongoDB**
