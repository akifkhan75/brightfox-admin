import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../../components/common/Card.tsx';
import { Button } from '../../../components/common/Button.tsx';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchConfig, updateConfig } from '../../features/appteam/configSlice.ts';
import { AppConfig } from '../../../types.ts';

// Custom-styled switch component
const ToggleSwitch = ({ label, description, enabled, onChange }: { label: string, description: string, enabled: boolean, onChange: (enabled: boolean) => void }) => {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
            <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{label}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
            <button
                type="button"
                className={`${enabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                onClick={() => onChange(!enabled)}
            >
                <span className={`${enabled ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
            </button>
        </div>
    );
};


const AppConfiguration: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { settings, status } = useSelector((state: RootState) => state.config);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchConfig());
        }
    }, [status, dispatch]);

    const handleSettingChange = (key: keyof AppConfig, value: boolean) => {
        if (settings) {
            dispatch(updateConfig({ [key]: value }));
        }
    };
    
    if (status === 'loading' || !settings) return <div className="p-8">Loading configuration...</div>;

    return (
        <div className="p-8">
            <Card>
                <CardHeader title="App Configuration" action={<Button>Save All Changes</Button>} />
                <p className="text-slate-600 dark:text-slate-300 mb-6">Manage global application settings and feature flags.</p>
                
                <div className="space-y-4">
                    <ToggleSwitch 
                        label="Maintenance Mode"
                        description="Puts the entire app offline for users, except for AppTeam."
                        enabled={settings.maintenanceMode}
                        onChange={(value) => handleSettingChange('maintenanceMode', value)}
                    />
                    <ToggleSwitch 
                        label="AI Content Moderation"
                        description="Automatically scan and flag submitted content using AI."
                        enabled={settings.aiModeration}
                        onChange={(value) => handleSettingChange('aiModeration', value)}
                    />
                    <ToggleSwitch 
                        label="New User Sign-ups"
                        description="Allow new teachers and students to create accounts."
                        enabled={settings.newUserSignups}
                        onChange={(value) => handleSettingChange('newUserSignups', value)}
                    />
                </div>
            </Card>
        </div>
    );
};

export default AppConfiguration;
