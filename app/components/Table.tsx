'use client'
import React, { useState } from 'react';
import { ArrowUpDown, MoreVertical, Search, Check, X, Mail, ExternalLink } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: string;
  lastActive: string;
}

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const usersPerPage = 5;

  const users: User[] = [
    { id: 1, name: 'Fiona Garcia', email: 'fiona.garcia@example.com', status: 'inactive', role: 'User', lastActive: '1d ago' },
    { id: 2, name: 'George White', email: 'george.white@example.com', status: 'active', role: 'User', lastActive: '10m ago' },
    { id: 3, name: 'Hannah Clark', email: 'hannah.clark@example.com', status: 'active', role: 'Editor', lastActive: '3h ago' },
    { id: 4, name: 'Ian Martinez', email: 'ian.martinez@example.com', status: 'inactive', role: 'User', lastActive: '4d ago' },
    { id: 5, name: 'Julia Turner', email: 'julia.turner@example.com', status: 'active', role: 'Admin', lastActive: '2m ago' },
    { id: 6, name: 'Kevin Scott', email: 'kevin.scott@example.com', status: 'active', role: 'User', lastActive: '15m ago' },
    { id: 7, name: 'Laura Adams', email: 'laura.adams@example.com', status: 'inactive', role: 'Editor', lastActive: '6h ago' },
    { id: 8, name: 'Michael Hall', email: 'michael.hall@example.com', status: 'active', role: 'User', lastActive: '8m ago' },
    { id: 9, name: 'Nina Baker', email: 'nina.baker@example.com', status: 'active', role: 'Admin', lastActive: 'Just now' },
    { id: 10, name: 'Oscar Perez', email: 'oscar.perez@example.com', status: 'inactive', role: 'User', lastActive: '2d ago' },
    { id: 11, name: 'Paula Rivera', email: 'paula.rivera@example.com', status: 'active', role: 'Editor', lastActive: '12m ago' },
    { id: 12, name: 'Quinn Cooper', email: 'quinn.cooper@example.com', status: 'active', role: 'User', lastActive: '25m ago' },
    { id: 13, name: 'Rachel Murphy', email: 'rachel.murphy@example.com', status: 'inactive', role: 'Editor', lastActive: '5d ago' },
    { id: 14, name: 'Steve Rogers', email: 'steve.rogers@example.com', status: 'active', role: 'Admin', lastActive: '1m ago' },
    { id: 15, name: 'Tina Evans', email: 'tina.evans@example.com', status: 'active', role: 'User', lastActive: '30m ago' }
  ];

  const filteredUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortAsc ? a.id - b.id : b.id - a.id));

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your team members and their account permissions here.</p>
      </div>

      <div className="p-4 flex items-center justify-between border-b bg-gray-50">
        <div className="flex items-center space-x-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-lg border hover:border-blue-200 transition-colors"
          >
            <ArrowUpDown size={16} />
            <span className="text-sm font-medium">Sort by ID {sortAsc ? '(Asc)' : '(Desc)'}</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto sm:overflow-visible">
  <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
            <th className="w-20 px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
  {currentUsers.map((user) => (
    <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
      
      {/* User ID */}
      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{user.id}</td>
      
      {/* Name + Email */}
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            {user.name.charAt(0)}
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {user.status === 'active' ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
          {user.status}
        </span>
      </td>

      {/* Role */}
      <td className="px-6 py-4 text-sm text-gray-500">{user.role}</td>

      {/* Last Active */}
      <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded-lg" title="Send email">
            <Mail size={16} className="text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-lg" title="View profile">
            <ExternalLink size={16} className="text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-lg" title="More options">
            <MoreVertical size={16} className="text-gray-500" />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

      </table>
      </div>

      <div className="flex justify-between items-center p-4 border-t bg-gray-50">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 rounded-md text-sm border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 rounded-md text-sm border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
