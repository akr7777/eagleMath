import {createAsyncThunk} from "@reduxjs/toolkit";
import {contactsAPI} from "../../components/api/api";
import {ContactsType} from "./contactsSlice";

export const getContactsThunk = createAsyncThunk(
    'contacts/getContactsThunk',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await contactsAPI.getContacts();
        return res.data;
    }
);

export const setContactsThunk = createAsyncThunk(
    'contacts/setContactsThunk',
    async (contactsData: Omit<ContactsType, 'isLoading'>, {rejectWithValue, dispatch}) => {
        const {title, description, phone, telegram, whatsapp, email, skype} = contactsData;
        const res = await contactsAPI.setContacts(title, description, phone, telegram, whatsapp, email, skype);
        return res.data;
    }
);