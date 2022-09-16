import s from './tree5.module.css';
import {
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
import {TaskType} from "../../features/tasksSlice";
import {CategoryType} from "../../features/categoriesSlice";
import materials from "../../Materials/Materials";

type CategoryLongType = {id: IdFiledType, parentId: IdFiledType, label: string, items: Array<CategoryLongType>}

type DataMutationPropsType = {
    categories: Array<CategoryType>,
    //materials: Array<{id: IdFiledType, parentId: IdFiledType, label: string}>//Array<MaterialType> | Array<TaskType>,
    materials: Array<MaterialType> | Array<TaskType>,
}

function dataMutation(props: DataMutationPropsType) {
    //add items to every category
    let categories1:Array<CategoryLongType> = [];
    [...props.categories].forEach(c => {
        categories1.push({id: c.id, parentId: c.parentId, label: c.label, items: []});
    });
    [...props.materials].forEach(m => {
        categories1 = [...categories1, {id: m.id, parentId: m.parentId, label: m.label, items: []}]
    });

    //For the first we add materials fileds in items object of the categories
    const nodeData:Array<CategoryLongType> = [...categories1.map(c => {
        c.items = [...categories1.filter(sc => String(c.id) === String(sc.parentId))];
        return c;
    })].filter(pc => pc.parentId === null || String(pc.parentId) === "0")

    return nodeData;
}

type DrawTreePropsType = {
    items: Array<CategoryLongType>,
    isShowArr: Array<IdFiledType>,

    selectedId: string | number,
    setSelected: (id: IdFiledType) => void,

    materialsIds: Array<IdFiledType>,

    plusIconClick: (id: IdFiledType) => void,
    minusIconClick: (id: IdFiledType) => void,

    favoritesIds: Array<IdFiledType>,
    isAuth: boolean,
    isAdmin: boolean,

    addToFavorite: (id: IdFiledType) => void,
    deleteFromFavorite: (id: IdFiledType) => void,
}
const DrawTree: React.FC<DrawTreePropsType> = ({
                                                   items, isShowArr,
                                                   selectedId, setSelected,
                                                   materialsIds,
                                                   plusIconClick, minusIconClick,
                                                   favoritesIds,
                                                   isAuth, isAdmin,
                                                   addToFavorite, deleteFromFavorite,
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
                         className={String(item.id) === String(selectedId) ? (s.treeLine + ' ' + s.selectedLine) : s.treeLine}
                    >
                        {/*Plus or minus or material ICON*/}
                        {
                            (item.items.length > 0 && isHidden)
                                ? <PlusIcon onClick={() => plusIconClick(item.id)}/>
                                : isMaterial
                                    ? <NewspaperIcon/>
                                    : <MinusIcon onClick={() => minusIconClick(item.id)}/>
                        }

                        <Typography>{item.label}</Typography>

                        {/*Read this material ICON*/}
                        {
                            isMaterial &&
                            <NavLink to={'/materials/' + item.id} className={s.navLink}>
                                <ReadThisMaterial/>
                            </NavLink>
                        }

                        {/*Add to favorite this material*/}
                        {
                            isAuth && isMaterial
                                ? favoritesIds.some(el => String(el) === String(item.id))
                                    ? <StarIcon onClick={() => deleteFromFavorite(item.id)}/>
                                    : <StarOutlineIcon onClick={() => addToFavorite(item.id)}/>
                                : ""
                        }

                        {/*Edit this material. For admin only*/}
                        {
                            isAdmin && <ModeEditIcon/>
                        }

                    </div>
                    <div hidden={isHidden}>
                        {
                            item.items && DrawTree({
                                items: item.items,
                                isShowArr: isShowArr,
                                selectedId: selectedId,
                                materialsIds: materialsIds,
                                favoritesIds: favoritesIds,
                                plusIconClick: plusIconClick,
                                minusIconClick: minusIconClick,
                                setSelected: setSelected,
                                isAuth: isAuth,
                                isAdmin: isAdmin,
                                addToFavorite: addToFavorite,
                                deleteFromFavorite: deleteFromFavorite,
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
    addToFavorite: (id: IdFiledType) => void,
    deleteFromFavorite: (id: IdFiledType) => void,
}
export const Tree5: React.FC<TreePropsType> = (props) => {
    const nodeData0 = dataMutation({
        materials: props.materials,
        categories: props.categories,
    });
    const [isShowArr, setIsShowArr] = useState<Array<IdFiledType>>([]);
    const plusIconClick = (id: number | string) => {
        setIsShowArr([...isShowArr, id])
    }
    const minusIconClick = (id: IdFiledType) => {
        setIsShowArr(isShowArr.filter(s => s !== id))
    }
    const [selectedId, setSelectedId] = useState<IdFiledType>('');
    const materialIds: Array<IdFiledType> = [...props.materials.map(m => m.id)];
    const favoritesIds = useSelector((state: RootState) => state.materials.favoriteMaterialIds);
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isAdmin = useSelector( (state:RootState) => state.auth.user.isAdmin);
    return <div className={s.wrappedDiv}>
        {
            DrawTree({
                items: nodeData0,
                isShowArr: isShowArr,
                selectedId: selectedId,
                materialsIds: materialIds,
                plusIconClick: plusIconClick,
                minusIconClick: minusIconClick,
                setSelected: setSelectedId,
                favoritesIds: favoritesIds,
                isAuth: isAuth,
                isAdmin: isAdmin,
                addToFavorite: props.addToFavorite,
                deleteFromFavorite: props.deleteFromFavorite,
            })
        }
    </div>

}


