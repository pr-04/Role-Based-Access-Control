import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

export default function Admin(){
  const { accessToken } = useContext(AuthContext)
  const [users, setUsers] = useState([])

  useEffect(()=>{ fetchUsers() }, [])

  async function fetchUsers(){
    const res = await axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials:true })
    setUsers(res.data)
  }

  async function changeRole(id, role){
    await axios.put(`/api/admin/users/${id}/role`, { role }, { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials:true })
    fetchUsers()
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Admin — Manage Users</h2>
      <div className="space-y-2">
        {users.map(u => (
          <div key={u._id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-medium">{u.name} — {u.email}</div>
              <div className="text-sm text-gray-500">Role: {u.role}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>changeRole(u._id,'Admin')} className="px-2 py-1 rounded bg-indigo-600 text-white">Admin</button>
              <button onClick={()=>changeRole(u._id,'Editor')} className="px-2 py-1 rounded bg-blue-600 text-white">Editor</button>
              <button onClick={()=>changeRole(u._id,'Viewer')} className="px-2 py-1 rounded bg-gray-400 text-white">Viewer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
