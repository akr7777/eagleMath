//В данном файле находится рендеринг отрисовки линии (выбора) для материалов, задач, избранного

import s from "./Tree/tree5.module.css";
import s1 from "./line.module.css";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import ReadThisMaterial from "@mui/icons-material/AutoStories";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddIcon from '@mui/icons-material/Add';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import React, {ChangeEvent, useEffect} from "react";
import {
    addCategoryThunk,
    addToFavoritesThunk, deleteCategoryThunk,
    deleteFromFavoritesThunk, getAllCategoriesThunk,
    IdFiledType, setEditNameIdAC, setNewContentName
} from "../features/categoriesSlice";
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
    isMaterialStudied: boolean,
}

const Line = (props: LinePropsType) => {
    const dispatch = useAppDispatch();

    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const userId = useSelector((state: RootState) => state.auth.user.id);
    const favoritesIds = useSelector((state: RootState) => state.categories.favoriteIds);

    const contentName = useSelector((state: RootState) => state.categories.newContentName);
    const editNameId = useSelector((state: RootState) => state.categories.editNameId);

    const onContentNameChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        dispatch(setNewContentName(e.currentTarget.value));//setContentName(e.currentTarget.value);
    const editContentTumbler = () => {
        dispatch(setEditNameIdAC(props.contentId));
        dispatch(setNewContentName(props.label));
    }
    const cancelEditing = () => {
        //setContentName(props.label);
        //setIsEditContentName(false);
        dispatch(setNewContentName(props.label));
        dispatch(setEditNameIdAC("-1"));
    }
    const changeContentName = () => {
        dispatch(renameMaterialThunk({contentId: props.contentId, newName: contentName}));
        //setIsEditContentName(false);
        //dispatch(setEditNameIdAC(props.contentId));
        dispatch(setEditNameIdAC("-1"));
    }

    const deleteCategory = () => {
        const answer = window.confirm("Удалить категорию " + props.label + "?");
        if (answer) {
            dispatch(deleteCategoryThunk(props.contentId));
            dispatch(getAllCategoriesThunk());
        }
    }

    const addCategoryClickHandler = () => {
        dispatch(addCategoryThunk(props.contentId));
        dispatch(getAllCategoriesThunk());
    }

    const addMaterialOrTask = () => {
        if (props.contentType === "M")
            dispatch(addMaterialThunk(props.contentId));
        if (props.contentType === "T")
            dispatch(addTaskThunk(props.contentId));
    }

    //console.log('isMaterialStudied=',isMaterialStudied, 'label=', props.label, 'contentType=', props.contentType)

    return <>
        {/*Label*/}
        {
            /*isEditContentName*/
            editNameId === props.contentId
                ? <div className={s1.editable_div}>
                    <label>Новое название: </label>
                    <div className={s1.some_div_1}>
                        <TextField
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
        {/* { isAdmin && <ModeEditIcon onClick={ () => setIsEditContentName(true) } cursor={'pointer'}/> } */}
        {isAdmin && <ModeEditIcon onClick={editContentTumbler} cursor={'pointer'}/>}

        {/*Move to other folder (category)*/}
        {isAdmin && <DraggableDialog contentId={props.contentId}/>}

        {/*delete category*/}
        {isAdmin && !props.isMaterial && <DeleteSweepIcon cursor={'pointer'} onClick={deleteCategory}/>}

        {/*add Material Or Task*/}
        {isAdmin && !props.isMaterial && <AddIcon cursor={'pointer'} onClick={addMaterialOrTask}/>}

        {/*Add new category*/}
        {isAdmin && !props.isMaterial && <LibraryAddIcon cursor={'pointer'} onClick={addCategoryClickHandler}/>}

        {/*Is material learned*/}
        {/*{props.contentType} {isMaterialStudied && <Typography>Studied</Typography>}*/}
        {
            /*(props.contentType === "M" || props.contentType === "T")*/ props.isMaterial &&
            (
                props.isMaterialStudied
                    ? <CheckCircleIcon color={"success"}/>
                    : <CheckCircleIcon color={"warning"}/>
            )
        }


    </>
}

export default Line;