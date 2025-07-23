import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slice/ui/uiSlice.ts';
import userReducer from './slice/user/userSlice.ts';
import coursesReducer from './slice/courses/coursesSlice.ts';
import scheduleReducer from './slice/schedule/scheduleSlice.ts';
import activityReducer from './slice/activity/activitySlice.ts';
import friendsReducer from './slice/friends/friendsSlice.ts';
import classesReducer from './slice/classes/classesSlice.ts';
import messagesReducer from './slice/messages/messagesSlice.ts';
import earningsReducer from './slice/earnings/earningsSlice.ts';
import profileReducer from './slice/profile/profileSlice.ts';
import userManagementReducer from './slice/appteam/userManagementSlice.ts';
import businessReducer from './slice/appteam/businessSlice.ts';
import analyticsReducer from './slice/appteam/analyticsSlice.ts';
import configReducer from './slice/appteam/configSlice.ts';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    courses: coursesReducer,
    schedule: scheduleReducer,
    activity: activityReducer,
    friends: friendsReducer,
    classes: classesReducer,
    messages: messagesReducer,
    earnings: earningsReducer,
    profile: profileReducer,
    userManagement: userManagementReducer,
    business: businessReducer,
    analytics: analyticsReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;