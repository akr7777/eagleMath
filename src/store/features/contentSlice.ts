import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IdFiledType} from "./categoriesSlice";
import {ResultCodesEnum} from "../../components/common/resultCodes";
import {
    deleteContentThunk,
    getContentThunk, getContentTitleByIdThunk,
    getStudiedMaterialsThunk,
    moveParagraphThunk,
    setContentThunk, setMaterialStudiedThunk
} from "./contentThunks";

export type ContentTypeVariantsTypes = "Material" | "Task" | "Category" | undefined;
export type ContentType = {
    contentId: string,
    type: "Title" | "Text" | "Image" | null,
    content: string,
}
export type SetContentDataType = {
    content: ContentType[],
    contentId: IdFiledType,
}

/*export type ContentInitStateType = {
    content: Array<ContentType>,
    isLoading: boolean,
    newChapter: ContentType,
    newChapterIndex: number,
    contentType: ContentTypeVariantsTypes,
    studiedMaterials: Array<IdFiledType>,
    contentTitle: string,
}*/
const contentInitState = {
    content: [] as Array<ContentType>,
    isLoading: false,
    newChapter: {
        contentId: '',
        type: null,
        content: '',
    } as ContentType,
    newChapterIndex: -1,
    contentType: undefined as ContentTypeVariantsTypes,
    studiedMaterials: [] as Array<IdFiledType>,
    contentTitle: '',
}

type ContentInitStateType = typeof contentInitState;

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

        builder.addCase(moveParagraphThunk.pending, (state: ContentInitStateType) => {state.isLoading = true;})
        builder.addCase(moveParagraphThunk.fulfilled, (state: ContentInitStateType, action: PayloadAction<{
            content: Array<ContentType>,
            resultCode: ResultCodesEnum,
        }>) => {
            state.content = [...action.payload.content];
            state.isLoading = false;
        })
        builder.addCase(moveParagraphThunk.rejected, (state: ContentInitStateType) => {state.isLoading = false;})

        builder.addCase(getStudiedMaterialsThunk.pending, (state: ContentInitStateType) => {state.isLoading = true;})
        builder.addCase(getStudiedMaterialsThunk.fulfilled, (state: ContentInitStateType, action: PayloadAction<{
            studiedMaterials: Array<IdFiledType>,
            resultCode: ResultCodesEnum,
        }>) => {
            state.studiedMaterials = action.payload.studiedMaterials;
            state.isLoading = false;
        })
        builder.addCase(getStudiedMaterialsThunk.rejected, (state: ContentInitStateType) => {state.isLoading = false;})

        builder.addCase(setMaterialStudiedThunk.pending, (state: ContentInitStateType) => {state.isLoading = true;})
        builder.addCase(setMaterialStudiedThunk.fulfilled, (state: ContentInitStateType, action: PayloadAction<{
            studiedMaterials: Array<IdFiledType>,
            resultCode: ResultCodesEnum,
        }>) => {
            state.studiedMaterials = action.payload.studiedMaterials;
            state.isLoading = false;
        })
        builder.addCase(setMaterialStudiedThunk.rejected, (state: ContentInitStateType) => {state.isLoading = false;})

        builder.addCase(getContentTitleByIdThunk.pending, (state: ContentInitStateType) => {state.isLoading = true;})
        builder.addCase(getContentTitleByIdThunk.fulfilled, (state: ContentInitStateType, action: PayloadAction<{
            contentTitle: string,
            resultCode: ResultCodesEnum,
        }>) => {
            if (action.payload.resultCode === ResultCodesEnum.Success)
                state.contentTitle = action.payload.contentTitle;
            else
                state.contentTitle = "error";
            state.isLoading = false;
        })
        builder.addCase(getContentTitleByIdThunk.rejected, (state: ContentInitStateType) => {state.isLoading = false;})

    }
});

export const {changeContent, newChapterChange, changeNewChapterContent, changeNewChapterIndex} = contentSlice.actions;

export default contentSlice.reducer;