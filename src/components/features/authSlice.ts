import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import oneUserAva from './../../assets/images/oneUserAva.jpeg';
import adminAva from './../../assets/images/adminAva.jpeg';

export type AuthType = {
    authID: number,
    email: string,
    authPhoto: string,
    isAuth: boolean,
    serverError: string,
    isAdmin: boolean,
}
let initialState: AuthType = {
    authID: 1,
    email: '',
    authPhoto: '',
    isAuth: false,
    serverError: '',
    isAdmin: false,
}
type LoginActionType = {
    email: string,
    password: string,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state: AuthType, action: PayloadAction<boolean>): void => {
            state.isAuth = action.payload;
        },
        logout: (state: AuthType): void => {
            state.isAuth = false;
            state.authID = 0;
            state.isAdmin = false;
            state.email = '';
            state.serverError = '';
            state.authPhoto = '';
        },
        login: (state: AuthType, action: PayloadAction<LoginActionType>): void => {
            if (action.payload.email === 'admin' && action.payload.password === '111') {
                state.email = action.payload.email;
                state.authID = 1;
                state.isAuth = true;
                state.authPhoto = adminAva;
                state.isAdmin = true;
                state.serverError='';
            } else if (action.payload.email === 'user' && action.payload.password === '111') {
                state.email = action.payload.email;
                state.authID = 2;
                state.isAuth = true;
                state.authPhoto = oneUserAva;
                state.isAdmin = false;
                state.serverError='';
            } else {
                state.serverError='Wrong email or password'
            }
        }
    }
})
export const {setAuth, logout, login} = authSlice.actions;

export default authSlice.reducer;