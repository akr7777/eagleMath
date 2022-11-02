import React, {useEffect} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useParams} from "react-router-dom";
import Preloader from "../../common/Preloader";
import Container from "@mui/material/Container";
import s from "../../common/commonCSS.module.css";
import {useSelector} from "react-redux";
import {getOneUserThunk} from "../../../store/features/usersThunks";
import UserInfoDangerZone from "./user-info-danger-zone";
import FavoriteMaterials from "./Favorites";
import UserInfoTitle from "./user-info-title";

const UserInfo = () => {
    const {userId} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (userId)
            dispatch(getOneUserThunk(userId));
    }, []);

    const isLoading: boolean = useSelector((state: RootState) => state.users.isLoading);

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <UserInfoTitle/>
                    <FavoriteMaterials userId={userId || ""}/>
                    <UserInfoDangerZone/>
                </Container>
        }
    </>
}

export default UserInfo;