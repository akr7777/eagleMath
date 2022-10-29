import {configureStore, ThunkDispatch, AnyAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

import authorSlice from "./features/authorSlice";
import authSlice from "./features/authSlice";
import contactsSlice from "./features/contactsSlice";
import tasksSlice from "./features/tasksSlice";
//import materialsSlice from "./features/materialsSlice";
import categoriesSlice from "./features/categoriesSlice";
import dashboardSlice from "./features/dashboardSlice";
import contentSlice from "./features/contentSlice";
import usersSlice from "./features/usersSlice";


export const store = configureStore({
    reducer: {
        author: authorSlice,
        auth: authSlice,
        contacts: contactsSlice,
        tasks: tasksSlice,
        //materials: materialsSlice,
        categories: categoriesSlice,
        dashboard: dashboardSlice,
        content: contentSlice,
        users: usersSlice,
    },
});

//type StoreType = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()

