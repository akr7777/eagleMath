import Container from "@mui/material/Container";
import s from './materials.module.css';
import Typography from "@mui/material/Typography";
import ControlledAccordions123 from "./_Acc";
//import ControlledTreeView from "./_MaterialsTree";
import {useAppDispatch} from "../../store/store";
import {setAllCategoriesAC, setAllMaterialsAC} from "../features/materialsSlice";
import _Tree3 from "./_Tree3";
import SortableTree, {TreeItem} from "react-sortable-tree";
import React, {useState} from "react";
import Tree4 from "./Tree4";

const Materials = () => {


    /*const initState = {
        treeData: [
            { title: 'Chicken', children: [{ title: 'Egg' }] },
            { title: 'Fish', children: [{ title: 'fingerline' }] },
        ],
    };
    type TreeDataType = typeof initState;
    const [treeData1, setTreeData1] = useState<{ treeData: TreeItem[]}>(initState);*/


    return <>
        <Container className={s.wrapped_div}>
            <div>
                <Typography variant={'h4'}>Материалы</Typography>
            </div>
            <div>
                <Typography variant={'h6'}>
                    На данной странице Вы можете найти метериалы для обучения
                </Typography>
            </div>
            <div>
                {/*<_Tree3 treeData={[]} onChange={()=>{}}/>*/}
                {/*<ControlledTreeView/>*/}
                {/*<SortableTree
                    treeData={treeData1}
                    onChange={treeData => setTreeData1({ treeData })}

                />*/}
                <Tree4/>
            </div>

            {/*<ControlledAccordions123/>*/}

        </Container>
    </>
}

export default Materials;