import s from './tree5.module.css';
import {CategoryType, MaterialType} from "../features/materialsSlice";
import PlusIcon from '@mui/icons-material/ControlPoint';
import MinusIcon from '@mui/icons-material/RemoveCircleOutline';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ReadThisMaterial from '@mui/icons-material/AutoStories';
import {useState} from "react";
import {tasksAPI} from "../api/tasksAPIData";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";

const drawTree = (
    items: Array<CategoryType>,
    isShowArr: Array<string | number>,
    selected: string | number,
    materials: Array<MaterialType>,
    plusIconClick: (id: number | string) => void,
    minusIconClick: (id: number | string) => void,
    setSelected: (id: number | string) => void,
) => {


    return <div className={s.treeLeaf}>
        {
            items.map(item => {
                const isHidden = !isShowArr.some(el => el == item.id);
                const isFavorite = false;
                const isMaterial = materials.some(m => m.id == item.id);

                return <div key={item.id} className={s.leafAndChildren}>

                    {/* Содержание линии */}
                    <div onClick={() => setSelected(item.id)}
                         className={item.id == selected ? (s.treeLine + ' ' + s.selectedLine) : s.treeLine}
                    >
                        {
                            (item.items.length > 0 && isHidden)
                                ? <PlusIcon onClick={() => plusIconClick(item.id)}/>
                                : isMaterial
                                    ? <NewspaperIcon/>
                                    : <MinusIcon onClick={() => minusIconClick(item.id)}/>
                        }
                        <Typography>{item.label}</Typography>

                        {
                            isMaterial &&
                            <NavLink to={'/materials/' + item.id} className={s.navLink}>
                                <ReadThisMaterial/>
                            </NavLink>
                        }

                        {
                            isMaterial
                                ? isFavorite
                                    ? <StarIcon/>
                                    : <StarOutlineIcon/>
                                : ""
                        }
                    </div>
                    <div hidden={isHidden}>
                        {
                            item.items && drawTree(
                                item.items, isShowArr, selected, materials,
                                plusIconClick, minusIconClick, setSelected)
                        }
                    </div>
                </div>
            })
        }
    </div>
}

type TreePropsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType>,
}

export const Tree5 = (props: TreePropsType) => {

    const materials: Array<MaterialType> = [...tasksAPI];

    const nodeData = [...props.categories.map(c => {
        let mat = props.materials.filter(m => c.id == m.parentId);
        if (mat && c.items) {
            return {...c, items: [...c.items, ...mat]}
        } else {
            return c
        }
    })]
    const nodeData1 = [...nodeData.map(c => {
        let childrenCats = nodeData.filter(m => c.id == m.parentId);
        if (childrenCats) {
            //return {...c, items: [...c.items, ...childrenCats]}
            for (let i = 0; i < childrenCats.length; i++) {
                c.items.push(childrenCats[i])
            }
            return c;
        } else {
            return c
        }
    })
    ].filter(pc => pc.parentId === null);


    const [isShowArr, setIsShowArr] = useState<Array<number | string>>([]);
    const plusIconClick = (id: number | string) => {
        setIsShowArr([...isShowArr, id])
    }
    const minusIconClick = (id: number | string) => {
        setIsShowArr(isShowArr.filter(s => s !== id))
    }

    const [selected, setSelected] = useState<string | number>('');

    return <div className={s.wrappedDiv}>
        {
            drawTree(nodeData1, isShowArr, selected, materials,
                plusIconClick, minusIconClick, setSelected)
        }
    </div>

}

