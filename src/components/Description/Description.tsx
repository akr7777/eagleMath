import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {Container} from "@material-ui/core";
import {Typography} from "@mui/material";
import s1 from './description.module.css';
import s from "../common/commonCSS.module.css";
import EditDescritionPopper from "./EditDescritionPopper";


export const Description = () => {
    const dispatch = useAppDispatch();
    const isAdmin = useSelector( (state: RootState) => state.auth.isAdmin);

    //=============================
    return <>
        <Container className={s.wrapped_div}>
            <div className={s.someDiv1}> {/*s.title*/}
                <Typography variant={'h4'}>{ useSelector( (state:RootState) => state.author.title)}</Typography>
                { isAdmin && <EditDescritionPopper/> }
            </div>
            <div className={s.someDiv1}> {/*s.photo_div*/}
                <img
                    className={s1.big_eagle_photo}
                    src={useSelector((state:RootState)=>state.author.photoURL)}
                />
            </div>
            <div className={s.someDiv1}>
                <div>
                    <Typography className={s1.description} variant={'h5'} >
                        {useSelector((state:RootState)=> state.author.description)}
                    </Typography>
                </div>
            </div>

        </Container>
    </>
}