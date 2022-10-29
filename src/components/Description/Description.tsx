import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {Container} from "@material-ui/core";
import {Typography} from "@mui/material";
import s1 from './description.module.css';
import s from "../common/commonCSS.module.css";
import EditDescritionPopper from "./EditDescritionPopper";
import {getDescriptionPhotoThunk, getDescriptionThunk} from '../../store/features/authorThunks';
import Preloader from "../common/Preloader";
import {baseDescriptionPhotoUrl} from "../../env";


export const Description = () => {
    const dispatch = useAppDispatch();
    useEffect( () => {
        dispatch(getDescriptionThunk());
        dispatch(getDescriptionPhotoThunk());
    }, [])
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const isLoading = useSelector((state: RootState) => state.author.isLoading);

    const title = useSelector((state: RootState) => state.author.title);
    const photo = baseDescriptionPhotoUrl;//useSelector((state: RootState) => state.author.photo);
    const description = useSelector((state: RootState) => state.author.description);

    //=============================
    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <div className={s.someDiv1}> {/*s.title*/}
                        <Typography variant={'h4'}>{title}</Typography>

                        {isAdmin && <EditDescritionPopper/>}

                    </div>
                    <div className={s.someDiv1}> {/*s.photo_div*/}
                        <img
                            className={s1.big_eagle_photo}
                            src={photo}
                            alt={'its me'}
                        />
                    </div>
                    <div className={s.someDiv1}>
                        <div>
                            <Typography className={s1.description} variant={'h5'}>
                                {description}
                            </Typography>
                        </div>
                    </div>

                </Container>
        }

    </>
}