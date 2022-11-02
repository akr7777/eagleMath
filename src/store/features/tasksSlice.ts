import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {IdFiledType} from "./categoriesSlice";
import {ResultCodesEnum, ResultCodesEnum as resultCodes} from '../../components/common/resultCodes';
import {
    renameMaterialThunk,
    getAllTasksThunk,
    getAllMaterialsThunk,
    addMaterialThunk,
    getFavoritesThunk,
    getTestThunk,
    getTestByIdThunk,
    getAllTestsContentIdsThunk,
    setObjectiveResultThunk,
    addTaskToFavoritesThunk,
    deleteTaskFromFavoritesThunk,
    addTaskThunk,
    getObjectiveByContentIdThunk,
    addNewObjectiveThunk
} from "./tasksThunks";

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
    title: string,
    contentId: IdFiledType,
    content: Array<TestContentType>
}
export type ObjectiveType = {
    _id: string,
    title: string,
    picture?: any,
    contentId: IdFiledType,
    content: string,
    answer: string,
}
export type MaterialType = {
    id: IdFiledType,
    parentId: IdFiledType,
    label: string,
}
type InitStateTasksType = {
    tasks: Array<TaskType>,
    materials: Array<MaterialType>,
    favoriteTasksIds: Array<IdFiledType>,
    isLoading: boolean,
    test: TestType,
    testAnswers: Array<TestAnswersType>,
    testContentIds: Array<IdFiledType>,
    objectives: Array<ObjectiveType>,
}

let initialState: InitStateTasksType = {
    tasks: [],
    materials: [],
    favoriteTasksIds: [],
    isLoading: true,
    test: {
        testId: "",
        title: "",
        contentId: "",
        content: []
    },
    testAnswers: [],
    testContentIds: [],
    objectives: [],
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        pushTestAnswerAC: (state: InitStateTasksType, action: PayloadAction<TestAnswersType>) => {
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

        builder.addCase(getAllTestsContentIdsThunk.pending, (state: InitStateTasksType) => {state.isLoading = true;})
        builder.addCase(getAllTestsContentIdsThunk.fulfilled, (state: InitStateTasksType, action:PayloadAction<{
            resultCode: ResultCodesEnum,
            allTestContentIds: Array<IdFiledType>
        }>) => {
            if (action.payload.resultCode === resultCodes.Success)
                state.testContentIds = [...action.payload.allTestContentIds]
            state.isLoading = false;
        })
        builder.addCase(getAllTestsContentIdsThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false;})

        builder.addCase(getTestThunk.pending, (state: InitStateTasksType) => {state.isLoading = true;})
        builder.addCase(getTestThunk.fulfilled, (state: InitStateTasksType, action:PayloadAction<TestType & {resultCode: number}>) => {
            if (action.payload.resultCode === resultCodes.Success)
                state.test = {
                    ...state.test,
                    testId: action.payload.testId,
                    title: action.payload.title,
                    contentId: action.payload.contentId,
                    content: [...action.payload.content],
                }
            else {
                state.test = { testId: "", title: "", contentId: "", content: [] }
                state.testAnswers = []
            }
            state.isLoading = false;
        })
        builder.addCase(getTestThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false;})

        builder.addCase(getTestByIdThunk.pending, (state: InitStateTasksType) => {state.isLoading = true;})
        builder.addCase(getTestByIdThunk.fulfilled, (state: InitStateTasksType, action:PayloadAction<TestType & {resultCode: number}>) => {
            if (action.payload.resultCode === resultCodes.Success)
                state.test = {
                    ...state.test,
                    testId: action.payload.testId,
                    title: action.payload.title,
                    contentId: action.payload.contentId,
                    content: [...action.payload.content],
                }
            else {
                state.test = { testId: "", title: "", contentId: "", content: [] }
                state.testAnswers = []
            }
            state.isLoading = false;
        })
        builder.addCase(getTestByIdThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false;})


        builder.addCase(addNewObjectiveThunk.pending, (state: InitStateTasksType) => {state.isLoading = true;})
        builder.addCase(addNewObjectiveThunk.fulfilled, (state: InitStateTasksType, action:PayloadAction<{
            objectives: Array<ObjectiveType>,
            resultCode: number,
        }>) => {
            if (action.payload.resultCode === resultCodes.Success)
                state.objectives = [...action.payload.objectives]
            state.isLoading = false;
        })
        builder.addCase(addNewObjectiveThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false;})

        builder.addCase(getObjectiveByContentIdThunk.pending, (state: InitStateTasksType) => {state.isLoading = true;})
        builder.addCase(getObjectiveByContentIdThunk.fulfilled, (state: InitStateTasksType, action:PayloadAction<{
            objectives: Array<ObjectiveType>,
            resultCode: number,
        }>) => {
            if (action.payload.resultCode === resultCodes.Success)
                state.objectives = [...action.payload.objectives]
            else if (action.payload.resultCode === resultCodes.Error)
                state.objectives = [];
            state.isLoading = false;
        })
        builder.addCase(getObjectiveByContentIdThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false;})

        builder.addCase(setObjectiveResultThunk.pending, (state: InitStateTasksType) => {state.isLoading = true;})
        builder.addCase(setObjectiveResultThunk.fulfilled, (state: InitStateTasksType) => {state.isLoading = false;})
        builder.addCase(setObjectiveResultThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false;})

        builder.addCase(getAllMaterialsThunk.pending, (state: InitStateTasksType) => {
            state.isLoading = true;
        })
        builder.addCase(getAllMaterialsThunk.fulfilled, (state: InitStateTasksType, action: PayloadAction<MaterialType[]>) => {
            state.materials = [...action.payload];
            state.isLoading = false;
        })
        builder.addCase(getAllMaterialsThunk.rejected, (state: InitStateTasksType)=>{
            state.isLoading = false;
        })

        builder.addCase(renameMaterialThunk.pending, (state: InitStateTasksType) => {state.isLoading = true})
        builder.addCase(renameMaterialThunk.fulfilled, (state: InitStateTasksType) => {state.isLoading = false})
        builder.addCase(renameMaterialThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false})

        builder.addCase(addMaterialThunk.pending, (state: InitStateTasksType) => {state.isLoading = true})
        builder.addCase(addMaterialThunk.fulfilled, (state: InitStateTasksType) => {state.isLoading = false})
        builder.addCase(addMaterialThunk.rejected, (state: InitStateTasksType) => {state.isLoading = false})
    },
})

export const {
    pushTestAnswerAC,
    clearTestAnswersAC,
} = tasksSlice.actions;


export default tasksSlice.reducer;