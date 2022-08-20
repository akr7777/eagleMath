import Container from "@mui/material/Container";
import s from "../common/commonCSS.module.css";
import Typography from "@mui/material/Typography";
import {RootState, useAppDispatch} from "../../store/store";
import {getAllMaterials, setAllCategoriesAC, setAllMaterialsAC} from "../features/materialsSlice";
import React, {useEffect, useState} from "react";
import Tree4 from "../common/Tree4";
import {Tree5} from "../common/Tree5";
import {useSelector} from "react-redux";

const Materials = () => {
    // Потом надо удалить!!!!!!
    /*let dispatch = useAppDispatch();
    dispatch(setAllMaterialsAC());
    dispatch(setAllCategoriesAC());*/
    //

    let dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllMaterials());
    }, [])
    const categories = [...useSelector((state: RootState) => state.materials.categories)];
    const materials = [...useSelector((state: RootState) => state.materials.materials)];

    return <>
        <Container className={s.wrapped_div}>
            <div className={s.someDiv1}>
                <Typography variant={'h4'}>Материалы</Typography>
            </div>
            <div className={s.someDiv1}>
                <Typography variant={'h6'}>
                    На данной странице Вы можете найти метериалы для обучения
                </Typography>
            </div>
            <div className={s.someDiv1}>
                <Tree4 categories={categories}
                       materials={materials}
                />
            </div>


            <div className={s.someDiv1}>
                <Tree5
                    categories={categories}
                    materials={materials}
                />
            </div>



            {/*<ControlledAccordions123/>*/}

        </Container>
    </>
}

export default Materials;