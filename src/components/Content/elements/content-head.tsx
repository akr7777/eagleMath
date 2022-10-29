import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getFavoritesThunk, addToFavoritesThunk, deleteFromFavoritesThunk} from "../../../store/features/dashboardSlice";
import {RootState, useAppDispatch} from "../../../store/store";
import {IdFiledType} from "../../../store/features/categoriesSlice";
import {useSelector} from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import contentCss from "./../content.module.css";
import {deleteContentThunk} from "../../../store/features/contentSlice";
import {PATHS} from "../../AppBar/AppBar";

//type ContentHEadPropsType = {userId: IdFiledType}
const ContentHead = () => {
    const navigate = useNavigate();
    const {contentId} = useParams();
    const userId:IdFiledType = useSelector((state: RootState) => state.auth.user.id);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getFavoritesThunk(userId));
    }, [])
    const favorites:Array<IdFiledType> = useSelector((state: RootState) => state.dashboard.favoriteContent);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    const deleteContent = () => {
        const answer = window.confirm("Удалить контент?");
        if (answer) {
            //console.log('ContentHead / deleteContent / contentId=', contentId)
            dispatch(deleteContentThunk(contentId || ""));
            navigate(PATHS.description);
        }
    }

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
                <DeleteIcon cursor={'pointer'}
                            onClick={deleteContent}
                />
            </div>
        }
    </div>
}

export default ContentHead;