import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {contactsAPI, contentAPI} from "../api/api";
import {IdFiledType} from "./categoriesSlice";

export type ContentType = {
    title: string,
    content: string,
    isLoading: boolean,
}
const contentInitState:ContentType = {
    title: '',
    content: '',
    isLoading: false,
}

type GetContentType = {
    title: string,
    content: string,
}

export const getContentThunk = createAsyncThunk(
    'content/getContent',
    async (contentId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await contentAPI.getContent(contentId);
        return res.data;
    }
);

export const contentSlice = createSlice({
    name: 'content',
    initialState: contentInitState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getContentThunk.pending, (state: ContentType) => {
            state.isLoading = true;
        })
        builder.addCase(getContentThunk.fulfilled, (state: ContentType, action: PayloadAction<GetContentType>) => {
            state.title = action.payload.title;
            state.content = action.payload.content;
            state.isLoading = false;
        })
        builder.addCase(getContentThunk.rejected, (state: ContentType) => {
            state.isLoading = false;
        })
    }
});

export default contentSlice.reducer;