import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {contactsAPI} from "../api/api";

export type ContactsType = ContactsDataType & {
    /*title: string,
    description: string,
    phone: string,
    telegram: string,
    whatsapp: string,
    email: string,
    skype: string,*/
    isLoading: boolean,
}
let initialState: ContactsType = {
    title: ':',
    description: ':',
    phone: '',
    telegram: '',
    whatsapp: '',
    email: '',
    skype: '',
    isLoading: false,
}

type ContactsDataType = {
    title: string,
    description: string,
    phone: string,
    telegram: string,
    whatsapp: string,
    email: string,
    skype: string,
}
export const getContactsThunk = createAsyncThunk(
    'contacts/getContactsThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await contactsAPI.getContacts();
        if (res.data.resultCode === 0) {
            return res.data;
        } else
            return 'ERROR from server';
    }
);

export const setContactsThunk = createAsyncThunk(
    'contacts/setContactsThunk',
    async (contactsData: ContactsDataType, {rejectWithValue, dispatch}) => {
        console.log('setContactsThunk/contactsData', contactsData)
        const {title, description, phone, telegram, whatsapp, email, skype} = contactsData;
        const res = await contactsAPI.setContacts(title, description, phone, telegram, whatsapp, email, skype);
        console.log('setContactsThunk/res=')
        if (res.data.resultCode === 0) {
            return res.data;
        } else
            return 'ERROR from server';
    }
);

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {
        /*setTitleAC: (state:ContactsType, action: PayloadAction<string>): void => {
            state.title = action.payload;
        },
        setDescriptionAC: (state:ContactsType, action: PayloadAction<string>): void => {
            state.description = action.payload;
        },
        setPhoneAC: (state: ContactsType, action: PayloadAction<string>): void => {
            state.phone = action.payload;
        },
        setTelegramAC: (state: ContactsType, action: PayloadAction<string>): void => {
            state.telegram = action.payload;
        },
        setWhatsappAC: (state: ContactsType, action: PayloadAction<string>): void => {
            state.whatsapp = action.payload;
        },
        setEmailAC: (state: ContactsType, action: PayloadAction<string>): void => {
            state.email = action.payload;
        },
        setSkypeAC: (state: ContactsType, action: PayloadAction<string>): void => {
            state.skype = action.payload;
        },*/
    },
    extraReducers: builder => {
        builder.addCase(getContactsThunk.pending, (state:ContactsType) => {
            state.isLoading = true;
        })
        builder.addCase(getContactsThunk.fulfilled, (state:ContactsType, action: PayloadAction<ContactsDataType>) => {
            state.isLoading = false;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.phone = action.payload.phone;
            state.telegram = action.payload.telegram;
            state.whatsapp = action.payload.whatsapp;
            state.email = action.payload.email;
            state.skype = action.payload.skype;
        })
        builder.addCase(getContactsThunk.rejected, (state:ContactsType) => {
            state.isLoading = false;
        })

        builder.addCase(setContactsThunk.pending, (state:ContactsType) => {
            state.isLoading = true;
        })
        builder.addCase(setContactsThunk.fulfilled, (state:ContactsType, action: PayloadAction<ContactsDataType>) => {
            state.isLoading = false;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.phone = action.payload.phone;
            state.telegram = action.payload.telegram;
            state.whatsapp = action.payload.whatsapp;
            state.email = action.payload.email;
            state.skype = action.payload.skype;
        })
        builder.addCase(setContactsThunk.rejected, (state:ContactsType) => {
            state.isLoading = false;
        })
    }
})
export const {/*setTitleAC, setDescriptionAC, setPhoneAC, setTelegramAC, setWhatsappAC, setEmailAC, setSkypeAC*/} = contactsSlice.actions;

export default contactsSlice.reducer;