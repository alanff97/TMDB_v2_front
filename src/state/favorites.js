import { createAction, createReducer } from '@reduxjs/toolkit';

export const setFavorites = createAction('SET_FAVORITES');

const storedFavorites = localStorage.getItem('favorites');

const initialState = storedFavorites ? JSON.parse(storedFavorites) : [];

const favsReducer = createReducer(initialState, {
  [setFavorites]: (state, action) => action.payload,
});

export default favsReducer;
