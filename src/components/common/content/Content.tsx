import React, {useEffect} from 'react';
import Container from "@mui/material/Container";
import {RootState, useAppDispatch} from "../../../store/store";
import {getContentThunk} from "../../features/contentSlice";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Preloader from "../Preloader";
import s from "../commonCSS.module.css";
import {Typography} from "@mui/material";

const Content = () => {
    const dispatch = useAppDispatch();
    let { contentId } = useParams();


    useEffect( () => {
        dispatch(getContentThunk(contentId || ""));
    }, []);
    const isLoading = useSelector((state: RootState) => state.content.isLoading);
    const title = useSelector((state: RootState) => state.content.title);
    const content = useSelector((state: RootState) => state.content.content);

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <div className={s.someDiv1}> {/*s.head_title*/}
                        <Typography variant="h4">{title}</Typography>
                    </div>
                    <div className={s.someDiv1}> {/*s.head_description*/}
                        <Typography variant={'h5'}>
                            {content}
                        </Typography>
                    </div>
                </Container>
        }
    </>
}
export default Content;