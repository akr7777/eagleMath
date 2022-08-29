import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import s from './authPage.module.css';
import {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";
import CustomColorButton from "../common/CustomColorButton";
import {Navigate, NavLink, useNavigate} from "react-router-dom";

import {PATHS} from "../AppBar/AppBar";
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {loginThunk} from "../features/authSlice";

const Login = () => {
    const [error, setError] = useState<string>('');
    const serverError: string = useSelector((state: RootState) => state.auth.serverError);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    //let navigate = useNavigate();

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.currentTarget.value);
        setError('');
    }
    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.currentTarget.value);
        setError('')
    }
    const enterClickHandler = () => {
        if (!email) {
            setError('Полe е-mail обязательно для заполнения')
        } else if (!password) {
            setError('Полe password обязательно для заполнения')
        } else {
            dispatch(loginThunk({email: email, password: password}));
        }
    }

    return <>
        {isAuth && <Navigate to={PATHS.profile}/>}
        <Container className={s.wrappedDiv}>
            <div className={s.titleDiv}>
                <Typography variant={'h4'}>
                    Вход в систему
                </Typography>
                <Typography variant={'h5'} className={s.titleDivDesription}>
                    <p>Войдите, используя свою почту и пароль,</p>
                    <p>или зарегистрируйтесь</p>
                </Typography>
                <NavLink to={PATHS.singup} className={s.navLink1}>
                    <CustomColorButton
                        className={s.signUpButton}
                    >Зарегистрироваться1</CustomColorButton>
                </NavLink>
            </div>

            <div className={s.loginDiv}>
                <TextField
                    className={s.login_textFields}
                    error={!!error}
                    label="e-mail"
                    id="outlined-error-helper-text"
                    defaultValue=""
                    value={email}
                    onChange={(e) => emailChangeHandler(e)}
                />
                <TextField
                    className={s.login_textFields}
                    error={!!error}
                    label="password"
                    id="outlined-error-helper-text"
                    defaultValue=""
                    type={'password'}
                    value={password}
                    onChange={(e) => passwordChangeHandler(e)}
                />

                <Typography className={s.error}>
                    {error}
                </Typography>
                <Typography className={s.error}>
                    {serverError}
                </Typography>

                <Button
                    className={s.loginButton}
                    onClick={enterClickHandler}
                    variant={'contained'}
                >Войти</Button>
            </div>
        </Container>
    </>
}

export default Login;