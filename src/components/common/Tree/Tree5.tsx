import s from './tree5.module.css';
import {
    IdFiledType,
    MaterialType
} from "../../features/materialsSlice";
import PlusIcon from '@mui/icons-material/ControlPoint';
import MinusIcon from '@mui/icons-material/RemoveCircleOutline';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {TaskType} from "../../features/tasksSlice";
import {addToShownCats, deleteFromShownCats} from "../../features/categoriesSlice";
import {CategoryType} from "../../features/categoriesSlice";
import Line, {contentTypeType} from "../line";
import HiddenMenu from "./hiddenMenu";

export type CategoryLongType = {id: IdFiledType, parentId: IdFiledType, label: string, items: Array<CategoryLongType>}

type DataMutationPropsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType> | Array<TaskType>,
}

export function dataMutation(props: DataMutationPropsType):CategoryLongType[] {
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

    showMenuId: IdFiledType,
    setShowMenuId: (id: IdFiledType) => void,

    materialsIds: Array<IdFiledType>,

    plusIconClick: (id: IdFiledType) => void,
    minusIconClick: (id: IdFiledType) => void,

    contentType: contentTypeType,
}
const DrawTree: React.FC<DrawTreePropsType> = ({
                                                   items, isShowArr,
                                                   selectedId, setSelected,
                                                   materialsIds,
                                                   plusIconClick, minusIconClick,
                                                   contentType,
                                                   showMenuId, setShowMenuId,
                                               }) => {
    /*const dispatch = useAppDispatch();
    const isShowArr = useSelector((state: RootState) => state.categories.isShownCats);
    const plusIconClick = (id: IdFiledType) => {
        dispatch(addToShownCats(id))
    }
    const minusIconClick = (id: IdFiledType) => {
        dispatch(deleteFromShownCats(id))
    }
    const selectedId = useSelector((state: RootState) => state.categories.selectedId);*/

    /*const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    //const id = open ? 'simple-popover' : undefined;*/

    //const [showMenuId, setShowMenuId] = useState<IdFiledType>("-1");
    //const showMenuId = useSelector((state: RootState) => state.categories.showMenuId);

    return <div className={s.treeLeaf}>
        {
            items.map(item => {
                const isHidden = !isShowArr.some(el => el == item.id);
                const isMaterial = materialsIds.some(mid => mid == item.id);
                return <div key={item.id} className={s.leafAndChildren}>

                    {/* Содержание линии */}
                    <div onClick={() => setSelected(item.id)}
                         onDoubleClick={(e) => {
                             if (showMenuId === item.id) {
                                 setShowMenuId("-1");
                             } else {
                                 setShowMenuId(item.id);
                             }
                             setSelected(item.id);

                         }}
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

                        {/*<MouseLineClick
                            open={open}
                            handleClose={handleClose}
                            anchorEl={anchorEl}

                            label={item.label}
                            contentId={item.id}
                            isMaterial={isMaterial}
                            contentType={contentType}
                        />*/}
                        <Line
                            contentId={item.id}
                            label={item.label}
                            isMaterial={isMaterial}
                            contentType={contentType}
                        />

                    </div>

                    <div hidden={item.id !== showMenuId}>
                        {/*<div hidden={item.id !== showMenuId}>*/}
                        <HiddenMenu
                            contentId={item.id}
                            label={item.label}
                            isMaterial={isMaterial}
                            contentType={contentType}
                        />
                    </div>

                    <div hidden={isHidden}>
                        {
                            item.items && DrawTree({
                                items: item.items,
                                isShowArr: isShowArr,
                                selectedId: selectedId,
                                setSelected: setSelected,

                                materialsIds: materialsIds,
                                plusIconClick: plusIconClick,
                                minusIconClick: minusIconClick,
                                contentType: contentType,

                                showMenuId: showMenuId,
                                setShowMenuId: setShowMenuId,
                            })
                        }
                    </div>
                </div>
            })
        }
    </div>
}

type TreePropsType = {
    //categories: Array<CategoryType>,
    //materials: Array<MaterialType>,
    contentType: contentTypeType,
}
export const Tree5 = (props:TreePropsType) => {
    const categories: CategoryType[] = useSelector((state: RootState) => state.categories.categories);//[]//[...categoriesAPI];

    let materials: TaskType[] | MaterialType[] = [];
    const t = useSelector((state: RootState) => state.tasks.tasks);//[]//[...tasksAPI];
    const m = useSelector((state: RootState) => state.materials.materials);//[]//[...tasksAPI];

    if (props.contentType === "T")
        materials = t;
    if (props.contentType === "M")
        materials = m;

    const dispatch = useAppDispatch();
    const nodeData0 = dataMutation({
        materials: materials,
        categories: categories,
    });
    const isShowArr = useSelector((state: RootState) => state.categories.isShownCats);
    const plusIconClick = (id: IdFiledType) => {
        dispatch(addToShownCats(id))
    }
    const minusIconClick = (id: IdFiledType) => {
        dispatch(deleteFromShownCats(id))
    }
    const [selectedId, setSelectedId] = useState<IdFiledType>('');
    const [showMenuId, setShowMenuId] = useState<IdFiledType>('');
    const materialIds: Array<IdFiledType> = [...materials.map(m => m.id)];

    return <div className={s.wrappedDiv}>
        {
            DrawTree({
                items: nodeData0,
                isShowArr: isShowArr,
                materialsIds: materialIds,
                plusIconClick: plusIconClick,
                minusIconClick: minusIconClick,

                selectedId: selectedId,
                setSelected: setSelectedId,

                showMenuId: showMenuId,
                setShowMenuId: setShowMenuId,

                contentType: props.contentType,
            })
        }
    </div>

}


