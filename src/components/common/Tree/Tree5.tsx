import s from './tree5.module.css';
import {
    addIdToFavoritesMaterialsAC,
    CategoryType,
    deleteIdFromFavoritesMaterialsAC,
    IdFiledType,
    MaterialType
} from "../../features/materialsSlice";
import PlusIcon from '@mui/icons-material/ControlPoint';
import MinusIcon from '@mui/icons-material/RemoveCircleOutline';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ReadThisMaterial from '@mui/icons-material/AutoStories';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";

type DataMutationPropsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType>,
}

function dataMutation(props: DataMutationPropsType) {
    //For the first we add materials fileds in items object of the categories
    const nodeData = [...props.categories.map(c => {
        let mat = props.materials.filter(m => c.id == m.parentId);
        if (mat && c.items) {
            return {...c, items: [...c.items, ...mat]}
        } else {
            return c
        }
    })]

    //Secondly, we make a result Array where sub-categories will be added to the basic (nulls) categories in items
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
    return nodeData1;
}

type DrawTreePropsType = {
    items: Array<CategoryType>,
    isShowArr: Array<IdFiledType>,

    selected: string | number,
    setSelected: (id: IdFiledType) => void,

    materialsIds: Array<IdFiledType>,

    plusIconClick: (id: IdFiledType) => void,
    minusIconClick: (id: IdFiledType) => void,

    favoritesIds: Array<IdFiledType>,
    isAuth: boolean,
}
const DrawTree: React.FC<DrawTreePropsType> = ({
                                                   items, isShowArr,
                                                   selected, setSelected,
                                                   materialsIds,
                                                   plusIconClick, minusIconClick,
                                                   favoritesIds,
                                                   isAuth,
                                               }) => {
    const dispatch = useAppDispatch();

    return <div className={s.treeLeaf}>
        {
            items.map(item => {
                const isHidden = !isShowArr.some(el => el == item.id);
                const isMaterial = materialsIds.some(mid => mid == item.id);
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
                            isAuth && isMaterial
                                ? favoritesIds.some(el => el == item.id)
                                    ? <StarIcon onClick={() => dispatch(deleteIdFromFavoritesMaterialsAC(item.id))}/>
                                    : <StarOutlineIcon onClick={() => dispatch(addIdToFavoritesMaterialsAC(item.id))}/>
                                : ""
                        }

                        <div>
                            <ModeEditIcon/>
                        </div>
                    </div>
                    <div hidden={isHidden}>
                        {
                            item.items && DrawTree({
                                items: item.items,
                                isShowArr: isShowArr,
                                selected: selected,
                                materialsIds: materialsIds,
                                favoritesIds: favoritesIds,
                                plusIconClick: plusIconClick,
                                minusIconClick: minusIconClick,
                                setSelected: setSelected,
                                isAuth: isAuth,
                            })
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
export const Tree5: React.FC<TreePropsType> = (props) => {
    const nodeData1 = dataMutation({
        materials: props.materials,
        categories: props.categories,
    });
    const [isShowArr, setIsShowArr] = useState<Array<number | string>>([]);
    const plusIconClick = (id: number | string) => {
        setIsShowArr([...isShowArr, id])
    }
    const minusIconClick = (id: number | string) => {
        setIsShowArr(isShowArr.filter(s => s !== id))
    }
    const [selected, setSelected] = useState<string | number>('');
    const materialIds: Array<IdFiledType> = [...props.materials.map(m => m.id)];
    const favoritesIds = useSelector((state: RootState) => state.materials.favoriteMaterialIds);
    //console.log('favoriteIds=', favoritesIds)
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    return <div className={s.wrappedDiv}>
        {
            DrawTree({
                items: nodeData1,
                isShowArr: isShowArr,
                selected: selected,
                materialsIds: materialIds,
                plusIconClick: plusIconClick,
                minusIconClick: minusIconClick,
                setSelected: setSelected,
                favoritesIds: favoritesIds,
                isAuth: isAuth,
            })
        }
    </div>

}

