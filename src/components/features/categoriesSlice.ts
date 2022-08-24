import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {CategoriesAPI} from "../api/api";

export type IdFiledType = string | number;
export type CategoryType = {
    id: IdFiledType,
    parentId: IdFiledType | null,
    label: string,
    items: Array<CategoryType>// | Array<MaterialType>,//if sub-categories exists
}

type InitStatecategoryType = {
    categories: Array<CategoryType>,
    favoriteCategoryIds: Array<IdFiledType>,
    isLoading: boolean,
}
let initialState: InitStatecategoryType = {
    categories: [
        {id: '12345678', parentId: null, label: "My parent node 12345678", items: []},
        {id: '123', parentId: null, label: 'dsa', items: []}
    ],
    favoriteCategoryIds: [],
    isLoading: false,
}

export const getAllCategories = createAsyncThunk(
    'materials/getAllCategories',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await CategoriesAPI.getAllcategories();
        if (res.data)
            return res.data;
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
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.fulfilled, (state: InitStatecategoryType, action: PayloadAction<CategoryType[]>) => {
            state.isLoading = false;
            state.categories = action.payload;
        })
        builder.addCase(getAllCategories.rejected, (state: InitStatecategoryType)=>{
            state.isLoading = false;
            console.log('extraReducers / getAllMaterials.rejected');
        })
        builder.addCase(getAllCategories.pending, (state: InitStatecategoryType)=>{
            state.isLoading = true;
        })
    },
})

export const {
    addIdToFavoritesCategoriesAC,
    deleteIdFromFavoritesCategoriesAC
} = categoriesSlice.actions;


export default categoriesSlice.reducer;