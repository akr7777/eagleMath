import {createAsyncThunk} from "@reduxjs/toolkit";
import {descriptionAPI} from "../../components/api/api";

export const getDescriptionThunk = createAsyncThunk(
    'author/getDescription',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await descriptionAPI.getDescription();
        if (res.data.resultCode === 0) {
            return res.data;
        } else
            return 'ERROR from server';
    }
);
export const setDescriptionThunk = createAsyncThunk(
    'author/setDescription',
    async (descriptionData: /*DescriptionDataType*/{title:string, description: string}, {rejectWithValue, dispatch}) => {
        const {title, /*photo, */description} = descriptionData;
        const res = await descriptionAPI.setDescription(title,/* photo,*/ description);
        if (res.data.resultCode === 0) {
            return res.data;
        } else
            return 'ERROR from server';
    }
);

export const getDescriptionPhotoThunk = createAsyncThunk(
    'author/getDescriptionPhoto',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await descriptionAPI.getDescriptionPhoto();
        if (res.data.resultCode === 0) {
            return res.data;
        } else
            return 'ERROR from server';
    }
);
type UploadDescriptionPhotoType = { file: any }
export const setDescriptionPhotoThunk = createAsyncThunk(
    'auth/uploadAvatar',
    async (descrPhotoData: UploadDescriptionPhotoType, {rejectWithValue, dispatch}) => {
        try {
            const {file} = descrPhotoData;
            const res = await descriptionAPI.setDescriptionPhoto(file);
            if (res.data.resultCode === 0) {
                return res.data;
            } else
                return 'ERROR from server';
        } catch (e) {
            console.log('!!!uploadAvatarThunk / error!!!=', e)
        }
    }
);