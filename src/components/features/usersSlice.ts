import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {authAPI, usersAPI} from "../api/api";
import {IdFiledType} from "./categoriesSlice";
import {ResultCodesEnum as resultCodes} from "../common/resultCodes";

export type UserType = {
    userId: IdFiledType,
    name: string,
    email: string,
    isAdmin: boolean,
}
type UsersStateType = {
    isLoading: boolean,
    users: UserType[],
    searchField: string,
    user: UserType,
}
const authInitState:UsersStateType = {
    isLoading: false,
    users: [],
    searchField: '',
    user: {userId: '0', name: '', email: '', isAdmin: false}
}

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
*/

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.getUsers();
        return res.data;
    }
)

type GetOneUserDataType = {userId: IdFiledType}
export const getOneUser = createAsyncThunk(
    'users/getOneUser',
    async (data: GetOneUserDataType, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.getOneUser(data.userId);
        return res.data;
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState: authInitState,
    reducers: {
        searchFieldChange: (state:UsersStateType, action: PayloadAction<string>) => {
            state.searchField = action.payload;
        },
        /*changePasswordResultCodeAC: (state:AuthStateType, action: PayloadAction<number>): void => {
            state.changePasswordResultCode = action.payload;
        },*/
    },


    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state: UsersStateType) => {
            state.isLoading = true;
        })
        builder.addCase(getUsers.fulfilled, (state: UsersStateType, action: PayloadAction<UserType[]>) => {
            state.users = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getUsers.rejected, (state: UsersStateType) => {
            state.isLoading = false;
        })

        builder.addCase(getOneUser.pending, (state: UsersStateType) => {
            state.isLoading = true;
        })
        builder.addCase(getOneUser.fulfilled, (state: UsersStateType, action: PayloadAction<{user: UserType, resultCode: number}>) => {
            state.user = {...action.payload.user};
            state.isLoading = false;
        })
        builder.addCase(getOneUser.rejected, (state: UsersStateType) => {
            state.isLoading = false;
        })
    }
})

export const {searchFieldChange} = usersSlice.actions;

export default usersSlice.reducer;