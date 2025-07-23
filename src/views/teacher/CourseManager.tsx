
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../../components/common/Card.tsx';
import { Button } from '../../../components/common/Button.tsx';
import { PlusIcon } from '../../../components/icons.tsx';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchCourses } from '../../features/courses/coursesSlice.ts';
import { Course } from '../../../types.ts';

const CourseManager: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { items: courses, status: coursesStatus } = useSelector((state: RootState) => state.courses);

    useEffect(() => {
        if (coursesStatus === 'idle') {
            dispatch(fetchCourses());
        }
    }, [coursesStatus, dispatch]);
    
    return (
        <div className="p-8">
            <Card>
                <CardHeader title="Course Manager" action={<Button variant="primary" leftIcon={<PlusIcon className="w-5 h-5"/>}>Create New Course</Button>} />
                <p className="text-slate-600 dark:text-slate-300">Manage your existing courses and create new ones. Use templates or build from scratch.</p>
                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coursesStatus === 'loading' && <p>Loading courses...</p>}
                    {coursesStatus === 'failed' && <p className="text-red-500">Failed to load courses.</p>}
                    {coursesStatus === 'succeeded' && courses.map((course: Course) => (
                        <Card key={course.id} className="hover:shadow-xl transition-shadow">
                            <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded-t-xl"/>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 mb-1">{course.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{course.category}</p>
                                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                                   <span>{course.students} students</span>
                                   <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                       course.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100' : 
                                       course.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100' :
                                       'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100'
                                   }`}>{course.status}</span>
                                </div>
                                <Button variant="outline" size="sm" className="w-full mt-4">Edit Course</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default CourseManager;