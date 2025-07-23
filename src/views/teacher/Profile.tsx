import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../../components/common/Card.tsx';
import { Button } from '../../../components/common/Button.tsx';
import { Input } from '../../../components/common/Input.tsx';
import { ShieldCheckIcon } from '../../../components/icons.tsx';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchProfile, updateProfile } from '../../features/profile/profileSlice.ts';

const Profile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { data: profile, status } = useSelector((state: RootState) => state.profile);
    const [bio, setBio] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProfile());
        }
        if (profile) {
            setBio(profile.bio);
        }
    }, [status, dispatch, profile]);

    const handleSave = () => {
        dispatch(updateProfile({ bio }));
    };

    if (status === 'loading' || !profile) return <div className="p-8">Loading profile...</div>;

    return (
        <div className="p-8">
            <Card>
                <CardHeader title="Profile & Verification" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Picture and Status */}
                    <div className="md:col-span-1 flex flex-col items-center">
                        <img src={profile.avatarUrl} alt={profile.name} className="w-32 h-32 rounded-full mb-4 ring-4 ring-primary/20" />
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{profile.name}</h2>
                        <p className="text-slate-500 dark:text-slate-400">{profile.email}</p>
                        {profile.isVerified && (
                            <div className="mt-4 flex items-center space-x-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-3 py-1 rounded-full">
                                <ShieldCheckIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">Verified Teacher</span>
                            </div>
                        )}
                        <Button variant="outline" size="sm" className="mt-4">Change Picture</Button>
                    </div>

                    {/* Profile Form */}
                    <div className="md:col-span-2 space-y-6">
                        <Input label="Full Name" id="fullName" value={profile.name} disabled />
                        <Input label="Email Address" id="email" value={profile.email} disabled />
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Bio</label>
                            <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={5}
                                className="block w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Tell us about yourself..." />
                        </div>
                        <div className="flex justify-end space-x-2">
                             <Button variant="outline">Cancel</Button>
                             <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
