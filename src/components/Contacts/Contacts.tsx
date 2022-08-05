import React from 'react';
import {useSelector} from "react-redux";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {RootState} from "../../store/store";
import EditContactsPopper from "./EditContactsPopper";
import { Typography } from '@mui/material';
import s from './contacts.module.css';
import Container from '@mui/material/Container';
import PopperContentContacts from "./PopperContentContacts";

export const Contacts = () => {

    //const isAdmin:boolean = useSelector( (state:RootState) => state.auth.isAuth)
    const isAdmin = true;

    const phone = useSelector( (state: RootState) => state.contacts.phone);
    const telegram = useSelector( (state:RootState) => state.contacts.telegram);
    const whatsapp = useSelector( (state:RootState) => state.contacts.whatsapp);
    const email = useSelector( (state: RootState) => state.contacts.email);
    const skype = useSelector( (state: RootState) => state.contacts.skype);

    return <>
        <Container className={s.wrapper}>
            <div className={s.head_title}>
                <Typography variant="h4" >This is my contacts:</Typography>
                { isAdmin && <EditContactsPopper/> }
            </div>
            {!!phone && <div><Typography variant="h5" >Phone: {phone}</Typography></div> }
            {!!telegram && <div><Typography variant="h5" >telegram: {telegram}</Typography></div> }
            {!!whatsapp && <div><Typography variant="h5" >whatsapp: {whatsapp}</Typography></div> }
            {!!email && <div><Typography variant="h5" >email: {email}</Typography></div> }
            {!!skype && <div><Typography variant="h5" >skype: {skype}</Typography></div> }
        </Container>
    </>
}