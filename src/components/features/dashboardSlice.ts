import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {CategoryType, IdFiledType} from "./categoriesSlice";
import {ContentAPI} from "../api/api";
import {addTaskToFavoritesThunk, deleteTaskFromFavoritesThunk, TaskType} from "./tasksSlice";
import {MaterialType} from "./materialsSlice";

type DashboardStateType = {
    favoriteContent: Array<IdFiledType>,
    isLoading: boolean,
}
const dashboardInitialState:DashboardStateType = {
    favoriteContent: [],
    isLoading: false,
}

export const getFavoritesThunk = createAsyncThunk(
    'materials/getFavoritesThunk',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getFavoriteContent(userId);
        return res.data;
    }
);
export const addMaterialToFavoritesThunk = createAsyncThunk(
    'materials/addMaterialToFavoritesThunk',
    async (content:{userId: IdFiledType, contentId:IdFiledType}, {rejectWithValue, dispatch}) => {
        const {userId, contentId} = content;
        const res = await ContentAPI.addToFavorites(userId, contentId);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);
export const deleteMaterialFromFavoritesThunk = createAsyncThunk(
    'materials/deleteMaterialFromFavoritesThunk',
    async (content:{userId: IdFiledType, contentId:IdFiledType}, {rejectWithValue, dispatch}) => {
        const {userId, contentId} = content;
        const res = await ContentAPI.deleteFromFavorites(userId, contentId);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: dashboardInitialState,
    reducers: {
        setFavoriteContent: (state:DashboardStateType, action: PayloadAction<Array<IdFiledType>>): void => {
            state.favoriteContent = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getFavoritesThunk.pending, (state: DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(getFavoritesThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteContent = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getFavoritesThunk.rejected, (state: DashboardStateType) => {
            state.isLoading = false;
        })

        builder.addCase(addTaskToFavoritesThunk.pending, (state:DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(addTaskToFavoritesThunk.fulfilled, (state:DashboardStateType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteContent = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(addTaskToFavoritesThunk.rejected, (state:DashboardStateType) => {
            state.isLoading = false;
        })

        builder.addCase(deleteTaskFromFavoritesThunk.pending, (state: DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteTaskFromFavoritesThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteContent = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(deleteTaskFromFavoritesThunk.rejected, (state: DashboardStateType) => {
            state.isLoading = false;
        })

    }
})
export const {setFavoriteContent} = dashboardSlice.actions;

export default dashboardSlice.reducer;