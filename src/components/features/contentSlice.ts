import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ContentAPI} from "../api/api";
import {CategoryType, IdFiledType} from "./categoriesSlice";
import {ResultCodesEnum} from "../common/resultCodes";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../AppBar/AppBar";

export const baseContentImageUrl = 'http://localhost:4001/content/getContentImage?name=';
export type ContentTypeVariantsTypes = "Material" | "Task" | "Category" | undefined;
export type ContentType = {
    contentId: string,
    //index: number,
    type: "Title" | "Text" | "Image" /*| "New" */| null,
    content: string,
}
export type SetContentDataType = {
    content: ContentType[],
    contentId: IdFiledType,
}

export type ContentInitStateType = {
    content: Array<ContentType>,
    isLoading: boolean,
    newChapter: ContentType,
    newChapterIndex: number,
    contentType: ContentTypeVariantsTypes,
}
const contentInitState:ContentInitStateType = {
    content: [],
    isLoading: false,
    newChapter: {
        contentId: '',
        //index: 0,
        type: null,
        content: '',
    },
    newChapterIndex: -1,
    contentType: undefined,
}

export const getContentThunk = createAsyncThunk(
    'Content/getContent',
    async (contentId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getContent(contentId);
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

/*export const contentTypeThunk = createAsyncThunk(
    'Content/contentType',
    async (contentId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.contentType(contentId);
        return res.data;
    }
);*/

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

export const contentSlice = createSlice({
    name: 'content',
    initialState: contentInitState,
    reducers: {
        changeContent: (state: ContentInitStateType, action: PayloadAction<ContentType[]>) => {
            state.content = [...action.payload];
        },
        newChapterChange: (state: ContentInitStateType, action: PayloadAction<ContentType>) => {
            state.newChapter = action.payload;
        },
        changeNewChapterContent: (state: ContentInitStateType, action: PayloadAction<string>) => {
            state.newChapter.content = action.payload;
        },
        changeNewChapterIndex: (state: ContentInitStateType, action: PayloadAction<number>) => {
            state.newChapterIndex = action.payload;
        },
       /* changeNewChapterTitle: (state: ContentInitStateType, action: PayloadAction<string>) => {
            state.newChapter.title = action.payload;
        },
        changeNewChapterText: (state: ContentInitStateType, action: PayloadAction<string>) => {
            state.newChapter.text = action.payload;
        },*/
    },
    extraReducers: builder => {
        builder.addCase(getContentThunk.pending, (state: ContentInitStateType) => {
            state.isLoading = true;
        })
        builder.addCase(getContentThunk.fulfilled, (state: ContentInitStateType, action: PayloadAction<{
            content: Array<ContentType>,
            resultCode: ResultCodesEnum,
        }>) => {
            state.content = [...action.payload.content];
            state.isLoading = false;
        })
        builder.addCase(getContentThunk.rejected, (state: ContentInitStateType) => {
            state.isLoading = false;
        })

        builder.addCase(setContentThunk.pending, (state: ContentInitStateType) => {
            state.isLoading = true;
        })
        builder.addCase(setContentThunk.fulfilled, (state: ContentInitStateType, action: PayloadAction<{
            content: Array<ContentType>,
            resultCode: ResultCodesEnum,
        }>) => {
            state.content = [...action.payload.content];
            state.isLoading = false;
        })
        builder.addCase(setContentThunk.rejected, (state: ContentInitStateType) => {
            state.isLoading = false;
        })

        builder.addCase(deleteContentThunk.pending, (state: ContentInitStateType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteContentThunk.fulfilled, (state: ContentInitStateType, action: PayloadAction<{
            //content: Array<ContentType>,
            resultCode: ResultCodesEnum,
        }>) => {
            //state.content = [...action.payload.content];
            state.isLoading = false;
        })
        builder.addCase(deleteContentThunk.rejected, (state: ContentInitStateType) => {
            state.isLoading = false;
        })

        /*builder.addCase(contentTypeThunk.pending, (state: ContentInitStateType) => {
            state.isLoading = true;
        })
        builder.addCase(contentTypeThunk.fulfilled, (state: ContentInitStateType, action: PayloadAction<{
            contentType: ContentTypeVariantsTypes,
            resultCode: ResultCodesEnum,
        }>) => {
            state.contentType = action.payload.contentType;
            state.isLoading = false;
        })
        builder.addCase(contentTypeThunk.rejected, (state: ContentInitStateType) => {
            state.isLoading = false;
        })*/
    }
});

export const {changeContent, newChapterChange, changeNewChapterContent, changeNewChapterIndex/* changeNewChapterTitle, changeNewChapterText*/} = contentSlice.actions;

export default contentSlice.reducer;