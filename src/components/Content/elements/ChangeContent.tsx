import React from 'react';
import {RootState, useAppDispatch} from "../../../store/store";
import {useParams} from "react-router-dom";
import NewChapterTypeOptions from "./new-chapter-type";
import NewChapterTitle from "./new-chapter-title";
import NewChapterText from "./new-chapter-text";
import NewChapterImage from "./new-chapter-image";
import {ContentType} from "../../features/contentSlice";
import {useSelector} from "react-redux";
import Container from "@mui/material/Container";
import s from "../../common/commonCSS.module.css";

const ChangeContent = () => {
    const dispatch = useAppDispatch();
    let {contentId} = useParams();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);

    return <div>
        <Container className={s.wrapped_div}>

            <div>{contentId}</div>
            <div>{newChapter.contentId}</div>
            <div>{newChapter.type}</div>
            <div>{newChapter.content}</div>

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