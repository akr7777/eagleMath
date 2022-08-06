import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'

export type TaskType = {
    taskID: number,
    taskDescription: string,
    taskImg: string | null,
    answer: string,
    explanation: string,
}
let initialState: TaskType[] = [
    {
        taskID: 1,
        taskDescription: 'task description',
        taskImg: 'string',
        answer: 'answer',
        explanation: 'explanation',
    }
]

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
       /* setTaskDescription: (id: number, state: TaskType[], action: PayloadAction<string>) => {
            let task = state.find( (t) => t.taskID === id);
            if (task) task.taskDescription = action.payload;
        }*/
    }
})
export const {} = tasksSlice.actions;

export default tasksSlice.reducer;