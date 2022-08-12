import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios';

export type MaterialType = {
    materialID: number,
    title: string,
    description: string | null,
    text: string
    additions: string,
    posts: Array<any>
}
let initialState: MaterialType[] = [{materialID: -1000, title: '', description: '', text: '', additions: '', posts: []}]

/*export const getAllMaterials = createAsyncThunk(
    'materials/getAllMaterials',
    async function (_, { rejectWithValue, dispatch } ) {
        const res = await axios.get('https://someURL');
        dispatch(setAllMaterials(res.data))
    }
);*/

/*export const getPosts = createAsyncThunk(
    'materials/getPosts',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch(setPosts)
    }
);*/

export const materialsSlice = createSlice({
    name: 'materials',
    initialState: initialState,
    reducers: {
        /*setTaskDescription: (state: TaskType, action: PayloadAction<string>) => {
            state.taskDescription = action.payload;
        }*/
        /*setAllMaterials: (state:MaterialType, action: PayloadAction<MaterialType>) => {
            state = action.payload;
        },*/
        setPosts: (state:MaterialType[], action:PayloadAction<any>) => {
            state[0].posts = action.payload;
        }
    },
    /*extraReducers: {
        /!*[getAllMaterials.fulfilled]: ()=> console.log('fulfilled');
        [getAllMaterials.pending]: ()=> console.log('pending');
        [getAllMaterials.rejected]: ()=> console.log('rejected');*!/
        [getPosts.fulfilled]: () => console.log('fulfilled')
    }*/
})

//export const { /*setAllMaterials*/ setPosts } = materialsSlice.actions;



export default materialsSlice.reducer;