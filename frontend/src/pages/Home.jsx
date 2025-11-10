// import React from 'react'

// export default function Home(){
//   return (
//     <div className="bg-slate-300 p-6 rounded shadow">
//       <h1 className="text-2xl font-bold">Welcome to MERN RBAC System</h1>
//       <p className="mt-2 text-gray-600">A secure MERN stack app with fine-grained Role-Based Access Control.</p>
//     </div>
//   )
// }

import React from 'react';

export default function Home() {
  const roles = [
    {
      role: 'Admin',
      access: 'Full Control',
      permissions:
        'Can Add, Edit, and Delete any post in the system. The Admin has complete management control over both users and content.',
      color: 'border-red-500 bg-red-100',
      icon: '🛠️',
    },
    {
      role: 'Editor',
      access: 'Write/Edit',
      permissions:
        'Can View all posts and is permitted to Edit existing posts. Cannot create new posts or delete posts.',
      color: 'border-blue-500 bg-blue-100',
      icon: '✏️',
    },
    {
      role: 'Viewer',
      access: 'Read-Only',
      permissions:
        'Can View published posts only. Cannot create, edit, or delete any posts. This role is strictly for consuming content.',
      color: 'border-green-500 bg-green-100',
      icon: '👀',
    },
  ];

  return (
    <div className="bg-slate-300 p-6 rounded shadow-2xl">
      <h1 className="text-2xl font-bold">Welcome to MERN RBAC System</h1>
      <p className="mt-2 text-gray-600">
        A secure MERN stack app with fine-grained Role-Based Access Control.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">
        Role Access Levels
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {roles.map((r) => (
          <div
            key={r.role}
            className={`p-4 rounded-lg shadow border-l-4 ${r.color} transition-all hover:shadow-xl`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{r.icon}</span>
              <h3 className="text-2xl font-semibold text-gray-800">{r.role}</h3>
            </div>
            <p className="text-gray-700 text-sm">
              <strong>Access Level:</strong> {r.access}
            </p>
            <p className="text-gray-600 text-sm mt-1">{r.permissions}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-600 text-sm mt-6">
        © {new Date().getFullYear()} MERN RBAC System
      </p>
    </div>
  );
}

