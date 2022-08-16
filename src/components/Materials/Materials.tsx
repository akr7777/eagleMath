import Container from "@mui/material/Container";
//import s from './materials.module.css';
import s from "../common/commonCSS.module.css";
import Typography from "@mui/material/Typography";
import ControlledAccordions123 from "./_Acc";
//import ControlledTreeView from "./_MaterialsTree";
import {RootState, useAppDispatch} from "../../store/store";
import {setAllCategoriesAC, setAllMaterialsAC} from "../features/materialsSlice";
import _Tree3 from "./_Tree3";
import SortableTree, {TreeItem} from "react-sortable-tree";
import React, {useState} from "react";
import Tree4 from "../common/Tree4";
import {useSelector} from "react-redux";

const Materials = () => {
    // Потом надо удалить!!!!!!
    let dispatch = useAppDispatch();
    dispatch(setAllMaterialsAC());
    dispatch(setAllCategoriesAC());
    //

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

            {/*<ControlledAccordions123/>*/}

        </Container>
    </>
}

export default Materials;