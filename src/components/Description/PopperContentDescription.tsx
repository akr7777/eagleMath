import React from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {setDescriptionAC, setPhotoURLAC, setTitleAC} from "../features/authorSlice";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import s from './description.module.css';


type PopperContentPropsType = {
    handleClickClose: (event: React.MouseEvent<HTMLElement>) => void,
}
const PopperContentDescription = (props: PopperContentPropsType) => {

    const [title, setTitle] = useState<string>(useSelector((state: RootState) => state.author.title));
    const [photoURL, setPhotoURL] = useState<string>(useSelector((state: RootState) => state.author.photoURL));
    const [description, setDescription] = useState<string>(useSelector((state: RootState) => state.author.description));


    const dispatch = useDispatch()

    const saveButtonClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(setTitleAC(title));
        dispatch(setPhotoURLAC(photoURL));
        dispatch(setDescriptionAC(description));
        props.handleClickClose(event);
    }

    return <div className={s.edit_description_div}>
        <h2> Here you can edit your contacts: </h2>
        <div><TextField id="outlined-title" label="Заголовок" variant="outlined" value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}/></div>
        <div><TextField id="outlined-photoURL" label="URL фотографии" variant="outlined" value={photoURL}
                        onChange={(e) => setPhotoURL(e.currentTarget.value)}/></div>
        {/*<div><TextField id="outlined-description" className={s.editDescriptionText} label="Описание" variant="outlined" value={description} onChange={ (e) => setDescription(e.currentTarget.value)}/></div>*/}

        <div>Описание:</div>
        <div>
            <TextareaAutosize
                aria-label="Описание"
                placeholder="Введите ваше описание"
                style={{width: 400}}
                maxRows={10}
                value={description}
                onChange={ (e) => setDescription(e.currentTarget.value)}
            />
        </div>
        <div>
            <Button onClick={e => saveButtonClickHandler(e)}>Save</Button>
            <Button onClick={(e) => props.handleClickClose(e)}>Cancel</Button>
        </div>
    </div>
}

export default PopperContentDescription;