import Container from '@mui/material/Container';
import {Navigate} from 'react-router-dom';
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
import Button from "@mui/material/Button";
import {PATHS} from "../AppBar/AppBar";

export default function Profile () {
    const dispatch = useAppDispatch();
    const [emailDisabled, setEmailDisabled] = useState<boolean>(true);
    const [emailValue, setEmailValue] = useState<string>(useSelector((state:RootState)=>state.auth.user.email));
    const avaPhoto = useSelector((state:RootState)=>state.auth.user.photo);
    const isAuth = useSelector((state:RootState) => state.auth.isAuth);
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
    const fileUploadInputChange = (file: any) => {
        window.alert('Need to send file to the server. Start with Profile.tsx')
        console.log(file)
    }

    return <Container className={s.wrappedDiv}>
        { !isAuth && <Navigate to={PATHS.login}/>}
        <div>
            <Typography variant={'h4'}>
            Профайл
        </Typography>
        </div>
        <div className={s.someDiv2}>
            <img className={s.profile_ava_img} src={avaPhoto}></img>

            {/*<ChangeCircleIcon></ChangeCircleIcon>*/}
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={(f) => fileUploadInputChange(f)}
            />
            <label htmlFor="raised-button-file">
                <Button component="span">
                    Сменить аватар
                </Button>
            </label>

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