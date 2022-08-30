import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import oneUserAva from './../../assets/images/oneUserAva.jpeg';
import adminAva from './../../assets/images/adminAva.jpeg';
import {authAPI, MaterialsAPI} from "../api/api";
import {CategoryType, IdFiledType} from "./categoriesSlice";

type UserType = {
    id: number,
    email: string,
    photo: string,
    isAdmin: boolean,
}
export type AuthStateType = {
    user: UserType,
    isAuth: boolean,
    serverError: string,
    isLoading: boolean,
}
let initialState: AuthStateType = {
    user: {
        id: 0,
        email: '',
        photo: '',
        isAdmin: false,
    },
    isAuth: false,
    serverError: '',
    isLoading: true,
}
/*type LoginActionType = {
    email: string,
    password: string,
}*/
export type ChangePasswordActionType = {
    email:string,
    oldPassword: string,
    newPassword: string,
}

type LoginDataType = {email:string, password: string}
export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (loginData: LoginDataType, {rejectWithValue, dispatch}) => {
        const {email, password} = loginData;
        const res = await authAPI.login(email, password);
        //console.log('loginThunk/ res.data=', res.data)
        if (res.data.resultCode === 0) {
            return res.data;
        } else
            return 'ERROR from server';
    }
);

type UploadAvatarType = {file: any, id: IdFiledType}
export const uploadAvatarThunk = createAsyncThunk(
    'auth/uploadAvatar',
    async (uploadAvatarData:UploadAvatarType, {rejectWithValue, dispatch}) => {
        try {
            const {file, id} = uploadAvatarData;
            const res = await authAPI.uploadAvatar(file, id);
            if (res.data.resultCode === 0) {
                return res.data;
            } else
                return 'ERROR from server';
        } catch (e) {
            console.log('!!!uploadAvatarThunk / error!!!=', e)
        }


    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state: AuthStateType): void => {
            state.user.id = 0;
            state.user.isAdmin = false;
            state.user.email = '';
            state.user.photo = '';
            state.isAuth = false;
            state.serverError = '';
        },
        /*login: (state: AuthType, action: PayloadAction<LoginActionType>): void => {
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
        },*/
        saveNewEmail: (state: AuthStateType, action: PayloadAction<string>): void => {
            //сдклать асинхронный запрос, когда сервер будет готов
            state.user.email = action.payload;
        },
        changeUserPassword: (state: AuthStateType, action: PayloadAction<ChangePasswordActionType>):void => {
            //Замена пароля для существующего пользователя с асинхронным запросом на сервер
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state:AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(loginThunk.fulfilled, (state:AuthStateType, action: PayloadAction<UserType>) => {
            state.user = {id: action.payload.id, email: action.payload.email, photo: action.payload.photo, isAdmin: action.payload.isAdmin};
            state.isAuth = true;
            state.serverError = '';
            state.isLoading = false;
        })
        builder.addCase(loginThunk.rejected, (state:AuthStateType) => {
            state.isLoading = false;
        })

        builder.addCase(uploadAvatarThunk.pending, (state: AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(uploadAvatarThunk.fulfilled, (state: AuthStateType, action:PayloadAction<string>) => {
            state.user.photo = action.payload;
            state.isLoading = false;
        })
        builder.addCase(uploadAvatarThunk.rejected, (state:AuthStateType) => {
            state.isLoading = false;
        })
    }
})
export const {logout, saveNewEmail, changeUserPassword} = authSlice.actions;

export default authSlice.reducer;