// STORE CREATION
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import moviesReducer from './movies';

import searchReducer from './search';
import userReducer from './user';

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
    user: userReducer,
  },
});

export default store;
