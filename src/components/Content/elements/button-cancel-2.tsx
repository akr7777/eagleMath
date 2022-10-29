import {ContentType, newChapterChange} from "../../../store/features/contentSlice";
import {initNewChapter} from "../Content";
import Button from "@mui/material/Button";
import React from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {PATHS} from "../../AppBar/AppBar";
import s from "../content.module.css";

const ButtonCancel2 = () => {
    const dispatch = useAppDispatch();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);
    const contentId = newChapter.contentId;
    const navigate = useNavigate();

    function CancelClickHandler() {
        dispatch(newChapterChange(initNewChapter));
        navigate(PATHS.content + "/" + contentId);
    }

    return <Button variant={'outlined'}
                   onClick={() => CancelClickHandler()}
                   color={"error"}
                   className={s.ok_cancel_button_style}
    >
        Отмена
    </Button>
}

export default ButtonCancel2;