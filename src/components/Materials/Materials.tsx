import Container from "@mui/material/Container";
import s from "../common/commonCSS.module.css";
import Typography from "@mui/material/Typography";
import {RootState, useAppDispatch} from "../../store/store";
import {
    addIdToFavoritesMaterialsAC,
    deleteIdFromFavoritesMaterialsAC,/*getAllCategories,*/
    getAllMaterials
} from "../features/materialsSlice";
import React, {useEffect, useState} from "react";
import {Tree5} from "../common/Tree/Tree5";
import {Tree6} from "../common/Tree/Tree6";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader";
import {getAllCategories, IdFiledType} from "../features/categoriesSlice";

const Materials = () => {

    const isLoading = useSelector((state: RootState) => state.materials.isLoading);
    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllMaterials());
    }, []);

    const categories = [...useSelector((state: RootState) => state.categories.categories)];
    const materials = [...useSelector((state: RootState) => state.materials.materials)];

    const addToFavorite = (id: IdFiledType) => {
        dispatch(addIdToFavoritesMaterialsAC(id));
    }
    const deleteFromFavorite = (id: IdFiledType) => {
        dispatch(deleteIdFromFavoritesMaterialsAC(id))
    }

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <div className={s.someDiv1}>
                        <Typography variant={'h4'}>Материалы</Typography>
                    </div>
                    <div className={s.someDiv1}>
                        <Typography variant={'h6'}>
                            На данной странице Вы можете найти метериалы для обучения
                        </Typography>
                    </div>

                    <div className={s.someDiv1}>
                        <Tree5
                            categories={categories}
                            materials={materials}
                            addToFavorite={addToFavorite}
                            deleteFromFavorite={deleteFromFavorite}
                        />
                    </div>

                </Container>
        }
    </>
}

export default Materials;