import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {getFavoritesThunk} from "../../features/dashboardSlice";
import {RootState, useAppDispatch} from "../../../store/store";
import {addToFavoritesThunk, deleteFromFavoritesThunk, IdFiledType} from "../../features/categoriesSlice";
import {useSelector} from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import contentCss from "./../content.module.css";

type ContentHEadPropsType = {userId: IdFiledType}
const ContentHead = () => {
    const {contentId} = useParams();
    const userId:IdFiledType = useSelector((state: RootState) => state.auth.user.id);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getFavoritesThunk(userId));
    }, [])
    const favorites:Array<IdFiledType> = useSelector((state: RootState) => state.dashboard.favoriteContent);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    return <div className={contentCss.border_div}>

        <div className={contentCss.innerHeadDiv}>
            <Typography>В избранном:</Typography>
            {
                favorites.includes(contentId || " ")
                    ? <StarIcon
                        cursor={'pointer'}
                        onClick={() => dispatch(deleteFromFavoritesThunk({userId: userId, contentId: contentId || " "}))}/>
                    : <StarOutlineIcon
                        cursor={'pointer'}
                        onClick={() => dispatch(addToFavoritesThunk({userId: userId, contentId: contentId || " "}))}/>
            }
        </div>

        { isAdmin &&
            <div className={contentCss.innerHeadDiv}>
                <Typography>Удалить материал:</Typography>
                <DeleteIcon cursor={'pointer'}/>
            </div>
        }
    </div>
}

export default ContentHead;