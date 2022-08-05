import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export type ContactsType = {
    phone: string,
    telegram: string,
    whatsapp: string,
    email: string,
    skype: string,
}
let initialState:ContactsType = {
    phone: '',
    telegram: '',
    whatsapp: '',
    email: '',
    skype: '',
}
export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {
        setPhoneAC: (state:ContactsType, action: PayloadAction<string>):void => {
            state.phone = action.payload;
        },
        setTelegramAC: (state:ContactsType, action: PayloadAction<string>):void => {
            state.telegram = action.payload;
        },
        setWhatsappAC: (state:ContactsType, action: PayloadAction<string>):void => {
            state.whatsapp = action.payload;
        },
        setEmailAC: (state:ContactsType, action: PayloadAction<string>):void => {
            state.email = action.payload;
        },
        setSkypeAC: (state:ContactsType, action: PayloadAction<string>):void => {
            state.skype = action.payload;
        },
    }
})
export const {setPhoneAC, setTelegramAC, setWhatsappAC, setEmailAC, setSkypeAC} = contactsSlice.actions;

export default contactsSlice.reducer;