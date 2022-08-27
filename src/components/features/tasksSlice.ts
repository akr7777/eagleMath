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
    isLoading: false,
}

export const getAllTasks = createAsyncThunk(
    'tasks/getAllTasks',
    async (_, {rejectWithValue, dispatch}) => {
        //console.log('thunk getAllMaterials 1111')
        const res = await TasksAPI.getAllTasks();
        if (res.data) {
            const result:CategoryType[] = [];
            for (let i=0; i<res.data.length; i++)
                //result.push({id: 0, parentId: 0, label: '000', items: []});
                result.push({id: res.data[i].id, parentId: res.data[i].parentid, label: res.data[i].label});
            //return res.data;
            return result;
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
        /*setAllCategoriesAC: (state: InitStateTasksType, action: PayloadAction<CategoryType[]>) => {
            state.categories = action.payload;
        },*/
        addIdToFavoritesTasksAC: (state: InitStateTasksType, action: PayloadAction<IdFiledType>) => {
            state.favoriteTasksIds = [...state.favoriteTasksIds, action.payload]
        },
        deleteIdFromFavoritesTasksAC: (state: InitStateTasksType, action: PayloadAction<IdFiledType>) => {
            state.favoriteTasksIds = state.favoriteTasksIds.filter(el => String(el) !== String(action.payload))
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllTasks.fulfilled, (state: InitStateTasksType, action: PayloadAction<TaskType[]>) => {
            state.tasks = action.payload;
        })
        builder.addCase(getAllTasks.rejected, ()=>{
            console.log('extraReducers / getAllMaterials.rejected');
        })

        /*builder.addCase(getAllCategories.fulfilled, (state: InitStateTasksType, action: PayloadAction<CategoryType[]>) => {
            //console.log('extraReducers / getAllCategories.fulfilled=', action)
            state.categories = action.payload;
        })
        builder.addCase(getAllCategories.rejected, () => {
            console.log('extraReducers / getAllCategories.rejected')
        })*/
    },
})

export const {
    setAllTasksAC,
    addIdToFavoritesTasksAC,
    deleteIdFromFavoritesTasksAC
} = tasksSlice.actions;


export default tasksSlice.reducer;