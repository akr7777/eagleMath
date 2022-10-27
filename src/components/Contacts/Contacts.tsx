import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {RootState, useAppDispatch} from "../../store/store";
import EditContactsPopper from "./EditContactsPopper";
import {Typography} from '@mui/material';
import s1 from './contacts.module.css';
import s from "../common/commonCSS.module.css";
import Preloader from "../common/Preloader";
import Container from '@mui/material/Container';
import PopperContentContacts from "./PopperContentContacts";
import {getContactsThunk} from "../features/contactsSlice";

function phoneFormat(phone: string) {
    if (phone.length === 12)
        return phone.slice(0, 2) + ' (' + phone.slice(2, 5) + ') ' + phone.slice(5, 8) + '-' + phone.slice(8, 10) + '-' + phone.slice(10, 12);
    else
        return phone;
}

export const Contacts = () => {
    const dispatch = useAppDispatch();

    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const isLoading = useSelector((state: RootState) => state.contacts.isLoading);

    const contactsTitle = useSelector((state: RootState) => state.contacts.title);
    const contactsDescription = useSelector((state: RootState) => state.contacts.description);

    const phone = useSelector((state: RootState) => state.contacts.phone);
    const telegram = useSelector((state: RootState) => state.contacts.telegram);
    const whatsapp = useSelector((state: RootState) => state.contacts.whatsapp);
    const email = useSelector((state: RootState) => state.contacts.email);
    const skype = useSelector((state: RootState) => state.contacts.skype);

    useEffect(() => {
        dispatch(getContactsThunk());
    }, [contactsTitle, contactsDescription, phone, telegram, whatsapp, email, skype])

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <div className={s.someDiv1}> {/*s.head_title*/}
                        <Typography variant="h4">{contactsTitle}</Typography>
                    </div>
                    <div className={s.someDiv1}> {/*s.head_description*/}
                        <Typography variant={'h5'}>
                            {contactsDescription}
                        </Typography>
                    </div>

                    <div className={s.someDiv1}>  {/*s.body_title*/}

                        <div>{isAdmin && <EditContactsPopper/>}</div>

                        {!!phone && <div>
                            <Typography variant="h5">
                                Телефон: <a className={s1.alink} href={"tel:" + phone}>{phoneFormat(phone)}</a>
                            </Typography>
                        </div>}
                        {!!telegram && <div>
                            <Typography variant="h5">
                                Telegram: <a className={s1.alink} href={"https://t.me/" + telegram}>{telegram}</a>
                            </Typography>
                        </div>}
                        {!!whatsapp && <div>
                            <Typography variant="h5">
                                What's app: <a className={s1.alink}
                                               href={'https://api.whatsapp.com/send?phone=' + whatsapp.slice(1, whatsapp.length)}>{whatsapp}</a>
                            </Typography>
                        </div>}
                        {!!email && <div>
                            <Typography variant="h5">
                                e-mail: <a className={s1.alink} href={'mailto:' + email}>{email}</a>
                            </Typography>
                        </div>}
                        {!!skype && <div>
                            <Typography variant="h5">
                                Skype: <a className={s1.alink} href={"skype:" + skype + "?chat"}>{skype}</a>
                            </Typography>
                        </div>}
                    </div>

                </Container>
        }
    </>
}