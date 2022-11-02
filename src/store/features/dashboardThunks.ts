import {createAsyncThunk} from "@reduxjs/toolkit";
import {ContentAPI, NotesAPI, objectiveAPI, testAPI, usersAPI} from "../../components/api/api";
import {IdFiledType} from "./categoriesSlice";
import {NoteType} from "./dashboardSlice";

export const getUserListThunk = createAsyncThunk(
    'dashboard/getUserListThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await usersAPI.getUsers();
        return res.data;
    }
)
export const getFavoritesThunk = createAsyncThunk(
    'dashboard/getFavoritesThunk',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getFavoriteContent(userId);
        return res.data;
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

export const getNotesThunk = createAsyncThunk(
    'dashboard/getNotesThunk',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await NotesAPI.getNotes(userId);
        return res.data;
    }
);

type ChangeNoteStatusType = { userId: IdFiledType, noteId: IdFiledType, newStatus: boolean }
export const changeNoteStatusThunk = createAsyncThunk(
    'dashboard/changeNoteStatusThunk',
    async (data: ChangeNoteStatusType, {rejectWithValue, dispatch}) => {
        const res = await NotesAPI.changeNoteStatus(data.userId, data.noteId, data.newStatus);
        return res.data;
    }
);

type DeleteNoteDataType = { userId: IdFiledType, noteId: IdFiledType }
export const deleteNoteThunk = createAsyncThunk(
    'dashboard/deleteNoteThunk',
    async (data: DeleteNoteDataType, {rejectWithValue, dispatch}) => {
        const res = await NotesAPI.deleteNote(data.userId, data.noteId);
        return res.data;
    }
);

type SetNotesDataType = {userId: IdFiledType, notes: Array<NoteType>}
export const setNotesThunk = createAsyncThunk(
    'dashboard/setNotes',
    async (data: SetNotesDataType, {rejectWithValue, dispatch}) => {
        const res = await NotesAPI.setNotes(data.userId, data.notes);
        return res.data;
    }
);

type ChangeNoteTextOrTitle = {userId: IdFiledType, noteId: IdFiledType, type: "Title" | "Text", newTextTitleValue: string}
export const changeNoteTextOrTitleThunk = createAsyncThunk(
    'dashboard/changeNoteTextOrTitleThunk',
    async (data: ChangeNoteTextOrTitle, {rejectWithValue, dispatch}) => {
        const res = (data.type === "Title")
            ? await NotesAPI.changeNoteTitle(data.userId, data.noteId, data.newTextTitleValue)
            : await NotesAPI.changeNoteText(data.userId, data.noteId, data.newTextTitleValue);
        return res.data;
    }
);

export const getTestResultsByUserId = createAsyncThunk(
    'dashboard/getTestResultsByUserId',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await testAPI.getTestResultsByUserId(userId);
        return res.data;
    }
);

export const getObjectiveResultsByUserId = createAsyncThunk(
    'dashboard/getObjectiveResultsByUserId',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await objectiveAPI.getObjectiveResultsByUserId(userId);
        return res.data;
    }
);

export const getFullStudiedContentThunk = createAsyncThunk(
    'dashboard/getFullStudiedContentThunk',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getFullStudiedContent(userId);
        return res.data;
    }
);
