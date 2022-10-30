import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {getContactsThunk, setContactsThunk} from "./contactsThunks";

//export type ContactsType = ContactsDataType & { isLoading: boolean }
let initialState = {
    title: ':',
    description: ':',
    phone: '',
    telegram: '',
    whatsapp: '',
    email: '',
    skype: '',
    isLoading: false,
}
export type ContactsType = typeof initialState;
/*type ContactsDataType = {
    title: string,
    description: string,
    phone: string,
    telegram: string,
    whatsapp: string,
    email: string,
    skype: string,
}*/


export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(getContactsThunk.pending, (state:ContactsType) => {
            state.isLoading = true;
        })
        builder.addCase(getContactsThunk.fulfilled, (state:ContactsType,
                                                     action: PayloadAction<Omit<ContactsType, 'isLoading'>>) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.phone = action.payload.phone;
            state.telegram = action.payload.telegram;
            state.whatsapp = action.payload.whatsapp;
            state.email = action.payload.email;
            state.skype = action.payload.skype;
            state.isLoading = false;
        })
        builder.addCase(getContactsThunk.rejected, (state:ContactsType) => {
            state.isLoading = false;
        })

        builder.addCase(setContactsThunk.pending, (state:ContactsType) => {
            state.isLoading = true;
        })
        builder.addCase(setContactsThunk.fulfilled, (state:ContactsType, action: PayloadAction<Omit<ContactsType, 'isLoading'>>) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.phone = action.payload.phone;
            state.telegram = action.payload.telegram;
            state.whatsapp = action.payload.whatsapp;
            state.email = action.payload.email;
            state.skype = action.payload.skype;
            state.isLoading = false;
        })
        builder.addCase(setContactsThunk.rejected, (state:ContactsType) => {
            state.isLoading = false;
        })
    }
})
//export const {} = contactsSlice.actions;

export default contactsSlice.reducer;