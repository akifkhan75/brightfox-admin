
import React from 'react';
import { Card, CardHeader } from '../../components/common/Card.tsx';

const AppTeamDashboard: React.FC = () => (
    <div className="p-8">
        <Card>
            <CardHeader title="App Team Dashboard Home" />
            <div className="h-64 flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400 text-lg">App Team Dashboard section coming soon.</p>
            </div>
        </Card>
    </div>
);

export default AppTeamDashboard;