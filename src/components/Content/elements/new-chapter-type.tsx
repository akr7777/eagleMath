import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {changeContent, ContentType, newChapterChange} from "../../features/contentSlice";
import React from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {initNewChapter} from "../Content";
import ButtonCancel2 from "./button-cancel-2";
import s1 from "../content.module.css";
import {Navigate, useParams} from "react-router-dom";
import {PATHS} from "../../AppBar/AppBar";

const NewChapterTypeOptions = () => {
    const dispatch = useAppDispatch();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    return <div>
        {!isAdmin && <Navigate to={PATHS.content + "/" + newChapter.contentId}/>}

        <Typography variant={'h4'}>Выберите тип контента:</Typography>
        <div className={s1.someDiv2}>
            <Button variant={'contained'}
                    onClick={() => dispatch(newChapterChange({...newChapter, type: "Title"}))}>
                Заголовок
            </Button>
            <Button variant={'contained'}
                    onClick={() => dispatch(newChapterChange({...newChapter, type: "Text"}))}>
                Текст
            </Button>
            <Button variant={'contained'}
                    onClick={() => dispatch(newChapterChange({...newChapter, type: "Image"}))}>
                Картинка
            </Button>
        </div>
        <div className={s1.someDiv2}>
            <ButtonCancel2/>
            {/*<Button variant={'outlined'}
                    onClick={() => dispatch(newChapterChange(initNewChapter))}
            >Отмена</Button>*/}
        </div>

    </div>
}

export default NewChapterTypeOptions;