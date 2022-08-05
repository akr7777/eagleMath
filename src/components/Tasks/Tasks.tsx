import React from 'react';
import {useSelector} from "react-redux";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {RootState} from "../../store/store";
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import s from './tasks.module.css';

export const Tasks = () => {

    //const isAdmin:boolean = useSelector( (state:RootState) => state.auth.isAuth)
    const isAdmin = true;


    return <>
        <Container className={s.wrapper}>
            THIS IS TASKS
        </Container>
    </>
}