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

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.getUsers();
        return res.data;
    }
)

//type GetOneUserDataType = {userId: IdFiledType}
export const getOneUser = createAsyncThunk(
    'users/getOneUser',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.getOneUser(userId);
        return res.data;
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.deleteUser(userId);
        return res.data;
    }
)

export const makeUserAdmin = createAsyncThunk(
    'users/makeUserAdmin',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.makeUserAdmin(userId);
        return res.data;
    }
);

//type MakeUserAsUserType = {userId: IdFiledType}
export const makeUserAsUser = createAsyncThunk(
    'users/makeUserAsUser',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.makeUserAsUser(userId);
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

        builder.addCase(deleteUser.pending, (state: UsersStateType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteUser.fulfilled, (state: UsersStateType, action: PayloadAction<{users: Array<UserType>, resultCode: number}>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                state.users = [...action.payload.users];
            }
            //state.user = {...action.payload.user};
            state.isLoading = false;
        })
        builder.addCase(deleteUser.rejected, (state: UsersStateType) => {
            state.isLoading = false;
        })


        builder.addCase(makeUserAdmin.pending, (state: UsersStateType) => {
            state.isLoading = true;
        })
        builder.addCase(makeUserAdmin.fulfilled, (state: UsersStateType, action: PayloadAction<{
            users: Array<UserType>,
            currentUserID: IdFiledType,
            resultCode: number
        }>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                state.users = [...action.payload.users];
                const user = action.payload.users.find( el => el.userId === action.payload.currentUserID);
                if (user)
                    state.user = user;
            }
            state.isLoading = false;
        })
        builder.addCase(makeUserAdmin.rejected, (state: UsersStateType) => {
            state.isLoading = false;
        })

        builder.addCase(makeUserAsUser.pending, (state: UsersStateType) => {
            state.isLoading = true;
        })
        builder.addCase(makeUserAsUser.fulfilled, (state: UsersStateType, action: PayloadAction<{
            users: Array<UserType>,
            currentUserID: IdFiledType
            resultCode: number
        }>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                state.users = [...action.payload.users];
                const user = action.payload.users.find( el => el.userId === action.payload.currentUserID);
                if (user)
                    state.user = user;
            }
            state.isLoading = false;
        })
        builder.addCase(makeUserAsUser.rejected, (state: UsersStateType) => {
            state.isLoading = false;
        })
    }
})

export const {searchFieldChange} = usersSlice.actions;

export default usersSlice.reducer;