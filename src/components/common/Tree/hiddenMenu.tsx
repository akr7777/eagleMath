import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {
    addCategoryThunk,
    addToFavoritesThunk,
    deleteCategoryThunk,
    deleteFromFavoritesThunk, getAllCategoriesThunk,
    IdFiledType
} from "../../features/categoriesSlice";
import {contentTypeType} from "../line";
import {NavLink} from "react-router-dom";
import s from "./tree5.module.css";
import ReadThisMaterial from "@mui/icons-material/AutoStories";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DraggableDialog, {PaperComponent1} from "../change-parent";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddIcon from "@mui/icons-material/Add";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {ChangeEvent, useState} from "react";
import {addMaterialThunk, renameMaterialThunk} from "../../features/materialsSlice";
import {addTaskThunk} from "../../features/tasksSlice";

type MouseLineClickType = {
    contentId: IdFiledType,
    label: string,
    isMaterial: boolean,
    contentType: contentTypeType,
}
const HiddenMenu = (props: MouseLineClickType) => {

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

    const deleteCategory = () => {
        dispatch(deleteCategoryThunk(props.contentId));
        dispatch(getAllCategoriesThunk());
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
    /* const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
         setAnchorEl(event.currentTarget);
     };

     const handleClose = () => {
         setAnchorEl(null);
     };

     const open = Boolean(anchorEl);
     const id = open ? 'simple-popover' : undefined;*/

    return (
        <div>
            {/*<Button aria-describedby={id} variant="contained" onClick={handleClick}>
                    Open Popover
                </Button>*/}
            {/*<Popover
                //id={props.id}
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >*/}
                <div className={s.menu_wrap_div2}>
                    {/*Read this material ICON*/}
                    {
                        props.isMaterial && <div className={s.menu_div}>
                            <NavLink to={'/Content/' + props.contentId} className={s.navLink}>
                                <ReadThisMaterial/>
                            </NavLink>
                            <NavLink to={'/Content/' + props.contentId} className={s.navLink}>
                                <Typography>Изучить материал</Typography>
                            </NavLink>
                        </div>
                    }

                    {/*Add to favorite this material*/}
                    {
                        isAuth && props.isMaterial
                            ? favoritesIds.some(el => String(el) === String(props.contentId))
                                ? <div className={s.menu_div}>
                                    <StarIcon
                                        cursor={'pointer'}
                                        onClick={() => dispatch(deleteFromFavoritesThunk({
                                            userId: userId,
                                            contentId: props.contentId
                                        }))}
                                    />
                                    <div className={s.cursor_div}
                                         onClick={() => dispatch(deleteFromFavoritesThunk({
                                             userId: userId,
                                             contentId: props.contentId
                                         }))}>
                                        <Typography>Удалить из избранного</Typography>
                                    </div>
                                </div>
                                : <div className={s.menu_div}>
                                    <StarOutlineIcon
                                        cursor={'pointer'}
                                        onClick={() => dispatch(addToFavoritesThunk({
                                            userId: userId,
                                            contentId: props.contentId
                                        }))}
                                    />
                                    <div className={s.cursor_div}
                                         onClick={() => dispatch(addToFavoritesThunk({
                                             userId: userId,
                                             contentId: props.contentId
                                         }))}
                                    >
                                        <Typography>Добавить в избранное</Typography>
                                    </div>
                                </div>
                            : ""
                    }

                    {/*Edit this material. For admin only*/}
                    {
                        isAdmin && <div className={s.menu_div}>
                            <div className={s.cursor_div}>
                                <ModeEditIcon onClick={() => setIsEditContentName(true)} cursor={'pointer'}/>
                            </div>
                            <div className={s.cursor_div}>
                                <Typography onClick={() => setIsEditContentName(true)}>Редактировать</Typography>
                            </div>
                        </div>
                    }

                    {/*Move to other folder (category)*/}
                    {
                        isAdmin && <div className={s.menu_div}>
                            <DraggableDialog contentId={props.contentId}/>
                            <Typography>Переместить</Typography>
                        </div>
                    }

                    {/*delete category*/}
                    {
                        isAdmin && !props.isMaterial &&
                        <div className={s.menu_div}>
                            <DeleteSweepIcon cursor={'pointer'} onClick={deleteCategory}/>
                            <Typography onClick={deleteCategory}>Удалить категорию</Typography>
                        </div>
                    }

                    {/*add Material Or Task*/}
                    {
                        isAdmin && !props.isMaterial &&
                        <div className={s.menu_div}>
                            <AddIcon cursor={'pointer'} onClick={addMaterialOrTask}/>
                            <Typography onClick={addMaterialOrTask}>Добавить контент</Typography>
                        </div>
                    }

                    {/*Add new category*/}
                    {
                        isAdmin && !props.isMaterial &&
                        <div className={s.menu_div}>
                            <LibraryAddIcon cursor={'pointer'} onClick={addCategoryClickHandler}/>
                            <Typography onClick={addCategoryClickHandler}>Добавить новую категорию</Typography>
                        </div>
                    }

                </div>

            {/*</Popover>*/}
        </div>
    );
}

export default HiddenMenu;