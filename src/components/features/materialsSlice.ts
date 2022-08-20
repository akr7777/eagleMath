import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {MaterialsAPI} from "../api/api";

export type MaterialType = {
    id: number | string,
    parentId: number | null | string,
    label: string,
    items: Array<MaterialType>,//if sub-categories exists
}
export type CategoryType = {
    id: number | string,
    parentId: number | null | string,
    label: string,
    items: Array<CategoryType>// | Array<MaterialType>,//if sub-categories exists
}

type InitStateMaterialsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType>,
}
let initialState: InitStateMaterialsType = {
    categories: [
        {id: '12345678', parentId: null, label: "My parent node 12345678", items:[]},
        {id: '123', parentId: null, label: 'dsa', items: []}
    ],
    materials: [
        {id: 12380, parentId: 12345678, label: "My parent node 12380", items: []},


    ]
}

export const getAllMaterials = createAsyncThunk(
    'materials/getAllMaterials',
    async (_, { rejectWithValue, dispatch } ) => {
        const data = await MaterialsAPI.getAllMaterials();
        if (data.materials && data.categories) {
            dispatch(setAllMaterialsAC(data.materials));
            dispatch(setAllCategoriesAC(data.categories));
        }
    }
);


export const materialsSlice = createSlice({
    name: 'materials',
    initialState,
    reducers: {
        setAllMaterialsAC: (state:InitStateMaterialsType, action: PayloadAction<MaterialType[]>) => {
            state.materials = action.payload;
        },
        setAllCategoriesAC: (state:InitStateMaterialsType, action: PayloadAction<CategoryType[]>) => {
            state.categories = action.payload;
        },

    },
    extraReducers: {
        [getAllMaterials.fulfilled.toString()]: ()=> console.log('fulfilled'),
        [getAllMaterials.pending.toString()]: ()=> console.log('pending'),
        [getAllMaterials.rejected.toString()]: ()=> console.log('rejected'),
    }
})

export const { setAllMaterialsAC, setAllCategoriesAC } = materialsSlice.actions;



export default materialsSlice.reducer;