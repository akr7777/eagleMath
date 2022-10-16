import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {ContentAPI} from "../api/api";
import {getAllCategoriesThunk, IdFiledType} from "./categoriesSlice";
import {getAllMaterialsThunk} from "./materialsSlice";
import {ResultCodesEnum as resultCodes} from './../common/resultCodes';

export type TestAnswersType = {questionId: string, receivedAnswer: string, isRight: boolean}
export type TestContentType = {
    questionId: string
    question: string,
    options: Array<any>,
    answer: string,
}
export type TaskType = {
    id: IdFiledType,
    parentId: IdFiledType,
    label: string,
}
export type TestType = {
    testId: string,
    contentId: IdFiledType,
    content: Array<TestContentType>
}
type InitStateTasksType = {
    tasks: Array<TaskType>,
    favoriteTasksIds: Array<IdFiledType>,
    isLoading: boolean,
    test: TestType,
    testAnswers: Array<TestAnswersType>
}

let initialState: InitStateTasksType = {
    tasks: [
        /*{id: '', parentId: '', label: ""},*/
    ],
    favoriteTasksIds: [],
    isLoading: true,
    test: {
        testId: "",
        contentId: "",
        content: []
    },
    testAnswers: []
}

export const getAllTasksThunk = createAsyncThunk(
    'tasks/getAllTasks',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getAllTasks();
        if (res.data) {
            return res.data;
            /*const result: CategoryType[] = [];
            for (let i = 0; i < res.data.length; i++)
                result.push({id: res.data[i].id, parentId: res.data[i].parentid, label: res.data[i].label});
            return result;*/
        } else
            return [];
    }
);

export const getFavoritesThunk = createAsyncThunk(
    'tasks/getFavoritesThunk',
    async (userId:IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getFavoriteContent(userId);
        return res.data;
    }
);
export const getTestThunk = createAsyncThunk(
    'tasks/getTestThunk',
    async (contentId:IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.getTests(contentId);
        return res.data;
    }
);

export const addTaskToFavoritesThunk = createAsyncThunk(
    'tasks/addTaskToFavoritesThunk',
    async (content:{userId: IdFiledType, contentId:IdFiledType}, {rejectWithValue, dispatch}) => {
        const {userId, contentId} = content;
        const res = await ContentAPI.addToFavorites(userId, contentId);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);
export const deleteTaskFromFavoritesThunk = createAsyncThunk(
    'tasks/deleteTaskFromFavoritesThunk',
    async (content:{userId: IdFiledType, contentId:IdFiledType}, {rejectWithValue, dispatch}) => {
        const {userId, contentId} = content;
        //dispatch(deleteIdFromFavoritesTasksAC(contentId));
        const res = await ContentAPI.deleteFromFavorites(userId, contentId);
        return res.data; //возывращает массив id Array<IdFieldType>
    }
);

export const addTaskThunk = createAsyncThunk(
    'materials/addTaskThunk',
    async (parentContentId: IdFiledType, {rejectWithValue, dispatch}) => {
        const res = await ContentAPI.addTask(parentContentId);
        dispatch(getAllMaterialsThunk());
        dispatch(getAllTasksThunk());
        dispatch(getAllCategoriesThunk());
        return res.data;
    }
);

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        /*setAllTasksAC: (state: InitStateTasksType, action: PayloadAction<TaskType[]>) => {
            state.tasks = action.payload;
        },
        addIdToFavoritesTasksAC: (state: InitStateTasksType, action: PayloadAction<IdFiledType>) => {
            console.log('addIdToFavoritesTasksAC, state.favoriteTasksIds=', state.favoriteTasksIds)
            state.favoriteTasksIds = [...state.favoriteTasksIds, action.payload]
        },
        deleteIdFromFavoritesTasksAC: (state: InitStateTasksType, action: PayloadAction<IdFiledType>) => {
            console.log('deleteIdFromFavoritesTasksAC, state.favoriteTasksIds=', state.favoriteTasksIds)
            state.favoriteTasksIds = state.favoriteTasksIds.filter(el => String(el) !== String(action.payload))
        },*/
        pushTestAnswerAC: (state: InitStateTasksType, action: PayloadAction<TestAnswersType>) => {
            //state.testAnswers.set(action.payload.questionId, action.payload.isRight);
            state.testAnswers.push(action.payload);
        },
        clearTestAnswersAC: (state: InitStateTasksType) => {state.testAnswers = []},
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTasksThunk.pending, (state: InitStateTasksType) => {
            state.isLoading = true;
        })
        builder.addCase(getAllTasksThunk.fulfilled, (state: InitStateTasksType, action: PayloadAction<any>) => {
            //console.log('TasksSlice / getAllTasks.fulfilled / action.payload=', action.payload)
            state.tasks = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getAllTasksThunk.rejected, (state: InitStateTasksType) => {
            state.isLoading = false;
        })

        builder.addCase(getFavoritesThunk.pending, (state: InitStateTasksType) => {
            state.isLoading = true;
        })
        builder.addCase(getFavoritesThunk.fulfilled, (state: InitStateTasksType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteTasksIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getFavoritesThunk.rejected, (state: InitStateTasksType) => {
            state.isLoading = false;
        })

        builder.addCase(addTaskToFavoritesThunk.pending, (state:InitStateTasksType) => {
            state.isLoading = true;
        })
        builder.addCase(addTaskToFavoritesThunk.fulfilled, (state:InitStateTasksType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteTasksIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(addTaskToFavoritesThunk.rejected, (state:InitStateTasksType) => {
            state.isLoading = false;
        })

        builder.addCase(deleteTaskFromFavoritesThunk.pending, (state: InitStateTasksType) => {
            state.isLoading = true;
        })
        builder.addCase(deleteTaskFromFavoritesThunk.fulfilled, (state: InitStateTasksType, action:PayloadAction<Array<IdFiledType>>) => {
            state.favoriteTasksIds = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(deleteTaskFromFavoritesThunk.rejected, (state: InitStateTasksType) => {
            state.isLoading = false;
        })

        builder.addCase(addTaskThunk.pending, (state: InitStateTasksType) => {state.isLoading = true;})
        builder.addCase(addTaskThunk.fulfilled, (state: InitStateTasksType, action:PayloadAction<Array<IdFiledType>>) => {state.isLoading = false;})
        builder.addCase(addTaskThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false;})

        builder.addCase(getTestThunk.pending, (state: InitStateTasksType) => {state.isLoading = true;})
        builder.addCase(getTestThunk.fulfilled, (state: InitStateTasksType, action:PayloadAction<TestType & {resultCode: number}>) => {
            if (action.payload.resultCode === resultCodes.Success)
                state.test = {
                    ...state.test,
                    testId: action.payload.testId,
                    contentId: action.payload.contentId,
                    content: [...action.payload.content],
                }
            state.isLoading = false;
        })
        builder.addCase(getTestThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false;})
    },
})

export const {
    pushTestAnswerAC,
    clearTestAnswersAC,
    /*setAllTasksAC,
    addIdToFavoritesTasksAC,
    deleteIdFromFavoritesTasksAC*/
} = tasksSlice.actions;


export default tasksSlice.reducer;