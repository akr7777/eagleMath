import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {Typography} from '@mui/material';
import Container from '@mui/material/Container';
import s from "../common/commonCSS.module.css";
import {Tree5} from "../common/Tree/Tree5";
import {
    clearTestAnswersAC,
    getAllTasksThunk,
    getFavoritesThunk,
} from "../features/tasksSlice";
import {getAllCategoriesThunk} from "../features/categoriesSlice";
import Preloader from "../common/Preloader";
import MaterialTaskHead from "../common/material-task-head";

export const Tasks = () => {

    const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
    const userId = useSelector((state: RootState) => state.auth.user.id);

    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllTasksThunk());
        dispatch(getAllCategoriesThunk());
        dispatch(getFavoritesThunk(userId));
        dispatch(clearTestAnswersAC());
    }, [userId]);

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <div className={s.someDiv1}>
                        <Typography variant={'h4'}>Практика</Typography>
                    </div>
                    <div className={s.someDiv1}>
                        <Typography variant={'h6'}>
                            На данной странице Вы можете найти задачи для практики.
                        </Typography>
                    </div>

                    <div className={s.someDiv1}>
                        <MaterialTaskHead/>
                    </div>

                    <div className={s.someDiv1}>
                        <Tree5
                            contentType={"T"}
                        />
                    </div>

                </Container>
        }

    </>
}