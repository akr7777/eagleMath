import React from 'react';
import s from './footer.module.css';
import AppBar from './../AppBar/AppBar'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Typography from "@mui/material/Typography";

export const Footer = () => {
    /*<div className={s.footerCSS}>*/
    const useremail = useSelector((state: RootState) => state.auth.user.email);
    return <div className={s.footerCSS}>
        userEmail:
        <Typography variant={'h5'}>{ useremail }</Typography>
       {/* <AppBar/>*/}
    </div>
}