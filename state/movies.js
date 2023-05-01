import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = [];

export const setMovies = createAction('SET_MOVIES');

const moviesReducer = createReducer(initialState, {
  [setMovies]: (state, action) => {
    return action.payload;
  },
});

export default moviesReducer;
