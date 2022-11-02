import {createAsyncThunk} from "@reduxjs/toolkit";
import {usersAPI} from "../../components/api/api";
import {IdFiledType} from "./categoriesSlice";

export const getUsersThunk = createAsyncThunk(
    'users/getUsersThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.getUsers();
        return res.data;
    }
)

export const getOneUserThunk = createAsyncThunk(
    'users/getOneUserThunk',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.getOneUser(userId);
        return res.data;
    }
)

export const deleteUserThunk = createAsyncThunk(
    'users/deleteUserThunk',
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

export const makeUserAsUser = createAsyncThunk(
    'users/makeUserAsUser',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.makeUserAsUser(userId);
        return res.data;
    }
)
