import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- MOCK DATA ---

const MOCK_COURSES = [
  { id: '1', title: "Beginner's Guide to Becoming Front-End Developer", category: "Yoga course with Marta Friser", imageUrl: 'https://picsum.photos/seed/course1/400/225', duration: '10 min', rating: 4.8, author: "Marta F.", students: 120, lastUpdated: '24 Oct, 22', status: 'In Progress', bgColorClass: 'bg-green-100 dark:bg-green-900' },
  { id: '2', title: "Optimizing User Experience with the Best UI/UX Design", category: "Yoga course with Marta Friser", imageUrl: 'https://picsum.photos/seed/course2/400/225', duration: '15 min', rating: 4.9, author: "John D.", students: 250, lastUpdated: '24 Oct, 22', status: 'New', bgColorClass: 'bg-pink-100 dark:bg-pink-900' },
  { id: '3', title: "Advanced JavaScript Concepts for Modern Web Apps", category: "Yoga course with Marta Friser", imageUrl: 'https://picsum.photos/seed/course3/400/225', duration: '25 min', rating: 4.7, author: "Sarah L.", students: 180, lastUpdated: '23 Oct, 22', status: 'Completed', bgColorClass: 'bg-blue-100 dark:bg-blue-900' },
  { id: '4', title: "Fun with Phonics: Level 1", category: "Early Reading", imageUrl: 'https://picsum.photos/seed/course4/400/225', duration: '5 min', rating: 5.0, author: "Charlie Vaccaro", students: 95, lastUpdated: '28 Oct, 22', status: 'Pending', bgColorClass: 'bg-yellow-100 dark:bg-yellow-900' },
];

const MOCK_SCHEDULE_ITEMS = [
    { id: '1', time: '09:30 - 12:30', title: 'Main Course Workout', description: 'Routine with Tim Reddish', colorClass: 'bg-pink-200 dark:bg-pink-700' },
    { id: '2', time: '17:30 - 21:30', title: "Beginner's Guide to Becoming a Professional Front-End Developer", description: 'Nutrition lecture with Marcus Smart', colorClass: 'bg-teal-200 dark:bg-teal-700' },
];

const MOCK_ACTIVITY_DATA = [
    { name: 'Jan', uv: 400 }, { name: 'Feb', uv: 300 }, { name: 'Mar', uv: 200 },
    { name: 'Apr', uv: 278 }, { name: 'May', uv: 189 }, { name: 'Jun', uv: 239 },
    { name: 'Jul', uv: 349 }, { name: 'Aug', uv: 430 },
];

const MOCK_FRIENDS = [
    { id: '1', name: 'Alfonso Siphron', avatarUrl: 'https://picsum.photos/seed/friend1/40/40', status: 'Friend' },
    { id: '2', name: 'Kierra Lipshutz', avatarUrl: 'https://picsum.photos/seed/friend2/40/40', status: 'Friend' },
    { id: '3', name: 'Charlie Vaccaro', avatarUrl: 'https://picsum.photos/seed/friend3/40/40', status: 'Friend' },
];

let MOCK_CLASSES = [
    { id: 'c1', name: 'Grade 3 Math Superstars', description: 'Covering multiplication, division, and fractions.', studentCount: 25, lastAnnouncement: 'Homework for chapter 3 is now available.', students: Array.from({length: 25}, (_, i) => ({ id: `s${i}`, name: `Student ${i+1}`, avatarUrl: `https://picsum.photos/seed/student${i}/40/40`, joined: '2023-09-01' })) },
    { id: 'c2', name: 'Creative Writing Workshop', description: 'Exploring storytelling and poetry.', studentCount: 18, students: Array.from({length: 18}, (_, i) => ({ id: `s${i}`, name: `Writer ${i+1}`, avatarUrl: `https://picsum.photos/seed/writer${i}/40/40`, joined: '2023-09-05' })) },
];

let MOCK_MESSAGES = [
    { id: 'm1', sender: 'Admin Team', subject: 'Welcome to the new platform!', snippet: 'We are excited to have you on board...', content: 'Full text of the welcome message...', timestamp: '2 days ago', isRead: false, avatarUrl: 'https://picsum.photos/seed/admin/40/40' },
    { id: 'm2', sender: 'Sarah L.', subject: 'Question about my course content', snippet: 'Hi, I had a question regarding the video upload specs...', content: 'Full text of Sarah\'s question...', timestamp: '3 days ago', isRead: true, avatarUrl: 'https://picsum.photos/seed/sarah/40/40' },
];

const MOCK_EARNINGS = {
  summary: { totalRevenue: 12540.50, pendingPayout: 1850.75, lastPayout: 3200.00 },
  history: {
    monthly: [{ month: 'Jan', revenue: 1200 }, { month: 'Feb', revenue: 1500 }, { month: 'Mar', revenue: 1300 }, { month: 'Apr', revenue: 1700 }, { month: 'May', revenue: 2100 }, { month: 'Jun', revenue: 1800 }],
    transactions: [
        { id: 't1', date: '2023-06-15', description: 'Course Sale: Advanced JavaScript', amount: 49.99, status: 'Completed' },
        { id: 't2', date: '2023-06-14', description: 'Course Sale: UI/UX Design', amount: 29.99, status: 'Completed' },
        { id: 't3', date: '2023-06-12', description: 'Monthly Payout', amount: -3200.00, status: 'Completed' },
    ]
  }
};

