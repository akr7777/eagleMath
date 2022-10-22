import Container from "@mui/material/Container";
import s from "../common/commonCSS.module.css";
import Typography from "@mui/material/Typography";
import {RootState, useAppDispatch} from "../../store/store";
import {getAllMaterialsThunk, getFavoritesThunk} from "../features/materialsSlice";
import React, {useEffect} from "react";
import {Tree5} from "../common/Tree/Tree5";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader";
import {addToFavoritesThunk, deleteFromFavoritesThunk, getAllCategoriesThunk, IdFiledType} from "../features/categoriesSlice";
import MaterialTaskHead from "../common/material-task-head";

const Materials = () => {

    const userId = useSelector((state: RootState) => state.auth.user.id);
    const isLoading = useSelector((state: RootState) => state.materials.isLoading);
    let dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllCategoriesThunk());
        dispatch(getAllMaterialsThunk());
        dispatch(getFavoritesThunk(userId))
    }, [userId]);

    const categories = [...useSelector((state: RootState) => state.categories.categories)];
    const materials = [...useSelector((state: RootState) => state.materials.materials)];

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <div className={s.someDiv1}>
                        <Typography variant={'h4'}>Теория</Typography>
                    </div>
                    <div className={s.someDiv1}>
                        <Typography variant={'h6'}>
                            На данной странице Вы можете найти метериалы для обучения
                        </Typography>
                    </div>

                    <div className={s.someDiv1}>
                        <MaterialTaskHead/>
                    </div>

                    <div className={s.someDiv1}>
                        <Tree5
                            //categories={categories}
                            //materials={materials}
                            contentType={"M"}
                        />
                    </div>

                </Container>
        }
    </>
}

export default Materials;