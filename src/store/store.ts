import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authorSlice from "../components/features/authorSlice";
import authSlice from "../components/features/authSlice";
import contactsSlice from "../components/features/contactsSlice";
import tasksSlice from "../components/features/tasksSlice";
import materialsSlice from "../components/features/materialsSlice";


export const store = configureStore({
    reducer: {
        author: authorSlice,
        auth: authSlice,
        contacts: contactsSlice,
        tasks: tasksSlice,
        materials: materialsSlice,
    },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch

