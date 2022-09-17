import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {CategoriesAPI} from "../api/api";
import {MaterialType} from "./materialsSlice";
import {TaskType} from "./tasksSlice";

export type IdFiledType = string | number;
export type CategoryType = {
    id: IdFiledType,
    parentId: IdFiledType,
    label: string,
    //items: Array<any>//Array<CategoryType> | Array<MaterialType> | Array<TaskType>,//if sub-categories exists
}

type InitStatecategoryType = {
    categories: Array<CategoryType>,
    favoriteCategoryIds: Array<IdFiledType>,
    isLoading: boolean,
    isShownCats: Array<IdFiledType>,
}
let initialState: InitStatecategoryType = {
    categories: [
       /* {id: '12345678', parentId: '0', label: "My parent node 12345678", items: []},
        {id: '123', parentId: '0', label: 'dsa', items: []}*/
        {id: '12345678', parentId: '0', label: "My parent node 12345678"},
        {id: '123', parentId: '0', label: 'dsa'}
    ],
    favoriteCategoryIds: [],
    isLoading: false,
    isShownCats:[],
}

export const getAllCategoriesThunk = createAsyncThunk(
    'materials/getAllCategories',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await CategoriesAPI.getAllcategories();
        if (res.data) {
            const result:CategoryType[] = [];
            for (let i=0; i<res.data.length; i++)
                result.push({id: res.data[i]._id, label: res.data[i].label, parentId: res.data[i].parentId});
            return result;
        } else
            return [];
    }
);


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setAllCategoriesAC: (state: InitStatecategoryType, action: PayloadAction<CategoryType[]>) => {
            state.categories = action.payload;
        },
        addIdToFavoritesCategoriesAC: (state: InitStatecategoryType, action: PayloadAction<IdFiledType>) => {
            state.favoriteCategoryIds = [...state.favoriteCategoryIds, action.payload]
        },
        deleteIdFromFavoritesCategoriesAC: (state: InitStatecategoryType, action: PayloadAction<IdFiledType>) => {
            state.favoriteCategoryIds = state.favoriteCategoryIds.filter(el => String(el) !== String(action.payload))
        },
        addToShownCats: (state: InitStatecategoryType, action: PayloadAction<IdFiledType>) => {
            state.isShownCats.push(action.payload);
        },
        deleteFromShownCats: (state: InitStatecategoryType, action: PayloadAction<IdFiledType>) => {
            state.isShownCats = state.isShownCats.filter(item => item !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategoriesThunk.fulfilled, (state: InitStatecategoryType, action: PayloadAction<CategoryType[]>) => {
            state.isLoading = false;
            state.categories = action.payload;
        })
        builder.addCase(getAllCategoriesThunk.rejected, (state: InitStatecategoryType)=>{
            state.isLoading = false;
            //console.log('extraReducers / getAllMaterials.rejected');
        })
        builder.addCase(getAllCategoriesThunk.pending, (state: InitStatecategoryType)=>{
            state.isLoading = true;
        })
    },
})

export const {
    addIdToFavoritesCategoriesAC,
    deleteIdFromFavoritesCategoriesAC,
    addToShownCats,
    deleteFromShownCats
} = categoriesSlice.actions;


export default categoriesSlice.reducer;