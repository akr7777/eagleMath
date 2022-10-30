import {createAsyncThunk} from "@reduxjs/toolkit";
import {IdFiledType} from "./categoriesSlice";
import {ContentAPI} from "../../components/api/api";
import {SetContentDataType} from "./contentSlice";

export const getContentThunk = createAsyncThunk(
    'Content/getContent',
    async (contentId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getContent(contentId);
        return res.data;
    }
);
export const getContentTitleByIdThunk = createAsyncThunk(
    'Content/getContentTitleById',
    async (contentId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getContentTitleById(contentId);
        return res.data;
    }
);

export const setContentThunk = createAsyncThunk(
    'Content/setContent',
    async (data: SetContentDataType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.setContent(data.content, data.contentId);
        return res.data;
    }
);

export const deleteContentThunk = createAsyncThunk(
    'Content/deleteContentThunk',
    async (contentId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.deleteContent(contentId);
        return res.data;
    }
);

export const moveParagraphThunk = createAsyncThunk(
    'Content/moveParagraphThunk',
    async (data: {contentId: IdFiledType, elementIndex: number, direction: "up"|"down"}, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.moveParagraph(data.contentId, data.elementIndex, data.direction);
        return res.data;
    }
);

type UploadContentImage = { file: any, fileName: string }
export const uploadContentImage = createAsyncThunk(
    'content/uploadContentImage',
    async (dataSend: UploadContentImage, {rejectWithValue, dispatch}) => {
        try {
            const {file, fileName} = dataSend;
            const res = await ContentAPI.uploadContentImage(file, fileName);
            if (res.data.resultCode === 0) {
                return res.data;
            } else
                return 'ERROR from server';
        } catch (e) {
            console.log('!!!uploadAvatarThunk / error!!!=', e)
        }
    }
);

export const getStudiedMaterialsThunk = createAsyncThunk(
    'content/studiedMaterialsThunk',
    async (userId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.studiedMaterials(userId);
        return res.data;
    }
);
export const setMaterialStudiedThunk = createAsyncThunk(
    'content/setMaterialStudiedThunk',
    async (data: {userId: IdFiledType, contentId: IdFiledType, value: boolean}, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.setMaterialStudied(data.userId, data.contentId, data.value);
        return res.data;
    }
);
