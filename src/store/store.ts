import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authorSlice from "../components/features/authorSlice";
import authSlice from "../components/features/authSlice";
import contacts from "../components/features/contacts";


export const store = configureStore({
    reducer: {
        author: authorSlice,
        auth: authSlice,
        contacts: contacts,
    },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch

