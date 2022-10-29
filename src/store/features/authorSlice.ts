import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {getDescriptionPhotoThunk, getDescriptionThunk, setDescriptionThunk} from './authorThunks';
import {baseDescriptionPhotoUrl} from "../../env";

//export const baseDescriptionPhotoUrl = 'http://localhost:4001/content/getDescriptionPhoto';

const initContent = {
    title: '',
    photo: '',
    description: '',
    isLoading: true
}
type InitAuthorContentType = typeof initContent;

export const authorSlice = createSlice({
    name: 'author',
    initialState: initContent,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getDescriptionThunk.pending, (state: InitAuthorContentType) => {
            state.isLoading = true;
        })
        builder.addCase(getDescriptionThunk.fulfilled, (state: InitAuthorContentType, action: PayloadAction<Omit<InitAuthorContentType, 'isLoading'>>) => {
            state.title = action.payload.title;
            state.photo = baseDescriptionPhotoUrl;
            state.description = action.payload.description;
            state.isLoading = false;
        })
        builder.addCase(getDescriptionThunk.rejected, (state: InitAuthorContentType) => {
            state.isLoading = false;
        })

        builder.addCase(setDescriptionThunk.pending, (state: InitAuthorContentType) => {
            state.isLoading = true;
        })
        builder.addCase(setDescriptionThunk.fulfilled, (state: InitAuthorContentType, action: PayloadAction<Omit<InitAuthorContentType, 'isLoading'>>) => {
            state.title = action.payload.title;
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