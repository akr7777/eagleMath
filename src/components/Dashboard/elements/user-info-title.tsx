import React from 'react';
import s1 from "./elements.module.css";
import Typography from "@mui/material/Typography";
import {RootState, useAppDispatch} from "../../../store/store";
import {UserType} from "../../../store/features/usersSlice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const UserInfoTitle = () => {
    const user: UserType = useSelector((state: RootState) => state.users.user);
    return <>
        <Typography variant="h4">Карточка студента</Typography>
        <div className={s1.div1}>
            <div className={s1.div2}>
                <div><label>Имя:</label></div>
                <div><Typography variant={'h5'}>{user.name}</Typography></div>
            </div>
            <div className={s1.div2}>
                <label>Электронная почта:</label>
                <Typography variant={'h5'}>{user.email}</Typography>
            </div>
            <div className={s1.div2}>
                <label>Администратор:</label>
                {user.isAdmin && <Typography variant={'h5'} color={'red'}>Да</Typography>}
                {!user.isAdmin && <Typography variant={'h5'} color={'green'}>Нет</Typography>}
            </div>
        </div>
    </>
}

export default UserInfoTitle;