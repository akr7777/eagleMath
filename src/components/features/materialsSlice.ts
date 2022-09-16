import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {CategoriesAPI, MaterialsAPI} from "../api/api";
import {CategoryType} from "./categoriesSlice";

export type IdFiledType = string | number;
export type MaterialType = {
    id: IdFiledType,
    parentId: IdFiledType,
    label: string,
}
type InitStateMaterialsType = {
    materials: Array<MaterialType>,
    favoriteMaterialIds: Array<IdFiledType>,
    isLoading: boolean,
}
let initialState: InitStateMaterialsType = {
    materials: [
        {id: 12380, parentId: 12345678, label: "My parent node 12380"},
    ],
    favoriteMaterialIds: [],
    isLoading: true,
}

export const getAllMaterials = createAsyncThunk(
    'materials/getAllMaterials',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await MaterialsAPI.getAllMaterials();
        if (res.data) {
            return res.data;
            /*const result:CategoryType[] = [];
            for (let i=0; i<res.data.length; i++)
                result.push({id: res.data[i].id, parentId: res.data[i].parentid, label: res.data[i].label});
            return result;*/
        } else
            return [];
    }
);


export const materialsSlice = createSlice({
    name: 'materials',
    initialState,
    reducers: {
        setAllMaterialsAC: (state: InitStateMaterialsType, action: PayloadAction<MaterialType[]>) => {
            state.materials = action.payload;
        },
        addIdToFavoritesMaterialsAC: (state: InitStateMaterialsType, action: PayloadAction<IdFiledType>) => {
            state.favoriteMaterialIds = [...state.favoriteMaterialIds, action.payload]
        },
        deleteIdFromFavoritesMaterialsAC: (state: InitStateMaterialsType, action: PayloadAction<IdFiledType>) => {
            state.favoriteMaterialIds = state.favoriteMaterialIds.filter(el => String(el) !== String(action.payload))
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllMaterials.pending, (state: InitStateMaterialsType) => {
            state.isLoading = true;
        })
        builder.addCase(getAllMaterials.fulfilled, (state: InitStateMaterialsType, action: PayloadAction<MaterialType[]>) => {
            //console.log('MaterialSlice / getAllMaterials.fulfilled / action.payload=', action.payload)
            state.materials = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getAllMaterials.rejected, (state: InitStateMaterialsType)=>{
            state.isLoading = false;
            console.log('extraReducers / getAllMaterials.rejected');
        })
    },
})

export const {
    addIdToFavoritesMaterialsAC,
    deleteIdFromFavoritesMaterialsAC
} = materialsSlice.actions;


export default materialsSlice.reducer;