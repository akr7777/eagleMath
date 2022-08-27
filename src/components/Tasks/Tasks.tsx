import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {Typography} from '@mui/material';
import Container from '@mui/material/Container';
import s from "../common/commonCSS.module.css";
import {Tree5} from "../common/Tree/Tree5";
import {Tree6} from "../common/Tree/Tree6";
//import {CategoryType, } from "../features/materialsSlice";
import {addIdToFavoritesTasksAC, deleteIdFromFavoritesTasksAC, getAllTasks, TaskType} from "../features/tasksSlice";
import {CategoryType, getAllCategories, IdFiledType} from "../features/categoriesSlice";
import Preloader from "../common/Preloader";

export const Tasks = () => {

    const isLoading = useSelector((state: RootState) => state.tasks.isLoading)

    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllTasks());
        dispatch(getAllCategories());
    }, []);

    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAuth);
    const categories: CategoryType[] = useSelector((state: RootState) => state.categories.categories);//[]//[...categoriesAPI];
    const tasks: TaskType[] = useSelector((state: RootState) => state.tasks.tasks);//[]//[...tasksAPI];

    const addToFavorite = (id: IdFiledType) => {
        dispatch(addIdToFavoritesTasksAC(id));
    }
    const deleteFromFavorite = (id: IdFiledType) => {
        dispatch(deleteIdFromFavoritesTasksAC(id));
    }

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
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
                            materials={tasks}
                            addToFavorite={addToFavorite}
                            deleteFromFavorite={deleteFromFavorite}
                        />
                    </div>

                </Container>
        }

    </>
}