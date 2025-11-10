import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Posts from './Posts'
import Admin from './Admin'
import AuthContext from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'

export default function App(){
  const { user } = useContext(AuthContext)
  return (
    <div>
      <nav className="bg-slate-300 shadow-lg">
        <div className="container flex items-center justify-between">
          <div className="py-1 font-bold text-4xl">MERN RBAC</div>
          <div className="flex gap-4 items-center">
            <Link to="/" className="text-l font-medium hover:text-slate-600 active:scale-90 transition-transform ">Home</Link>
            <Link to="/posts" className="text-l font-medium hover:text-slate-600 active:scale-90 transition-transform ">Posts</Link>
            {user ? <div className="text-l font-medium hover:text-slate-600">Hi, { user.role}</div> : <Link to="/login" className="text-l font-medium
             hover:text-red-600 active:scale-90 transition-transform ">Login</Link>}
            {/* user.name || */}
            {/* {user && user.role === 'Admin' && <Link to="/admin" className="text-sm">Admin</Link>} */}
          </div>
        </div>
      </nav>
      <main className="container mt-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/posts" element={<ProtectedRoute><Posts/></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
