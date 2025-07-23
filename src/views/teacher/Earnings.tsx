import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../../components/common/Card.tsx';
import { Button } from '../../../components/common/Button.tsx';
import { CurrencyDollarIcon } from '../../../components/icons.tsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchEarningsSummary, fetchEarningsHistory } from '../../features/earnings/earningsSlice.ts';
import { Transaction } from '../../../types.ts';

const StatCard = ({ title, value }: { title: string, value: string }) => (
    <Card className="text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
    </Card>
);

const Earnings: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { summary, history, status, error } = useSelector((state: RootState) => state.earnings);
    const { darkMode } = useSelector((state: RootState) => state.ui);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEarningsSummary());
            dispatch(fetchEarningsHistory());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div className="p-8">Loading earnings data...</div>;
    if (status === 'failed') return <div className="p-8 text-red-500">{error}</div>;

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Revenue" value={formatCurrency(summary?.totalRevenue || 0)} />
                <StatCard title="Pending Payout" value={formatCurrency(summary?.pendingPayout || 0)} />
                <StatCard title="Last Payout" value={formatCurrency(summary?.lastPayout || 0)} />
            </div>

            <Card>
                <CardHeader title="Monthly Revenue" action={<Button variant="primary" leftIcon={<CurrencyDollarIcon className="w-5 h-5"/>}>Request Payout</Button>} />
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={history?.monthly} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: darkMode ? '#9CA3AF' : '#6B7280' }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={(value) => `$${value/1000}k`} tick={{ fontSize: 12, fill: darkMode ? '#9CA3AF' : '#6B7280' }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: darkMode ? '#374151' : '#FFFFFF', border: 'none', borderRadius: '0.5rem' }}
                                itemStyle={{ color: darkMode ? '#F3F4F6' : '#1F2937' }}
                                cursor={{ fill: darkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)' }}
                                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                            />
                            <Bar dataKey="revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card>
                <CardHeader title="Transaction History" />
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-700">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history?.transactions.map((tx: Transaction) => (
                                <tr key={tx.id} className="border-b border-slate-200 dark:border-slate-700">
                                    <td className="p-3">{tx.date}</td>
                                    <td className="p-3 font-medium text-slate-800 dark:text-slate-100">{tx.description}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{tx.status}</span>
                                    </td>
                                    <td className={`p-3 text-right font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-slate-800 dark:text-slate-100'}`}>
                                        {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
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

export default Earnings;
