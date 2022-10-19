import React, {useEffect} from 'react';
import Container from "@mui/material/Container";
import {RootState, useAppDispatch} from "../../store/store";
import {
    baseContentImageUrl,
    ContentType,
    getContentThunk,
    newChapterChange,
    setContentThunk
} from "../features/contentSlice";
import {Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader";
import s from "../common/commonCSS.module.css";
import s1 from "../Content/content.module.css";
import {Typography} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useNavigate} from "react-router-dom";
import {changeNewChapterIndex} from "../features/contentSlice";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ContentHead from "./elements/content-head";
import TestContent from "./elements/test/test-content";
import {PATHS} from "../AppBar/AppBar";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentImage from "./elements/content-paragraph";
import ContentParagraph from "./elements/content-paragraph";

export const initNewChapter: ContentType = {
    contentId: '',
    type: null,
    content: '',
}


const Content = () => {
    const dispatch = useAppDispatch();
    const {contentId} = useParams();
    const isLoading: boolean = useSelector((state: RootState) => state.content.isLoading);
    const content: Array<ContentType> = useSelector((state: RootState) => state.content.content);
    const isAdmin: boolean = useSelector((state: RootState) => state.auth.user.isAdmin);
    const navigate = useNavigate();
    //const newChapterIndex = useSelector((state: RootState) => state.content.newChapterIndex);

    useEffect(() => {
        //if (content.length === 0)
        dispatch(getContentThunk(contentId || ""));
    }, []);


    const addChapterInside = (index: number) => {
        const newElement = {
            contentId: contentId || "",
            type: null,
            content: '',
        }
        dispatch(changeNewChapterIndex(index + 1));
        dispatch(newChapterChange(newElement));
        return navigate(PATHS.changeContent + "/" + contentId);
    }

    const deleteChapter = (index: number) => {
        if (content.length === 1 && contentId) {
            dispatch(setContentThunk({content: [], contentId: contentId}));
        } else if (content.length > 1 && contentId) {
            const arr: ContentType[] = [
                ...content.slice(0, index),
                ...content.slice(index + 1, content.length)
            ];
            dispatch(setContentThunk({content: arr, contentId: contentId}));
        }
    }

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <ContentHead/>
                    {/*<Typography variant={'h4'}>Содержание:</Typography>*/}
                    {
                        content.map((el, indexArr) => {
                            return <div key={indexArr} className={s1.someDiv}>

                                {/*<label>indexArr: {indexArr}</label>*/}

                                {/*Если уже есть контент*/}
                                <ContentParagraph content={el.content} type={el.type} elementIndex={indexArr}/>

                                {isAdmin &&
                                    <div className={s1.plus_minus}>
                                        <RemoveCircleOutlineIcon
                                            className={s1.myIconMinus}
                                            onClick={() => deleteChapter(indexArr)}
                                        />
                                        <AddCircleOutlineIcon
                                            className={s1.myIconPlus}
                                            onClick={() => addChapterInside(indexArr)}
                                        />
                                    </div>
                                }
                                {/*{isAdmin &&
                                    <div>
                                        <AddCircleOutlineIcon onClick={() => addChapterInside(indexArr)}/>
                                    </div>
                                }*/}

                            </div>
                        })
                    }

                    {content.length === 0 && <div className={s1.someDiv}>
                        {isAdmin && <AddCircleOutlineIcon onClick={() => addChapterInside(1)}/>}
                    </div>
                    }

                    <TestContent/>

                </Container>
        }
    </>
}


export default Content;