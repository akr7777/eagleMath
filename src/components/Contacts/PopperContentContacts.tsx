import React from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {setPhoneAC, setTelegramAC, setWhatsappAC, setEmailAC, setSkypeAC} from "../features/contacts";
import s from './contacts.module.css';


type PopperContentPropsType = {
    handleClickClose: (event: React.MouseEvent<HTMLElement>) => void,
}
const PopperContentContacts = (props: PopperContentPropsType) => {

    const [phone, setPhone] = useState<string>( useSelector( (state:RootState) => state.contacts.phone) );
    const [telegram, setTelegram] = useState<string>( useSelector( (state:RootState) => state.contacts.telegram) );
    const [whatsapp, setWhatsapp] = useState<string>( useSelector( (state:RootState) => state.contacts.whatsapp) );
    const [email, setEmail] = useState<string>( useSelector( (state:RootState) => state.contacts.email) );
    const [skype, setSkype] = useState<string>( useSelector( (state:RootState) => state.contacts.skype) );

    const dispatch = useDispatch()

    const saveButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(setPhoneAC(phone));
        dispatch(setTelegramAC(telegram));
        dispatch(setWhatsappAC(whatsapp));
        dispatch(setEmailAC(email));
        dispatch(setSkypeAC(skype));
        props.handleClickClose(event);
    }

    return <div>
        <h2> Here you can edit your contacts: </h2>
        <div className={s.popperWrapper}>
            <div><TextField id="outlined-phone" label="phone" variant="outlined" value={phone} onChange={ (e) => setPhone(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-telegram" label="telegram" variant="outlined" value={telegram} onChange={ (e) => setTelegram(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-whatsapp" label="whatsapp" variant="outlined" value={whatsapp} onChange={ (e) => setWhatsapp(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-email" label="email" variant="outlined" value={email} onChange={ (e) => setEmail(e.currentTarget.value)}/></div>
            <div><TextField id="outlined-skype" label="skype" variant="outlined" value={skype} onChange={ (e) => setSkype(e.currentTarget.value)}/></div>
        </div>

        <div>
            <Button onClick={ e => saveButtonClickHandler(e)}>Save</Button>
            <Button onClick={ (e) => props.handleClickClose(e) }>Cancel</Button>
        </div>
    </div>
}

export default PopperContentContacts;