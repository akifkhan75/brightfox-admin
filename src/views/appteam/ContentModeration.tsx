
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '../../../components/common/Card.tsx';
import { Button } from '../../../components/common/Button.tsx';
import { Course } from '../../../types.ts';
import { CheckCircleIcon, XCircleIcon, SparklesIcon } from '../../../components/icons.tsx';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchCourses } from '../../features/courses/coursesSlice.ts';

interface ModerationItemProps {
  course: Course;
}

const ModerationItemCard: React.FC<ModerationItemProps> = ({ course }) => (
  <Card className="flex items-center space-x-4">
    <img src={course.imageUrl} alt={course.title} className="w-24 h-24 rounded-lg object-cover" />
    <div className="flex-grow">
      <h4 className="font-semibold text-slate-800 dark:text-slate-100">{course.title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400">Submitted by: {course.author}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500">Last Updated: {course.lastUpdated}</p>
    </div>
    <div className="flex space-x-2">
      <Button variant="primary" size="sm" leftIcon={<CheckCircleIcon className="w-4 h-4" />}>Approve</Button>
      <Button variant="danger" size="sm" leftIcon={<XCircleIcon className="w-4 h-4" />}>Reject</Button>
    </div>
  </Card>
);

const ContentModeration: React.FC = () => {
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
                <CardHeader title="Content Moderation Queue" />
                <p className="text-slate-600 dark:text-slate-300 mb-6">Review teacher-submitted content. Flag inappropriate material using AI and manual review.</p>
                <div className="space-y-4">
                    {coursesStatus === 'loading' && <p>Loading moderation queue...</p>}
                    {coursesStatus === 'failed' && <p className="text-red-500">Failed to load queue.</p>}
                    {coursesStatus === 'succeeded' && courses.map(course => <ModerationItemCard key={course.id} course={course} />)}
                    {coursesStatus === 'succeeded' && courses.length === 0 && <p className="text-slate-500 dark:text-slate-400 text-center py-8">No content to moderate currently.</p>}
                </div>
            </Card>

            <Card className="mt-8">
                <CardHeader title="AI Moderation Tools" action={<Button variant="secondary" leftIcon={<SparklesIcon className="w-4 h-4" />}>Configure AI</Button>} />
                <p className="text-slate-600 dark:text-slate-300">Utilize Google Vision API and custom AI models to automatically flag potentially problematic content. Review flagged items and adjust AI sensitivity.</p>
                {/* Placeholder for AI tool stats or settings */}
            </Card>
        </div>
    );
};

export default ContentModeration;