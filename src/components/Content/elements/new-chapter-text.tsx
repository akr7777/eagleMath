import s1 from "../content.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
    changeContent,
    changeNewChapterContent,
    ContentType,
    newChapterChange,
    setContentThunk
} from "../../features/contentSlice";
import React, {ChangeEvent} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import CancelButton2 from "./cancel-button-2";
import {initNewChapter} from "../Content";
import {PATHS} from "../../AppBar/AppBar";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import reassignContentIndexes from "./reassign-content-indexes";

const NewChapterText = () => {
    const dispatch = useAppDispatch();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);
    const content:ContentType[] = useSelector((state: RootState) => state.content.content);
    const contentId = newChapter.contentId;
    const navigate = useNavigate();
    const index = useSelector((state: RootState) => state.content.newChapterIndex)
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    function changeNewContent (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        dispatch(changeNewChapterContent(e.currentTarget.value));
    }

    function addToContent() {
        //dispatch(changeContent([...reassignContentIndexes(content, newChapter.index), newChapter]));
        //dispatch(changeContent(reassignContentIndexes(content, newChapter, index)));
        dispatch(setContentThunk({content: reassignContentIndexes(content, newChapter, index), contentId: contentId}));
        dispatch(newChapterChange(initNewChapter));
        navigate(PATHS.content + "/" + contentId);
    }

    return <div className={s1.someDiv}>
        {!isAdmin && <Navigate to={PATHS.content + "/" + contentId}/>}
        {/*<Typography>Введите заголовок:</Typography>*/}
        <TextField label={'Текст'}
                   variant={'outlined'}
                   multiline={true}
                   minRows={10}
                   className={s1.text_field}
                   value={newChapter.content}
                   onChange={(e) => changeNewContent(e)}
        />
        <div>
            <Button variant={'outlined'}
                    onClick={() => addToContent()}
            >
                ОК
            </Button>

            <CancelButton2/>
        </div>

    </div>
}

export default NewChapterText;