import s1 from "../content.module.css";
import TextField from "@mui/material/TextField";
import {
    changeNewChapterContent,
    ContentType,
} from "../../../store/features/contentSlice";
import React, {ChangeEvent} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import ButtonCancel2 from "./button-cancel-2";
import {PATHS} from "../../AppBar/AppBar";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import OkButton2 from "./button-ok-2";

const NewChapterText = () => {
    const dispatch = useAppDispatch();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);
    //const content:ContentType[] = useSelector((state: RootState) => state.content.content);
    const contentId = newChapter.contentId;
    //const navigate = useNavigate();
    //const index = useSelector((state: RootState) => state.content.newChapterIndex);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    function changeNewContent (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        dispatch(changeNewChapterContent(e.currentTarget.value));
    }

    return <div className={s1.someDiv}>
        {!isAdmin && <Navigate to={PATHS.content + "/" + contentId}/>}
        <TextField label={'Текст'}
                   variant={'outlined'}
                   multiline={true}
                   minRows={10}
                   className={s1.text_field}
                   value={newChapter.content}
                   onChange={(e) => changeNewContent(e)}
        />
        <div className={s1.Ok_Cancel_Buttons}>
            <OkButton2/>
            <ButtonCancel2/>
        </div>

    </div>
}

export default NewChapterText;