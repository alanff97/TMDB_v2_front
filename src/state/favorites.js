import { createAction, createReducer } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const setFavorites = createAction('SET_FAVORITES');
export const removeFav = createAction('REMOVE_FAVORITES');

const token = Cookies.get('token');

const favorites = token ? jwtDecode(token).user.favorites : [];

const initialState = favorites;

const favsReducer = createReducer(initialState, {
  [setFavorites]: (state, action) => (state = action.payload),
  [removeFav]: (state, action) => (state = {}),
});

export default favsReducer;
