import React from 'react';
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import s from './description.module.css';
import {
    getDescriptionPhotoThunk,
    getDescriptionThunk, setDescriptionPhotoThunk,
    setDescriptionThunk,
} from "../features/authorSlice";


type PopperContentPropsType = {
    handleClickClose: (event: React.MouseEvent<HTMLElement>) => void,
}
const PopperContentDescription = (props: PopperContentPropsType) => {

    const [title, setTitle] = useState<string>(useSelector((state: RootState) => state.author.title));
    //const [photo, setPhoto] = useState<string>(useSelector((state: RootState) => state.author.photo));
    //const [photo, setPhoto] = useState<string>('');
    const [description, setDescription] = useState<string>(useSelector((state: RootState) => state.author.description));

    //const isLoading = useSelector( (state: RootState) => state.author.isLoading)
    const dispatch = useAppDispatch()

    const saveButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(setDescriptionThunk({title: title, /*photo: photo, */description: description}));
        //dispatch(getDescriptionThunk());
        props.handleClickClose(event);
    }

    const descrPhotoUploadInputChange = (f: any) => {
        if (f.target.files.length) {
            dispatch(setDescriptionPhotoThunk({file: f.target.files[0]}))
            dispatch(getDescriptionPhotoThunk());
        }
    }

    return <div className={s.edit_description_div}>
        <h2> Here you can edit your contacts: </h2>
        <div><TextField id="outlined-title" label="Заголовок" variant="outlined" value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}/></div>
        <div className={s.changeDescrPhotoDiv}>
            {/*<div>
                <TextField id="outlined-photoURL" label="URL фотографии" variant="outlined" value={photo}
                        onChange={(e) => setPhoto(e.currentTarget.value)}
            />
            </div>
            <div>ИЛИ</div>*/}
            <div>
                <input
                    accept="image/*"
                    style={{display: 'none'}}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(f) => descrPhotoUploadInputChange(f)}
                />
                <label htmlFor="raised-button-file">
                    <Button component="span">
                        Заменить фотографию на главной странице
                    </Button>
                </label>
            </div>
        </div>
        {/*<div><TextField id="outlined-description" className={s.editDescriptionText} label="Описание" variant="outlined" value={description} onChange={ (e) => setDescription(e.currentTarget.value)}/></div>*/}

        <div>Описание:</div>
        <div>
            <TextareaAutosize
                aria-label="Описание"
                placeholder="Введите ваше описание"
                style={{width: 400}}
                maxRows={10}
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
            />
        </div>
        <div>
            <Button onClick={e => saveButtonClickHandler(e)}>Save</Button>
            <Button onClick={(e) => props.handleClickClose(e)}>Cancel</Button>
        </div>
    </div>
}

export default PopperContentDescription;