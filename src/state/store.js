// STORE CREATION
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import moviesReducer from './movies';

import searchReducer from './search';
import userReducer from './user';
import mediaReducer from './mediaType';

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    movies: moviesReducer,
    mediaType: mediaReducer,
    search: searchReducer,
    user: userReducer,
  },
});

export default store;