let MOCK_PROFILE = { id: 'user1', name: 'Marta F.', email: 'marta.f@example.com', bio: 'Passionate educator and yoga instructor dedicated to creating engaging and fun learning experiences for children.', avatarUrl: 'https://picsum.photos/seed/marta/100/100', isVerified: true, memberSince: '2022-01-15' };

let MOCK_APP_USERS = [
    { id: 'u1', name: 'Marta F.', email: 'marta.f@example.com', role: 'Teacher', status: 'Active', lastLogin: '2 hours ago', avatarUrl: 'https://picsum.photos/seed/marta/40/40' },
    { id: 'u2', name: 'John D.', email: 'john.d@example.com', role: 'Teacher', status: 'Active', lastLogin: '1 day ago', avatarUrl: 'https://picsum.photos/seed/johnd/40/40' },
    { id: 'u3', name: 'Sarah L.', email: 'sarah.l@example.com', role: 'Teacher', status: 'Suspended', lastLogin: '1 week ago', avatarUrl: 'https://picsum.photos/seed/sarah/40/40' },
    { id: 'u4', name: 'Admin User', email: 'admin@wonderkid.com', role: 'AppTeam', status: 'Active', lastLogin: '5 minutes ago', avatarUrl: 'https://picsum.photos/seed/admin/40/40' },
];

const MOCK_BUSINESS = {
    payouts: [
        { id: 'p1', teacherName: 'Marta F.', amount: 1850.75, date: '2023-07-01', status: 'Pending' },
        { id: 'p2', teacherName: 'John D.', amount: 2340.20, date: '2023-07-01', status: 'Pending' },
    ],
    subscriptions: [
        { id: 's1', name: 'Free Tier', price: 0, subscriberCount: 1500, features: ['Access to 5 free courses', 'Community forum access'] },
        { id: 's2', name: 'Pro Tier', price: 29, subscriberCount: 450, features: ['Unlimited course access', 'Downloadable content', 'Priority support'] },
    ]
};

const MOCK_ANALYTICS = {
  keyMetrics: {
    totalUsers: { value: 1950, change: 5.2 },
    mrr: { value: 13050, change: 2.1 },
    activeCourses: { value: 85, change: -1.5 },
  },
  userGrowth: [ { month: 'Jan', users: 1200 }, { month: 'Feb', users: 1350 }, { month: 'Mar', users: 1500 }, { month: 'Apr', users: 1680 }, { month: 'May', users: 1820 }, { month: 'Jun', users: 1950 }],
  revenueByMonth: MOCK_EARNINGS.history.monthly,
  coursePopularity: [{ name: 'Reading', value: 400 }, { name: 'Math', value: 300 }, { name: 'Art', value: 300 }, { name: 'Science', value: 200 }],
};

let MOCK_CONFIG = {
    maintenanceMode: false,
    aiModeration: true,
    newUserSignups: true,
};

// --- API ENDPOINTS ---

app.get('/api/courses', (req, res) => res.json(MOCK_COURSES));
app.get('/api/schedule', (req, res) => res.json(MOCK_SCHEDULE_ITEMS));
app.get('/api/activity', (req, res) => res.json(MOCK_ACTIVITY_DATA));
app.get('/api/friends', (req, res) => res.json(MOCK_FRIENDS));

// Teacher Endpoints
app.get('/api/classes', (req, res) => res.json(MOCK_CLASSES));
app.post('/api/classes', (req, res) => {
    const newClass = { ...req.body, id: `c${Date.now()}`, studentCount: 0, students: [] };
    MOCK_CLASSES.push(newClass);
    res.status(201).json(newClass);
});
app.post('/api/classes/:id/announcement', (req, res) => {
    const classId = req.params.id;
    const { message } = req.body;
    const classToUpdate = MOCK_CLASSES.find(c => c.id === classId);
    if (classToUpdate) {
        classToUpdate.lastAnnouncement = message;
        res.status(200).json(classToUpdate);
    } else {
        res.status(404).send('Class not found');
    }
});
app.get('/api/messages', (req, res) => res.json(MOCK_MESSAGES));
app.get('/api/earnings/summary', (req, res) => res.json(MOCK_EARNINGS.summary));
app.get('/api/earnings/history', (req, res) => res.json(MOCK_EARNINGS.history));
app.get('/api/profile', (req, res) => res.json(MOCK_PROFILE));
app.put('/api/profile', (req, res) => {
    MOCK_PROFILE = { ...MOCK_PROFILE, ...req.body };
    res.json(MOCK_PROFILE);
});

// AppTeam Endpoints
app.get('/api/appteam/users', (req, res) => res.json(MOCK_APP_USERS));
app.put('/api/appteam/users/:id', (req, res) => {
    const userId = req.params.id;
    const userIndex = MOCK_APP_USERS.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        MOCK_APP_USERS[userIndex] = { ...MOCK_APP_USERS[userIndex], ...req.body };
        res.json(MOCK_APP_USERS[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});
app.get('/api/appteam/business/payouts', (req, res) => res.json(MOCK_BUSINESS.payouts));
app.get('/api/appteam/business/subscriptions', (req, res) => res.json(MOCK_BUSINESS.subscriptions));
app.get('/api/appteam/analytics', (req, res) => res.json(MOCK_ANALYTICS));
app.get('/api/appteam/config', (req, res) => res.json(MOCK_CONFIG));
app.put('/api/appteam/config', (req, res) => {
    MOCK_CONFIG = { ...MOCK_CONFIG, ...req.body };
    res.json(MOCK_CONFIG);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});