import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios';
import {categoriesAPI, materialsAPI} from "../api/materialsAPIData";

/*export type MaterialType = {
    materialID: number,
    title: string,
    description: string | null,
    text: string
    additions: string,
    parentCatId: number,
}
export type MaterialsType = Array<MaterialType>;
export type CategoryType = {catID: number, catTitle: string, parentCatId: number}
export type CategoriesType = Array<CategoryType>;*/

export type MaterialType = {
    id: number | string,
    parentId: number | null | string,
    label: string,
    //items: Array<MaterialType>,//if sub-categories exists
}
export type CategoryType = {
    id: number | string,
    parentId: number | null | string,
    label: string,
    items?: Array<CategoryType> | Array<MaterialType>,//if sub-categories exists
}

type InitStateMaterialsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType>,
}
let initialState: InitStateMaterialsType = {
    categories: [{id: '12345678', parentId: null, label: "My parent node 12345678", items:[]}],
    materials: [{id: 1238, parentId: 12345678, label: "My parent node 1238"}]
}

/*export const getAllMaterials = createAsyncThunk(
    'materials/getAllMaterials',
    async function (_, { rejectWithValue, dispatch } ) {
        const res = await axios.get('https://someURL');
        dispatch(setAllMaterials(res.data))
    }
);*/


export const materialsSlice = createSlice({
    name: 'materials',
    initialState,
    reducers: {
        /*setTaskDescription: (state: TaskType, action: PayloadAction<string>) => {
            state.taskDescription = action.payload;
        }*/
        setAllMaterialsAC: (state:InitStateMaterialsType) => {
            state.materials = [...materialsAPI];
        },
        setAllCategoriesAC: (state:InitStateMaterialsType) => {
            state.categories = [...categoriesAPI];
        },
        /*setPosts: (state:MaterialType[], action:PayloadAction<any>) => {
            state[0].posts = action.payload;
        }*/
    },
    /*extraReducers: {
        /!*[getAllMaterials.fulfilled]: ()=> console.log('fulfilled');
        [getAllMaterials.pending]: ()=> console.log('pending');
        [getAllMaterials.rejected]: ()=> console.log('rejected');*!/
        [getPosts.fulfilled]: () => console.log('fulfilled')
    }*/
})

export const { setAllMaterialsAC, setAllCategoriesAC } = materialsSlice.actions;



export default materialsSlice.reducer;