import {configureStore, ThunkDispatch, AnyAction} from "@reduxjs/toolkit";
import authorSlice from "../components/features/authorSlice";
import authSlice from "../components/features/authSlice";
import contactsSlice from "../components/features/contactsSlice";
import tasksSlice from "../components/features/tasksSlice";
import materialsSlice from "../components/features/materialsSlice";
import {useDispatch} from "react-redux";
import categoriesSlice from "../components/features/categoriesSlice";
import dashboardSlice from "../components/features/dashboardSlice";
import contentSlice from "../components/features/contentSlice";
import usersSlice from "../components/features/usersSlice";


export const store = configureStore({
    reducer: {
        author: authorSlice,
        auth: authSlice,
        contacts: contactsSlice,
        tasks: tasksSlice,
        materials: materialsSlice,
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

