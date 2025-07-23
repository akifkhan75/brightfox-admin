import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../../components/common/Card.tsx';
import { Button } from '../../../components/common/Button.tsx';
import { Input } from '../../../components/common/Input.tsx';
import { SearchIcon, EllipsisHorizontalIcon } from '../../../components/icons.tsx';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchAllUsers, updateUser } from '../../features/appteam/userManagementSlice.ts';
import { AppUser, UserRole } from '../../../types.ts';

const UserManagement: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { users, status } = useSelector((state: RootState) => state.userManagement);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllUsers());
        }
    }, [status, dispatch]);
    
    const handleStatusChange = (user: AppUser) => {
        const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
        dispatch(updateUser({ id: user.id, data: { status: newStatus } }));
    };

    const filteredUsers = users
        .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(user => filterRole === 'All' || user.role === filterRole);

    return (
        <div className="p-8">
            <Card>
                <CardHeader title="User Management" />
                 <div className="flex justify-between items-center mb-6">
                    <div className="w-1/3">
                        <Input icon={<SearchIcon className="h-5 w-5 text-slate-400" />} placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium">Filter by role:</label>
                        <select onChange={(e) => setFilterRole(e.target.value)} value={filterRole} className="bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-md p-2 text-sm focus:ring-primary focus:border-primary">
                            <option>All</option>
                            <option value={UserRole.Teacher}>Teacher</option>
                            <option value={UserRole.AppTeam}>AppTeam</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-700">
                            <tr>
                                <th className="p-3">User</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Last Login</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {status === 'loading' && <tr><td colSpan={5} className="text-center p-4">Loading users...</td></tr>}
                            {filteredUsers.map((user: AppUser) => (
                                <tr key={user.id} className="border-b border-slate-200 dark:border-slate-700">
                                    <td className="p-3">
                                        <div className="flex items-center space-x-3">
                                            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-slate-800 dark:text-slate-100">{user.name}</p>
                                                <p className="text-sm text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3">{user.role}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'}`}>{user.status}</span>
                                    </td>
                                    <td className="p-3">{user.lastLogin}</td>
                                    <td className="p-3">
                                        <Button onClick={() => handleStatusChange(user)} variant={user.status === 'Active' ? 'danger' : 'primary'} size="sm">
                                            {user.status === 'Active' ? 'Suspend' : 'Activate'}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default UserManagement;
