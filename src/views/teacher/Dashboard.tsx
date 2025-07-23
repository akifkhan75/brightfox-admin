
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../../components/common/Card.tsx';
import { Button } from '../../../components/common/Button.tsx';
import { Course, ScheduledItem, ActivityData } from '../../../types.ts';
import { ArrowRightIcon, ChevronDownIcon, EllipsisHorizontalIcon, PlusIcon, SparklesIcon, ClockIcon, SolidStarIcon } from '../../../components/icons.tsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchCourses } from '../../features/courses/coursesSlice.ts';
import { fetchSchedule } from '../../features/schedule/scheduleSlice.ts';
import { fetchActivity } from '../../features/activity/activitySlice.ts';

const TeacherDashboard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { items: courses, status: coursesStatus } = useSelector((state: RootState) => state.courses);
    const { items: scheduleItems, status: scheduleStatus } = useSelector((state: RootState) => state.schedule);
    const { data: activityData, status: activityStatus } = useSelector((state: RootState) => state.activity);
    const { darkMode } = useSelector((state: RootState) => state.ui);

    useEffect(() => {
        if (coursesStatus === 'idle') {
            dispatch(fetchCourses());
        }
        if (scheduleStatus === 'idle') {
            dispatch(fetchSchedule());
        }
        if (activityStatus === 'idle') {
            dispatch(fetchActivity());
        }
    }, [coursesStatus, scheduleStatus, activityStatus, dispatch]);
    
    // Simple loading/error state for the whole page for brevity
    if (coursesStatus === 'loading' || scheduleStatus === 'loading' || activityStatus === 'loading') {
        return <div className="p-8 text-center">Loading dashboard data...</div>
    }
    
    if (coursesStatus === 'failed' || scheduleStatus === 'failed' || activityStatus === 'failed') {
        return <div className="p-8 text-center text-red-500">Failed to load dashboard data.</div>
    }

    return (
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - Left and Middle (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
                {/* Hero Banner */}
                <div className="bg-gradient-to-r from-primary to-purple-500 dark:from-primary-dark dark:to-purple-700 p-8 rounded-xl shadow-lg text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full opacity-50 transform rotate-45"></div>
                    <div className="absolute bottom-5 left-5 w-20 h-20 bg-white/5 rounded-full opacity-30"></div>
                    <SparklesIcon className="w-12 h-12 text-yellow-300 absolute top-6 right-6 opacity-70" />
                    <p className="text-sm font-medium uppercase tracking-wider mb-2 text-purple-200">Online Course</p>
                    <h2 className="text-3xl font-bold mb-4">Sharpen Your Skills with Professional Online Courses</h2>
                    <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-slate-100 dark:bg-slate-100 dark:text-primary-dark dark:hover:bg-slate-200">
                        Join Now <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Button>
                </div>

                {/* Courses Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Courses</h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Filter:</span> 
                            <Button variant="outline" size="sm" className="bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light border-primary/20 dark:border-primary-light/20">
                                In Progress <ChevronDownIcon className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {courses.slice(0, 2).map((course: Course) => (
                            <Card key={course.id} className={`${course.bgColorClass} dark:bg-opacity-20 !p-0 overflow-hidden`}>
                                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover"/>
                                <div className="p-5">
                                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">{course.title}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{course.category}</p>
                                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex -space-x-2">
                                                <img src="https://picsum.photos/seed/avatar1/24/24" alt="user" className="w-6 h-6 rounded-full border-2 border-white dark:border-darkcard"/>
                                                <img src="https://picsum.photos/seed/avatar2/24/24" alt="user" className="w-6 h-6 rounded-full border-2 border-white dark:border-darkcard"/>
                                                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs border-2 border-white dark:border-darkcard">
                                                    <PlusIcon className="w-3 h-3"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <ClockIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <SolidStarIcon className="w-4 h-4 text-yellow-400" />
                                            <span>{course.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-6">
                     {courses.slice(2).map((course: Course) => (
                        <Card key={course.id} className="flex items-center space-x-4 hover:shadow-lg transition-shadow">
                            <img src={course.imageUrl} alt={course.title} className="w-20 h-20 rounded-lg object-cover"/>
                            <div className="flex-grow">
                                <p className="text-xs text-primary dark:text-primary-light font-medium mb-0.5">{course.category}</p>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{course.title}</h4>
                                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    <span>{course.lastUpdated}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <EllipsisHorizontalIcon className="w-6 h-6 text-slate-400 hover:text-slate-600 cursor-pointer" />
                            </div>
                        </Card>
                     ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar Content (1/3 width) */}
            <div className="space-y-8">
                {/* Activity Section */}
                <Card>
                    <CardHeader 
                        title="Activity" 
                        action={
                            <Button variant="ghost" size="sm" className="text-primary dark:text-primary-light">
                                Year <ChevronDownIcon className="w-4 h-4 ml-1" />
                            </Button>
                        }
                    />
                    <div className="mb-4">
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">3.5h</span>
                        <span className="ml-2 text-sm bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100 px-2 py-0.5 rounded-full font-medium">✨ Great result!</span>
                    </div>
                    <div style={{ width: '100%', height: 200 }}>
                        <ResponsiveContainer>
                            <BarChart data={activityData} margin={{ top: 5, right: 0, left: -30, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                                <XAxis dataKey="name" tick={{ fontSize: 12, fill: darkMode ? '#9CA3AF' : '#6B7280' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: darkMode ? '#9CA3AF' : '#6B7280' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: darkMode ? '#374151' : '#FFFFFF', border: 'none', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)' }}
                                    itemStyle={{ color: darkMode ? '#F3F4F6' : '#1F2937' }}
                                    cursor={{ fill: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                                />
                                <Bar dataKey="uv" name="Activity Hours" unit="h" radius={[4, 4, 0, 0]}>
                                    {activityData.map((entry, index) => (
                                        <Cell key={`bar-${index}`} fill={index === activityData.length - 1 ? '#8B5CF6' : (index % 3 === 0 ? '#F472B6' : (index % 3 === 1 ? '#60A5FA' : '#34D399'))} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Today's Schedule Section */}
                <Card>
                     <CardHeader 
                        title="Today's Schedule" 
                        action={
                            <Button variant="ghost" size="sm" className="text-primary dark:text-primary-light">
                                Year <ChevronDownIcon className="w-4 h-4 ml-1" />
                            </Button>
                        }
                    />
                    <div className="space-y-4">
                        {scheduleItems.map((item: ScheduledItem) => (
                            <div key={item.id} className={`${item.colorClass} dark:bg-opacity-40 p-4 rounded-lg relative`}>
                                <div className="flex justify-between items-start mb-1">
                                   <div className="bg-black/10 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-medium px-2 py-1 rounded-full">
                                        {item.time} <ChevronDownIcon className="w-3 h-3 inline-block ml-1"/>
                                    </div>
                                    <EllipsisHorizontalIcon className="w-5 h-5 text-slate-600 dark:text-slate-300 cursor-pointer" />
                                </div>
                                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-0.5">{item.title}</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-300">{item.description}</p>
                                <div className={`absolute top-1/2 -left-1.5 transform -translate-y-1/2 w-3 h-3 ${item.colorClass.replace('200','500').replace('700','400')} rounded-full border-2 border-white dark:border-darkcard`}></div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TeacherDashboard;