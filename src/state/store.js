// STORE CREATION
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import contentReducer from './content';

import searchReducer from './search';
import userReducer from './user';
import mediaReducer from './mediaType';
import favsReducer from './favorites';

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    content: contentReducer,
    mediaType: mediaReducer,
    search: searchReducer,
    user: userReducer,
    favorites: favsReducer,
  },
});

export default store;
