import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {ContentAPI} from "../api/api";
import {getAllTasksThunk} from "./tasksSlice";
import {getAllCategoriesThunk, IdFiledType} from "./categoriesSlice";
//import {CategoryType} from "./categoriesSlice";

//export type IdFiledType = string | number;
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
        /*{id: '', parentId: '', label: ""},*/
    ],
    favoriteMaterialIds: [],
    isLoading: true,
}

export const getAllMaterialsThunk = createAsyncThunk(
    'materials/getAllMaterials',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getAllMaterials();
        if (res.data) {
            return res.data;
        } else
            return [];
    }
);

export const getFavoritesThunk = createAsyncThunk(
    'materials/getFavoritesThunk',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getFavoriteContent(userId);
        return res.data;
    }
);

type RenameMaterialType = {
    contentId: IdFiledType,
    newName: string,
}
export const renameMaterialThunk = createAsyncThunk(
    'materials/renameMaterialThunk',
    async (data: RenameMaterialType, {rejectWithValue, dispatch}) => {
        const {contentId, newName} = data;
        const res = await ContentAPI.renameMaterial(contentId, newName);
        dispatch(getAllMaterialsThunk());
        dispatch(getAllTasksThunk());
        dispatch(getAllCategoriesThunk());
        return res.data;
    }
);

export const addMaterialThunk = createAsyncThunk(
    'materials/addMaterialThunk',
    async (parentContentId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.addMaterial(parentContentId);
        dispatch(getAllMaterialsThunk());
        dispatch(getAllTasksThunk());
        dispatch(getAllCategoriesThunk());
        return res.data;
    }
);

export const materialsSlice = createSlice({
    name: 'materials',
    initialState,
    reducers: {
        /*setAllMaterialsAC: (state: InitStateMaterialsType, action: PayloadAction<MaterialType[]>) => {
            state.materials = action.payload;
        },
        addIdToFavoritesMaterialsAC: (state: InitStateMaterialsType, action: PayloadAction<IdFiledType>) => {
            state.favoriteMaterialIds = [...state.favoriteMaterialIds, action.payload]
        },
        deleteIdFromFavoritesMaterialsAC: (state: InitStateMaterialsType, action: PayloadAction<IdFiledType>) => {
            state.favoriteMaterialIds = state.favoriteMaterialIds.filter(el => String(el) !== String(action.payload))
        }*/
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMaterialsThunk.pending, (state: InitStateMaterialsType) => {
            state.isLoading = true;
        })
        builder.addCase(getAllMaterialsThunk.fulfilled, (state: InitStateMaterialsType, action: PayloadAction<MaterialType[]>) => {
            //console.log('MaterialSlice / getAllMaterials.fulfilled / action.payload=', action.payload)
            state.materials = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getAllMaterialsThunk.rejected, (state: InitStateMaterialsType)=>{
            state.isLoading = false;
            console.log('extraReducers / getAllMaterials.rejected');
        })

        builder.addCase(renameMaterialThunk.pending, (state: InitStateMaterialsType) => {state.isLoading = true})
        builder.addCase(renameMaterialThunk.fulfilled, (state: InitStateMaterialsType) => {state.isLoading = false})
        builder.addCase(renameMaterialThunk.rejected, (state: InitStateMaterialsType) => {state.isLoading = false})

        builder.addCase(addMaterialThunk.pending, (state: InitStateMaterialsType) => {state.isLoading = true})
        builder.addCase(addMaterialThunk.fulfilled, (state: InitStateMaterialsType) => {state.isLoading = false})
        builder.addCase(addMaterialThunk.rejected, (state: InitStateMaterialsType) => {state.isLoading = false})

    },
})

export const {
    /*addIdToFavoritesMaterialsAC,
    deleteIdFromFavoritesMaterialsAC*/
} = materialsSlice.actions;


export default materialsSlice.reducer;