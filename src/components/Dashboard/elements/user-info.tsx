import React, {useEffect} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useParams} from "react-router-dom";
import Preloader from "../../common/Preloader";
import Container from "@mui/material/Container";
import s from "../../common/commonCSS.module.css";
import {Typography} from "@mui/material";
import FavoriteMaterials from "./Favorites";
import Users from "./users";
import {useSelector} from "react-redux";
import {getOneUser, UserType} from "../../features/usersSlice";

const UserInfo = () => {
    const {userId} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (userId)
            dispatch(getOneUser({userId}));
    }, [])

    const isLoading: boolean = useSelector((state: RootState) => state.users.isLoading);
    const user:UserType = useSelector((state: RootState) => state.users.user);

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <Typography variant="h4">Карточка студента</Typography>

                    <div>
                        {user.userId}
                    </div>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {user.email}
                    </div>
                    <div>
                        {user.isAdmin}
                    </div>


                </Container>
        }
    </>
}

export default UserInfo;