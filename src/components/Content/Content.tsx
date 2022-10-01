import React, {useEffect} from 'react';
import Container from "@mui/material/Container";
import {RootState, useAppDispatch} from "../../store/store";
import {changeContent, ContentType, getContentThunk, newChapterChange, setContentThunk} from "../features/contentSlice";
import {Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader";
import s from "../common/commonCSS.module.css";
import s1 from "../Content/content.module.css";
import {Typography} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import NewChapterTypeOptions from "./elements/new-chapter-type";
import NewChapterTitle from "./elements/new-chapter-title";
import NewChapterText from "./elements/new-chapter-text";
import NewChapterImage from "./elements/new-chapter-image";
import {useNavigate} from "react-router-dom";
import {changeNewChapterIndex} from "../features/contentSlice";

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
    const newchapterIndex = useSelector((state: RootState) => state.content.newChapterIndex);

    useEffect(() => {
        if (content.length === 0)
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
        return navigate("/change_content/" + contentId);
    }

    function saveContent() {
        if (contentId)
            dispatch(setContentThunk({content: content, contentId: contentId}));
    }

    //console.log('CONTENT=', ...content)

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <Typography variant={'h4'}>Содержание:</Typography>
                    {
                        content.map((el, indexArr) => {
                            return <div key={indexArr} className={s1.someDiv}>

                                {/*<label>indexArr: {indexArr}</label>*/}

                                {/*Если уже есть контент*/}
                                {el.type === "Title" && <Typography variant={'h4'}>{el.content}</Typography>}
                                {el.type === "Text" && <Typography>{el.content}</Typography>}
                                {el.type === "Image" && <img src={el.content} className={s1.imageClass}/>}

                                {/*Задаем тип новой главы
                                {el.type === "New" && newChapter.type === "New" && <NewChapterTypeOptions/>}
                                Задаем содержание новой главы
                                {newChapter.type === "Title" && <NewChapterTitle/>}
                                {newChapter.type === "Text" && <NewChapterText/>}
                                {newChapter.type === "Image" && <NewChapterImage/>}*/}

                                {isAdmin &&
                                    <div>
                                        <AddCircleOutlineIcon onClick={() => addChapterInside(indexArr)}/>
                                    </div>
                                }

                            </div>
                        })
                    }

                    {content.length === 0 && <div className={s1.someDiv}>
                        {isAdmin && <AddCircleOutlineIcon onClick={() => addChapterInside(1)}/>}
                    </div>
                    }

                    <div className={s1.someDiv}
                    >
                        {isAdmin && <Button
                                        variant="contained"
                                        disabled={newchapterIndex === -1}
                                        onClick={() => saveContent()}
                        >
                                Сохранить
                            </Button>
                        }
                    </div>
                </Container>
        }
    </>
}


export default Content;