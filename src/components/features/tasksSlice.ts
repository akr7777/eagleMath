import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {CategoriesAPI, TasksAPI} from "../api/api";

export type IdFiledType = string | number;
export type TaskType = {
    id: IdFiledType,
    parentId: number | null | string,
    label: string,
    items: Array<TaskType>,//if sub-categories exists
}
export type CategoryType = {
    id: IdFiledType,
    parentId: IdFiledType | null,
    label: string,
    items: Array<CategoryType>// | Array<MaterialType>,//if sub-categories exists
}

type InitStateTasksType = {
    categories: Array<CategoryType>,
    tasks: Array<TaskType>,
    favoriteTasksIds: Array<IdFiledType>,
    isLoading: boolean,
}
let initialState: InitStateTasksType = {
    categories: [
        {id: '12345678', parentId: null, label: "My parent node 12345678", items: []},
        {id: '123', parentId: null, label: 'dsa', items: []}
    ],
    tasks: [
        {id: 12380, parentId: 12345678, label: "My parent node 12380", items: []},
    ],
    favoriteTasksIds: [],
    isLoading: false,
}

export const getAllTasks = createAsyncThunk(
    'tasks/getAllTasks',
    async (_, {rejectWithValue, dispatch}) => {
        //console.log('thunk getAllMaterials 1111')
        const res = await TasksAPI.getAllTasks();
        if (res.data)
            return res.data;
    }
);
export const getAllCategories = createAsyncThunk(
    'tasks/getAllCategories',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await CategoriesAPI.getAllcategories();
        if (res.data)
            return res.data;
    }
);


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setAllTasksAC: (state: InitStateTasksType, action: PayloadAction<TaskType[]>) => {
            state.tasks = action.payload;
        },
        setAllCategoriesAC: (state: InitStateTasksType, action: PayloadAction<CategoryType[]>) => {
            state.categories = action.payload;
        },
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

        builder.addCase(getAllCategories.fulfilled, (state: InitStateTasksType, action: PayloadAction<CategoryType[]>) => {
            //console.log('extraReducers / getAllCategories.fulfilled=', action)
            state.categories = action.payload;
        })
        builder.addCase(getAllCategories.rejected, () => {
            console.log('extraReducers / getAllCategories.rejected')
        })
    },
})

export const {
    setAllTasksAC,
    setAllCategoriesAC,
    addIdToFavoritesTasksAC,
    deleteIdFromFavoritesTasksAC
} = tasksSlice.actions;


export default tasksSlice.reducer;