import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const setUser = createAction('SET_USER');

const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    return action.payload;
  },
});

export default userReducer;
