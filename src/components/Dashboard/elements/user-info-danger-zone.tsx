import React from 'react';
import Button from '@mui/material/Button';
import s1 from "./elements.module.css";
import Typography from "@mui/material/Typography";
import {RootState, useAppDispatch} from "../../../store/store";
import {deleteUser, makeUserAdmin, makeUserAsUser, UserType} from "../../features/usersSlice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../AppBar/AppBar";

const UserInfoDangerZone = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user: UserType = useSelector((state: RootState) => state.users.user);

    const deleteUserClickHandler = () => {
        const isDelete = window.confirm("Вы уверены, что хотите удалить пользователя " + user.name + " (" + user.email + ")?");
        if (isDelete) {
            dispatch(deleteUser(user.userId));
            navigate(PATHS.dashboard);
        }
    }

    const makeUserAsAdminClickHandler = () => {
        const makeAdmin = window.confirm("Вы уверены, что хотите сделать пользователя " + user.name + " (" + user.email + ") администратором?");
        if (makeAdmin) {
            dispatch(makeUserAdmin(user.userId));
        }
    }

    const makeUserAsUserClickHandler = () => {
        const makeAdmin = window.confirm("Вы уверены, что хотите разжаловать админа " + user.name + " (" + user.email + ")?");
        if (makeAdmin) {
            dispatch(makeUserAsUser(user.userId));
        }
    }

    return <>
        <div className={s1.dzMainDiv1}>
            <Typography variant={'h4'} className={s1.dzLabel}>Danger Zone</Typography>
            <div className={s1.dzMainDiv2}>

                {
                    !user.isAdmin && <Button
                        variant="contained"
                        color="error"
                        onClick={makeUserAsAdminClickHandler}
                    >
                        Повысить до админа
                    </Button>
                }

                {
                    user.isAdmin && <Button
                        variant="contained"
                        color="error"
                        onClick={makeUserAsUserClickHandler}
                    >
                        Разжаловать до пользователя
                    </Button>
                }

                <Button
                    variant="contained"
                    color="error"
                    onClick={deleteUserClickHandler}
                >
                    Удалить
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    disabled={true}
                >
                    Заблокировать
                </Button>
            </div>
        </div>
    </>
}

export default UserInfoDangerZone;