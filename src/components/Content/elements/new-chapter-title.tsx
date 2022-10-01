import s1 from "../content.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
    changeContent,
    changeNewChapterContent,
    ContentType, newChapterChange,
} from "../../features/contentSlice";
import React, {ChangeEvent} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import CancelButton2 from "./cancel-button-2";
import {initNewChapter} from "../Content";
import { useNavigate } from "react-router-dom";
import {PATHS} from "../../AppBar/AppBar";
import reassignContentIndexes from "./reassign-content-indexes";

const NewChapterTitle = () => {
    const dispatch = useAppDispatch();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);
    const content:ContentType[] = useSelector((state: RootState) => state.content.content);
    const navigate = useNavigate();
    const contentId = newChapter.contentId;
    const index = useSelector((state: RootState) => state.content.newChapterIndex)

    function changeNewContent (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        dispatch(changeNewChapterContent(e.currentTarget.value));
    }

    function addToContent() {
        dispatch(changeContent(reassignContentIndexes(content, newChapter, index)));
        dispatch(newChapterChange(initNewChapter));
        navigate(PATHS.content + "/" + contentId);
    }

    return <div className={s1.someDiv}>
        <TextField label={'Заголовок'}
                   variant={'outlined'}
                   className={s1.title_field}
                   value={newChapter.content}
                   onChange={(e) => changeNewContent(e)}
        />

        <div>
            <Button variant={'outlined'}
                    onClick={() => addToContent()}>
                ОК
            </Button>

            <CancelButton2/>
        </div>

    </div>
}

export default NewChapterTitle;