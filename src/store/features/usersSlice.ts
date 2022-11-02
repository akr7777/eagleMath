import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {usersAPI} from "../../components/api/api";
import {IdFiledType} from "./categoriesSlice";
import {ResultCodesEnum as resultCodes} from "../../components/common/resultCodes";
import {deleteUserThunk, getOneUserThunk, getUsersThunk, makeUserAdmin, makeUserAsUser} from "./usersThunks";

export type UserType = {
    userId: IdFiledType,
    name: string,
    email: string,
    isAdmin: boolean,
}
/*type UsersStateType = {
    isLoading: boolean,
    users: UserType[],
    searchField: string,
    user: UserType,
}*/
const authInitState = {
    isLoading: false,
    users: [] as UserType[],
    searchField: '',
    user: {userId: '0', name: '', email: '', isAdmin: false} as UserType
}
type UsersStateType = typeof authInitState;

export const usersSlice = createSlice({
    name: 'users',
    initialState: authInitState,
    reducers: {
        searchFieldChange: (state:UsersStateType, action: PayloadAction<string>) => {
            state.searchField = action.payload;
        },
    },


    extraReducers: (builder) => {
        builder.addCase(getUsersThunk.pending, (state: UsersStateType) => {
            state.isLoading = true;
        })
        builder.addCase(getUsersThunk.fulfilled, (state: UsersStateType, action: PayloadAction<UserType[]>) => {
            state.users = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getUsersThunk.rejected, (state: UsersStateType) => {
            state.isLoading = false;
        })

        builder.addCase(getOneUserThunk.pending, (state: UsersStateType) => {
            state.isLoading = true;
        })
        builder.addCase(getOneUserThunk.fulfilled, (state: UsersStateType, action: PayloadAction<{user: UserType, resultCode: number}>) => {
            state.user = {...action.payload.user};
            state.isLoading = false;
        })
        builder.addCase(getOneUserThunk.rejected, (state: UsersStateType) => {
            state.isLoading = false;
        })

        builder.addCase(deleteUserThunk.pending, (state: UsersStateType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteUserThunk.fulfilled, (state: UsersStateType, action: PayloadAction<{users: Array<UserType>, resultCode: number}>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                state.users = [...action.payload.users];
            }
            state.isLoading = false;
        })
        builder.addCase(deleteUserThunk.rejected, (state: UsersStateType) => {
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