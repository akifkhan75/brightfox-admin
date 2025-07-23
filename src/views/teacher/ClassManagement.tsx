import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../components/common/Card.tsx';
import { Button } from '../../components/common/Button.tsx';
import { Input } from '../../components/common/Input.tsx';
import { Modal } from '../../components/common/Modal.tsx';
import { PlusIcon, UsersIcon, BellIcon } from '../../components/icons.tsx';
import { AppDispatch, RootState } from '../../store/store.ts';
import { fetchClasses, createClass, sendAnnouncement } from '../../store/slice/classes/classesSlice.ts';
import { Class, Student } from '../../../types.ts';

const ClassManagement: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { items: classes, status } = useSelector((state: RootState) => state.classes);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isRosterModalOpen, setRosterModalOpen] = useState(false);
    const [isAnnouncementModalOpen, setAnnouncementModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [newClassName, setNewClassName] = useState('');
    const [newClassDesc, setNewClassDesc] = useState('');
    const [announcement, setAnnouncement] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchClasses());
        }
    }, [status, dispatch]);

    const handleCreateClass = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createClass({ name: newClassName, description: newClassDesc }));
        setNewClassName('');
        setNewClassDesc('');
        setCreateModalOpen(false);
    };

    const handleSendAnnouncement = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedClass) {
            dispatch(sendAnnouncement({ classId: selectedClass.id, message: announcement }));
            setAnnouncement('');
            setAnnouncementModalOpen(false);
        }
    };
    
    const openRoster = (cls: Class) => {
        setSelectedClass(cls);
        setRosterModalOpen(true);
    };
    
    const openAnnouncement = (cls: Class) => {
        setSelectedClass(cls);
        setAnnouncementModalOpen(true);
    };

    return (
        <div className="p-8">
            <Card>
                <CardHeader title="Class Management" action={<Button onClick={() => setCreateModalOpen(true)} variant="primary" leftIcon={<PlusIcon className="w-5 h-5"/>}>Create New Class</Button>} />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {status === 'loading' && <p>Loading classes...</p>}
                    {classes.map((cls) => (
                        <Card key={cls.id}>
                            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">{cls.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{cls.description}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4"><UsersIcon className="w-4 h-4 inline mr-1"/>{cls.studentCount} Students</p>
                            {cls.lastAnnouncement && <p className="text-xs text-slate-500 dark:text-slate-400 italic">Last announcement: "{cls.lastAnnouncement}"</p>}
                            <div className="mt-4 flex space-x-2">
                                <Button onClick={() => openRoster(cls)} variant="outline" size="sm">View Roster</Button>
                                <Button onClick={() => openAnnouncement(cls)} variant="secondary" size="sm">Send Announcement</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>

            {/* Create Class Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Class">
                <form onSubmit={handleCreateClass} className="space-y-4">
                    <Input label="Class Name" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="e.g., Grade 3 Math" required />
                    <Input label="Description" value={newClassDesc} onChange={(e) => setNewClassDesc(e.target.value)} placeholder="A brief description of the class" required />
                    <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create Class</Button>
                    </div>
                </form>
            </Modal>
            
            {/* Roster Modal */}
            <Modal isOpen={isRosterModalOpen} onClose={() => setRosterModalOpen(false)} title={`Roster for ${selectedClass?.name}`}>
                 <ul className="space-y-3">
                    {selectedClass?.students.map((student: Student) => (
                        <li key={student.id} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-700">
                          <img src={student.avatarUrl} alt={student.name} className="h-10 w-10 rounded-full" />
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-100">{student.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Joined: {student.joined}</p>
                          </div>
                        </li>
                    ))}
                 </ul>
            </Modal>

            {/* Announcement Modal */}
            <Modal isOpen={isAnnouncementModalOpen} onClose={() => setAnnouncementModalOpen(false)} title={`Send Announcement to ${selectedClass?.name}`}>
                 <form onSubmit={handleSendAnnouncement} className="space-y-4">
                    <div>
                        <label htmlFor="announcement" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                        <textarea id="announcement" value={announcement} onChange={(e) => setAnnouncement(e.target.value)} rows={4}
                            className="block w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Type your announcement here..." required />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => setAnnouncementModalOpen(false)}>Cancel</Button>
                        <Button type="submit" leftIcon={<BellIcon className="w-4 h-4"/>}>Send</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ClassManagement;
