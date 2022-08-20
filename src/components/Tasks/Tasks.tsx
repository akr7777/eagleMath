import React from 'react';
import {useSelector} from "react-redux";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {RootState} from "../../store/store";
import {Typography} from '@mui/material';
import Container from '@mui/material/Container';
//import s from './tasks.module.css';
import s from "../common/commonCSS.module.css";
import Tree4 from "../common/Tree4";


//Потом надо удалить!
import {categoriesAPI, tasksAPI} from "../api/tasksAPIData";
import {Tree5} from "../common/Tree5";

export const Tasks = () => {

    const isAdmin: boolean = useSelector((state: RootState) => state.auth.isAuth);
    const categories = [...categoriesAPI];
    const materials = [...tasksAPI];

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

           {/* <div className={s.someDiv1}>
                <Tree4 categories={categories}
                       materials={materials}
                />
            </div>*/}

            <div className={s.someDiv1}>
                <Tree5
                    categories={categories}
                    materials={materials}
                />
            </div>

        </Container>
    </>
}