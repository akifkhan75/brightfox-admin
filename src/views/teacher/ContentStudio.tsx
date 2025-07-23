
import React from 'react';
import { Card, CardHeader } from '../../../src/components/common/Card.tsx';
import { Button } from '../../../src/components/common/Button.tsx';
import { CONTENT_TYPES } from '../../../constants.tsx';
import { SparklesIcon, DocumentDuplicateIcon } from '../../../src/components/icons.tsx';

const ContentStudio: React.FC = () => (
    <div className="p-8">
        <Card>
            <CardHeader title="Content Studio" action={<Button variant="primary" leftIcon={<SparklesIcon className="w-5 h-5"/>}>AI Assist</Button>} />
            <p className="text-slate-600 dark:text-slate-300 mb-6">Create engaging content for your courses. Drag-and-drop activities or use AI to generate quizzes and more.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {CONTENT_TYPES.map(type => (
                    <Card key={type.id} className="flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer dark:hover:bg-slate-600">
                        <type.icon className="w-12 h-12 text-primary dark:text-primary-light mb-3" />
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{type.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{type.description}</p>
                    </Card>
                ))}
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Your Content Library</h3>
                {/* Placeholder for content library list */}
                <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-10 text-center">
                    <DocumentDuplicateIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">Your content library is empty.</p>
                    <Button variant="secondary" size="sm" className="mt-4">Upload Assets</Button>
                </div>
            </div>
        </Card>
    </div>
);

export default ContentStudio;