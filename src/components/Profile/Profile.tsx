import Container from '@mui/material/Container';

import s from './profile.module.css';
import Typography from "@mui/material/Typography";
import {ChangeEvent, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import TextField from "@mui/material/TextField";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import SaveIcon from '@mui/icons-material/Save';
import {saveNewEmail} from "../features/authSlice";
import ChangePasswordAccordion from "./ChangePasswordAccordion";

export default function Profile () {
    const dispatch = useAppDispatch();
    const [emailDisabled, setEmailDisabled] = useState<boolean>(true);
    const [emailValue, setEmailValue] = useState<string>(useSelector((state:RootState)=>state.auth.email));
    const avaPhoto = useSelector((state:RootState)=>state.auth.authPhoto);

    const activatechangeEmailMode = () => {
        setEmailDisabled(false);
    }
    const onEmailValueChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setEmailValue(e.currentTarget.value);
    }
    const saveNewEmailValue = () => {
        dispatch(saveNewEmail(emailValue));
        setEmailDisabled(true);
    }

    return <Container className={s.wrappedDiv}>
        <div>
            <Typography variant={'h4'}>
            Профайл
        </Typography>
        </div>
        <div>
            <img className={s.profile_ava_img} src={avaPhoto}></img>
        </div>
        <div className={s.someDiv}>
            <label>e-mail:</label>
            <TextField className={s.textFields} disabled={emailDisabled} value={emailValue} onChange={(e)=> onEmailValueChange(e)}/>
            { emailDisabled && <ChangeCircleIcon onClick={activatechangeEmailMode}/>}
            { !emailDisabled && <SaveIcon onClick={saveNewEmailValue}/>}
        </div>
        <div className={s.someDiv}>
            <ChangePasswordAccordion/>
        </div>

    </Container>
}