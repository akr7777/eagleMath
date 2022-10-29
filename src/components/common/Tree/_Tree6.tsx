import {MaterialType} from "../../../store/features/materialsSlice";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import s from "./tree5.module.css";
import {TaskType} from "../../../store/features/tasksSlice";
import {CategoryType, IdFiledType} from "../../../store/features/categoriesSlice";

import {NavLink} from "react-router-dom";

import PlusIcon from '@mui/icons-material/ControlPoint';
import MinusIcon from '@mui/icons-material/RemoveCircleOutline';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ReadThisMaterial from '@mui/icons-material/AutoStories';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Typography from "@mui/material/Typography";


type DrawTreePropsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType> | Array<TaskType>,
    isShowArr: Array<IdFiledType>,

    selectedId: string | number,
    setSelected: (id: IdFiledType) => void,

    materialsIds: Array<IdFiledType>,

    plusIconClick: (id: IdFiledType) => void,
    minusIconClick: (id: IdFiledType) => void,

    favoritesIds: Array<IdFiledType>,
    isAuth: boolean,
    currentLeafId: IdFiledType,
}

const DrawTree: React.FC<DrawTreePropsType> = ({
                                                   categories, materials, isShowArr,
                                                   selectedId, setSelected,
                                                   materialsIds,
                                                   plusIconClick, minusIconClick,
                                                   favoritesIds,
                                                   isAuth, currentLeafId,
                                               }) => {
    const dispatch = useAppDispatch();
    const categories1 = categories.concat(materials);
    const isAdmin = useSelector( (state:RootState) => state.auth.user.isAdmin);

    return <div className={s.treeLeaf}>
        {
            categories1.filter(cat => String(cat.parentId) === currentLeafId).map( (cat, catIndex) => {
                const isHidden = !isShowArr.some(el => String(el) === String(cat.id));
                const isMaterial = materialsIds.some(mid => String(mid) === String(cat.id));
                const hasItems = materials.some(el => String(el.parentId) === String(cat.id))
                    || categories.some(el => String(el.parentId) === String(cat.id));

                return <div key={cat.id}>
                    <div
                         onClick={() => setSelected(cat.id)}
                         className={String(cat.id) === String(selectedId) ? (s.treeLine + ' ' + s.selectedLine) : s.treeLine}
                    >
                        {
                            (hasItems && isHidden)
                                ? <PlusIcon onClick={() => plusIconClick(cat.id)}/>
                                : isMaterial
                                    ? <NewspaperIcon/>
                                    : <MinusIcon onClick={() => minusIconClick(cat.id)}/>
                        }

                        <Typography>{cat.label}</Typography>

                        {
                            isMaterial &&
                            <NavLink to={'/materials/' + cat.id} className={s.navLink}>
                                <ReadThisMaterial/>
                            </NavLink>
                        }

                        {
                            isAuth && isMaterial
                                ? favoritesIds.some(el => String(el) === String(cat.id))
                                    ? <StarIcon onClick={() => {}/*dispatch(deleteIdFromFavoritesMaterialsAC(cat.id))*/}/>
                                    : <StarOutlineIcon onClick={() => {}/*dispatch(addIdToFavoritesMaterialsAC(cat.id))}*/}/>
                                : ""
                        }

                        {
                            isAdmin && <ModeEditIcon/>
                        }


                    </div>

                    <div key={catIndex} hidden={isHidden}>
                        {
                            hasItems && DrawTree({
                                categories: categories,
                                materials: materials,
                                isShowArr: isShowArr,
                                selectedId: selectedId,
                                materialsIds: materialsIds,
                                favoritesIds: favoritesIds,
                                plusIconClick: plusIconClick,
                                minusIconClick: minusIconClick,
                                setSelected: setSelected,
                                isAuth: isAuth,
                                currentLeafId: cat.id,
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
    materials: Array<MaterialType> | Array<TaskType>,
}
export const _Tree6: React.FC<TreePropsType> = (props) => {

    const [isShowArr, setIsShowArr] = useState<Array<IdFiledType>>([]);
    const plusIconClick = (id: IdFiledType) => {
        setIsShowArr([...isShowArr, id])
    }
    const minusIconClick = (id: IdFiledType) => {
        setIsShowArr(isShowArr.filter(s => String(s) !== String(id)));
    }
    const [selectedId, setSelectedId] = useState<IdFiledType>('');
    const materialIds: Array<IdFiledType> = [...props.materials.map(m => m.id)];
    const favoritesIds = useSelector((state: RootState) => state.tasks.favoriteTasksIds);
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    return <div className={s.wrappedDiv}>
        {
            DrawTree({
                categories: props.categories,
                materials: props.materials,
                isShowArr: isShowArr,
                selectedId: selectedId,
                materialsIds: materialIds,
                plusIconClick: plusIconClick,
                minusIconClick: minusIconClick,
                setSelected: setSelectedId,
                favoritesIds: favoritesIds,
                isAuth: isAuth,
                currentLeafId: '0',
            })
        }
    </div>

}

