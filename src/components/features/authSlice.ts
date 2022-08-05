import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export type AuthType = {
    isAuth: boolean,
}
let initialState:AuthType = {
    isAuth: false,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state:AuthType, action: PayloadAction<boolean>):void => {
            state.isAuth = action.payload;
        },
    }
})
export const {setAuth} = authSlice.actions;

export default authSlice.reducer;