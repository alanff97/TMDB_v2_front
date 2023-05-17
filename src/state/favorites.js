import { createAction, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const setFavorites = createAction('SET_FAVORITES');

const fetchFavorites = async () => {
  try {
    const response = await axios.get('/api/favorites');
    const favorites = response.data;
    return favorites;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const initialState = (await fetchFavorites()) || [];

const favsReducer = createReducer(initialState, {
  [setFavorites]: (state, action) => action.payload,
});

export default favsReducer;
