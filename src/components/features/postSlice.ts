import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../../store/store";

type PostType = {
    userId: number,
    id: number,
    title: string,
    body: string,
}
export type InitStatePostsType = { posts: Array<PostType>}
const initState:InitStatePostsType = {
    posts: [],
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, {rejectWithValue, dispatch}) => {
        console.log('postsSlice/getPosts')
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch(setPosts(res.data));
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: initState,
    reducers: {
        setPosts: (state:InitStatePostsType, action: PayloadAction<Array<PostType>>) => {
            state.posts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state:InitStatePostsType, action: AnyAction) => {
            alert('extraReducers');
            if (action.payload) {
                state.posts = action.payload;
            }
        })
    }
    /*extraReducers: {
        [getPosts.fulfilled.toString()]: () => console.log('fulfilled'),
        [getPosts.pending.toString()]: () => console.log('pending'),
        [getPosts.rejected.toString()]: () => console.log('rejected'),
    }*/
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;