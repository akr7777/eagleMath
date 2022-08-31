import React, {ChangeEvent, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from "@mui/material/TextField";
import s from './profile.module.css';
import Button from "@mui/material/Button";
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import Alert from '@mui/material/Alert';
import {updatePasswordThunk} from "../features/authSlice";

export default function ChangePasswordAccordion() {
    const dispatch = useAppDispatch();
    //const userEmail = useSelector((state: RootState) => state.auth.user.email);
    const userId = useSelector((state: RootState)=> state.auth.user.id);
    const changePasswordResultCode = useSelector((state: RootState) => state.auth.changePasswordResultCode);

    const [oldPass, setOldPass] = useState<string>('');
    const [newPass1, setNewPass1] = useState<string>('');
    const [newPass2, setNewPass2] = useState<string>('');
    const [error, setError] = useState<string>('');

    const oldPassFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOldPass(e.currentTarget.value);
        setError('');
    }
    const newPass1FieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPass1(e.currentTarget.value);
        setError('');
    }
    const newPass2FieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPass2(e.currentTarget.value);
        setError('');
    }

    const changePassword = () => {
        if (newPass1 === newPass2 && newPass1 !== '' && newPass1.length>5) {
            //alert('Меняем пароль!!!');
            dispatch(updatePasswordThunk({id: userId, oldPass: oldPass, newPass: newPass1}));
            //const action: ChangePasswordActionType = {email: userEmail, oldPassword: oldPass, newPassword: newPass1}
            //dispatch(changeUserPassword(action));
        } else {
            if (!oldPass) setError('Поле "Старый пароль" должно быть заполнено');
            else if (!newPass1) setError('Поле "Новый пароль" должно быть заполнено');
            else if (!newPass2) setError('Поле "Новый пароль еще раз" должно быть заполнено');
            else if (newPass1!==newPass2) setError('Пароли должны совпадать');
            else if (oldPass===newPass1) setError('Нельзя вводить старый пароль');
            else if (newPass1.length<=5) setError('Пароль должен быть более 5 символов.')
        }

    }

    return (
        <>


            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className={s.someDiv2}>
                        <Typography>Сменить пароль</Typography>

                        { changePasswordResultCode === 0 && <div><Alert severity="success">Пароль успешно изменен!</Alert></div>}
                        { changePasswordResultCode === 10 && <div><Alert severity="error">Старый пароль введен неверно.</Alert></div>}
                        { changePasswordResultCode === 1 && <div><Alert severity="error">Ошибка на сервере. Напишите в техподдержку.</Alert></div>}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={s.changePasswordDiv}>
                        <div>
                            {/* <label>Старый пароль:</label>*/}
                            <TextField className={s.textFields} variant={'outlined'} label={'Старый пароль:'}
                                       value={oldPass} error={!!error} type={'password'}
                                       onChange={(e) => oldPassFieldChange(e)}/>
                        </div>
                        <div>
                            {/*<label>Новый пароль:</label>*/}
                            <TextField className={s.textFields} variant={'outlined'} label={'Новый пароль:'}
                                       value={newPass1} error={!!error} type={'password'}
                                       onChange={(e) => newPass1FieldChange(e)}/>
                        </div>
                        <div>
                            {/*<label>Новый пароль еще раз:</label>*/}
                            <TextField className={s.textFields} variant={'outlined'} label={'Старый пароль еще раз:'}
                                       value={newPass2} error={!!error} type={'password'}
                                       onChange={(e) => newPass2FieldChange(e)}/>
                        </div>
                        <div>
                            <label className={s.error}>{error}</label>
                        </div>
                        <div>
                            <Button variant={'contained'}
                                    onClick={changePassword}
                            >ЗАМЕНИТЬ ПАРОЛЬ</Button>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            {/*Oldpass: {oldPass}, Newpass1: {newPass1}, NewPass2: {newPass2}*/}
        </>
    );
}