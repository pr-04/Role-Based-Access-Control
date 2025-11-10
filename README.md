# 🔐 MERN Role-Based Access Control (RBAC) System

A full-stack **Role-Based Access Control (RBAC)** application built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It demonstrates secure **authentication**, **authorization**, and **role-based routing** with separate access for different user roles.

---

## 🚀 Features

✅ User registration and login (JWT-based authentication)  
✅ Role-based access (Admin / Editor / Viewer)  
✅ Protected routes using React Router  
✅ Password hashing with bcrypt  
✅ RESTful API using Express.js  
✅ MongoDB Atlas for cloud database  
✅ Login persistence using HTTP-only cookies  
✅ Separate frontend (React) and backend (Node.js + Express)  
✅ Deployed using Vercel (frontend) & Render (backend)

---

## 🏗️ Tech Stack

### **Frontend**
- React.js
- Axios
- React Router DOM
- Context API

### **Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (JSON Web Token)
- bcrypt.js
- dotenv
- cookie-parser
- cors

### **Deployment**
- **Frontend:** [Vercel](https://vercel.com)
- **Backend:** [Render](https://render.com)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 📁 Folder Structure

MERN-RBAC/
│
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ ├── middleware/
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│
├── .gitignore
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file **inside the backend folder** and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173



