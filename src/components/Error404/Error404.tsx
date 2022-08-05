import React from 'react';
import {NavLink} from "react-router-dom";
import {PATHS} from "../AppBar/AppBar";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import s from './error404.module.css';

export const Error404 = () => {
    return <>
        <Container className={s.wrappedDiv}>
            <Typography variant={'h5'}>
                This page not found.
            </Typography>
            <Typography variant={'h5'}>
                <NavLink to={PATHS.description}>Go to main page</NavLink>
            </Typography>
        </Container>
    </>
}