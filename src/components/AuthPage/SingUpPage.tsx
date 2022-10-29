import Container from '@mui/material/Container';
import s from './authPage.module.css';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {ChangeEvent, useState} from "react";
import CustomColorButton from "../common/CustomColorButton";
import {RootState, useAppDispatch} from "../../store/store";
import {resetSingUpResultCodeAC} from "../features/authSlice";
import Preloader from "../common/Preloader";
import {useSelector} from "react-redux";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {NavLink} from "react-router-dom";
import {PATHS} from "../AppBar/AppBar";
import Button from "@mui/material/Button";
import {ResultCodesEnum} from "../common/resultCodes";
import {registrationThunk} from "../features/authThunks";

type ErrorObjectType = {
    name: string,
    email: string,
    password: string,
    serverError: string,
}
const errorInitState: ErrorObjectType = {
    name: '',
    email: '',
    password: '',
    serverError: '',
}
const SingUpPage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const singUpResultCode = useSelector((state: RootState) => state.auth.singUpResultCode);
    //let singUpResultCode = -1;

    const [error, setError] = useState<ErrorObjectType>(errorInitState);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const someTextChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                             fieldname: 'name' | 'email' | 'password1' | 'password2',
    ) => {
        const value = e.currentTarget.value;
        if (fieldname === 'name') {
            setName(value);
        } else if (fieldname === "email") {
            dispatch(resetSingUpResultCodeAC());
            setEmail(value);
        } else if (fieldname === "password1") {
            setPassword1(value);
        } else if (fieldname === 'password2') {
            setPassword2(value);
        } else {
            console.error("ERROR");
        }
        setError({...errorInitState});
    }
    const submitButtonClick = () => {
        setError({...errorInitState})
        if (!name) {
            error.name = 'Обязательно заполнить поле';
            setError(error);
        } else if (!email) {
            error.email = 'Обязательно заполнить поле';
            setError(error);
        } else if (!password1) {
            error.password = 'Обязательно заполнить поле';
            setError(error);
        } else if (password1 !== password2) {
            error.password = 'Должны совпадать'
            setError(error);
        } else if (password1.length <= 5) {
            error.password = 'Пароль должен быть больше 5-ти символов'
            setError(error);
        } else {
            dispatch(registrationThunk({name: name, email: email, password: password1}));
        }
    }

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container>
                    {
                        singUpResultCode === ResultCodesEnum.Success && <div className={s.successDiv}>
                            <Alert severity="success">
                                <AlertTitle>Новый пользователь успешно зарегистрирован!</AlertTitle>
                                <div className={s.successDiv}>
                                    <strong>Теперь Вы можете войти в систему.</strong>
                                    <NavLink to={PATHS.login} className={s.navLink1}><Button variant={'outlined'}>Войти</Button></NavLink>
                                </div>
                            </Alert>
                        </div>
                    }

                    {
                        singUpResultCode !== ResultCodesEnum.Success && <div className={s.wrappedDiv}>
                            <Typography variant={'h4'}>
                                Регистрация:
                            </Typography>

                            {
                                singUpResultCode === ResultCodesEnum.Error && <div>
                                    <Alert severity="error">
                                        <AlertTitle>Ошибка</AlertTitle>
                                        <strong>Возникла серверная ошибка. Обратитесь в тех.поддержку.</strong>
                                    </Alert>
                                </div>
                            }
                            {
                                singUpResultCode === ResultCodesEnum.userAlreadyExists && <div>
                                    <Alert severity="error">
                                        <AlertTitle>Пользователь уже существует</AlertTitle>
                                        <strong>Пользователь с адресом почты {email} уже существует.</strong>
                                    </Alert>
                                </div>
                            }

                            <TextField
                                error={!!error.name}
                                className={s.signup_textFields}
                                variant={'outlined'}
                                label={'Имя:'}
                                onChange={(e) => someTextChanged(e, 'name')}
                                value={name}
                            />
                            <label className={s.error}>{error.name}</label>

                            <TextField
                                error={!!error.email}
                                className={s.signup_textFields}
                                variant={'outlined'}
                                label={'e-mail:'}
                                onChange={(e) => someTextChanged(e, 'email')}
                                value={email}
                            />
                            <label className={s.error}>{error.email}</label>

                            <Typography>Введите Ваш пароль дважды в полях ниже. Пароль должен быть более 5
                                символов:</Typography>
                            <TextField
                                error={!!error.password}
                                type='password'
                                className={s.signup_textFields}
                                variant={'outlined'}
                                label={'password:'}
                                onChange={(e) => someTextChanged(e, 'password1')}
                                value={password1}
                            />

                            <TextField
                                error={!!error.password}
                                type='password'
                                className={s.signup_textFields}
                                variant={'outlined'}
                                label={'password one more time:'}
                                onChange={(e) => someTextChanged(e, 'password2')}
                                value={password2}
                            />
                            <label className={s.error}>{error.password}</label>

                            <label className={s.error}>{error.serverError}</label>

                            <CustomColorButton onClick={submitButtonClick}>Зарегистрироваться</CustomColorButton>
                        </div>
                    }

                </Container>
        }
    </>
}

export default SingUpPage;