
import React from 'react';
import { Card, CardHeader } from '../../../components/common/Card.tsx';

const PlaceholderSection: React.FC<{ title: string }> = ({ title }) => (
    <div className="p-8">
        <Card>
            <CardHeader title={title} />
            <div className="h-64 flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400 text-lg">{title} section coming soon.</p>
            </div>
        </Card>
    </div>
);

export default PlaceholderSection;