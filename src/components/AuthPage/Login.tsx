import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import s from './authPage.module.css';
import {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";
import CustomColorButton from "../common/CustomColorButton";
import {NavLink} from "react-router-dom";
import {PATHS} from "../AppBar/AppBar";
import {login} from "../features/authSlice";
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";

const Login = () => {
    const [error, setError] = useState<string>('');
    const serverError:string = useSelector( (state: RootState) => state.auth.serverError);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.currentTarget.value);
    }
    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.currentTarget.value);
    }
    const enterClickHandler = () => {
        dispatch(login({email: email, password: password}));
    }

    return <Container>
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

        <Grid item md={6}>
            <div className={s.loginDiv}>
                <TextField
                    error={!!error}
                    label="e-mail"
                    id="outlined-error-helper-text"
                    defaultValue=""
                    value={email}

                    /*helperText="Incorrect entry."*/
                    onChange={(e) => emailChangeHandler(e)}
                />
                <TextField
                    error={!!error}
                    label="password"
                    id="outlined-error-helper-text"
                    defaultValue=""
                    type={'password'}
                    value={password}
                    onChange={(e)=> passwordChangeHandler(e)}
                    /*helperText="Incorrect entry."*/
                />

                <Typography className={s.error}>
                    {serverError}
                </Typography>

                <Button onClick={enterClickHandler}>Войти</Button>

            </div>
        </Grid>
    </Container>
}

export default Login;