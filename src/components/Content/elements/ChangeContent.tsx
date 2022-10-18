import React from 'react';
import {RootState, useAppDispatch} from "../../../store/store";
import {Navigate, useParams} from "react-router-dom";
import NewChapterTypeOptions from "./new-chapter-type";
import NewChapterTitle from "./new-chapter-title";
import NewChapterText from "./new-chapter-text";
import NewChapterImage from "./new-chapter-image";
import {ContentType} from "../../features/contentSlice";
import {useSelector} from "react-redux";
import Container from "@mui/material/Container";
import s from "../../common/commonCSS.module.css";
import {PATHS} from "../../AppBar/AppBar";

const ChangeContent = () => {
   /* const dispatch = useAppDispatch();*/
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);
    const {contentId} = useParams();
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    return <div>
        {!isAdmin && <Navigate to={PATHS.content + "/" + contentId}/>}
        <Container className={s.wrapped_div}>

            {/*<div>{contentId}</div>
            <div>{newChapter.contentId}</div>
            <div>{newChapter.type}</div>
            <div>{newChapter.content}</div>*/}

            {/*Задаем тип новой главы*/}
            {newChapter.type === null && <NewChapterTypeOptions/>}
            {/*Задаем содержание новой главы*/}
            {newChapter.type === "Title" && <NewChapterTitle/>}
            {newChapter.type === "Text" && <NewChapterText/>}
            {newChapter.type === "Image" && <NewChapterImage/>}
        </Container>
    </div>
}

export default ChangeContent;