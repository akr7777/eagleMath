import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {CategoriesAPI, ContentAPI} from "../api/api";
import {getAllMaterialsThunk, getFavoritesThunk, MaterialType} from "./materialsSlice";
import {getAllTasksThunk, TaskType} from "./tasksSlice";

export type IdFiledType = string | number;
export type CategoryType = {
    id: IdFiledType,
    parentId: IdFiledType,
    label: string,
    //items: Array<any>//Array<CategoryType> | Array<MaterialType> | Array<TaskType>,//if sub-categories exists
}

type InitStatecategoryType = {
    categories: Array<CategoryType>,
    isLoading: boolean,
    isShownCats: Array<IdFiledType>,
    favoriteIds: Array<IdFiledType>,
}
let initialState: InitStatecategoryType = {
    categories: [
        /*{id: '12345678', parentId: '0', label: "My parent node 12345678"},
        {id: '123', parentId: '0', label: 'dsa'}*/
    ],
    isLoading: false,
    isShownCats:[],
    favoriteIds:[],
}

export const getAllCategoriesThunk = createAsyncThunk(
    'categories/getAllCategories',
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

export const addToFavoritesThunk = createAsyncThunk(
    'categories/addMaterialToFavoritesThunk',
    async (content:{userId: IdFiledType, contentId:IdFiledType}, {rejectWithValue, dispatch}) => {
        const {userId, contentId} = content;
        const res = await ContentAPI.addToFavorites(userId, contentId);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);
export const deleteFromFavoritesThunk = createAsyncThunk(
    'categories/deleteMaterialFromFavoritesThunk',
    async (content:{userId: IdFiledType, contentId:IdFiledType}, {rejectWithValue, dispatch}) => {
        const {userId, contentId} = content;
        const res = await ContentAPI.deleteFromFavorites(userId, contentId);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);

type ChangeParentIdType = {contentId: IdFiledType, newParentId: IdFiledType}
export const changeParentIdThunk = createAsyncThunk(
    'categories/changeParentIdThunk',
    async (data: ChangeParentIdType, {rejectWithValue, dispatch}) => {
        const {contentId, newParentId} = data;
        const res = await ContentAPI.changeParentId(contentId, newParentId);
        dispatch(getAllCategoriesThunk());
        dispatch(getAllMaterialsThunk());
        dispatch(getAllTasksThunk());
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
            state.favoriteIds = [...state.favoriteIds, action.payload]
        },
        deleteIdFromFavoritesCategoriesAC: (state: InitStatecategoryType, action: PayloadAction<IdFiledType>) => {
            state.favoriteIds = state.favoriteIds.filter(el => String(el) !== String(action.payload))
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
    },
})

export const {
    addIdToFavoritesCategoriesAC,
    deleteIdFromFavoritesCategoriesAC,
    addToShownCats,
    deleteFromShownCats
} = categoriesSlice.actions;


export default categoriesSlice.reducer;