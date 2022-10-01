import s1 from "../content.module.css";
import Button from "@mui/material/Button";
import React from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import CancelButton2 from "./cancel-button-2";
import Typography from "@mui/material/Typography";
import {Navigate, useNavigate} from "react-router-dom";
import {PATHS} from "../../AppBar/AppBar";
import {useSelector} from "react-redux";
import {ContentType, newChapterChange, setContentThunk, uploadContentImage} from "../../features/contentSlice";
import {v4} from 'uuid';
import reassignContentIndexes from "./reassign-content-indexes";
import {initNewChapter} from "../Content";

const NewChapterImage = () => {
    const dispatch = useAppDispatch();
    const newChapter: ContentType = useSelector((state: RootState) => state.content.newChapter);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const content:ContentType[] = useSelector((state: RootState) => state.content.content);
    const index = useSelector((state: RootState) => state.content.newChapterIndex)
    const contentId = newChapter.contentId;
    const navigate = useNavigate();

    const fileUploadInputChange = async (f: any) => {
        if (f.target.files.length) {
            const imageName:string = f.target.files[0].name;
            const ext = imageName.split(".")[imageName.split(".").length - 1];
            const fileName = v4() + "." + ext;
            await dispatch(setContentThunk({content: reassignContentIndexes(content, {...newChapter, content: fileName}, index), contentId: contentId}));
            await dispatch(uploadContentImage({file: f.target.files[0], fileName: fileName} ));
            dispatch(newChapterChange(initNewChapter));
            navigate(PATHS.content + "/" + contentId);
        }
    }

    return <div className={s1.someDiv}>
        {!isAdmin && <Navigate to={PATHS.content + "/" + newChapter.contentId}/>}

        <Typography variant={'h4'}>Загрузите картинку,</Typography>
        <Typography variant={'h4'}>чтобы она отображалась в теле контента:</Typography>

        <input
            accept="image/*"
            style={{display: 'none'}}
            id="raised-button-file"
            multiple
            type="file"
            onChange={(f) => fileUploadInputChange(f)}
        />
        <label htmlFor="raised-button-file">
            <Button component="span" variant={'contained'}>
                Загрузить фото
            </Button>
        </label>

        {/*<Button variant={'contained'}>Загрузите картинку</Button>*/}
        <CancelButton2/>
    </div>
}

export default NewChapterImage;