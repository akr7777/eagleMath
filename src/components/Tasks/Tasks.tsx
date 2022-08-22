import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {Typography} from '@mui/material';
import Container from '@mui/material/Container';
import s from "../common/commonCSS.module.css";
import {Tree5} from "../common/Tree/Tree5";
import {CategoryType, getAllCategories, getAllMaterials, MaterialType} from "../features/materialsSlice";

export const Tasks = () => {

    let dispatch = useAppDispatch();
    useEffect(() => {
        console.log('tasks / useEffect')
        dispatch(getAllMaterials());
        dispatch(getAllCategories());
    }, []);

    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAuth);
    const categories:CategoryType[] = useSelector( (state: RootState) => state.materials.categories);//[]//[...categoriesAPI];
    const materials:MaterialType[] = useSelector((state: RootState) => state.materials.materials);//[]//[...tasksAPI];

    console.log('Tasks / categories=', categories)
    console.log('Tasks / materials=', materials)

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