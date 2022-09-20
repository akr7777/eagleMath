import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {ContentAPI} from "../api/api";
//import {CategoryType} from "./categoriesSlice";

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
            /*const result:CategoryType[] = [];
            for (let i=0; i<res.data.length; i++)
                result.push({id: res.data[i].id, parentId: res.data[i].parentid, label: res.data[i].label});
            return result;*/
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
/*export const addMaterialToFavoritesThunk = createAsyncThunk(
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
);*/


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

        /*builder.addCase(getFavoritesThunk.pending, (state: InitStateMaterialsType) => {
            state.isLoading = true;
        })
        builder.addCase(getFavoritesThunk.fulfilled, (state: InitStateMaterialsType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteMaterialIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getFavoritesThunk.rejected, (state: InitStateMaterialsType) => {
            state.isLoading = false;
        })*/

        /*builder.addCase(addMaterialToFavoritesThunk.pending, (state:InitStateMaterialsType) => {
            state.isLoading = true;
        })
        builder.addCase(addMaterialToFavoritesThunk.fulfilled, (state:InitStateMaterialsType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteMaterialIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(addMaterialToFavoritesThunk.rejected, (state:InitStateMaterialsType) => {
            state.isLoading = false;
        })

        builder.addCase(deleteMaterialFromFavoritesThunk.pending, (state: InitStateMaterialsType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteMaterialFromFavoritesThunk.fulfilled, (state: InitStateMaterialsType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteMaterialIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(deleteMaterialFromFavoritesThunk.rejected, (state: InitStateMaterialsType) => {
            state.isLoading = false;
        })*/
    },
})

export const {
    /*addIdToFavoritesMaterialsAC,
    deleteIdFromFavoritesMaterialsAC*/
} = materialsSlice.actions;


export default materialsSlice.reducer;