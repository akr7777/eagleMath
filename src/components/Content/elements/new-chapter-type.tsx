import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {changeContent, ContentType, newChapterChange} from "../../features/contentSlice";
import React from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {initNewChapter} from "../Content";
import CancelButton2 from "./cancel-button-2";

const NewChapterTypeOptions = () => {
    const dispatch = useAppDispatch();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);

    return <div>
        <Typography>Выберите тип контента:</Typography>
        <div>
            <Button variant={'outlined'}
                    onClick={() => dispatch(newChapterChange({...newChapter, type: "Title"}))}>
                Заголовок
            </Button>
            <Button variant={'outlined'}
                    onClick={() => dispatch(newChapterChange({...newChapter, type: "Text"}))}>
                Текст
            </Button>
            <Button variant={'outlined'}
                    onClick={() => dispatch(newChapterChange({...newChapter, type: "Image"}))}>
                Картинка
            </Button>
        </div>
        <div>
            <CancelButton2/>
            {/*<Button variant={'outlined'}
                    onClick={() => dispatch(newChapterChange(initNewChapter))}
            >Отмена</Button>*/}
        </div>

    </div>
}

export default NewChapterTypeOptions;