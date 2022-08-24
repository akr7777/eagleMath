import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {CategoriesAPI, MaterialsAPI} from "../api/api";

export type IdFiledType = string | number;
export type MaterialType = {
    id: IdFiledType,
    parentId: number | null | string,
    label: string,
    items: Array<MaterialType>,//if sub-categories exists
}
export type CategoryType = {
    id: IdFiledType,
    parentId: IdFiledType | null,
    label: string,
    items: Array<CategoryType>// | Array<MaterialType>,//if sub-categories exists
}

type InitStateMaterialsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType>,
    favoriteMaterialIds: Array<IdFiledType>,
    isLoading: boolean,
}
let initialState: InitStateMaterialsType = {
    categories: [
        {id: '12345678', parentId: null, label: "My parent node 12345678", items: []},
        {id: '123', parentId: null, label: 'dsa', items: []}
    ],
    materials: [
        {id: 12380, parentId: 12345678, label: "My parent node 12380", items: []},
    ],
    favoriteMaterialIds: [],
    isLoading: false,
}

export const getAllMaterials = createAsyncThunk(
    'materials/getAllMaterials',
    async (_, {rejectWithValue, dispatch}) => {
        //console.log('thunk getAllMaterials 1111')
        const res = await MaterialsAPI.getAllMaterials();
        if (res.data)
            return res.data;
    }
);
export const getAllCategories = createAsyncThunk(
    'materials/getAllCategories',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await CategoriesAPI.getAllcategories();
        if (res.data)
            return res.data;
    }
);


export const materialsSlice = createSlice({
    name: 'materials',
    initialState,
    reducers: {
        setAllMaterialsAC: (state: InitStateMaterialsType, action: PayloadAction<MaterialType[]>) => {
            state.materials = action.payload;
        },
        setAllCategoriesAC: (state: InitStateMaterialsType, action: PayloadAction<CategoryType[]>) => {
            state.categories = action.payload;
        },
        addIdToFavoritesMaterialsAC: (state: InitStateMaterialsType, action: PayloadAction<IdFiledType>) => {
            state.favoriteMaterialIds = [...state.favoriteMaterialIds, action.payload]
        },
        deleteIdFromFavoritesMaterialsAC: (state: InitStateMaterialsType, action: PayloadAction<IdFiledType>) => {
            state.favoriteMaterialIds = state.favoriteMaterialIds.filter(el => String(el) !== String(action.payload))
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllMaterials.fulfilled, (state: InitStateMaterialsType, action: PayloadAction<MaterialType[]>) => {
            state.materials = action.payload;
        })
        builder.addCase(getAllMaterials.rejected, ()=>{
            console.log('extraReducers / getAllMaterials.rejected');
        })

        builder.addCase(getAllCategories.fulfilled, (state: InitStateMaterialsType, action: PayloadAction<CategoryType[]>) => {
            //console.log('extraReducers / getAllCategories.fulfilled=', action)
            state.categories = action.payload;
        })
        builder.addCase(getAllCategories.rejected, () => {
            console.log('extraReducers / getAllCategories.rejected')
        })
    },
})

export const {
    addIdToFavoritesMaterialsAC,
    deleteIdFromFavoritesMaterialsAC
} = materialsSlice.actions;


export default materialsSlice.reducer;