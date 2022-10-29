import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../api/api";
import {IdFiledType} from "./categoriesSlice";

type LoginDataType = { email: string, password: string }
export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (loginData: LoginDataType, {rejectWithValue, dispatch}) => {
        const {email, password} = loginData;
        const res = await authAPI.login(email, password);
        return res.data;
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logoutThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await authAPI.logout();
        return res.data;
    }
)

export const refreshThunk = createAsyncThunk(
    'auth/refreshThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await authAPI.refresh();
        return res.data;
    }
)

type SingUpDataType = {
    email: string,
    name: string,
    password: string,
}
export const registrationThunk = createAsyncThunk(
    'auth/registrationThunk',
    async (singUpData: SingUpDataType, {rejectWithValue, dispatch}) => {
        const {name, email, password} = singUpData;
        const res = await authAPI.registration(name, email, password);
        return res.data;
    }
);

type UploadAvatarType = { file: any, id: IdFiledType }
export const uploadAvatarThunk = createAsyncThunk(
    'auth/uploadAvatar',
    async (uploadAvatarData: UploadAvatarType, {rejectWithValue, dispatch}) => {
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

type UpdateEmailDataType = { id: IdFiledType, newEmail: string }
export const updateEmailThunk = createAsyncThunk(
    'auth/updateEmailThunk',
    async (newEmailData: UpdateEmailDataType, {rejectWithValue, dispatch}) => {
        try {
            const {id, newEmail} = newEmailData;
            const res = await authAPI.updateEmail(id, newEmail);
            if (res.data.resultCode === 0) {
                return res.data;
            } else
                return 'ERROR from server';
        } catch (e) {
            console.log('!!!!auth/updateEmailThunk, error=', e)
        }
    }
);

type UpdatePasswordDataType = { id: IdFiledType, oldPass: string, newPass: string }
export const updatePasswordThunk = createAsyncThunk(
    'auth/updatePasswordThunk',
    async (newPassData: UpdatePasswordDataType, {rejectWithValue, dispatch}) => {
        try {
            const {id, oldPass, newPass} = newPassData;
            const res = await authAPI.updatePassword(id, oldPass, newPass);
            return res.data;
        } catch (e) {
            console.log('!!!!auth/updatePasswordThunk, error=', e)
        }
    }
);
