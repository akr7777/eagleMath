import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import photoAutorDefaulted from './../../assets/images/adminAva.jpeg';
import {authAPI, descriptionAPI} from "../api/api";

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
    title: 'This is description',
    photo: photoAutorDefaulted,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n' +
        '                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n' +
        '                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n' +
        '                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
    async (descriptionData: DescriptionDataType, {rejectWithValue, dispatch}) => {
        console.log('setDescriptionThunk/descriptionData', descriptionData)
        const {title, photo, description} = descriptionData;
        const res = await descriptionAPI.setDescription(title, photo, description);
        console.log('setDescriptionThunk/res=')
        if (res.data.resultCode === 0) {
            return res.data;
        } else
            return 'ERROR from server';
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
            state.photo = action.payload.photo;
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
            state.photo = action.payload.photo;
            state.description = action.payload.description;
            state.isLoading = false;
        })
        builder.addCase(setDescriptionThunk.rejected, (state: InitAuthorContentType) => {
            state.isLoading = false;
        })
    }
})
//export const {setTitleAC, setPhotoURLAC, setDescriptionAC} = authorSlice.actions;

export default authorSlice.reducer;