// components/UserList.tsx
import React, { useState } from 'react';
import UserCard from './UserCard';
import { User } from '../types/types';

interface UserListProps {
  users: User[];
  onViewProfile: (userId: number) => void;
  onAddUser: () => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onViewProfile,
  onAddUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className='space-y-4 px-2 sm:px-0'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div className='flex-1'>
          <input
            type='text'
            placeholder='Search by name or email...'
            className='w-full p-2 border rounded'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex space-x-2'>
          <select
            className='p-2 border rounded'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value='all'>All Users</option>
            <option value='active'>Active Users</option>
            <option value='inactive'>Inactive Users</option>
          </select>
          <button
            onClick={onAddUser}
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
          >
            Add User
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className='p-8 text-center text-gray-500'>
          No users found matching your criteria.
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onViewProfile={onViewProfile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
