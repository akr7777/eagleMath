import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {IdFiledType} from "./categoriesSlice";
import {ResultCodesEnum, ResultCodesEnum as resultCodes} from "../common/resultCodes";
import {
    loginThunk,
    logoutThunk,
    refreshThunk, registrationThunk,
    updateEmailThunk,
    updatePasswordThunk,
    uploadAvatarThunk
} from "./authThunks";

//export const baseAvatarPhotoUrl = 'http://localhost:4001/auth/getAvatar?id=';

type UserType = {
    id: IdFiledType,
    email: string,
    name: string,
    isAdmin: boolean,
    isActivated: boolean,

}
/*export type AuthStateType = {
    user: UserType,
    isAuth: boolean,
    loginServerError: string,
    isLoading: boolean,
    changePasswordResultCode: number,
    singUpResultCode: number,
    activationLink: string,
}*/
const initialState = {
    user: {
        id: '0',
        email: '',
        name: '',
        isAdmin: false,
        isActivated: false,
    } as UserType,
    isAuth: false,
    loginServerError: '',
    isLoading: false,
    changePasswordResultCode: -1,
    singUpResultCode: -1,
    activationLink: ''
}
type AuthStateType = typeof initialState;
/*

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
*/

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
    },


    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state: AuthStateType) => {state.isLoading = true})
        builder.addCase(loginThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{
            accessToken: string,
            refreshToken: string,
            userInfo: UserType,
            resultCode: number,
            message?: string
        }>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                if (action.payload.accessToken) {
                    localStorage.setItem("accessToken", action.payload.accessToken);
                    state.user.id = action.payload.userInfo.id;
                    state.user.email = action.payload.userInfo.email;
                    state.user.name = action.payload.userInfo.name;
                    state.user.isAdmin = action.payload.userInfo.isAdmin;
                    state.user.isActivated = action.payload.userInfo.isActivated;

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

        builder.addCase(logoutThunk.pending, (state: AuthStateType) => {state.isLoading = true;
        })
        builder.addCase(logoutThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{token: any, resultCode: resultCodes}>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                localStorage.removeItem("accessToken");
                state.isAuth = false;
                state.activationLink = '';
                state.user.email = '';
                state.user.name = '';
                state.user.id = '0';
                state.user.isActivated = false;
                state.user.isAdmin = false;
                state.isLoading = false;
                //state = {...state, ...initialState}
            }
            state.isLoading = false;
        })
        builder.addCase(logoutThunk.rejected, (state: AuthStateType) => {state.isLoading = false;
        })

        builder.addCase(refreshThunk.pending, (state: AuthStateType) => {state.isLoading = true;})
        builder.addCase(refreshThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{
            user: UserType & {activationLink: string},
            resultCode: resultCodes,
            accessToken: string,
            refreshToken: string,
        }>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                state.isAuth = true;
                state.activationLink = action.payload.user.activationLink;
                state.user = {
                    ...state.user,
                    id: action.payload.user.id,
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    isAdmin: action.payload.user.isAdmin,
                    isActivated: action.payload.user.isActivated
                }
                state.isLoading = false;
            }
        })
        builder.addCase(refreshThunk.rejected, (state: AuthStateType) => {state.isLoading = false;})

        builder.addCase(uploadAvatarThunk.pending, (state: AuthStateType) => {state.isLoading = true;})
        builder.addCase(uploadAvatarThunk.fulfilled, (state: AuthStateType, action: PayloadAction<string>) => {state.isLoading = false;})
        builder.addCase(uploadAvatarThunk.rejected, (state: AuthStateType) => {state.isLoading = false;})

        builder.addCase(updateEmailThunk.pending, (state: AuthStateType) => {state.isLoading = true;})
        builder.addCase(updateEmailThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{ resultCode: ResultCodesEnum, newEmail: string }>) => {
            state.user.email = action.payload.newEmail;
            state.isLoading = false;
        })
        builder.addCase(updateEmailThunk.rejected, (state: AuthStateType) => {state.isLoading = false;})

        builder.addCase(updatePasswordThunk.pending, (state: AuthStateType) => {state.isLoading = true;})
        builder.addCase(updatePasswordThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{resultCode: ResultCodesEnum}>) => {
            state.changePasswordResultCode = action.payload.resultCode;
            state.isLoading = false;
        })
        builder.addCase(updatePasswordThunk.rejected, (state: AuthStateType) => {state.isLoading = false;})

        builder.addCase(registrationThunk.pending, (state: AuthStateType) => {state.isLoading = true;})
        builder.addCase(registrationThunk.fulfilled, (state: AuthStateType, action: PayloadAction<{resultCode: ResultCodesEnum}>) => {
            state.singUpResultCode = action.payload.resultCode;
            state.isLoading = false;
        })
        builder.addCase(registrationThunk.rejected, (state: AuthStateType) => {state.isLoading = false;})
    }
})
export const {changePasswordResultCodeAC, resetLoginServerErrorAC, resetSingUpResultCodeAC} = authSlice.actions;

export default authSlice.reducer;