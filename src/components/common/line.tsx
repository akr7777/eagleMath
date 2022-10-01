//В данном файле находится рендеринг отрисовки линии (выбора) для материалов, задач, избранного

import s from "./Tree/tree5.module.css";
/*import PlusIcon from "@mui/icons-material/ControlPoint";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import MinusIcon from "@mui/icons-material/RemoveCircleOutline";*/
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import ReadThisMaterial from "@mui/icons-material/AutoStories";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import React from "react";
import {addToFavoritesThunk, deleteFromFavoritesThunk, IdFiledType} from "../features/categoriesSlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";

type LinePropsType = {
    contentId: IdFiledType,
    label: string,

    isMaterial: boolean,
    //favoritesIds: Array<IdFiledType>,
    //addToFavorite: (contentId: IdFiledType) => void,
    //deleteFromFavorite: (contentId: IdFiledType) => void,
}

const Line = (props: LinePropsType) => {
    const dispatch = useAppDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const userId = useSelector((state: RootState) => state.auth.user.id);
    const favoritesIds = useSelector((state: RootState) => state.categories.favoriteIds);

    return <>
        {/*Label*/}
        <Typography>{props.label}</Typography>

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
                    ? <StarIcon onClick={() => dispatch(deleteFromFavoritesThunk({userId: userId, contentId: props.contentId}))}/>
                    : <StarOutlineIcon onClick={() => dispatch(addToFavoritesThunk({userId: userId, contentId: props.contentId}))}/>
                : ""
        }

        {/*Edit this material. For admin only*/}
        {
            isAdmin && <ModeEditIcon/>
        }
    </>
}

export default Line;


/*

{/!* Содержание линии *!/}
<div onClick={() => setSelected(item.id)}
     className={String(item.id) === String(selectedId) ? (s.treeLine + ' ' + s.selectedLine) : s.treeLine}
>
    {/!*Plus or minus or material ICON*!/}
    {
        (item.items.length > 0 && isHidden)
            ? <PlusIcon onClick={() => plusIconClick(item.id)}/>
            : isMaterial
                ? <NewspaperIcon/>
                : <MinusIcon onClick={() => minusIconClick(item.id)}/>
    }

    {/!*Label*!/}
    <Typography>{item.label}</Typography>

    {/!*Read this material ICON*!/}
    {
        isMaterial &&
        <NavLink to={'/materials/' + item.id} className={s.navLink}>
            <ReadThisMaterial/>
        </NavLink>
    }

    {/!*Add to favorite this material*!/}
    {
        isAuth && isMaterial
            ? favoritesIds.some(el => String(el) === String(item.id))
                ? <StarIcon onClick={() => deleteFromFavorite(item.id)}/>
                : <StarOutlineIcon onClick={() => addToFavorite(item.id)}/>
            : ""
    }

    {/!*Edit this material. For admin only*!/}
    {
        isAdmin && <ModeEditIcon/>
    }

</div>
*/
