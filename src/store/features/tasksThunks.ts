import {createAsyncThunk} from "@reduxjs/toolkit";
import {ContentAPI, objectiveAPI, testAPI} from "../../components/api/api";
import {getAllCategoriesThunk, IdFiledType} from "./categoriesSlice";
import {ObjectiveType, TestContentType} from "./tasksSlice";

export const getAllTasksThunk = createAsyncThunk(
    'tasks/getAllTasks',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getAllTasks();
        if (res.data) {
            return res.data;
        } else
            return [];
    }
);
export const getAllMaterialsThunk = createAsyncThunk(
    'tasks/getAllMaterialsThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getAllMaterials();
        if (res.data) {
            return res.data;
        } else
            return [];
    }
);

type RenameMaterialType = {
    contentId: IdFiledType,
    newName: string,
}
export const renameMaterialThunk = createAsyncThunk(
    'tasks/renameMaterialThunk',
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

export const getFavoritesThunk = createAsyncThunk(
    'tasks/getFavoritesThunk',
    async (userId:IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getFavoriteContent(userId);
        return res.data;
    }
);

export const getTestThunk = createAsyncThunk(
    'tasks/getTestThunk',
    async (contentId:IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await testAPI.getTests(contentId);
        return res.data;
    }
);

export const getTestByIdThunk = createAsyncThunk(
    'tasks/getTestByIdThunk',
    async (testId:string, {rejectWithValue, dispatch}) => {
        const res = await testAPI.getTestById(testId);
        return res.data;
    }
);

export const getAllTestsContentIdsThunk = createAsyncThunk(
    'tasks/getAllTestsContentIdsThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await testAPI.getAllTestsContentIds();
        return res.data;
    }
);


export type TestResultType = {
    userId: IdFiledType,
    testId: string,
    title: string
    result: number,
    protocol: Array< TestContentType & { receivedAnswer: string } >,
    date: string,
}
export const setTestResultThunk = createAsyncThunk(
    'tasks/setTestResultThunk',
    async (data:TestResultType, {rejectWithValue, dispatch}) => {
        const res = await testAPI.setTestResult(data);
        return res.data;
    }
);

export type ObjectiveResultType = {
    userId: IdFiledType,
    objectiveId: string,
    title: string
    content: string,
    answer: string,
    result: string,
    date: string,
}
export const setObjectiveResultThunk = createAsyncThunk(
    'tasks/setObjectiveResultThunk',
    async (data:ObjectiveResultType, {rejectWithValue, dispatch}) => {
        const res = await objectiveAPI.setObjectiveResult(data);
        return res.data;
    }
);

export const addTaskToFavoritesThunk = createAsyncThunk(
    'tasks/addTaskToFavoritesThunk',
    async (content:{userId: IdFiledType, contentId:IdFiledType}, {rejectWithValue, dispatch}) => {
        const {userId, contentId} = content;
        const res = await ContentAPI.addToFavorites(userId, contentId);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);
export const deleteTaskFromFavoritesThunk = createAsyncThunk(
    'tasks/deleteTaskFromFavoritesThunk',
    async (content:{userId: IdFiledType, contentId:IdFiledType}, {rejectWithValue, dispatch}) => {
        const {userId, contentId} = content;
        //dispatch(deleteIdFromFavoritesTasksAC(contentId));
        const res = await ContentAPI.deleteFromFavorites(userId, contentId);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);

export const addNewTestToDataBaseThunk = createAsyncThunk(
    'tasks/addNewTestToDataBaseThunk',
    async (data:{title: string, contentId: IdFiledType, content:Array<TestContentType>}, {rejectWithValue, dispatch}) => {
        const {title, contentId, content} = data;
        const res = await testAPI.addNewTestToDataBase(title, contentId, content);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);

export const editTestInDataBaseThunk = createAsyncThunk(
    'tasks/editTestInDataBaseThunk',
    async (data:{testId: string, title: string, contentId: IdFiledType, content:Array<TestContentType>}, {rejectWithValue, dispatch}) => {
        const {testId, title, contentId, content} = data;
        const res = await testAPI.editTestInDataBase(testId, title, contentId, content);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);

export const addTaskThunk = createAsyncThunk(
    'materials/addTaskThunk',
    async (parentContentId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.addTask(parentContentId);
        dispatch(getAllMaterialsThunk());
        dispatch(getAllTasksThunk());
        dispatch(getAllCategoriesThunk());
        return res.data;
    }
);

export const getObjectiveByContentIdThunk = createAsyncThunk(
    'tasks/getObjectiveByContentIdThunk',
    async (contentId:IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await objectiveAPI.getObjectiveByContentId(contentId);
        return res.data;
    }
);

export const addNewObjectiveThunk = createAsyncThunk(
    'tasks/addNewObjectiveThunk',
    async (data: ObjectiveType, {rejectWithValue, dispatch}) => {
        const res = await objectiveAPI.addNewObjective({...data});
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);