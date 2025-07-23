
import { NavItem } from './types.ts';
import { HomeIcon, InboxIcon, LessonIcon, TaskIcon, GroupIcon, ShieldCheckIcon, UsersIcon, ChartBarIcon, CurrencyDollarIcon, CogIcon, DocumentDuplicateIcon, VideoCameraIcon, PuzzlePieceIcon, QuestionMarkCircleIcon } from './src/components/icons.tsx';
import React from 'react';

export const TEACHER_NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: '/teacher/dashboard', icon: HomeIcon, section: 'Overview' },
  { name: 'Course Manager', path: '/teacher/courses', icon: LessonIcon, section: 'Management' },
  { name: 'Content Studio', path: '/teacher/content', icon: DocumentDuplicateIcon, section: 'Management' },
  { name: 'Class Management', path: '/teacher/classes', icon: GroupIcon, section: 'Management' },
  { name: 'Communications', path: '/teacher/inbox', icon: InboxIcon, section: 'Management' },
  { name: 'Earnings', path: '/teacher/earnings', icon: CurrencyDollarIcon, section: 'Finance' },
  { name: 'Profile & Verification', path: '/teacher/profile', icon: UsersIcon, section: 'Account' },
];

export const APP_TEAM_NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: '/appteam/dashboard', icon: HomeIcon, section: 'Overview' },
  { name: 'Content Moderation', path: '/appteam/moderation', icon: ShieldCheckIcon, section: 'Operations' },
  { name: 'User Management', path: '/appteam/users', icon: UsersIcon, section: 'Operations' },
  { name: 'Business Operations', path: '/appteam/business', icon: CurrencyDollarIcon, section: 'Operations' },
  { name: 'Analytics & Growth', path: '/appteam/analytics', icon: ChartBarIcon, section: 'Insights' },
  { name: 'App Configuration', path: '/appteam/config', icon: CogIcon, section: 'System' },
];

export const CONTENT_TYPES = [
    { id: 'video', name: 'Video Lesson', icon: VideoCameraIcon, description: 'Upload or link video content.' },
    { id: 'worksheet', name: 'Interactive Worksheet', icon: DocumentDuplicateIcon, description: 'PDF or Google Docs link.' },
    { id: 'quiz', name: 'Quiz', icon: QuestionMarkCircleIcon, description: 'MCQ, drag-and-drop formats.' },
    { id: 'puzzle', name: 'Puzzle/Drawing Challenge', icon: PuzzlePieceIcon, description: 'Engaging activities for kids.' },
];