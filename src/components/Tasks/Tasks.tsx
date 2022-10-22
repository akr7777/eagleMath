import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {Typography} from '@mui/material';
import Container from '@mui/material/Container';
import s from "../common/commonCSS.module.css";
import {Tree5} from "../common/Tree/Tree5";
import {
    clearTestAnswersAC,
    //addTaskToFavoritesThunk,
    //deleteTaskFromFavoritesThunk,
    getAllTasksThunk,
    getFavoritesThunk,
    //TaskType
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

    //const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAuth);

    /*const categories: CategoryType[] = useSelector((state: RootState) => state.categories.categories);//[]//[...categoriesAPI];
    const tasks: TaskType[] = useSelector((state: RootState) => state.tasks.tasks);//[]//[...tasksAPI];*/

    //const favoritesIds = useSelector((state: RootState) => state.tasks.favoriteTasksIds);
    //const favoritesIds = useSelector((state: RootState) => state.categories.favoriteIds);


    /*const addToFavorite = (contentId: IdFiledType) => {
        //dispatch(addIdToFavoritesTasksAC(contentId));
        dispatch(addTaskToFavoritesThunk({userId, contentId}))
    }
    const deleteFromFavorite = (contentId: IdFiledType) => {
        //dispatch(deleteIdFromFavoritesTasksAC(contentId));
        dispatch(deleteTaskFromFavoritesThunk({userId, contentId}))
    }*/

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
                            /*categories={categories} вот это убрать внутрь tree
                            materials={tasks} и это тоже: можно получить из contentType,который ниже*/
                            contentType={"T"}
                        />
                    </div>

                </Container>
        }

    </>
}