import Container from '@mui/material/Container';
import s from './authPage.module.css';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";
import CustomColorButton from "../common/CustomColorButton";

type ErrorObjectType = {
    name: string,
    email: string,
    password: string,
    serverError: string,
}
const errorInitState:ErrorObjectType = {
    name: '',
    email: '',
    password: '',
    serverError: '',
}
const SingUpPage = () => {
    const [error, setError] = useState<ErrorObjectType>(errorInitState);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const someTextChanged = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
                             fieldname: 'name'|'email'|'password1'|'password2',
                             ) => {
        const value = e.currentTarget.value;
        if (fieldname === 'name') {
            setName(value);
        } else if (fieldname === "email") {
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
        }
        if (!email) {
            error.email = 'Обязательно заполнить поле';
            setError(error);
        }
        if (!password1) {
            error.password = 'Обязательно заполнить поле';
            setError(error);
        }
        if (password1 !== password2) {
            error.password = 'Должны совпадать'
            setError(error);
        }
    }

    return <Container>
        <div className={s.wrappedDiv}>
            <Typography variant={'h4'}>
                Регистрация:
            </Typography>

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
    </Container>
}

export default SingUpPage;