import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../../components/common/Card.tsx';
import { Button } from '../../../components/common/Button.tsx';
import { CurrencyDollarIcon, CheckCircleIcon } from '../../../components/icons.tsx';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchPayouts, fetchSubscriptions } from '../../features/appteam/businessSlice.ts';
import { Payout, SubscriptionTier } from '../../../types.ts';

const BusinessOperations: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { payouts, subscriptions, status } = useSelector((state: RootState) => state.business);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPayouts());
            dispatch(fetchSubscriptions());
        }
    }, [status, dispatch]);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
        <div className="p-8 space-y-8">
            <Card>
                <CardHeader title="Teacher Payouts" />
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-700">
                            <tr>
                                <th className="p-3">Teacher</th>
                                <th className="p-3">Payout Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Amount</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {status === 'loading' && <tr><td colSpan={5} className="text-center p-4">Loading payouts...</td></tr>}
                            {payouts.map((payout: Payout) => (
                                <tr key={payout.id} className="border-b border-slate-200 dark:border-slate-700">
                                    <td className="p-3 font-medium">{payout.teacherName}</td>
                                    <td className="p-3">{payout.date}</td>
                                    <td className="p-3">
                                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">{payout.status}</span>
                                    </td>
                                    <td className="p-3 text-right font-semibold">{formatCurrency(payout.amount)}</td>
                                    <td className="p-3 text-center">
                                        <Button variant="primary" size="sm">Process</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card>
                <CardHeader title="Subscription Plans" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subscriptions.map((tier: SubscriptionTier) => (
                        <Card key={tier.id} className="border border-primary/20 dark:border-primary-light/20">
                            <h3 className="text-xl font-bold text-primary dark:text-primary-light">{tier.name}</h3>
                            <p className="text-3xl font-extrabold my-2">{formatCurrency(tier.price)}<span className="text-base font-normal text-slate-500">/month</span></p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{tier.subscriberCount.toLocaleString()} Active Subscribers</p>
                            <ul className="space-y-2 text-sm">
                                {tier.features.map(feature => (
                                    <li key={feature} className="flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-accent mr-2" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline" className="w-full mt-6">Manage Plan</Button>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default BusinessOperations;
