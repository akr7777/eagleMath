import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Container} from "@material-ui/core";
import {Typography} from "@mui/material";
import s from './description.module.css';
import EditContactsPopper from "../Contacts/EditContactsPopper";
import EditDescritionPopper from "./EditDescritionPopper";


export const Description = () => {
    const dispatch = useDispatch();

    const isAdmin = true;

    //let initPhoto = useSelector( (state:RootState) => state.author.photoURL);
    //const [imgSrcValue, setImgSrcValue] = useState<string>(initPhoto);

    /*const setNewPhotoOnClickHandler = () => {
        dispatch(setPhotoURL(imgSrcValue))
    }
    const setNewPhotoInputValue = (e:ChangeEvent<HTMLInputElement>) => {
        setImgSrcValue(e.currentTarget.value)
    }*/

    //=============================
    return <>
        <Container className={s.wrapped_container}>
            <div className={s.title}>
                <Typography variant={'h4'}>{ useSelector( (state:RootState) => state.author.title)}</Typography>
                { isAdmin && <EditDescritionPopper/> }
            </div>
            <div className={s.photo_div}>
                <img
                    className={s.big_eagle_photo}
                    src={useSelector((state:RootState)=>state.author.photoURL)}
                />
            </div>
            <div>
                <Typography className={s.description} variant={'h5'} >
                    {useSelector((state:RootState)=> state.author.description)}
                </Typography>
            </div>

        </Container>
    </>
}