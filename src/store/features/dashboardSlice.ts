import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IdFiledType} from "./categoriesSlice";
import {ResultCodesEnum as resultCodes} from "../../components/common/resultCodes";
import {TestContentType} from "./tasksSlice";
import {UserType} from "./usersSlice";
import {
    addToFavoritesThunk, changeNoteStatusThunk, changeNoteTextOrTitleThunk,
    deleteFromFavoritesThunk, deleteNoteThunk,
    getFavoritesThunk, getFullStudiedContentThunk,
    getNotesThunk, getObjectiveResultsByUserId,
    getTestResultsByUserId, getUserListThunk,
    setNotesThunk
} from "./dashboardThunks";

export type StudiesContentType = {
    contentId: IdFiledType,
    content: string,
}
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
export type ObjectiveResultsType = {
    userId: IdFiledType,
    objectiveId: string,
    title: string,
    content: string,
    answer: string,
    result: string,
    date: string,
}
type DashboardStateType = {
    favoriteContent: Array<IdFiledType>,
    notes: Array<NoteType>,
    searchNotesField: string,
    isLoading: boolean,
    loading: {
        usersListLoading: boolean,
        testsResultsLoading: boolean
        objectivesResultsLoading: boolean,
        studiedContentLoading: boolean,
    }
    notesStatus: NotesStatusType,
    testResult: Array<TestResultType>,
    userList: UserType[],
    objectiveResults: Array<ObjectiveResultsType>,
    studiedMaterialContent: Array<StudiesContentType>,
}

const dashboardInitialState:DashboardStateType = {
    favoriteContent: [],
    isLoading: false,
    loading: {
        usersListLoading: false,
        testsResultsLoading: false,
        objectivesResultsLoading: false,
        studiedContentLoading: false
    },
    notes: [],
    searchNotesField: '',
    notesStatus: "All",
    testResult: [],
    userList: [],
    objectiveResults: [],
    studiedMaterialContent: [],
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: dashboardInitialState,
    reducers: {
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

        builder.addCase(getTestResultsByUserId.pending, (state: DashboardStateType) => {state.loading = {...state.loading, testsResultsLoading: true}})
        builder.addCase(getTestResultsByUserId.fulfilled, (state: DashboardStateType, action:PayloadAction<{
            testResults: Array<TestResultType>,
            resultCode: resultCodes,
        }>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                state.testResult = [...action.payload.testResults];
            }
            state.loading = {...state.loading, testsResultsLoading: false}
        })
        //builder.addCase(getTestResultsByUserId.rejected, (state: DashboardStateType) => {state.isLoading = false;})
        builder.addCase(getTestResultsByUserId.rejected, (state: DashboardStateType) => {state.loading = {...state.loading, testsResultsLoading: false}})

        builder.addCase(getUserListThunk.pending, (state: DashboardStateType) => {state.loading = {...state.loading, usersListLoading: true}})
        builder.addCase(getUserListThunk.fulfilled, (state: DashboardStateType, action: PayloadAction<UserType[]>) => {
            state.userList = [...action.payload];
            state.loading = {...state.loading, usersListLoading: false}
        })
        builder.addCase(getUserListThunk.rejected, (state: DashboardStateType) => {state.loading = {...state.loading, usersListLoading: false}})

        builder.addCase(getObjectiveResultsByUserId.pending, (state: DashboardStateType) => {state.loading = {...state.loading, objectivesResultsLoading: true}})
        builder.addCase(getObjectiveResultsByUserId.fulfilled, (state: DashboardStateType, action:PayloadAction<{
            objectiveResults: Array<ObjectiveResultsType>,
            resultCode: resultCodes,
        }>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                state.objectiveResults = [...action.payload.objectiveResults];
            }
            state.loading = {...state.loading, objectivesResultsLoading: false}
        })
        builder.addCase(getObjectiveResultsByUserId.rejected, (state: DashboardStateType) => {
            state.loading = {...state.loading, objectivesResultsLoading: false}
        })


        builder.addCase(getFullStudiedContentThunk.pending, (state: DashboardStateType) => {
            state.loading = {...state.loading, studiedContentLoading: true}
        })
        builder.addCase(getFullStudiedContentThunk.fulfilled, (state: DashboardStateType, action:PayloadAction<{
            studiedMaterialContent: Array<StudiesContentType>,
            resultCode: resultCodes,
        }>) => {
            if (action.payload.resultCode === resultCodes.Success) {
                if (action.payload.studiedMaterialContent)
                    state.studiedMaterialContent = [...action.payload.studiedMaterialContent];
                else state.studiedMaterialContent = [];
            }
            state.loading = {...state.loading, studiedContentLoading: false}
        })
        builder.addCase(getFullStudiedContentThunk.rejected, (state: DashboardStateType) => {
            state.loading = {...state.loading, studiedContentLoading: false}
        })
    }
})
export const {changeSearchText, changeNotesFilterStatus} = dashboardSlice.actions;

export default dashboardSlice.reducer;