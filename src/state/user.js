import { createAction, createReducer } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const setUser = createAction('SET_USER');
export const logOut = createAction('LOG_OUT');

const token = Cookies.get('token');

const user = token ? jwtDecode(token).user : {};

const initialState = user;

const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => (state = action.payload),
  [logOut]: (state, action) => (state = {}),
});

export default userReducer;
