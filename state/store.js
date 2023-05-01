// STORE CREATION
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import moviesReducer from './movies';

import searchReducer from './search';

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
  },
});

export default store;
