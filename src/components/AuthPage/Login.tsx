import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import s from './authPage.module.css';
import {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";

const Login = () => {
    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    /*const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }*/

    return <Container className={s.wrappedDiv}>
        <div className={s.titleDiv}>
            <Typography variant={'h5'}>
                <p>Войдите, используя свою почту и пароль,</p>
                <p>или зарегистрируйтесь</p>
            </Typography>
        </div>

        <Grid item md={6}>
            <div className={s.loginDiv}>
                <TextField
                    error={!!error}
                    label="e-mail"
                    id="outlined-error-helper-text"
                    defaultValue=""
                    /*value={email}*/

                    /*helperText="Incorrect entry."*/
                    /*onChange={(e) => emailChangeHandler(e)}*/
                />
                <TextField
                    error={!!error}
                    label="password"
                    id="outlined-error-helper-text"
                    defaultValue=""
                    type={'password'}
                    /*value={password}*/

                    /*helperText="Incorrect entry."*/
                />

                <Typography className={s.error}>
                    {error}
                </Typography>

                <Button>Войти</Button>

            </div>
        </Grid>
    </Container>
}

export default Login;