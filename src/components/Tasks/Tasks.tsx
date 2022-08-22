import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {Typography} from '@mui/material';
import Container from '@mui/material/Container';
import s from "../common/commonCSS.module.css";
import {Tree5} from "../common/Tree/Tree5";
import {CategoryType, } from "../features/materialsSlice";
import {getAllCategories, getAllTasks, TaskType} from "../features/tasksSlice";

export const Tasks = () => {

    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllTasks());
        dispatch(getAllCategories());
    }, []);

    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAuth);
    const categories:CategoryType[] = useSelector( (state: RootState) => state.tasks.categories);//[]//[...categoriesAPI];
    const materials:TaskType[] = useSelector((state: RootState) => state.tasks.materials);//[]//[...tasksAPI];

    return <>
        <Container className={s.wrapped_div}>
            <div className={s.someDiv1}>
                <Typography variant={'h4'}>Задачи</Typography>
            </div>
            <div className={s.someDiv1}>
                <Typography variant={'h6'}>
                    На данной странице Вы можете найти задачи для практики.
                </Typography>
            </div>

            <div className={s.someDiv1}>
                <Tree5
                    categories={categories}
                    materials={materials}
                />
            </div>

        </Container>
    </>
}