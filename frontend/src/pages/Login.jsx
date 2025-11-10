import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      navigate('/posts');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-300 p-6 rounded-lg shadow-2xl">
      <h1 className="text-3xl font-semibold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded-lg"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded-lg"
        />
        <button className="w-full bg-slate-800 text-white p-2 rounded-lg 
        hover:bg-green-800 active:scale-90 transition-transform active:bg-slate-800">
          Login
        </button>
      </form>
      <div className="mt-3 text-sm text-gray-500">
        Seeded users: admin@example.com / AdminPass123
      </div>
    </div>
  );
}
