import React from 'react';
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import {setTitleAC, setDescriptionAC, setPhoneAC, setTelegramAC, setWhatsappAC, setEmailAC, setSkypeAC} from "../features/contactsSlice";
import s from './contacts.module.css';
import {getContactsThunk, setContactsThunk} from "../features/contactsSlice";


type PopperContentPropsType = {
    handleClickClose: (event: React.MouseEvent<HTMLElement>) => void,
}
const PopperContentContacts = (props: PopperContentPropsType) => {

    const [title, setTitle] = useState<string>(useSelector((state: RootState) => state.contacts.title));
    const [description, setDescription] = useState<string>(useSelector((state: RootState) => state.contacts.description));
    const [phone, setPhone] = useState<string>(useSelector((state: RootState) => state.contacts.phone));
    const [telegram, setTelegram] = useState<string>(useSelector((state: RootState) => state.contacts.telegram));
    const [whatsapp, setWhatsapp] = useState<string>(useSelector((state: RootState) => state.contacts.whatsapp));
    const [email, setEmail] = useState<string>(useSelector((state: RootState) => state.contacts.email));
    const [skype, setSkype] = useState<string>(useSelector((state: RootState) => state.contacts.skype));

    const dispatch = useAppDispatch()

    const saveButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        /* dispatch(setTitleAC(title));
         dispatch(setDescriptionAC(description));
         dispatch(setPhoneAC(phone));
         dispatch(setTelegramAC(telegram));
         dispatch(setWhatsappAC(whatsapp));
         dispatch(setEmailAC(email));
         dispatch(setSkypeAC(skype));*/
        console.log('PopperContentContacts / saveButtonClickHandler', title, description)
        dispatch(setContactsThunk({
            title: title,
            description: description,
            phone: phone,
            telegram: telegram,
            whatsapp: whatsapp,
            email: email,
            skype: skype
        }));
        dispatch(getContactsThunk());
        props.handleClickClose(event);
    }

    return <div>
        <h2> Here you can edit your contacts: </h2>
        <div className={s.popperWrapper}>
            <div><TextField id="outlined-title" label="Заголовок:" variant="outlined" value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-description" label="Описание:" variant="outlined" value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-phone" label="phone" variant="outlined" value={phone}
                            onChange={(e) => setPhone(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-telegram" label="telegram" variant="outlined" value={telegram}
                            onChange={(e) => setTelegram(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-whatsapp" label="whatsapp" variant="outlined" value={whatsapp}
                            onChange={(e) => setWhatsapp(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-email" label="email" variant="outlined" value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-skype" label="skype" variant="outlined" value={skype}
                            onChange={(e) => setSkype(e.currentTarget.value)}/></div>
        </div>

        <div>
            <Button onClick={e => saveButtonClickHandler(e)}>Save</Button>
            <Button onClick={(e) => props.handleClickClose(e)}>Cancel</Button>
        </div>
    </div>
}

export default PopperContentContacts;