import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {descriptionAPI} from "../api/api";

export const baseDescriptionPhotoUrl = 'https://dry-anchorage-96588.herokuapp.com/description/getDescriptionPhoto';

/*export type AuthorType = {
    photoURL: string,
    description: string,
}
let initialState:AuthorType = {
    photoURL: 'https://avatars.mds.yandex.net/get-zen_doc/105853/pub_5b93dbff602fad00ad9a7e33_5b93f99a47a3c100aa992665/scale_1200',
    description: 'this is a new desc from store!'
}*/

type InitAuthorContentType = {
    title: string;
    photo: string;
    description: string;
    isLoading: boolean;
}
const initContent: InitAuthorContentType = {
    title: '',
    photo: '',
    description: '',
    isLoading: true
}

type DescriptionDataType = { title: string, photo: string, description: string }
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
        console.log('setDescriptionThunk/descriptionData', descriptionData)
        const {title, /*photo, */description} = descriptionData;
        const res = await descriptionAPI.setDescription(title,/* photo,*/ description);
        console.log('setDescriptionThunk/res=')
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



export const authorSlice = createSlice({
    name: 'author',
    initialState: initContent,
    reducers: {
        setDescriptionAC: (state: InitAuthorContentType, action: PayloadAction<DescriptionDataType>): void => {
            state.title = action.payload.title;
            state.photo = action.payload.photo;
            state.description = action.payload.description;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDescriptionThunk.pending, (state: InitAuthorContentType) => {
            state.isLoading = true;
        })
        builder.addCase(getDescriptionThunk.fulfilled, (state: InitAuthorContentType, action: PayloadAction<DescriptionDataType>) => {
            state.title = action.payload.title;
            state.photo = baseDescriptionPhotoUrl;//action.payload.photo;
            state.description = action.payload.description;
            state.isLoading = false;
        })
        builder.addCase(getDescriptionThunk.rejected, (state: InitAuthorContentType) => {
            state.isLoading = false;
        })

        builder.addCase(setDescriptionThunk.pending, (state: InitAuthorContentType) => {
            state.isLoading = true;
        })
        builder.addCase(setDescriptionThunk.fulfilled, (state: InitAuthorContentType, action: PayloadAction<DescriptionDataType>) => {
            state.title = action.payload.title;
            //state.photo = action.payload.photo;
            state.description = action.payload.description;
            state.isLoading = false;
        })
        builder.addCase(setDescriptionThunk.rejected, (state: InitAuthorContentType) => {
            state.isLoading = false;
        })

        builder.addCase(getDescriptionPhotoThunk.pending, (state: InitAuthorContentType) => {
            state.isLoading = true;
        })
        builder.addCase(getDescriptionPhotoThunk.fulfilled, (state: InitAuthorContentType, action:PayloadAction<string>) => {
            state.photo = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getDescriptionPhotoThunk.rejected, (state: InitAuthorContentType) => {
            state.isLoading = false;
        })
    }
})
//export const {setTitleAC, setPhotoURLAC, setDescriptionAC} = authorSlice.actions;

export default authorSlice.reducer;