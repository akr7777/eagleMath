import s1 from "../content.module.css";
import Button from "@mui/material/Button";
import React from "react";
import {useAppDispatch} from "../../../store/store";
import CancelButton2 from "./cancel-button-2";

const NewChapterImage = () => {
    const dispatch = useAppDispatch();

    return <div className={s1.someDiv}>
        <Button variant={'outlined'}>Загрузите картинку</Button>
        <CancelButton2/>
    </div>
}

export default NewChapterImage;