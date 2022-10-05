import React, {useEffect} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useParams} from "react-router-dom";
import Preloader from "../../common/Preloader";
import Container from "@mui/material/Container";
import s from "../../common/commonCSS.module.css";
import s1 from "./elements.module.css";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {getOneUser, UserType} from "../../features/usersSlice";
import UserInfoDangerZone from "./user-info-danger-zone";

const UserInfo = () => {
    const {userId} = useParams();
    const dispatch = useAppDispatch();
    /*if (userId)
        dispatch(getOneUser(userId));*/
    useEffect(() => {
        if (userId)
            dispatch(getOneUser(userId));
    }, []);

    const isLoading: boolean = useSelector((state: RootState) => state.users.isLoading);
    const user: UserType = useSelector((state: RootState) => state.users.user);

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <Typography variant="h4">Карточка студента</Typography>
                    <div className={s1.div1}>
                        <div className={s1.div2}>
                            <div><label>Имя:</label></div>
                            <div><Typography variant={'h5'}>{user.name}</Typography></div>
                        </div>
                        <div className={s1.div2}>
                            <label>Элеутронная почта:</label>
                            <Typography variant={'h5'}>{user.email}</Typography>
                        </div>
                        <div className={s1.div2}>
                            <label>Администратор:</label>
                            {user.isAdmin && <Typography variant={'h5'} color={'red'}>Да</Typography>}
                            {!user.isAdmin && <Typography variant={'h5'} color={'green'}>Нет</Typography>}
                        </div>
                    </div>

                    <UserInfoDangerZone/>

                </Container>
        }
    </>
}

export default UserInfo;