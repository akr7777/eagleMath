import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {Typography} from '@mui/material';
import Container from '@mui/material/Container';
import s from "../common/commonCSS.module.css";
import {Tree5} from "../common/Tree/Tree5";
import {
    addTaskToFavoritesThunk,
    deleteTaskFromFavoritesThunk,

    addIdToFavoritesTasksAC,
    deleteIdFromFavoritesTasksAC,

    getAllTasksThunk,
    getFavoritesThunk,
    TaskType
} from "../features/tasksSlice";
import {CategoryType, getAllCategoriesThunk, IdFiledType} from "../features/categoriesSlice";
import Preloader from "../common/Preloader";

export const Tasks = () => {

    const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
    const userId = useSelector((state: RootState) => state.auth.user.id);

    let dispatch = useAppDispatch();
    //dispatch(getFavoritesThunk(userId));
    useEffect(() => {
        console.log('USE EFFECT')
        dispatch(getAllTasksThunk());
        dispatch(getAllCategoriesThunk());
        /*if (userId !== '0') */dispatch(getFavoritesThunk(userId));
    }, [userId]);

    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAuth);
    const categories: CategoryType[] = useSelector((state: RootState) => state.categories.categories);//[]//[...categoriesAPI];
    const tasks: TaskType[] = useSelector((state: RootState) => state.tasks.tasks);//[]//[...tasksAPI];
    const favoritesIds = useSelector((state: RootState) => state.tasks.favoriteTasksIds);


    const addToFavorite = (contentId: IdFiledType) => {
        //dispatch(addIdToFavoritesTasksAC(contentId));
        dispatch(addTaskToFavoritesThunk({userId, contentId}))
    }
    const deleteFromFavorite = (contentId: IdFiledType) => {
        //dispatch(deleteIdFromFavoritesTasksAC(contentId));
        dispatch(deleteTaskFromFavoritesThunk({userId, contentId}))
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
                            favoritesIds={favoritesIds}
                        />
                    </div>

                </Container>
        }

    </>
}