import Container from "@mui/material/Container";
import s from "../common/commonCSS.module.css";
import Typography from "@mui/material/Typography";
import {RootState, useAppDispatch} from "../../store/store";
import {/*getAllCategories,*/ getAllMaterials} from "../features/materialsSlice";
import React, {useEffect, useState} from "react";
import {Tree5} from "../common/Tree/Tree5";
import {Tree6} from "../common/Tree/Tree6";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader";
import {getAllCategories} from "../features/categoriesSlice";

const Materials = () => {

    const isLoading = useSelector((state: RootState) => state.materials.isLoading)
    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllMaterials());
        dispatch(getAllCategories());
    }, []);

    const categories = [...useSelector((state: RootState) => state.categories.categories)];
    const materials = [...useSelector((state: RootState) => state.materials.materials)];

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

                    Tree5:
                    <div className={s.someDiv1}>
                        <Tree5
                            categories={categories}
                            materials={materials}
                        />
                    </div>
                    {/*Tree6:
                    <div className={s.someDiv1}>
                        <Tree6
                            categories={categories}
                            materials={materials}
                        />
                    </div>*/}
                </Container>
        }
    </>
}

export default Materials;