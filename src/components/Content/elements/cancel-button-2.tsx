import {ContentType, newChapterChange} from "../../features/contentSlice";
import {initNewChapter} from "../Content";
import Button from "@mui/material/Button";
import React from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {PATHS} from "../../AppBar/AppBar";

const CancelButton2 = () => {
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
    >Отмена</Button>
}

export default CancelButton2;