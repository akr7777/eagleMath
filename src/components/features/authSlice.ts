import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from "../api/api";
import {IdFiledType} from "./categoriesSlice";

export const baseAvatarPhotoUrl = 'https://dry-anchorage-96588.herokuapp.com/users/getAvatar?id=';

type UserType = {
    id: number,
    email: string,
    //photo: string,
    isAdmin: boolean,
}
export type AuthStateType = {
    user: UserType,
    isAuth: boolean,
    serverError: string,
    isLoading: boolean,
    changePasswordResultCode: number,
}
let initialState: AuthStateType = {
    user: {
        id: 0,
        email: '',
        //photo: '',
        isAdmin: false,
    },
    isAuth: false,
    serverError: '',
    isLoading: true,
    changePasswordResultCode: -1,
}

type LoginDataType = { email: string, password: string }
export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (loginData: LoginDataType, {rejectWithValue, dispatch}) => {
        const {email, password} = loginData;
        const res = await authAPI.login(email, password);
        //console.log('loginThunk/ res.data=', res.data)
        if (res.data.resultCode === 0) {
            //return {id: res.data.id, email: res.data.email, isAdmin: res.data.isAdmin}
            return res.data;
        } else
            return 'ERROR from server';
    }
);

/*export const getAvatarThunk = createAsyncThunk(
    'auth/getAvatar',
    async (id: IdFiledType, {rejectWithValue, dispatch}) => {
        try {
            const res = await authAPI.getAvatar(id);
            console.log('auth/getAvatar, res=', res)
            if (res) {
                return res;
            } else
                return 'ERROR from server';
        }catch (e) {
            console.log('authSlice / getAvatar, error=', e)
        }
    }
)*/

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
            /*if (res.data.resultCode === 0) {
                return res.data;
            } else
                return 'ERROR from server';*/
        } catch (e) {
            console.log('!!!!auth/updatePasswordThunk, error=', e)
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
            //state.user.photo = '';
            state.isAuth = false;
            state.serverError = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state: AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(loginThunk.fulfilled, (state: AuthStateType, action: PayloadAction<UserType>) => {

            //state.user.photo = baseAvatarPhotoUrl+action.payload.id;
            state.user.id = action.payload.id;
            state.user.email = action.payload.email;
            //photo: action.payload.photo,
            state.user.isAdmin = action.payload.isAdmin;
            state.isAuth = true;
            state.serverError = '';
            state.isLoading = false;
        })
        builder.addCase(loginThunk.rejected, (state: AuthStateType) => {
            state.isLoading = false;
        })

        builder.addCase(uploadAvatarThunk.pending, (state: AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(uploadAvatarThunk.fulfilled, (state: AuthStateType, action: PayloadAction<string>) => {
            //state.user.photo = action.payload;
            state.isLoading = false;
        })
        builder.addCase(uploadAvatarThunk.rejected, (state: AuthStateType) => {
            state.isLoading = false;
        })


        builder.addCase(updateEmailThunk.pending, (state: AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(updateEmailThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{ resultCode: number, newEmail: string }>) => {
            //if (action.payload.resultCode === 0) state.user.email = action.payload.newEmail;
            //alert('builder.addCase(updateEmailThunk.fulfilled, action.payload='+JSON.stringify(action.payload))
            state.user.email = action.payload.newEmail;
            state.isLoading = false;
        })
        builder.addCase(updateEmailThunk.rejected, (state: AuthStateType) => {
            state.isLoading = false;
        })

        builder.addCase(updatePasswordThunk.pending, (state: AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(updatePasswordThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{resultCode: number}>) => {
            state.changePasswordResultCode = action.payload.resultCode;
            state.isLoading = false;
        })
        builder.addCase(updatePasswordThunk.rejected, (state: AuthStateType) => {
            state.isLoading = false;
        })
    }
})
export const {logout} = authSlice.actions;

export default authSlice.reducer;