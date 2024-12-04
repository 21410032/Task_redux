import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers/taskReducer';

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default store;

