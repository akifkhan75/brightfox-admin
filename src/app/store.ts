import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice.ts';
import userReducer from '../features/user/userSlice.ts';
import coursesReducer from '../features/courses/coursesSlice.ts';
import scheduleReducer from '../features/schedule/scheduleSlice.ts';
import activityReducer from '../features/activity/activitySlice.ts';
import friendsReducer from '../features/friends/friendsSlice.ts';
import classesReducer from '../features/classes/classesSlice.ts';
import messagesReducer from '../features/messages/messagesSlice.ts';
import earningsReducer from '../features/earnings/earningsSlice.ts';
import profileReducer from '../features/profile/profileSlice.ts';
import userManagementReducer from '../features/appteam/userManagementSlice.ts';
import businessReducer from '../features/appteam/businessSlice.ts';
import analyticsReducer from '../features/appteam/analyticsSlice.ts';
import configReducer from '../features/appteam/configSlice.ts';

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