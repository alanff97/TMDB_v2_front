import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = 'movie';

export const setMediaType = createAction('SET_MEDIA_TYPE');

const showsReducer = createReducer(initialState, {
  [setMediaType]: (state, action) => {
    return action.payload;
  },
});

export default showsReducer;
