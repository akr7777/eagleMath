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
import {
    baseAvatarPhotoUrl,
    updateEmailThunk, /*getAvatarThunk, saveNewEmail,*/
    uploadAvatarThunk
} from "../features/authSlice";
import ChangePasswordAccordion from "./ChangePasswordAccordion";
import Button from "@mui/material/Button";
import {PATHS} from "../AppBar/AppBar";
import Preloader from "../common/Preloader";
import {IdFiledType} from "../features/categoriesSlice";
import {NavLink} from "react-router-dom";

export default function Profile() {
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const userID:IdFiledType = useSelector((state: RootState) => state.auth.user.id);

    const dispatch = useAppDispatch();
    /*useEffect(()=>{
        if (String(userID) !== '0')
            dispatch(getAvatar(userID));
    },[])*/

    console.log('Profile.tsx state.auth.user=', useSelector((state: RootState) => state.auth.user));

    const [emailDisabled, setEmailDisabled] = useState<boolean>(true);
    const [emailValue, setEmailValue] = useState<string>(useSelector((state: RootState) => state.auth.user.email));
    const avaPhoto = baseAvatarPhotoUrl+userID;//useSelector((state: RootState) => state.auth.user.photo);
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isActivated = useSelector((state: RootState) => state.auth.user.isActivated);
    const activationLink = useSelector((state: RootState) => state.auth.activationLink);
    const userName = useSelector((state: RootState) => state.auth.user.name);

    const activatechangeEmailMode = () => {
        setEmailDisabled(false);
    }
    const onEmailValueChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmailValue(e.currentTarget.value);
    }
    const saveNewEmailValue = () => {
        dispatch(updateEmailThunk({id: userID, newEmail: emailValue}));
        setEmailDisabled(true);
    }
    const fileUploadInputChange = (f: any) => {
        if (f.target.files.length) {
            dispatch(uploadAvatarThunk({file: f.target.files[0], id: userID}))
            //dispatch(getAvatarThunk(userID));
        }
    }

    return <>
        {!isAuth && <Navigate to={PATHS.login}/>}
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrappedDiv}>
                    {/*{ !isAuth && <Navigate to={PATHS.login}/>}*/}
                    <div>
                        <Typography variant={'h4'}>
                            Профайл
                        </Typography>
                    </div>
                    <div className={s.someDiv2}>
                        <img className={s.profile_ava_img} src={avaPhoto} alt={'Avatar'}></img>

                        {/*<ChangeCircleIcon></ChangeCircleIcon>*/}
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
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

                    {/*Если аккаунт не активирован, предлагаем ссылку для активации аккаунта*/}
                    <div>
                        {
                            !isActivated && <Typography variant={'h5'} color={'red'}>Вам необходимо активировать аккаунт,
                                    перейдя по данной <NavLink to={activationLink}>ссылке</NavLink>.</Typography>
                        }
                    </div>

                    {   userName && <div>
                            <Typography variant={'h5'}>Имя: {userName}</Typography>
                        </div>
                    }

                    <div className={s.someDiv}>
                        <label>e-mail:</label>
                        <TextField className={s.textFields} disabled={emailDisabled} value={emailValue}
                                   onChange={(e) => onEmailValueChange(e)}/>
                        {emailDisabled && <ChangeCircleIcon onClick={activatechangeEmailMode}/>}
                        {!emailDisabled && <SaveIcon onClick={saveNewEmailValue}/>}
                    </div>
                    <div className={s.someDiv}>
                        <ChangePasswordAccordion/>
                    </div>

                </Container>
        }
    </>
}