import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../../src/components/common/Card.tsx';
import { ArrowRightIcon, ChevronDownIcon, CurrencyDollarIcon, UsersIcon, LessonIcon } from '../../../src/components/icons.tsx';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AppDispatch, RootState } from '../../store/store.ts';
import { fetchAnalytics } from '../../store/slice/appteam/analyticsSlice.ts';

const MetricCard = ({ title, value, change, icon: Icon }: { title: string, value: string, change: number, icon: React.FC<any> }) => {
    const isPositive = change >= 0;
    return (
        <Card>
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg"><Icon className="h-6 w-6 text-primary" /></div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
                </div>
                <div className={`ml-auto text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(change)}%
                </div>
            </div>
        </Card>
    );
};

const Analytics: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { data: analytics, status } = useSelector((state: RootState) => state.analytics);
    const { darkMode } = useSelector((state: RootState) => state.ui);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAnalytics());
        }
    }, [status, dispatch]);
    
    if (status === 'loading' || !analytics) return <div className="p-8">Loading analytics...</div>;

    const COLORS = ['#6D28D9', '#EC4899', '#10B981', '#3B82F6'];

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Total Users" value={analytics.keyMetrics.totalUsers.value.toLocaleString()} change={analytics.keyMetrics.totalUsers.change} icon={UsersIcon} />
                <MetricCard title="Monthly Recurring Revenue" value={`$${analytics.keyMetrics.mrr.value.toLocaleString()}`} change={analytics.keyMetrics.mrr.change} icon={CurrencyDollarIcon} />
                <MetricCard title="Active Courses" value={analytics.keyMetrics.activeCourses.value.toLocaleString()} change={analytics.keyMetrics.activeCourses.change} icon={LessonIcon} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader title="User Growth" />
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={analytics.userGrowth}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card>
                    <CardHeader title="Course Popularity" />
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={analytics.coursePopularity} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {analytics.coursePopularity.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
