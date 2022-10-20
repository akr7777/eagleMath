import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IdFiledType} from "./categoriesSlice";
import {ContentAPI, NotesAPI, testAPI} from "../api/api";
//import {addTaskToFavoritesThunk, deleteTaskFromFavoritesThunk} from "./tasksSlice";
import {ResultCodesEnum as resultCodes} from "./../common/resultCodes";
import {TestContentType} from "./tasksSlice";

export type ContentTypes = "C" | "M" | "T";
export type NotesStatusType = "All" | "Active" | "Completed";
export type NoteType = {
    noteId: string,
    title: string,
    text: string,
    isActive: boolean,
}
export type TestResultProtocolType = TestContentType & { receivedAnswer: string }
export type TestResultType = {
    userId: string,
    testId: string,
    title: string,
    result: number,
    protocol: Array<TestResultProtocolType>,
    date: string,
}
type DashboardStateType = {
    favoriteContent: Array<IdFiledType>,
    notes: Array<NoteType>,
    searchNotesField: string,
    isLoading: boolean,
    notesStatus: NotesStatusType,
    testResult: Array<TestResultType>,
}

const dashboardInitialState:DashboardStateType = {
    favoriteContent: [],
    isLoading: false,
    notes: [],
    searchNotesField: '',
    notesStatus: "All",
    testResult: [],
}

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




export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: dashboardInitialState,
    reducers: {
       /* setFavoriteContent: (state:DashboardStateType, action: PayloadAction<Array<IdFiledType>>): void => {
            state.favoriteContent = action.payload;
        },
        addNote: (state: DashboardStateType, action: PayloadAction<NoteType>): void => {
            state.notes.push(action.payload);
        },*/
        changeSearchText: (state: DashboardStateType, action: PayloadAction<string>): void => {
            state.searchNotesField = action.payload;
        },
        changeNotesFilterStatus: (state: DashboardStateType, action: PayloadAction<NotesStatusType>): void => {
            state.notesStatus = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getFavoritesThunk.pending, (state: DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(getFavoritesThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteContent = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getFavoritesThunk.rejected, (state: DashboardStateType) => {
            state.isLoading = false;
        })

        builder.addCase(addToFavoritesThunk.pending, (state:DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(addToFavoritesThunk.fulfilled, (state:DashboardStateType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteContent = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(addToFavoritesThunk.rejected, (state:DashboardStateType) => {
            state.isLoading = false;
        })

        builder.addCase(deleteFromFavoritesThunk.pending, (state: DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteFromFavoritesThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteContent = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(deleteFromFavoritesThunk.rejected, (state: DashboardStateType) => {
            state.isLoading = false;
        })

        builder.addCase(getNotesThunk.pending, (state: DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(getNotesThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<{
            notes: Array<NoteType>,
            resultCode: number
        }>) => {
            if (action.payload.resultCode === resultCodes.Success && action.payload.notes.length > 0) {
                state.notes = [...action.payload.notes];
            }
            state.isLoading = false;
        })
        builder.addCase(getNotesThunk.rejected, (state: DashboardStateType) => {
            state.isLoading = false;
        })

        builder.addCase(setNotesThunk.pending, (state: DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(setNotesThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<{
            notes: Array<NoteType>,
            resultCode: number
        }>) => {
            if (action.payload.resultCode === resultCodes.Success && action.payload.notes.length > 0) {
                state.notes = [...action.payload.notes];
            }
            state.isLoading = false;
        })
        builder.addCase(setNotesThunk.rejected, (state: DashboardStateType) => {
            state.isLoading = false;
        })

        builder.addCase(changeNoteStatusThunk.pending, (state: DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(changeNoteStatusThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<{
            notes: Array<NoteType>,
            resultCode: number
        }>) => {
            if (action.payload.resultCode === resultCodes.Success && action.payload.notes.length > 0) {
                state.notes = [...action.payload.notes];
            }
            state.isLoading = false;
        })
        builder.addCase(changeNoteStatusThunk.rejected, (state: DashboardStateType) => {
            state.isLoading = false;
        })


        builder.addCase(deleteNoteThunk.pending, (state: DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteNoteThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<{
            notes: Array<NoteType>,
            resultCode: number
        }>) => {
            if (action.payload.resultCode === resultCodes.Success && action.payload.notes.length > 0) {
                state.notes = [...action.payload.notes];
            }
            state.isLoading = false;
        })
        builder.addCase(deleteNoteThunk.rejected, (state: DashboardStateType) => {
            state.isLoading = false;
        })

        builder.addCase(changeNoteTextOrTitleThunk.pending, (state: DashboardStateType) => {
            state.isLoading = true;
        })
        builder.addCase(changeNoteTextOrTitleThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<{
            notes: Array<NoteType>,
            resultCode: number
        }>) => {
            if (action.payload.resultCode === resultCodes.Success && action.payload.notes.length > 0) {
                state.notes = [...action.payload.notes];
            }
            state.isLoading = false;
        })
        builder.addCase(changeNoteTextOrTitleThunk.rejected, (state: DashboardStateType) => {
            state.isLoading = false;
        })

        builder.addCase(getTestResultsByUserId.pending, (state: DashboardStateType) => {state.isLoading = true;})
        builder.addCase(getTestResultsByUserId.fulfilled, (state: DashboardStateType, action:PayloadAction<{
            testResults: Array<TestResultType>,
            resultCode: resultCodes,
        }>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                state.testResult = [...action.payload.testResults];
            }
            state.isLoading = false;
        })
        builder.addCase(getTestResultsByUserId.rejected, (state: DashboardStateType) => {state.isLoading = false;})

    }
})
export const {changeSearchText, changeNotesFilterStatus} = dashboardSlice.actions;

export default dashboardSlice.reducer;