import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {CategoriesAPI, ContentAPI} from "../../components/api/api";
import {getAllMaterialsThunk, getFavoritesThunk, getAllTasksThunk} from "./tasksThunks";
import {
    addCategoryThunk,
    addToFavoritesThunk,
    changeParentIdThunk, deleteCategoryThunk,
    deleteFromFavoritesThunk,
    getAllCategoriesThunk
} from './categoriesThunks';

export type IdFiledType = string | number;
export type CategoryType = {
    id: IdFiledType,
    parentId: IdFiledType,
    label: string,
}
type InitStatecategoryType = {
    categories: Array<CategoryType>,
    isLoading: boolean,
    isShownCats: Array<IdFiledType>,
    favoriteIds: Array<IdFiledType>,
    selectedId: IdFiledType,
    showMenuId: IdFiledType,

    editNameId: IdFiledType,
    newContentName: string,
}
let initialState: InitStatecategoryType = {
    categories: [],
    isLoading: false,
    isShownCats:[],
    favoriteIds:[],
    selectedId: "-1",
    showMenuId: "-1",

    editNameId: "-1",
    newContentName: "",
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addToShownCats: (state: InitStatecategoryType, action: PayloadAction<IdFiledType>) => {
            state.isShownCats.push(action.payload);
        },
        deleteFromShownCats: (state: InitStatecategoryType, action: PayloadAction<IdFiledType>) => {
            state.isShownCats = state.isShownCats.filter(item => item !== action.payload)
        },
        setEditNameIdAC: (state: InitStatecategoryType, action: PayloadAction<IdFiledType>) => {
            state.editNameId = action.payload;
        },
        setNewContentName: (state: InitStatecategoryType, action: PayloadAction<string>) => {
            state.newContentName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategoriesThunk.fulfilled, (state: InitStatecategoryType, action: PayloadAction<CategoryType[]>) => {
            state.isLoading = false;
            state.categories = action.payload;
        })
        builder.addCase(getAllCategoriesThunk.rejected, (state: InitStatecategoryType)=>{
            state.isLoading = false;
        })
        builder.addCase(getAllCategoriesThunk.pending, (state: InitStatecategoryType)=>{
            state.isLoading = true;
        })


        builder.addCase(getFavoritesThunk.pending, (state: InitStatecategoryType) => {
            state.isLoading = true;
        })
        builder.addCase(getFavoritesThunk.fulfilled, (state: InitStatecategoryType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getFavoritesThunk.rejected, (state: InitStatecategoryType) => {
            state.isLoading = false;
        })

        builder.addCase(addToFavoritesThunk.pending, (state:InitStatecategoryType) => {
            state.isLoading = true;
        })
        builder.addCase(addToFavoritesThunk.fulfilled, (state:InitStatecategoryType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(addToFavoritesThunk.rejected, (state:InitStatecategoryType) => {
            state.isLoading = false;
        })

        builder.addCase(deleteFromFavoritesThunk.pending, (state: InitStatecategoryType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteFromFavoritesThunk.fulfilled, (state: InitStatecategoryType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(deleteFromFavoritesThunk.rejected, (state: InitStatecategoryType) => {
            state.isLoading = false;
        })

        builder.addCase(changeParentIdThunk.pending, (state: InitStatecategoryType) => {
            state.isLoading = true;
        })
        builder.addCase(changeParentIdThunk.fulfilled, (state: InitStatecategoryType) => {
            //state.favoriteIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(changeParentIdThunk.rejected, (state: InitStatecategoryType) => {
            state.isLoading = false;
        })

        builder.addCase(addCategoryThunk.pending, (state: InitStatecategoryType) => {
            state.isLoading = true;
        })
        builder.addCase(addCategoryThunk.fulfilled, (state: InitStatecategoryType, action: PayloadAction<{
            categories: CategoryType[], resultCode: number
        }>) => {
            //state.categories = [...action.payload.categories];
            state.isLoading = false;
        })
        builder.addCase(addCategoryThunk.rejected, (state: InitStatecategoryType) => {
            state.isLoading = false;
        })

        builder.addCase(deleteCategoryThunk.pending, (state: InitStatecategoryType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteCategoryThunk.fulfilled, (state: InitStatecategoryType, action: PayloadAction<{
            categories: CategoryType[], resultCode: number
        }>) => {
            state.isLoading = false;
        })
        builder.addCase(deleteCategoryThunk.rejected, (state: InitStatecategoryType) => {
            state.isLoading = false;
        })
    },
})

export const {
    addToShownCats,
    deleteFromShownCats,
    setEditNameIdAC,
    setNewContentName
} = categoriesSlice.actions;


export default categoriesSlice.reducer;