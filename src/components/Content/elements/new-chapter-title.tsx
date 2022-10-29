import s1 from "../content.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
    changeContent,
    changeNewChapterContent,
    ContentType, newChapterChange, setContentThunk,
} from "../../../store/features/contentSlice";
import React, {ChangeEvent} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import ButtonCancel2 from "./button-cancel-2";
import {initNewChapter} from "../Content";
import {Navigate, useNavigate} from "react-router-dom";
import {PATHS} from "../../AppBar/AppBar";
import reassignContentIndexes from "./reassign-content-indexes";
import OkButton2 from "./button-ok-2";

const NewChapterTitle = () => {
    const dispatch = useAppDispatch();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);
    const content:ContentType[] = useSelector((state: RootState) => state.content.content);
    const navigate = useNavigate();
    const contentId = newChapter.contentId;
    const index = useSelector((state: RootState) => state.content.newChapterIndex)
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    function changeNewContent (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        dispatch(changeNewChapterContent(e.currentTarget.value));
    }

    /*function addToContent() {
        dispatch(setContentThunk({content: reassignContentIndexes(content, newChapter, index), contentId: contentId}));
        dispatch(newChapterChange(initNewChapter));
        navigate(PATHS.content + "/" + contentId);
    }*/

    return <div className={s1.someDiv}>
        {!isAdmin && <Navigate to={PATHS.content + "/" + contentId}/>}

        <TextField label={'Заголовок'}
                   variant={'outlined'}
                   className={s1.title_field}
                   value={newChapter.content}
                   onChange={(e) => changeNewContent(e)}
        />

        <div className={s1.Ok_Cancel_Buttons}>
            {/*<Button variant={'outlined'}
                    onClick={() => addToContent()}
                    color="success"
            >
                ОК
            </Button>*/}
            <OkButton2/>

            <ButtonCancel2/>
        </div>

    </div>
}

export default NewChapterTitle;