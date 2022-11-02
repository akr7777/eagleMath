import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoriesAPI, ContentAPI} from "../../components/api/api";
import {getAllMaterialsThunk, getAllTasksThunk} from "./tasksThunks";
import {CategoryType, IdFiledType} from "./categoriesSlice";

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

export const addCategoryThunk = createAsyncThunk(
    'categories/addCategoryThunk',
    async (parentid:IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.addCategory(parentid);
        return res.data;
    }
);

export const deleteCategoryThunk = createAsyncThunk(
    'categories/deleteCategoryThunk',
    async (contentId:IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.deleteCategory(contentId);
        return res.data;
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