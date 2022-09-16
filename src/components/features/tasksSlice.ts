import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {CategoriesAPI, TasksAPI} from "../api/api";
import {CategoryType} from "./categoriesSlice";

export type IdFiledType = string | number;
export type TaskType = {
    id: IdFiledType,
    parentId: IdFiledType,
    label: string,
}

type InitStateTasksType = {
    tasks: Array<TaskType>,
    favoriteTasksIds: Array<IdFiledType>,
    isLoading: boolean,
}
let initialState: InitStateTasksType = {
    tasks: [
        {id: 12380, parentId: 12345678, label: "My parent node 12380"},
    ],
    favoriteTasksIds: [],
    isLoading: true,
}

export const getAllTasks = createAsyncThunk(
    'tasks/getAllTasks',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await TasksAPI.getAllTasks();
        if (res.data) {
            return res.data;
            /*const result: CategoryType[] = [];
            for (let i = 0; i < res.data.length; i++)
                result.push({id: res.data[i].id, parentId: res.data[i].parentid, label: res.data[i].label});
            return result;*/
        } else
            return [];
    }
);

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setAllTasksAC: (state: InitStateTasksType, action: PayloadAction<TaskType[]>) => {
            state.tasks = action.payload;
        },
        addIdToFavoritesTasksAC: (state: InitStateTasksType, action: PayloadAction<IdFiledType>) => {
            state.favoriteTasksIds = [...state.favoriteTasksIds, action.payload]
        },
        deleteIdFromFavoritesTasksAC: (state: InitStateTasksType, action: PayloadAction<IdFiledType>) => {
            state.favoriteTasksIds = state.favoriteTasksIds.filter(el => String(el) !== String(action.payload))
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllTasks.pending, (state: InitStateTasksType) => {
            state.isLoading = true;
        })
        builder.addCase(getAllTasks.fulfilled, (state: InitStateTasksType, action: PayloadAction<any>) => {
            //console.log('TasksSlice / getAllTasks.fulfilled / action.payload=', action.payload)
            state.tasks = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getAllTasks.rejected, (state: InitStateTasksType) => {
            state.isLoading = false;
            console.log('extraReducers / getAllMaterials.rejected');
        })
    },
})

export const {
    setAllTasksAC,
    addIdToFavoritesTasksAC,
    deleteIdFromFavoritesTasksAC
} = tasksSlice.actions;


export default tasksSlice.reducer;