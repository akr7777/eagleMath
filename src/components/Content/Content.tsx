import React, {ChangeEvent, useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import {RootState, useAppDispatch} from "../../store/store";
import {ContentType, newChapterChange} from "../../store/features/contentSlice";
import {
    getContentThunk,
    setContentThunk,
    getStudiedMaterialsThunk,
    getContentTitleByIdThunk
} from "../../store/features/contentThunks";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader";
import s from "../common/commonCSS.module.css";
import s1 from "../Content/content.module.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useNavigate} from "react-router-dom";
import {changeNewChapterIndex} from "../../store/features/contentSlice";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ContentHead from "./elements/content-head";
import TestContent from "./elements/test/test-content";
import {PATHS} from "../AppBar/AppBar";
import ContentParagraph from "./elements/content-paragraph";
import ObjectiveContent from "./elements/objective/objective-content";
import {ObjectiveType, TestType} from "../../store/features/tasksSlice";
import {getObjectiveByContentIdThunk, getTestThunk} from "../../store/features/tasksThunks";
import AddRemoveContentStudied from "./elements/add-remove-content-studied";
import {IdFiledType} from "../../store/features/categoriesSlice";
import { Typography } from '@mui/material';
import Switch from "@mui/material/Switch";

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
    const isAuth: boolean = useSelector((state: RootState) => state.auth.isAuth);
    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => state.auth.user.id);

    useEffect(() => {
        dispatch(getContentThunk(contentId || ""));
        dispatch(getTestThunk(contentId || ""));
        dispatch(getObjectiveByContentIdThunk(contentId || ""));
        dispatch(getStudiedMaterialsThunk(userId));
        dispatch(getContentTitleByIdThunk(contentId || ""));
    }, []);

    const test: TestType = useSelector((state: RootState) => state.tasks.test);
    const objectives: Array<ObjectiveType> = useSelector((state: RootState) => state.tasks.objectives);
    const contentTitle:string = useSelector((state:RootState) => state.content.contentTitle);

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


    const [isLoadingNahd, setIsLoadingHand] = useState(false);
    const handleChangeIsLoading = (event: ChangeEvent<HTMLInputElement>) => {
        setIsLoadingHand(event.target.checked);
    }

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>

                    <Typography variant={'h4'}>{contentTitle}</Typography>

                    { isAuth && <ContentHead/> }
                    {
                        content.map((el, indexArr) => {
                            return <div key={indexArr} className={s1.someDiv}>
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
                            </div>
                        })
                    }

                    {content.length === 0 && <div className={s1.someDiv}>
                        {isAdmin && <AddCircleOutlineIcon onClick={() => addChapterInside(1)}/>}
                    </div>
                    }

                    { test.testId && test.title && test.content && <TestContent/> }

                    { objectives.length > 0 && <ObjectiveContent/> }

                    {
                        isAuth && <AddRemoveContentStudied
                            userId={userId}
                            contentId={contentId || ""}
                        />
                    }

                    <Switch
                        checked={isLoadingNahd}
                        onChange={handleChangeIsLoading}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />

                </Container>
        }
    </>
}


export default Content;