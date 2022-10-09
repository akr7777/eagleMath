//В данном файле находится рендеринг отрисовки линии (выбора) для материалов, задач, избранного

import s from "./Tree/tree5.module.css";
import s1 from "./line.module.css";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import {NavLink, useParams} from "react-router-dom";
import ReadThisMaterial from "@mui/icons-material/AutoStories";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddIcon from '@mui/icons-material/Add';
import React, {ChangeEvent, useEffect, useState} from "react";
import {addToFavoritesThunk, deleteFromFavoritesThunk, IdFiledType} from "../features/categoriesSlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {addMaterialThunk, renameMaterialThunk} from "../features/materialsSlice";
import DraggableDialog from "./change-parent";
import {addTaskThunk} from "../features/tasksSlice";

export type contentTypeType = "M" | "T" | "C" | undefined;

type LinePropsType = {
    contentId: IdFiledType,
    label: string,
    isMaterial: boolean,
    contentType: contentTypeType,
}

const Line = (props: LinePropsType) => {
    const dispatch = useAppDispatch();

    /*useEffect(()=>{
        dispatch(contentTypeThunk(props.contentId));
    }, []);
    const contentType:ContentTypeVariantsTypes = useSelector((state: RootState) => state.content.contentType);*/

    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const userId = useSelector((state: RootState) => state.auth.user.id);
    const favoritesIds = useSelector((state: RootState) => state.categories.favoriteIds);

    const [contentName, setContentName] = useState<string>(props.label);
    const [isEditContentName, setIsEditContentName] = useState<boolean>(false)

    const onContentNameChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setContentName(e.currentTarget.value);
    }

    const cancelEditing = () => {
        setContentName(props.label);
        setIsEditContentName(false);
    }

    const changeContentName = () => {
        dispatch(renameMaterialThunk({contentId: props.contentId, newName: contentName}));
        setIsEditContentName(false);
    }

    const deleteCategory = () => {}

    const addCategoryClickHandler = () => {
        //dispatch(addCategoryThunk(props.contentId));
    }

    const addMaterialOrTask = () => {
        if (props.contentType === "M")
            dispatch(addMaterialThunk(props.contentId));
        if (props.contentType === "T")
            dispatch(addTaskThunk(props.contentId));
    }

    return <>
        {/*Label*/}
        {
            isEditContentName
                ? <div className={s1.editable_div}>
                    <label>Новое название: </label>
                    <div className={s1.some_div_1}>
                        <TextField
                            //label="Новое название:"
                            variant="outlined"
                            value={contentName}
                            onChange={(e) => onContentNameChange(e)}
                        />
                        <div className={s1.some_div_2}>
                            <CheckCircleIcon onClick={() => changeContentName()} cursor={'pointer'}/>
                            <CancelIcon onClick={() => cancelEditing()} cursor={'pointer'}/>
                        </div>
                    </div>

                </div>
                : <Typography>{props.label}</Typography>
        }

        {/*Read this material ICON*/}
        {
            props.isMaterial &&
            <NavLink to={'/Content/' + props.contentId} className={s.navLink}>
                <ReadThisMaterial/>
            </NavLink>
        }

        {/*Add to favorite this material*/}
        {
            isAuth && props.isMaterial
                ? favoritesIds.some(el => String(el) === String(props.contentId))
                    ? <StarIcon
                        cursor={'pointer'}
                        onClick={() => dispatch(deleteFromFavoritesThunk({userId: userId, contentId: props.contentId}))}/>
                    : <StarOutlineIcon
                        cursor={'pointer'}
                        onClick={() => dispatch(addToFavoritesThunk({userId: userId, contentId: props.contentId}))}/>
                : ""
        }

        {/*Edit this material. For admin only*/}
        {
            isAdmin && <ModeEditIcon
                onClick={ () => setIsEditContentName(true) }
                cursor={'pointer'}
            />
        }

        {/*Move to other folder*/}
        {/*{
            isAdmin && <DriveFileMoveIcon
                cursor={'pointer'}
            />
        }*/}
        { isAdmin && <DraggableDialog contentId={props.contentId}/> }

        { isAdmin && !props.isMaterial && <Typography>DELETE CATEGORY!!!!!</Typography>}
        {/*{ isAdmin && !props.isMaterial && <Typography>ADD CONTENT!!!!!</Typography>}*/}
        { isAdmin && !props.isMaterial && <AddIcon cursor={'pointer'} onClick={addMaterialOrTask}/>}
        ADD_CATEGORY!!!{ isAdmin && !props.isMaterial && <LibraryAddIcon cursor={'pointer'} onClick={() => {}}/>}


    </>
}

export default Line;