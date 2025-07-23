import type { SVGProps, ReactNode } from 'react';

export enum UserRole {
  Teacher = 'Teacher',
  AppTeam = 'AppTeam',
}

export interface NavItem {
  name: string;
  path: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  section?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  duration: string;
  rating: number;
  author: string;
  students: number;
  lastUpdated: string;
  status?: 'In Progress' | 'Completed' | 'New' | 'Pending';
  bgColorClass?: string;
}

export interface ScheduledItem {
  id: string;
  time: string;
  title: string;
  description: string;
  colorClass: string;
}

export interface ActivityData {
  name: string;
  uv: number;
}

export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'Friend' | 'Online';
}

// New Types for Implemented Features

export interface Student {
  id: string;
  name: string;
  avatarUrl: string;
  joined: string;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  studentCount: number;
  students: Student[];
  lastAnnouncement?: string;
}

export interface Message {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatarUrl: string;
}

export interface EarningsSummary {
  totalRevenue: number;
  pendingPayout: number;
  lastPayout: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface EarningsHistory {
    monthly: { month: string; revenue: number }[];
    transactions: Transaction[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  memberSince: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Suspended';
  lastLogin: string;
  avatarUrl: string;
}

export interface Payout {
  id: string;
  teacherName: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Processed';
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  subscriberCount: number;
  features: string[];
}

export interface AnalyticsData {
  keyMetrics: {
    totalUsers: { value: number; change: number };
    mrr: { value: number; change: number };
    activeCourses: { value: number; change: number };
  };
  userGrowth: { month: string; users: number }[];
  revenueByMonth: { month: string; revenue: number }[];
  coursePopularity: { name: string; value: number }[];
}

export interface AppConfig {
    maintenanceMode: boolean;
    aiModeration: boolean;
    newUserSignups: boolean;
}
