import {ContentType, newChapterChange} from "../../../store/features/contentSlice";
import {setContentThunk, getContentThunk} from "../../../store/features/contentThunks";
import {initNewChapter} from "../Content";
import Button from "@mui/material/Button";
import React from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {PATHS} from "../../AppBar/AppBar";
import reassignContentIndexes from "./reassign-content-indexes";
import s from "./../content.module.css"

const OkButton2 = () => {
    const dispatch = useAppDispatch();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);
    const contentId = newChapter.contentId;
    const navigate = useNavigate();
    const content:ContentType[] = useSelector((state: RootState) => state.content.content);
    const index = useSelector((state: RootState) => state.content.newChapterIndex);

    async function addToContent() {
        await dispatch(setContentThunk({content: reassignContentIndexes(content, newChapter, index), contentId: contentId}));
        await dispatch(newChapterChange(initNewChapter));
        await dispatch(getContentThunk(contentId));
        navigate(PATHS.content + "/" + contentId);
    }

    return <Button variant={'contained'}
                   onClick={() => addToContent()}
                   color={"success"}
                   className={s.ok_cancel_button_style}
    >
        OK
    </Button>
}

export default OkButton2;