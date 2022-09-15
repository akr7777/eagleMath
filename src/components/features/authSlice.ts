import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from "../api/api";
import {IdFiledType} from "./categoriesSlice";
import {ResultCodesEnum as resultCodes} from "./../utils/resultCodes";
import {useAppDispatch} from "../../store/store";

export const baseAvatarPhotoUrl = 'https://dry-anchorage-96588.herokuapp.com/users/getAvatar?id=';

type UserType = {
    id: string,
    email: string,
    name: string,
    isAdmin: boolean,
    isActivated: boolean,
}
export type AuthStateType = {
    user: UserType,
    isAuth: boolean,
    loginServerError: string,
    isLoading: boolean,
    changePasswordResultCode: number,
    singUpResultCode: number,
    activationLink: string,
}
let initialState: AuthStateType = {
    user: {
        id: '0',
        email: '',
        name: '',
        isAdmin: false,
        isActivated: false,
    },
    isAuth: false,
    loginServerError: '',
    isLoading: false,
    changePasswordResultCode: -1,
    singUpResultCode: -1,
    activationLink: 'http://'
}

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

type SingUpDataType = {
    email: string,
    name: string,
    password: string,
}
export const singUpThunk = createAsyncThunk(
    'auth/singUpThunk',
    async (singUpData: SingUpDataType, {rejectWithValue, dispatch}) => {
        const {name, email, password} = singUpData;
        const res = await authAPI.singUpNewUser(name, email, password);
        return res.data;
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
        changePasswordResultCodeAC: (state:AuthStateType, action: PayloadAction<number>): void => {
            state.changePasswordResultCode = action.payload;
        },
        resetLoginServerErrorAC: (state:AuthStateType): void => {
            state.loginServerError = '';
        },
        resetSingUpResultCodeAC: (state: AuthStateType): void => {
            state.singUpResultCode = -1;
        },
        /*logout: (state: AuthStateType): void => {
            state.user.id = '0';
            state.user.isAdmin = false;
            state.user.email = '';
            //state.user.photo = '';
            state.isAuth = false;
            state.loginServerError = '';
        },*/
    },


    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state: AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(loginThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{
            accessToken: string,
            refreshToken: string,
            userInfo: {
                id: string,
                name: string,
                email: string,
                isAdmin: boolean,
            },
            resultCode: number,
            message?: string
        }>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                if (action.payload.accessToken) {
                    localStorage.setItem("accessToken", action.payload.accessToken);
                    //localStorage.setItem("refreshToken", action.payload.refreshToken);
                    state.user.id = action.payload.userInfo.id;
                    state.user.email = action.payload.userInfo.email;
                    state.user.name = action.payload.userInfo.name;
                    state.user.isAdmin = action.payload.userInfo.isAdmin;
                    state.isAuth = true;
                    state.loginServerError = '';
                }
            } else {
                state.loginServerError = action.payload.message || 'Ошибка на сервере';
            }
            state.isLoading = false;
        })
        builder.addCase(loginThunk.rejected, (state: AuthStateType) => {
            state.loginServerError = 'Ошибка на сервере';
            state.isLoading = false;
        })

        builder.addCase(logoutThunk.pending, (state: AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(logoutThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{token: any, resultCode: resultCodes}>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                state.user.id = '0';
                state.user.isAdmin = false;
                state.user.email = '';
                //state.user.photo = '';
                state.isAuth = false;
                state.loginServerError = '';

            }
            state.isLoading = false;
        })
        builder.addCase(logoutThunk.rejected, (state: AuthStateType) => {
            state.isLoading = false;
        })

        builder.addCase(uploadAvatarThunk.pending, (state: AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(uploadAvatarThunk.fulfilled, (state: AuthStateType, action: PayloadAction<string>) => {
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

        builder.addCase(singUpThunk.pending, (state: AuthStateType) => {
            state.isLoading = true;
        })
        builder.addCase(singUpThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{resultCode: number}>) => {
            state.singUpResultCode = action.payload.resultCode;
            state.isLoading = false;
        })
        builder.addCase(singUpThunk.rejected, (state: AuthStateType) => {
            state.isLoading = false;
        })
    }
})
export const {changePasswordResultCodeAC, resetLoginServerErrorAC, resetSingUpResultCodeAC} = authSlice.actions;

export default authSlice.reducer;